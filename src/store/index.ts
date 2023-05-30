import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { unitsSlice, UnitsState } from './units'
import { selectedLocationSlice, type SelectedLocationState } from './selectedLocation'
import { type ClothingItemsState, clothingItemsSlice } from './checkedClothingItems'
import { userSlice, type UserState } from './user'

export type StoreState = UnitsState & ClothingItemsState & SelectedLocationState & UserState

type _StateCreator<T> = StateCreator<StoreState, [], [], T>

const store: _StateCreator<StoreState> = (...a) => ({ ...unitsSlice(...a), ...clothingItemsSlice(...a), ...selectedLocationSlice(...a), ...userSlice(...a) })

const useStore = create(devtools(persist(store, {
  name: 'weather-wardrobe-wizard-store',
  partialize: state => ({ units: state.units, checkedClothingItems: state.checkedClothingItems, filter: state.filter, user: state.user })
})))

export default useStore
export {
  useStore,
}