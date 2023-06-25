import fetch from "node-fetch";
import * as admin from "firebase-admin";
import { error, info } from "firebase-functions/logger";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { onRequest } from "firebase-functions/v2/https";

import { RECENT_LOCATIONS, FCM_TOKENS } from "./constants";
import { UserLocationData } from "../../src/firebase/firestore/recentLocations";
import { getOneCallUrl } from "../../src/lib/openweather/urls";

admin.initializeApp();
const db = admin.firestore();

const JOB_TIMER = 60 * 60; // seconds
const jobTimerMinutes = Math.round(JOB_TIMER / 60);
const isEmulator = process.env.FUNCTIONS_EMULATOR === "true";

type RecentLocations = Record<string, any>;
type LocationsUsers = Record<string, string[]>;
type LocationsAlerts = Record<string, any>;
type UserAlerts = Record<string, any>;

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
    return response.json();
  } catch (err) {
    error(err);
  }
}

function getUserAlerts(
  recentLocations: RecentLocations,
  locationsAlerts: LocationsAlerts
): UserAlerts {
  const userAlerts: UserAlerts = {};

  Object.entries(recentLocations).forEach(([userUid, locations]) => {
    userAlerts[userUid] = [];
    locations.forEach(({ lat, lon }: { lat: number; lon: number }) => {
      const locationKey = getKeyFromLatLon(lat, lon);
      if (locationsAlerts[locationKey]) {
        userAlerts[userUid].push(locationsAlerts[locationKey]);
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
    if (oneCallData.alerts) {
      locationsAlerts[key] = oneCallData.alerts;
    }
  }

  const userAlerts = getUserAlerts(recentLocations, locationsAlerts);

  Object.entries(userAlerts).forEach(([userUid, alerts]) => {
    info(`userUid: ${userUid}, alerts: ${alerts}`);
    const userToken = userFcmTokens[userUid];
    info(`userToken: ${userToken}`);
    if (userToken) {
      const message = {
        token: userToken,
        notification: {
          title: "Weather Alert",
          body: "This is a weather alert",
        },
        webpush: {
          fcmOptions: {
            link: "https://dummypage.com",
          },
        },
      };
      try {
        admin.messaging().send(message);
      } catch (err) {
        error(err);
      }
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
    handleWeatherAlerts();
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
