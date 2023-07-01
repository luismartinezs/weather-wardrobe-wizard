import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CallableContext } from "firebase-functions/v1/https";

import { CUSTOMERS, SUBSCRIPTIONS } from "../constants";

const handleGetCurrentUserRoles = async (auth: CallableContext["auth"]) => {
  const docRef = admin
    .firestore()
    .collection(CUSTOMERS)
    .doc(auth!.uid)
    .collection(SUBSCRIPTIONS);
  const subscriptions = await docRef.get();
  return subscriptions.docs.map((doc) => doc.data().role);
};

const isProd = process.env.NODE_ENV === "production";

export const appCheckGuard = (context: CallableContext) => {
  if (isProd && context.app == undefined) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called from an App Check verified app."
    );
  }
};

export const authGuard = (context: CallableContext) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }
};

export const roleGuard = async (context: CallableContext, role: string) => {
  const currentUserRoles = await handleGetCurrentUserRoles(context.auth);

  if (!currentUserRoles.includes(role)) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called by a user with role " + role
    );
  }
};
