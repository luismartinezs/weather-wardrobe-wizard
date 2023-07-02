import {
  AppCheck,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check";

import { app } from "@/firebase/app";
import { useEffect, useState } from "react";

// const isProd = process.env.NODE_ENV === "production";

declare global {
  interface Window {
    FIREBASE_APPCHECK_DEBUG_TOKEN?: string;
  }
}

export function useAppCheck() {
  const [appCheck, setAppCheck] = useState<AppCheck | null>(null);

  useEffect(() => {
    if (appCheck) {
      return;
    }

    // if (!isProd) {
    //   window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    // }

    if (process.env.NEXT_PUBLIC_E2E === "true") {
      console.log("only e2e");
      console.log(process.env.NEXT_PUBLIC_APP_CHECK_DEBUG_TOKEN_CI);
      // Code to be run during Playwright testing here
      window.FIREBASE_APPCHECK_DEBUG_TOKEN =
        process.env.NEXT_PUBLIC_APP_CHECK_DEBUG_TOKEN_CI;
    }

    setAppCheck(
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(
          process.env.NEXT_PUBLIC_APP_CHECK_SITE_KEY || ""
        ),
        isTokenAutoRefreshEnabled: true,
      })
    );
  }, []);

  return appCheck;
}
