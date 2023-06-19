export interface WeatherForecast {
  date: string,
  avgTemp: number,
  minTemp: number,
  maxTemp: number,
  minTempHour: string,
  maxTempHour: string,
  weatherType: string,
  weatherTypes: string[],
  weatherIcon: string,
  maxWindSpeed: number,
  maxHumidity: number
}

function parseTemp(temp: number) {
  return Math.round(temp);
}

function getFiveDayForecast(data: any): WeatherForecast[] | null {
  if (!data || !data.list) {
    return null;
  }
  const forecasts: any[] = data.list;
  const dailyForecasts: WeatherForecast[] = [];
  const now = new Date().getTime();

  let currentDay: string = '';
  let tempSum: number = 0;
  let minTemp: number = Number.MAX_VALUE;
  let maxTemp: number = Number.MIN_VALUE;
  let maxTempHour: string = '';
  let minTempHour: string = '';
  let count: number = 0;
  let weatherType: string = 'Clear';
  let weatherTypes: string[] = [];
  let weatherIcon: string = '01d';
  let maxWindSpeed: number = 0; // %
  let maxHumidity: number = 0; // %

  forecasts.forEach(forecast => {
    const forecastTimestamp = forecast.dt * 1000;
    const date = forecast.dt_txt.substring(0, 10);

    if (date !== currentDay && forecastTimestamp > now) {
      if (currentDay !== '') {
        const avgTemp = tempSum / count;
        dailyForecasts.push({
          date: currentDay,
          avgTemp: parseTemp(avgTemp),
          minTemp: parseTemp(minTemp),
          maxTemp: parseTemp(maxTemp),
          minTempHour,
          maxTempHour,
          weatherType,
          weatherTypes,
          weatherIcon,
          maxWindSpeed,
          maxHumidity
        });
      }

      currentDay = date;
      tempSum = forecast.main.temp;
      minTemp = forecast.main.temp_min;
      maxTemp = forecast.main.temp_max;
      maxTempHour = forecast.dt_txt.substring(11, 16);
      minTempHour = maxTempHour;
      count = 1;
      weatherType = forecast.weather[0].main;
      weatherTypes = [weatherType];
      weatherIcon = forecast.weather[0].icon;
      maxWindSpeed = forecast.wind.speed;
      maxHumidity = forecast.main.humidity;
    } else {
      tempSum += forecast.main.temp;
      count++;

      if (forecast.main.temp_min < minTemp) {
        minTemp = forecast.main.temp_min;
        minTempHour = forecast.dt_txt.substring(11, 16);
      }

      if (forecast.main.temp_max > maxTemp) {
        maxTemp = forecast.main.temp_max;
        maxTempHour = forecast.dt_txt.substring(11, 16);
      }

      if (forecast.wind.speed > maxWindSpeed) {
        maxWindSpeed = forecast.wind.speed;
      }

      if (forecast.main.humidity > maxHumidity) {
        maxHumidity = forecast.main.humidity;
      }

      const newWeatherType = forecast.weather[0].main;

      if (!weatherTypes.includes(newWeatherType)) {
        weatherTypes.push(newWeatherType);
      }

      if (newWeatherType === 'Rain' || newWeatherType === 'Snow' || (newWeatherType !== 'Clear' && weatherType === 'Clear')) {
        weatherType = newWeatherType;
        weatherIcon = forecast.weather[0].icon;
      }
    }
  });

  // NOTE Add the last day's forecast
  const avgTemp = tempSum / count;
  dailyForecasts.push({
    date: currentDay,
    avgTemp: parseTemp(avgTemp),
    minTemp: parseTemp(minTemp),
    maxTemp: parseTemp(maxTemp),
    minTempHour,
    maxTempHour,
    weatherTypes,
    weatherType,
    weatherIcon,
    maxWindSpeed,
    maxHumidity
  });

  return dailyForecasts;
}


export { getFiveDayForecast }