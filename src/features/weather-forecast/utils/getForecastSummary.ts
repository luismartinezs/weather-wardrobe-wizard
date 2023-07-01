import { WeatherForecast } from "@/features/weather-forecast/types";

export type ForecastSummary = {
  maxTemp: number;
  minTemp: number;
  startDate: string;
  endDate: string;
  maxHumidity: number;
  maxWindSpeed: number;
  weatherTypes: string[];
};

export function getForecastSummary(
  forecast: WeatherForecast[]
): ForecastSummary {
  const initSummary = {
    maxTemp: -Infinity,
    minTemp: Infinity,
    startDate: "",
    endDate: "",
    maxHumidity: 0,
    maxWindSpeed: 0,
    weatherTypes: [] as string[],
  };

  initSummary.startDate = forecast[0].date;
  initSummary.endDate = forecast[forecast.length - 1].date;
  const computedSummary = forecast.reduce((sum, daily) => {
    sum.maxTemp = Math.max(sum.maxTemp, daily.maxTemp);
    sum.minTemp = Math.min(sum.minTemp, daily.minTemp);
    sum.maxHumidity = Math.max(sum.maxHumidity, daily.maxHumidity);
    sum.maxWindSpeed = Math.max(sum.maxWindSpeed, daily.maxWindSpeed);
    sum.weatherTypes.push(...daily.weatherTypes);
    return sum;
  }, initSummary);
  computedSummary.weatherTypes = [...new Set(computedSummary.weatherTypes)];

  return computedSummary;
}
