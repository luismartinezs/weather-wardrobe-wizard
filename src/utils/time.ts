import { format } from "date-fns";

export function convertHour(timeString: string) {
  const time = new Date(`2000-01-01T${timeString}:00`);
  const formattedTime = format(time, "h aa");
  return formattedTime;
}

export const formatTs = (ts: number): string => {
  return format(ts * 1000, "Pp");
};
