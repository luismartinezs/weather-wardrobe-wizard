import { Immutable } from 'immer';
import { StateCreator } from 'zustand';

import { LocationSuggestion } from '@/types/weatherApi';

export type SelectedLocationState = Immutable<{
  selectedLocation: LocationSuggestion | null
  setSelectedLocation: (location: LocationSuggestion) => void
}>

export const selectedLocationSlice: StateCreator<SelectedLocationState> = (set) => ({
  selectedLocation: null,
  setSelectedLocation: (selectedLocation: LocationSuggestion) => set({ selectedLocation }),
})