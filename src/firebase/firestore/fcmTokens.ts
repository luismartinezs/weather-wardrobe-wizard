import { DocumentData, serverTimestamp } from "firebase/firestore";

import { addDocumentWithId, getDocumentRef } from "@/firebase/firestore/api";

const COLLECTION_NAME = "fcmTokens";

export type TokenData = {
  token: string;
};

export function setToken(userUid: string, token: string) {
  return addDocumentWithId(COLLECTION_NAME, userUid, {
    token,
    timestamp: serverTimestamp(),
  });
}

export function getTokenRef<T extends DocumentData = TokenData>(
  userUid: string
) {
  return getDocumentRef<T>(COLLECTION_NAME, userUid);
}
