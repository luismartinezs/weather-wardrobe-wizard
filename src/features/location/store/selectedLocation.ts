import { Immutable } from "immer";
import { StateCreator } from "zustand";

import { LocationSuggestion } from "@/features/location/types";

export type SelectedLocationState = Immutable<{
  selectedLocation: LocationSuggestion | null;
  setSelectedLocation: (location: LocationSuggestion) => void;
  locationQuery: string;
  setLocationQuery: (query: string) => void;
  isLocationSelected: boolean;
  setIsLocationSelected: (isLocationSelected: boolean) => void;
  resetLocation: () => void;
}>;

const initialState = {
  selectedLocation: null,
  locationQuery: "",
  isLocationSelected: false,
};

export const selectedLocationSlice: StateCreator<SelectedLocationState> = (
  set
) => ({
  ...initialState,
  setSelectedLocation: (selectedLocation: LocationSuggestion) =>
    set({ selectedLocation }),
  setLocationQuery: (locationQuery: string) => set({ locationQuery }),
  setIsLocationSelected: (isLocationSelected: boolean) =>
    set({ isLocationSelected }),
  resetLocation: () => set(initialState),
});
