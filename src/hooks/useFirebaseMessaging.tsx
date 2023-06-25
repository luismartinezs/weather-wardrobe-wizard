import { useEffect, useState } from "react";
import { MessagePayload, getToken, onMessage } from "firebase/messaging";

import { useUser } from "@/context/User";
import { messaging } from "@/firebase/app";
import { setToken } from "@/firebase/firestore/fcmTokens";

export function useFirebaseMessaging(
  onMessageHandler?: (payload: MessagePayload) => void
) {
  const { user } = useUser();
  const [currentToken, setCurrentToken] = useState<string | null>(null);

  useEffect(() => {
    if (user?.uid && messaging) {
      getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      })
        .then((_token) => {
          setCurrentToken(_token);
          setToken(user.uid, _token);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    if (messaging) {
      unsub = onMessage(messaging, (payload) => {
        console.debug("Message received. ", payload);
        if (onMessageHandler) {
          onMessageHandler(payload);
        }
      });
    }
    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [onMessageHandler]);

  return { token: currentToken };
}
