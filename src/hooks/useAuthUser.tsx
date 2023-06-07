import { useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getUserDocument } from "@/firebase/firestore/user";

import firebase_app from "@/firebase/config";
import useStore from "@/store";

const auth = getAuth(firebase_app);

function useAuthUser() {
  const {
    user,
    setUser,
    userData,
    setUserData,
    loading,
    setLoading,
    error,
    setError,
  } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          setLoading(true);
          const userData = await getUserDocument(firebaseUser);
          setUser(firebaseUser);
          setUserData(userData);
        } catch (err) {
          if (err instanceof Error) {
            setError(err);
          } else {
            setError(new Error("useAuthUser: An unknown error occurred."));
          }
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setUserData, setError, setLoading]);

  const refreshUser = async () => {
    const firebaseUser = auth.currentUser;
    if (firebaseUser) {
      try {
        setLoading(true);
        await firebaseUser.reload();
        const userData = await getUserDocument(firebaseUser);
        setUser(firebaseUser);
        setUserData(userData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("useAuthUser: An unknown error occurred."));
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return { user, userData, loading, error, refreshUser };
}

export { useAuthUser };
