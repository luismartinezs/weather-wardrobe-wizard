import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { LocationSuggestion } from "@/types/weatherApi";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";

export const useUpdateLocationAndRefetchWeather = () => {
  const setSelectedLocation = useStore((state) => state.setSelectedLocation);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const selectedLocation = useStore((state) => state.selectedLocation);
  const { refetch } = useWeatherForecast();

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
