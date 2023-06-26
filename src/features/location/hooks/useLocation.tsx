import { useQuery } from "react-query";

import { LocationSuggestion } from "@/features/location/types";
import { fetchErrorHandler } from "@/utils/dataFetch";

function fetchLocationSuggestions(
  query: string
): Promise<LocationSuggestion[]> {
  return fetchErrorHandler(
    `/api/geocoding?query=${query}`,
    "There was an error trying to get location suggestions. Try again."
  );
}

export const useLocation = ({ locationQuery }: { locationQuery: string }) => {
  const query = useQuery<LocationSuggestion[], Error>(
    ["getLocationSuggestions", locationQuery],
    () => fetchLocationSuggestions(locationQuery),
    {
      enabled: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  return {
    locationSuggestions: query.data,
    ...query,
  };
};
