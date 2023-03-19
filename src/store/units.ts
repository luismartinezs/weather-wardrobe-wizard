import { StateCreator } from "zustand"
import type { Immutable } from 'immer'
import type { ClothingSuggestionsState } from "./clothingSuggestions";

type Units = 'metric' | 'imperial'

export type UnitsState = Immutable<{
  units: Units
  setUnits: (units: Units) => void
}>

export const unitsSlice: StateCreator<UnitsState & ClothingSuggestionsState, [], [], UnitsState> = (set) => ({
  units: 'metric',
  setUnits: (units: Units) => set({ units }),
})