import { WeatherForecast } from "@/features/weather-forecast/types";
import { kelvinToCelsius, parseTemp } from "@/util/temperature";

interface Temperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: Temperature;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  uvi: number;
  rain?: number;
}

export interface Alert {
  sender_name: string;
  event: string;
  start: number; // Assuming Unix timestamp is a number
  end: number; // Assuming Unix timestamp is a number
  description: string;
  tags: string[]; // Assuming "tags" is an array of strings. Update accordingly if different.
}

export interface OneCallData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: Daily[];
  alerts?: Alert[];
}

function getWeatherType(weather: Weather[]): {
  weatherType: string;
  weatherIcon: string;
} {
  if (!weather || weather.length === 0) {
    return {
      weatherType: "Clear",
      weatherIcon: "01d",
    };
  }
  let weatherType: string = "Clear";
  let weatherIcon: string = "01d";
  weather.forEach(({ main, icon }) => {
    if (
      main === "Rain" ||
      main === "Snow" ||
      (main !== "Clear" && weatherType === "Clear")
    ) {
      weatherType = main;
      weatherIcon = icon;
    }
  });
  return {
    weatherType,
    weatherIcon,
  };
}

export function getForecastFromOneCallData(
  data: OneCallData
): WeatherForecast[] | null {
  if (!data || !data.daily) {
    return null;
  }

  return data.daily.map((d) => {
    const weather = getWeatherType(d.weather);
    return {
      date: new Date(d.dt * 1000).toISOString().substring(0, 10),
      avgTemp: parseTemp(kelvinToCelsius(d.temp.day)),
      minTemp: parseTemp(kelvinToCelsius(d.temp.min)),
      maxTemp: parseTemp(kelvinToCelsius(d.temp.max)),
      weatherType: weather.weatherType,
      weatherTypes: d.weather.map((w) => w.main),
      weatherIcon: weather.weatherIcon,
      maxWindSpeed: d.wind_speed,
      maxHumidity: d.humidity,
    };
  });
}
