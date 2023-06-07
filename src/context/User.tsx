import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { handleUserDocument, type UserData } from "@/firebase/firestore/user";
// import { useFirebase } from "@/context/Firebase";
import { auth } from "@/firebase/app";
import { getDocument } from "@/firebase/firestore/api";

export const UserContext = createContext<{
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: Error | null | undefined;
  refreshUser: () => Promise<void>;
}>({
  user: null,
  userData: null,
  loading: false,
  error: null,
  refreshUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // const { auth } = useFirebase();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | undefined>(null);

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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          setLoading(true);
          console.debug("UserProvider: handling user data");
          const userData = await getDocument<UserData>(
            "users",
            firebaseUser.uid
          );
          if (!userData) {
            throw new Error("UserProvider: User data not found.");
          }
          console.debug("UserProvider: user data", userData);
          setUser(firebaseUser);
          setUserData(userData.data);
        } catch (err) {
          handleErrors(err);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [handleErrors]);

  const refreshUser = async () => {
    const firebaseUser = auth.currentUser;
    if (firebaseUser) {
      try {
        setLoading(true);
        await firebaseUser.reload();
        const userData = await handleUserDocument(firebaseUser);
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
      value={{ user, userData, loading, error, refreshUser }}
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
