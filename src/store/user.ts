import { UserData } from '@/firebase/firestore/user';
import { User } from 'firebase/auth';
import { Immutable } from 'immer';
import { StateCreator } from 'zustand';

type UserError = Error | null | undefined

export type UserState = {
  // NOTE cannot make user immutable because it must be compatible with firebase auth User
  user: User | null
  setUser: (user: User | null) => void
  userData: Immutable<UserData | null>
  setUserData: (userData: UserData | null) => void
  loading: Immutable<boolean>
  setLoading: (loading: boolean) => void
  error: Immutable<UserError>
  setError: (error: UserError) => void
}

export const userSlice: StateCreator<UserState> = (set) => ({
  user: null,
  userData: null,
  setUser: (user: User | null) => set({ user }),
  setUserData: (userData: UserData | null) => set({ userData }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  error: null,
  setError: (error: UserError) => set({ error }),
})