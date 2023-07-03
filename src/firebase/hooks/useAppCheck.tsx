import {
  AppCheck,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check";

import { app } from "@/firebase/app";
import { useEffect, useState } from "react";

// declare global {
//   interface Window {
//     FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean;
//   }
// }

// const isProd = process.env.NODE_ENV === "production";

export function useAppCheck() {
  const [appCheck, setAppCheck] = useState<AppCheck | null>(null);

  useEffect(() => {
    if (appCheck) {
      return;
    }

    // if (!isProd) {
    //   window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    // }

    setAppCheck(
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(
          process.env.NEXT_PUBLIC_APP_CHECK_SITE_KEY || ""
        ),
        isTokenAutoRefreshEnabled: true,
      })
    );
  }, [appCheck]);

  return appCheck;
}
