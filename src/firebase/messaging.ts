import { MessagePayload, getToken, onMessage } from "firebase/messaging";

import { messaging } from "@/firebase/app";

export const requestForToken = () => {
  if (!messaging) {
    return;
  }
  return getToken(messaging, {
    vapidKey:
      "BHh6Lv-rWQFHdDnhleIUVheS635vld8q5s6eToPWzu7u2acptS40j35_zS5gevN6EaG6epo4pSoh496_aEUSka4",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.error("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = (
  handler: (payload: MessagePayload) => void
) => {
  if (!messaging) {
    return;
  }
  return onMessage(messaging, (payload) => {
    console.log("payload", payload);
    handler(payload);
  });
};
