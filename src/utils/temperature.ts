export function kelvinToCelsius(kelvin: number) {
  return kelvin - 273.15;
}

export function parseTemp(temp: number) {
  return Math.round(temp);
}

export function cToF(temp: number) {
  return Math.round((temp * 9) / 5 + 32);
}

export function getTStr(temp: number, units = "metric"): string {
  const symbol = units === "metric" ? "°C" : "°F";
  const t = units === "metric" ? temp : cToF(temp);
  return `${t}${symbol}`;
}
