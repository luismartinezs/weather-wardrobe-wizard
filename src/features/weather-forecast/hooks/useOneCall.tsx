import useStore from "@/store";
import { LocationSuggestion } from "@/features/location/types";
import { fetchErrorHandler } from "@/utils/dataFetch";
import {
  Alert,
  getForecastFromOneCallData,
} from "@/features/weather-forecast/utils/onecall";
import { format } from "date-fns";
import { UseQueryResult, useQuery } from "react-query";
import { WeatherForecast } from "@/features/weather-forecast/types";

function fetchOneCall(
  location: LocationSuggestion | null
): Promise<any> | undefined {
  if (!location) {
    return;
  }
  return fetchErrorHandler({
    url: `/api/onecall?lat=${location.lat}&lon=${location.lon}`,
    errorMessage: "There was an error trying to fetch weather report",
  });
}

export const useOneCall = (): {
  forecast: WeatherForecast[] | null;
  alerts: Alert[] | undefined;
} & UseQueryResult<any, Error> => {
  const selectedLocation = useStore((state) => state.selectedLocation);

  const query = useQuery<any, Error>(
    [
      "getOneCall",
      `${selectedLocation?.lat}${selectedLocation?.lon}${format(
        new Date(),
        "MM/dd/yyyy"
      )}`,
    ],
    () => {
      return fetchOneCall(selectedLocation);
    },
    {
      enabled: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  return {
    forecast: getForecastFromOneCallData(query.data),
    alerts: query.data?.alerts,
    ...query,
  };
};
