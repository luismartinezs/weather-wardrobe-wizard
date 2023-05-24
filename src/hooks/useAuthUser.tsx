import React from "react";
import { onAuthStateChanged, getAuth, type User } from "firebase/auth";

import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);

function useAuthUser() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
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
