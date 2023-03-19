import { StateCreator } from "zustand"
import produce, { type Immutable } from "immer"
import { type ClothingSuggestion } from "@/util/clothingSuggestionts"
import { UnitsState } from "./units";
import useStore from ".";

type FilterType = "all" | "checked" | "unchecked";

export type ClothingSuggestionsState = Immutable<{
  clothingSuggestions: ClothingSuggestion[]
  setClothingSuggestions: (clothingSuggestions: ClothingSuggestion[]) => void
  checkedClothingSuggestions: string[]
  checkClothingSuggestion: (index: string) => void
  setCheckedClothingSuggestions: (checkedClothingSuggestions: string[]) => void
  filter: FilterType
  setFilter: (filter: FilterType) => void
}>

export const clothingSuggestionsSlice: StateCreator<UnitsState & ClothingSuggestionsState, [], [], ClothingSuggestionsState> = (set) => ({
  clothingSuggestions: [],
  setClothingSuggestions: (clothingSuggestions: ClothingSuggestion[]) => set(produce((draft) => {
    draft.clothingSuggestions = clothingSuggestions
  }
  )),
  checkedClothingSuggestions: [],
  setCheckedClothingSuggestions: (checkedClothingSuggestions: string[]) => set(produce((draft) => { draft.checkedClothingSuggestions = checkedClothingSuggestions })),
  checkClothingSuggestion: (index: string) => set(produce((draft) => {
    if (draft.checkedClothingSuggestions.includes(index)) {
      draft.checkedClothingSuggestions.splice(draft.checkedClothingSuggestions.indexOf(index), 1);
    } else {
      draft.checkedClothingSuggestions.push(index);
    }
  })),
  filter: 'all',
  setFilter: (filter: 'all' | 'checked' | 'unchecked') => set(produce(draft => {
    draft.filter = filter
  }
  )),
})

export const useFilteredClothingSuggestions = () => {
  return useStore(state => {
    return state.clothingSuggestions.filter((item) => {
      if (state.filter === "all") return true;
      if (state.filter === "checked") return state.checkedClothingSuggestions.includes(item.id);
      if (state.filter === "unchecked") return !state.checkedClothingSuggestions.includes(item.id);
      return false;
    })
  })
}