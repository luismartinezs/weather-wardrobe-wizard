import { useEffect } from "react";
import { useStore } from "@/store";
import { LocationSuggestion } from "@/types/weatherApi";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";

export const useUpdateLocationAndRefetchWeather = () => {
  const setSelectedLocation = useStore((state) => state.setSelectedLocation);
  const selectedLocation = useStore((state) => state.selectedLocation);
  const { refetch } = useWeatherForecast();

  useEffect(() => {
    refetch();
  }, [refetch, selectedLocation]);

  const updateLocationAndRefetchWeather = (location: LocationSuggestion) => {
    setSelectedLocation(location);
  };

  return { updateLocationAndRefetchWeather };
};
