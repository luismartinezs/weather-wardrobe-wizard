import useStore from "@/store";
import { LocationSuggestion } from "@/features/location/types";
import { fetchErrorHandler } from "@/utils/dataFetch";
import { getFiveDayForecast } from "@/utils/weather";
import { format } from "date-fns";
import { useQuery } from "react-query";

const QUERY_KEY = "getWeatherForecast";

function fetchWeatherForecast(
  location: LocationSuggestion | null
): Promise<any> | undefined {
  if (!location) {
    return;
  }
  return fetchErrorHandler({
    url: `/api/weather-forecast?lat=${location.lat}&lon=${location.lon}`,
    errorMessage: "There was an error trying to fetch weather report",
  });
}

export const useWeatherForecast = () => {
  const selectedLocation = useStore((state) => state.selectedLocation);

  const query = useQuery<any, Error>(
    [
      QUERY_KEY,
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
