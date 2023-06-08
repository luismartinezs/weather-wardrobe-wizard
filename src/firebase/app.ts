import { getApps, initializeApp } from "firebase/app";

import { firebaseConfig } from "@/firebase/config";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const emulate = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR !== undefined && process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === 'true';

const auth = getAuth(app);
const db = getFirestore(app);
if (emulate) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export {
  app,
  auth,
  db
}