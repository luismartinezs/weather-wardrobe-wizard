import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { unitsSlice, UnitsState } from "@/features/units/store/units";
import {
  selectedLocationSlice,
  type SelectedLocationState,
} from "@/features/location/store/selectedLocation";
import {
  type ClothingItemsState,
  clothingItemsSlice,
} from "@/features/clothing-suggestions/store/checkedClothingItems";

export type StoreState = UnitsState &
  ClothingItemsState &
  SelectedLocationState;

type _StateCreator<T> = StateCreator<StoreState, [], [], T>;

const store: _StateCreator<StoreState> = (...a) => ({
  ...unitsSlice(...a),
  ...clothingItemsSlice(...a),
  ...selectedLocationSlice(...a),
});

const useStore = create(
  devtools(
    persist(store, {
      name: "weather-wardrobe-wizard-store",
      partialize: (state) => ({
        units: state.units,
        checkedClothingItems: state.checkedClothingItems,
        filter: state.filter,
      }),
    })
  )
);

export default useStore;
export { useStore };
