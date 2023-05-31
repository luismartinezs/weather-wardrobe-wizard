import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getUserDocument } from "@/firebase/firestore/user";

import firebase_app from "@/firebase/config";
import useStore from "@/store";

const auth = getAuth(firebase_app);

function useAuthUser() {
  const [loading, setLoading] = useState(true);
  const { user, setUser, userData, setUserData } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userData = await getUserDocument(firebaseUser);
        setUserData(userData);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setUserData]);

  const refreshUser = async () => {
    const firebaseUser = auth.currentUser;
    if (firebaseUser) {
      setLoading(true);
      await firebaseUser.reload();
      const userData = await getUserDocument(firebaseUser);
      setUser(firebaseUser);
      setUserData(userData);
      setLoading(false);
    }
  };

  return { user, userData, loading, refreshUser };
}

export { useAuthUser };
