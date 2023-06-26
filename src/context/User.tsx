import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { type UserData } from "@/firebase/firestore/user";
import { auth } from "@/firebase/app";
import { useUserData } from "@/features/user-profile/hooks/useUserData";

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

const UserDataFetcher = ({
  onUserDataChange,
}: {
  onUserDataChange: (userData: ReturnType<typeof useUserData>) => void;
}) => {
  const userData = useUserData();

  useEffect(() => {
    onUserDataChange(userData);
  }, [userData, onUserDataChange]);

  return null;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [idle, setIdle] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | undefined>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [userDataError, setUserDataError] = useState<Error | null | undefined>(
    null
  );

  const handleUserDataChange = useCallback(
    (newUserData: ReturnType<typeof useUserData>) => {
      setUserDataLoading(newUserData.loading);
      setUserData(newUserData.data);
      setUserDataError(newUserData.error);
    },
    []
  );

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

  useEffect(() => {
    const unsubscribeFromAuthState = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          try {
            setLoading(true);
            setUser(firebaseUser);
          } catch (err) {
            handleErrors(err);
          } finally {
            setLoading(false);
          }
        } else {
          setUser(null);
        }
        setIdle(false);
      }
    );

    return () => {
      unsubscribeFromAuthState();
    };
  }, [handleErrors]);

  const refreshUser = async () => {
    const firebaseUser = auth.currentUser;
    if (firebaseUser) {
      try {
        setLoading(true);
        await firebaseUser.reload();
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
      value={{
        user,
        userData,
        loading: loading || userDataLoading,
        error: error || userDataError,
        idle,
        refreshUser,
      }}
    >
      <UserDataFetcher onUserDataChange={handleUserDataChange} />
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
