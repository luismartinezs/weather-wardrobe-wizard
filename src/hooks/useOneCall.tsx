import useStore from "@/store";
import { LocationSuggestion } from "@/types/weatherApi";
import { fetchErrorHandler } from "@/util/dataFetch";
import { getForecastFromOneCallData } from "@/lib/openweather/onecall";
import { format } from "date-fns";
import { useQuery } from "react-query";

function fetchOneCall(
  location: LocationSuggestion | null
): Promise<any> | undefined {
  if (!location) {
    return;
  }
  return fetchErrorHandler(
    `/api/onecall?lat=${location.lat}&lon=${location.lon}`,
    "There was an error trying to fetch weather report"
  );
}

export const useOneCall = () => {
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
    ...query,
  };
};
