import { createContext, useContext } from "react";
import { app, auth, db } from "@/firebase/app"; // Or wherever your firebase.js file is
import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";

export const FirebaseContext = createContext<{
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}>({
  app,
  auth,
  db,
});

export const FirebaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <FirebaseContext.Provider value={{ app, auth, db }}>
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
