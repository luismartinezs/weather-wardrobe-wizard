import { create, type StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type Units = 'metric' | 'imperial'

interface State {
  units: Units
  setUnits: (units: Units) => void
}

const store: StateCreator<State> = (set) => ({
  units: 'metric',
  setUnits: (units: Units) => set({ units }),
})

const useStore = create<State>()(devtools(persist(store, {
  name: 'unit-storage',
})))

export default useStore
export {
  useStore,
}