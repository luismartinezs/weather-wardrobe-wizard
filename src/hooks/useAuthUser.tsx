import { useCallback, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { handleUserDocument } from "@/firebase/firestore/user";

import { auth } from "@/firebase/app";
import useStore from "@/store";

function useAuthUser() {
  const { setUser, setUserData, setLoading, setError } = useStore();

  const handleErrors = useCallback(
    (err: unknown) => {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("useAuthUser: An unknown error occurred."));
      }
    },
    [setError]
  );

  useEffect(() => {
    console.debug("useAuthUser: subscribing to auth state changes");
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          console.debug("setLoading to true");
          setLoading(true);
          const userData = await handleUserDocument(firebaseUser);
          setUser(firebaseUser);
          setUserData(userData);
        } catch (err) {
          handleErrors(err);
        }
        console.debug("setLoading to false");
        setLoading(false);
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, [setUser, setUserData, handleErrors, setLoading]);

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

  return { refreshUser };
}

export { useAuthUser };
