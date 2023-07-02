import * as admin from "firebase-admin";
import { error, info } from "firebase-functions/logger";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { onCall, onRequest, HttpsError } from "firebase-functions/v2/https";
import { Configuration, OpenAIApi } from "openai";

import { RECENT_LOCATIONS, FCM_TOKENS } from "./constants";
import { authGuard, roleGuard } from "./utils/guards";

import { UserLocationData } from "../../src/firebase/firestore/recentLocations";
import { getOneCallUrl } from "../../src/features/weather-forecast/utils/urls";
import { formatTs } from "../../src/utils/time";
import { LocationSuggestion } from "../../src/features/location/types";
import {
  type Alert,
  type OneCallData,
} from "../../src/features/weather-forecast/utils/onecall";

admin.initializeApp();
const db = admin.firestore();

const ONE_DAY = 60 * 60 * 24;
const jobTimerMinutes = Math.round(ONE_DAY / 60);
const isEmulator = process.env.FUNCTIONS_EMULATOR === "true";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

type RecentLocations = Record<string, LocationSuggestion[]>;
type LocationsUsers = Record<string, string[]>;
type LocationsAlerts = Record<string, Alert[]>;
type UserAlerts = Record<
  string,
  Array<{ location: LocationSuggestion; alerts: Alert[] }>
>;

async function getRecentLocations() {
  const recentLocationsSnapshot = await db.collection(RECENT_LOCATIONS).get();
  const recentLocations: RecentLocations = {};
  recentLocationsSnapshot.forEach((doc) => {
    const { locations, userUid } = doc.data() as UserLocationData;
    recentLocations[userUid] = locations;
  });
  return recentLocations;
}

async function getLocationsUsers(recentLocations: RecentLocations) {
  return Object.entries(recentLocations).reduce((acc, [userUid, locations]) => {
    locations.forEach(({ lat, lon }: { lat: number; lon: number }) => {
      const key = getKeyFromLatLon(lat, lon);
      if (!acc[key]) {
        acc[key] = [userUid];
      } else {
        acc[key].push(userUid);
      }
    });
    return acc;
  }, {} as LocationsUsers);
}

function getKeyFromLatLon(lat: number, lon: number) {
  return `lat=${lat}&lon=${lon}`;
}

function getLatLonFromKey(key: string): {
  lat: number;
  lon: number;
} {
  const [lat, lon] = key.split("&").map((str) => str.split("=")[1]);
  return {
    lat: Number(lat),
    lon: Number(lon),
  };
}

async function fetchOneCall(lat: number, lon: number) {
  const url = `${getOneCallUrl(lat.toString(), lon.toString())}&appid=${
    process.env.OPEN_WEATHER_API_KEY
  }&exclude=current,minutely,hourly,daily`;
  try {
    const response = await fetch(url);
    return response.json() as Promise<Omit<OneCallData, "daily">>;
  } catch (err) {
    error(err);
    return null;
  }
}

function getUserAlerts(
  recentLocations: RecentLocations,
  locationsAlerts: LocationsAlerts
): UserAlerts {
  const userAlerts: UserAlerts = {};

  Object.entries(recentLocations).forEach(([userUid, locations]) => {
    userAlerts[userUid] = [];
    locations.forEach((location) => {
      const { lat, lon } = location;
      const locationKey = getKeyFromLatLon(lat, lon);
      if (locationsAlerts[locationKey]) {
        userAlerts[userUid].push({
          location,
          alerts: locationsAlerts[locationKey],
        });
      }
    });
  });

  return userAlerts;
}

function getUserFcmtokens() {
  return db
    .collection(FCM_TOKENS)
    .get()
    .then((snapshot) => {
      const fcmTokens: Record<string, string> = {};
      snapshot.forEach((doc) => {
        const { token } = doc.data();
        fcmTokens[doc.id] = token;
      });
      return fcmTokens;
    });
}

async function handleWeatherAlerts() {
  const [recentLocations, userFcmTokens] = await Promise.all([
    getRecentLocations(),
    getUserFcmtokens(),
  ]);
  const locationsUsers = await getLocationsUsers(recentLocations);
  const locationsAlerts: LocationsAlerts = {};

  for (const [key] of Object.entries(locationsUsers)) {
    const { lat, lon } = getLatLonFromKey(key);
    const oneCallData = await fetchOneCall(lat, lon);
    if (oneCallData?.alerts) {
      locationsAlerts[key] = oneCallData.alerts;
    }
  }

  const userAlerts = getUserAlerts(recentLocations, locationsAlerts);

  Object.entries(userAlerts).forEach(([userUid, locationsAlerts]) => {
    const userToken = userFcmTokens[userUid];
    if (userToken) {
      info("locationsAlerts", locationsAlerts);
      locationsAlerts.forEach(({ location, alerts }) => {
        alerts.forEach((_alert) => {
          info("alert", _alert);
          const message = {
            token: userToken,
            notification: {
              title: `${_alert.event} in ${location.name}`,
              body: `${_alert.description} - ${formatTs(
                _alert.start
              )} to ${formatTs(_alert.end)} - ${_alert.sender_name}`,
            },
            webpush: {
              fcmOptions: {
                link: "https://weather-wardrobe-wizard.netlify.app/",
              },
            },
          };
          try {
            admin.messaging().send(message);
          } catch (err) {
            error(err);
          }
        });
      });
    } else {
      info(`No FCM token found for userUid: ${userUid}`);
    }
  });
}

export const sendWeatherAlerts = onSchedule(
  {
    schedule: `every ${jobTimerMinutes} minutes`,
  },
  async (event) => {
    return handleWeatherAlerts();
  }
);

export const sendWeatherAlertsHttp = onRequest(async (req, res) => {
  if (isEmulator) {
    try {
      await handleWeatherAlerts();
      res.send("Sent weather alerts");
    } catch (err) {
      error(err);
      res.send("Error sending weather alerts");
    }
  } else {
    res.send("Only works in emulator mode");
  }
});

export const aiSuggestions = onCall(
  {
    enforceAppCheck: true,
    cors: [
      "https://weather-wardrobe-wizard.netlify.app",
      "http://localhost:3000",
    ],
  },
  async (request) => {
    authGuard(request);
    await roleGuard(request, "premium");

    const { forecast, locationName, countryName } = request.data;

    if (!forecast) {
      throw new HttpsError("invalid-argument", "No forecast provided.");
    }

    if (!locationName) {
      throw new HttpsError("invalid-argument", "No location name provided.");
    }

    const fullLocation = `${locationName}${
      countryName ? ` (${countryName})` : ""
    }`;

    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: `I am going on a trip to ${fullLocation}. Suggest appropriate clothing and offer useful information relative to what items to pack, based on the location, the period of the year, and the weather forecast:\n\nLocation: ${fullLocation}\n\nSummarized weather forecast data:\n\n${JSON.stringify(
              forecast
            )}\n\n(temperature is in Celsius, humidity is in %, wind speed is in meters per second)`,
          },
        ],
      });

      return completion.data.choices[0].message;
    } catch (err) {
      error(err);
      throw new HttpsError("internal", "Failed to process request");
    }
  }
);
