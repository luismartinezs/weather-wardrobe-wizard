import {
  addDocumentWithId,
  editDocument,
  getDocument,
  getDocumentRef,
} from "@/firebase/firestore/api";
import { ClothingId } from "@/features/clothing-suggestions/utils/clothingMap";
import { DocumentData } from "firebase/firestore";

export type Imperial = "imperial";
export type Metric = "metric";
export type Units = Imperial | Metric;

export const IMPERIAL: Imperial = "imperial";
export const METRIC: Metric = "metric";
export const DEFAULT_UNITS: Units = METRIC;

export type UserData = {
  uid: string;
  email: string;
  units: Units;
  checkedClothingItems: ClothingId[];
};

const COLLECTION_NAME = "users";

export async function addUserDocument(
  userUid: string,
  data: Partial<UserData>
) {
  if (!data.uid) {
    data.uid = userUid;
  }
  await addDocumentWithId(COLLECTION_NAME, userUid, data);
}

export async function updateUserDocument(
  uid: string,
  data: Partial<UserData>
): Promise<void> {
  await editDocument(COLLECTION_NAME, uid, data);
}

export function getUserDataRef<T extends DocumentData = UserData>(
  documentId: string
) {
  return getDocumentRef<T>(COLLECTION_NAME, documentId);
}

export const getUserDataDocument = async (documentId: string) =>
  getDocument<UserData>(COLLECTION_NAME, documentId);
