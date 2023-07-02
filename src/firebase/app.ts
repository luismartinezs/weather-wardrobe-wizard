import { getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getMessaging } from "firebase/messaging";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

declare global {
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

import { firebaseConfig } from "@/firebase/config";

const isProd = process.env.NODE_ENV === "production";

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const emulate =
  process.env.NEXT_PUBLIC_FIREBASE_EMULATOR !== undefined &&
  process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === "true";

const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const messaging = typeof window !== "undefined" && getMessaging();

const NEXT_PUBLIC_APP_CHECK_SITE_KEY =
  process.env.NEXT_PUBLIC_APP_CHECK_SITE_KEY || "";

if (!isProd && typeof window !== "undefined") {
  window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(NEXT_PUBLIC_APP_CHECK_SITE_KEY),
  isTokenAutoRefreshEnabled: true,
});

if (emulate) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

export { app, auth, db, functions, messaging, appCheck };
