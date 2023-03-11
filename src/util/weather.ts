import type { WeatherDataItem } from '@/types/weatherApi';
import { format } from 'date-fns';

const getClothingSuggestions = (weatherData: WeatherDataItem) => {
  const { temp, feels_like, humidity } = weatherData.main;
  const { description } = weatherData.weather[0];
  const clothing: string[] = [];
  if (temp >= 80) {
    clothing.push("light t-shirt", "shorts");
  } else if (temp >= 60 && temp < 80) {
    clothing.push("t-shirt", "jeans");
  } else if (temp >= 40 && temp < 60) {
    clothing.push("long-sleeved shirt", "jacket", "jeans");
  } else if (temp >= 20 && temp < 40) {
    clothing.push("heavy coat", "scarf", "hat", "gloves", "boots");
  } else {
    clothing.push("heavy coat", "scarf", "hat", "gloves", "boots");
  }
  if (description.includes("rain")) {
    clothing.push("raincoat");
  }
  if (description.includes("snow")) {
    clothing.push("snow boots");
  }
  return clothing;
};

function parseTemp(temp: number) {
  return Math.round(temp);
}

export interface WeatherForecast {
  date: string,
  avgTemp: number,
  minTemp: number,
  maxTemp: number,
  minTempHour: string,
  maxTempHour: string,
  weatherType: string
}

function getFiveDayForecast(data: any): WeatherForecast[] {
  const forecasts: any[] = data.list;
  const dailyForecasts: WeatherForecast[] = [];
  // get date as 2021-03-01
  const today = format(new Date(), 'yyyy-MM-dd')

  let currentDay: string = '';
  let tempSum: number = 0;
  let minTemp: number = Number.MAX_VALUE;
  let maxTemp: number = Number.MIN_VALUE;
  let hourOfMaxTemp: string = '';
  let hourOfMinTemp: string = '';
  let count: number = 0;
  let weatherType = 'Clear';

  forecasts.forEach(forecast => {
    const date = forecast.dt_txt.substring(0, 10);

    if (date !== currentDay && date !== today) {
      if (currentDay !== '') {
        const avgTemp = tempSum / count;
        dailyForecasts.push({
          date: currentDay,
          avgTemp: parseTemp(avgTemp),
          minTemp: parseTemp(minTemp),
          maxTemp: parseTemp(maxTemp),
          minTempHour: hourOfMinTemp,
          maxTempHour: hourOfMaxTemp,
          weatherType: weatherType
        });
      }

      currentDay = date;
      tempSum = forecast.main.temp;
      minTemp = forecast.main.temp_min;
      maxTemp = forecast.main.temp_max;
      hourOfMaxTemp = forecast.dt_txt.substring(11, 16);
      hourOfMinTemp = hourOfMaxTemp;
      count = 1;
      weatherType = forecast.weather[0].main;
    } else {
      tempSum += forecast.main.temp;
      count++;

      if (forecast.main.temp_min < minTemp) {
        minTemp = forecast.main.temp_min;
        hourOfMinTemp = forecast.dt_txt.substring(11, 16);
      }

      if (forecast.main.temp_max > maxTemp) {
        maxTemp = forecast.main.temp_max;
        hourOfMaxTemp = forecast.dt_txt.substring(11, 16);
      }

      const newWeatherType = forecast.weather[0].main;
      if (newWeatherType === 'Rain' || newWeatherType === 'Snow') {
        weatherType = newWeatherType;
      } else if (newWeatherType !== 'Clear' && weatherType === 'Clear') {
        weatherType = newWeatherType;
      }
    }
  });

  // Add the last day's forecast
  const avgTemp = tempSum / count;
  dailyForecasts.push({
    date: currentDay,
    avgTemp: parseTemp(avgTemp),
    minTemp: parseTemp(minTemp),
    maxTemp: parseTemp(maxTemp),
    minTempHour: hourOfMinTemp,
    maxTempHour: hourOfMaxTemp,
    weatherType: weatherType
  });

  return dailyForecasts;
}


export { getClothingSuggestions, getFiveDayForecast }