import { Immutable } from 'immer';
import { StateCreator } from 'zustand';

import { LocationSuggestion } from '@/types/weatherApi';

export type SelectedLocationState = Immutable<{
  selectedLocation: LocationSuggestion | null
  setSelectedLocation: (location: LocationSuggestion) => void
  locationQuery: string
  setLocationQuery: (query: string) => void
  isLocationSelected: boolean
  setIsLocationSelected: (isLocationSelected: boolean) => void
}>

export const selectedLocationSlice: StateCreator<SelectedLocationState> = (set) => ({
  selectedLocation: null,
  setSelectedLocation: (selectedLocation: LocationSuggestion) => set({ selectedLocation }),
  locationQuery: '',
  setLocationQuery: (locationQuery: string) => set({ locationQuery }),
  isLocationSelected: false,
  setIsLocationSelected: (isLocationSelected: boolean) => set({ isLocationSelected })
})