import React from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { getUserDocument } from "@/firebase/firestore";

import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);

function useAuthUser() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await getUserDocument(firebaseUser);
        setUser({ ...firebaseUser, ...userData });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}

export { useAuthUser };
