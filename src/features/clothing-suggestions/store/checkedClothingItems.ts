import { produce, Immutable } from "immer";
import type { ClothingId } from "@/features/clothing-suggestions/utils/clothingMap";
import { StateCreator } from "zustand";

export type FilterType = "all" | "checked" | "unchecked";

export type ClothingItemsState = Immutable<{
  checkedClothingItems: ClothingId[];
  checkClothingItem: (index: ClothingId) => void;
  setCheckedClothingItems: (checkedClothingItems: ClothingId[]) => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}>;

export const clothingItemsSlice: StateCreator<ClothingItemsState> = (set) => ({
  checkedClothingItems: [],
  setCheckedClothingItems: (checkedClothingItems: ClothingId[]) =>
    set({ checkedClothingItems: checkedClothingItems }),
  checkClothingItem: (index: ClothingId) =>
    set(
      produce((draft) => {
        if (draft.checkedClothingItems.includes(index)) {
          draft.checkedClothingItems.splice(
            draft.checkedClothingItems.indexOf(index),
            1
          );
        } else {
          draft.checkedClothingItems.push(index);
        }
      })
    ),
  filter: "all",
  setFilter: (filter: "all" | "checked" | "unchecked") => set({ filter }),
});
