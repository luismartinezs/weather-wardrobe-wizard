import useStore from "@/store";
import { LocationSuggestion } from "@/types/weatherApi";
import { fetchErrorHandler } from "@/util/dataFetch";
import { getFiveDayForecast } from "@/util/weather";
import { format } from "date-fns";
import { useQuery } from "react-query";

function fetchWeatherForecast(
  location: LocationSuggestion | null
): Promise<any> | undefined {
  if (!location) {
    return;
  }
  return fetchErrorHandler(
    `/api/weather-forecast?lat=${location.lat}&lon=${location.lon}`,
    "There was an error trying to fetch weather report"
  );
}

export const useWeatherForecast = () => {
  const selectedLocation = useStore((state) => state.selectedLocation);

  const query = useQuery<any, Error>(
    [
      "getWeatherForecast",
      `${selectedLocation?.lat}${selectedLocation?.lon}${format(
        new Date(),
        "MM/dd/yyyy"
      )}`,
    ],
    () => {
      return fetchWeatherForecast(selectedLocation);
    },
    {
      enabled: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  return {
    forecast: getFiveDayForecast(query.data),
    ...query,
  };
};
