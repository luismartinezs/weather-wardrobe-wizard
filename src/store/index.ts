import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { UnitsState, unitsSlice } from './units'
import { clothingSuggestionsSlice, ClothingSuggestionsState } from './clothingSuggestions'

const store: StateCreator<UnitsState & ClothingSuggestionsState> = (...a) => ({ ...unitsSlice(...a), ...clothingSuggestionsSlice(...a) })

const useStore = create(devtools(persist(store, {
  name: 'weather-wardrobe-wizard-store',
})))

export default useStore
export {
  useStore,
}