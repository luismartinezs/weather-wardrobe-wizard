import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import pRetry from "p-retry";

import { type UserData } from "@/firebase/firestore/user";
import { auth } from "@/firebase/app";
import { getDocument } from "@/firebase/firestore/api";

export const UserContext = createContext<{
  idle: boolean;
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: Error | null | undefined;
  refreshUser: () => Promise<void>;
}>({
  idle: true,
  user: null,
  userData: null,
  loading: false,
  error: null,
  refreshUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | undefined>(null);
  const [idle, setIdle] = useState(true);

  const handleErrors = useCallback(
    (err: unknown) => {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("UserProvider: An unknown error occurred."));
      }
    },
    [setError]
  );

  const getUserData = async (user: User) => {
    // NOTE user data is generated on user creation by firebase cloud function using extension rowy/firestore-user-document, retrieval of userData is retried to allow time for the function to complete
    const userData = await pRetry(
      () => getDocument<UserData>("users", user.uid),
      { retries: 3 }
    );
    if (!userData) {
      throw new Error("UserProvider: User data not found.");
    }

    return userData.data;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          setLoading(true);
          const userData = await getUserData(firebaseUser);
          setUser(firebaseUser);
          setUserData(userData);
        } catch (err) {
          handleErrors(err);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
      }
      setIdle(false);
    });

    return () => unsubscribe();
  }, [handleErrors]);

  const refreshUser = async () => {
    const firebaseUser = auth.currentUser;
    if (firebaseUser) {
      try {
        setLoading(true);
        await firebaseUser.reload();
        const userData = await getUserData(firebaseUser);
        setUser(firebaseUser);
        setUserData(userData);
      } catch (err) {
        handleErrors(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{ user, userData, loading, error, idle, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
