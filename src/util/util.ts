import { format } from "date-fns";

/**
 * Inclusive max, exclusive min
 */
function between(x: number, ...ranges: [number, number]) {
  const min = Math.min(...ranges);
  const max = Math.max(...ranges);

  return x > min && x <= max;
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

function cToF(temp: number) {
  return Math.round((temp * 9) / 5 + 32);
}

function getTStr(temp: number, units = 'metric'): string {
  const symbol = units === "metric" ? "°C" : "°F";
  const t = units === "metric" ? temp : cToF(temp);
  return `${t}${symbol}`;
}

function convertHour(timeString: string) {
  const time = new Date(`2000-01-01T${timeString}:00`);
  const formattedTime = format(time, "h aa");
  return formattedTime;
}

export { between, areArraysOverlapping, cToF, convertHour, getTStr };