import { format } from 'date-fns';

export interface WeatherForecast {
  date: string,
  avgTemp: number,
  minTemp: number,
  maxTemp: number,
  minTempHour: string,
  maxTempHour: string,
  weatherType: string
  weatherIcon: string
}

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
  let maxTempHour: string = '';
  let minTempHour: string = '';
  let count: number = 0;
  let weatherType: string = 'Clear';
  let weatherIcon: string = '01d';

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
          minTempHour: minTempHour,
          maxTempHour: maxTempHour,
          weatherType: weatherType,
          weatherIcon: weatherIcon
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
      weatherIcon = forecast.weather[0].icon;
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

      const newWeatherType = forecast.weather[0].main;

      if (newWeatherType === 'Rain' || newWeatherType === 'Snow' || (newWeatherType !== 'Clear' && weatherType === 'Clear')) {
        weatherType = newWeatherType;
        weatherIcon = forecast.weather[0].icon;
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
    minTempHour,
    maxTempHour,
    weatherType,
    weatherIcon
  });

  return dailyForecasts;
}


export { getFiveDayForecast }