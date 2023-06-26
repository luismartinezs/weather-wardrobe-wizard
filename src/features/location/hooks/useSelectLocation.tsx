import { useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import useStore from "@/store";
import { useLocation } from "@/features/location/hooks/useLocation";
import { LocationSuggestion } from "@/types/weatherApi";

export function useSelectLocation() {
  const selectedLocation = useStore((state) => state.selectedLocation);
  const setSelectedLocation = useStore((state) => state.setSelectedLocation);
  const locationQuery = useStore((state) => state.locationQuery);
  const setLocationQuery = useStore((state) => state.setLocationQuery);
  const isLocationSelected = useStore((state) => state.isLocationSelected);
  const setIsLocationSelected = useStore(
    (state) => state.setIsLocationSelected
  );

  useEffect(() => {
    if (selectedLocation?.name) {
      setLocationQuery(selectedLocation.name);
    }
  }, [selectedLocation, setLocationQuery]);

  const {
    data: locationSuggestions,
    isLoading,
    refetch,
    isError,
    error,
  } = useLocation({ locationQuery });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch({ cancelRefetch: true });
    }, 500),
    [refetch]
  );

  const handleLocationChange = (_locationQuery: string) => {
    setIsLocationSelected(false);
    setLocationQuery(_locationQuery);
    if (!_locationQuery || _locationQuery.length < 2) {
      return;
    }
    debouncedRefetch();
  };

  const handleLocationSelection = (item: LocationSuggestion) => {
    setLocationQuery(item.name);
    setIsLocationSelected(true);
    setSelectedLocation(item);
  };

  const handleClearSelectedLocation = () => {
    setIsLocationSelected(false);
    setLocationQuery("");
  };

  return {
    locationQuery,
    locationSuggestions,
    isLoading,
    isLocationSelected,
    handleLocationChange,
    handleClearSelectedLocation,
    handleLocationSelection,
    setLocationQuery,
    setIsLocationSelected,
    isError,
    error,
  };
}
