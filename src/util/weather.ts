import { format } from 'date-fns';

export interface WeatherForecast {
  date: string,
  avgTemp: number,
  minTemp: number,
  maxTemp: number,
  minTempHour: string,
  maxTempHour: string,
  weatherType: string
}

function areArraysOverlapping<T>(arr1: T[], arr2: T[]) {
  const set = new Set(arr1);

  for (let i = 0; i < arr2.length; i++) {
    if (set.has(arr2[i])) {
      return true;
    }
  }

  return false;
}


/**
 * Inclusive max, exclusive min
 */
function between(x: number, ...ranges: [number, number]) {
  const min = Math.min(...ranges);
  const max = Math.max(...ranges);

  return x > min && x <= max;
}

function getClothingForTemperature(minT: number, maxT: number): string[] {
  const layers = [];

  layers.push("T-shirt");

  if (minT > 25) {
    layers.push("Shorts");
  }
  if (between(minT, 13, 25)) {
    layers.push("Jeans");
  }
  if (minT <= 13) {
    layers.push("Warm pants");
  }
  if (between(minT, 13, 20)) {
    layers.push("Sweater");
  }
  if (between(minT, 7, 13)) {
    layers.push("Jacket");
  }
  if (between(minT, -10, 7)) {
    layers.push("Sweater", "Jacket", "Beanie", "Gloves", "Scarf", "Leggings");
  }
  if (minT <= -10) {
    layers.push("Fleece sweater", "Jacket", "Monkey Cap", "Thin Gloves", "Thick Gloves", "Scarf", "Fleece pants", "Thermal underwear", "Fleece pants", "Thermal socks");
  }

  if (maxT > 25) {
    layers.push('Shorts')
  }

  return [...new Set(layers)];
}

function getClothingForWeather(weatherTypes: string[]): string[] {
  const clothing = []

  if (areArraysOverlapping(weatherTypes, ['Rain', 'Thunderstorm', 'Drizzle'])) {
    clothing.push("Raincoat", "Water-proof shoes");
  }
  if (weatherTypes.includes("Snow")) {
    clothing.push("Snow boots");
  }
  if (
    areArraysOverlapping(weatherTypes, ['Smoke',
      'Dust', 'Sand', 'Ash'
    ])
  ) {
    clothing.push("Face Mask");
  }
  if (weatherTypes.includes("Clear")) {
    clothing.push("Sunglasses");
  }

  return clothing;
}


const getClothingSuggestions = (forecast: WeatherForecast[]): string[] => {
  const { minTemp, maxTemp, weatherTypes } = forecast.reduce((acc, day) => {
    return {
      minTemp: Math.min(acc.minTemp, day.minTemp),
      maxTemp: Math.max(acc.maxTemp, day.maxTemp),
      weatherTypes: new Set([...acc.weatherTypes, day.weatherType])
    }
  }, {
    minTemp: Number.MAX_VALUE,
    maxTemp: Number.MIN_VALUE,
    weatherTypes: new Set<string>()
  });

  return [...getClothingForTemperature(minTemp, maxTemp), ...getClothingForWeather([...weatherTypes])].sort()
};

function parseTemp(temp: number) {
  return Math.round(temp);
}

function getFiveDayForecast(data: any): WeatherForecast[] {
  const forecasts: any[] = data.list;
  const dailyForecasts: WeatherForecast[] = [];
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