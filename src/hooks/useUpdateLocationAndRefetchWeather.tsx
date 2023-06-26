import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { LocationSuggestion } from "@/features/location/types";
import { useForecastAdapter } from "@/features/weather-forecast/hooks/useForecastAdapter";

export const useUpdateLocationAndRefetchWeather = () => {
  const setSelectedLocation = useStore((state) => state.setSelectedLocation);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const selectedLocation = useStore((state) => state.selectedLocation);
  const { refetch } = useForecastAdapter();

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
    }
    setShouldRefetch(false);
  }, [refetch, selectedLocation, shouldRefetch, setShouldRefetch]);

  const updateLocationAndRefetchWeather = (location: LocationSuggestion) => {
    setShouldRefetch(true);
    setSelectedLocation(location);
  };

  return { updateLocationAndRefetchWeather };
};
