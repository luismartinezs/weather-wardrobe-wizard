const BASE_DOMAIN = 'http://api.openweathermap.org';
const GEOCODING_PATH = '/geo/1.0/direct';
const WEATHER_FORECAST_PATH = '/data/2.5/forecast';
const ONE_CALL_PATH = '/data/2.5/onecall';
export const getGeocodingUrl = (query: string | string[]) => {
  return `${BASE_DOMAIN}${GEOCODING_PATH}?q=${query}&limit=10`;
}
export const getWeatherForecastUrl = (lat: string | string[], lon: string | string[]) => {
  return `${BASE_DOMAIN}${WEATHER_FORECAST_PATH}?lat=${lat}&lon=${lon}&cnt=40`;
}
export const getOneCallUrl = (lat: string | string[], lon: string | string[]) => {
  return `${BASE_DOMAIN}${ONE_CALL_PATH}?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly`;
}
