import { Units } from "@/firebase/firestore/user";
import { Immutable } from "immer";
import { StateCreator } from "zustand";

export type UnitsState = Immutable<{
  units: Units
  setUnits: (units: Units) => void
}>

export const unitsSlice: StateCreator<UnitsState> = (set) => ({
  units: 'metric',
  setUnits: (units: Units) => set({ units }),
})