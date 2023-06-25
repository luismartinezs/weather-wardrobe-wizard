import { format } from "date-fns";

export const formatTs = (ts: number): string => {
  return format(ts * 1000, "Pp");
};
