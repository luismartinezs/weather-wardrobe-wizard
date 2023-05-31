import { UserData } from '@/firebase/firestore';
import { User } from 'firebase/auth';
import { Immutable } from 'immer';
import { StateCreator } from 'zustand';

export type UserState = {
  // NOTE cannot make user immutable because it must be compatible with firebase auth User
  user: User | null
  userData: Immutable<UserData | null>
  setUser: (user: User | null) => void
  setUserData: (userData: UserData | null) => void
}

export const userSlice: StateCreator<UserState> = (set) => ({
  user: null,
  userData: null,
  setUser: (user: User | null) => set({ user }),
  setUserData: (userData: UserData | null) => set({ userData }),
})