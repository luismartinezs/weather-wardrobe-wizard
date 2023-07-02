import { createContext, useContext } from "react";
import { app, auth, db } from "@/firebase/app"; // Or wherever your firebase.js file is
import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { useAppCheck } from "../hooks/useAppCheck";

export const FirebaseContext = createContext<{
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  appCheck: ReturnType<typeof useAppCheck>;
}>({
  app,
  auth,
  db,
  appCheck: null,
});

export const FirebaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const appCheck = useAppCheck();

  return (
    <FirebaseContext.Provider value={{ app, auth, db, appCheck }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const firebase = useContext(FirebaseContext);
  if (!firebase) {
    throw new Error("useFirebase must be used within a FirebaseProvider.");
  }
  return firebase;
};
