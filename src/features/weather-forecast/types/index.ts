export interface WeatherForecast {
  date: string;
  avgTemp: number;
  minTemp: number;
  maxTemp: number;
  minTempHour?: string;
  maxTempHour?: string;
  weatherType: string;
  weatherTypes: string[];
  weatherIcon: string;
  maxWindSpeed: number;
  maxHumidity: number;
}
