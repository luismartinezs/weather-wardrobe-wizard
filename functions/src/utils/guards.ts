import * as admin from "firebase-admin";
import { HttpsError, CallableRequest } from "firebase-functions/v2/https";

import { CUSTOMERS, SUBSCRIPTIONS } from "../constants";

const handleGetCurrentUserRoles = async (auth: CallableRequest["auth"]) => {
  if (!auth) {
    return [];
  }

  const docRef = admin
    .firestore()
    .collection(CUSTOMERS)
    .doc(auth.uid)
    .collection(SUBSCRIPTIONS);
  const subscriptions = await docRef.get();

  return subscriptions.docs.map((doc) => doc.data().role);
};

const isProd = process.env.NODE_ENV === "production";

export const appCheckGuard = (request: CallableRequest) => {
  if (isProd && request.app == undefined) {
    throw new HttpsError(
      "failed-precondition",
      "The function must be called from an App Check verified app."
    );
  }
};

export const authGuard = (request: CallableRequest) => {
  if (!request.auth) {
    throw new HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }
};

export const roleGuard = async (request: CallableRequest, role: string) => {
  const currentUserRoles = await handleGetCurrentUserRoles(request.auth);

  if (!currentUserRoles.includes(role)) {
    throw new HttpsError(
      "failed-precondition",
      "The function must be called by a user with role " + role
    );
  }
};
