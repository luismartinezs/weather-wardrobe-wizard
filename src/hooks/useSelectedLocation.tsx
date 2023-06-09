import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import useStore from "@/store";
import { useLocation } from "@/hooks/useLocation";
import { LocationSuggestion } from "@/types/weatherApi";

export function useSelectLocation() {
  const selectedLocation = useStore((state) => state.selectedLocation);
  const setSelectedLocation = useStore((state) => state.setSelectedLocation);

  const [locationQuery, setLocationQuery] = useState(
    selectedLocation?.name || ""
  );

  const {
    data: locationSuggestions,
    isLoading,
    refetch,
    isError,
    error,
  } = useLocation({ locationQuery });

  const [isSelected, setIsSelected] = useState(!!selectedLocation);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch({ cancelRefetch: true });
    }, 500),
    [refetch]
  );

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(false);
    const _locationQuery = e.target.value;
    setLocationQuery(_locationQuery);
    if (!_locationQuery || _locationQuery.length < 2) {
      return;
    }
    debouncedRefetch();
  };

  const handleLocationSelection = (item: LocationSuggestion) => {
    setLocationQuery(item.name);
    setIsSelected(true);
    setSelectedLocation(item);
  };

  return {
    locationQuery,
    locationSuggestions,
    isLoading,
    isSelected,
    handleLocationChange,
    handleLocationSelection,
    setLocationQuery,
    setIsSelected,
    isError,
    error,
  };
}
