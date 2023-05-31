import { type User } from "firebase/auth";
import { getDocument, addDocument, editDocument } from "@/firebase/firestore/api";

export type UserData = {
  uid: string;
}

const USERS = 'users';

export async function getUserDocument(user: User): Promise<UserData | null> {
  const userData = await getDocument(USERS, user.uid);

  if (!userData) {
    const userDocRef = await addDocument(USERS, {
      uid: user.uid
    });

    return userDocRef ? { uid: user.uid } : null;
  }

  return userData.data as UserData;
}

export async function updateUserDocument(uid: string, data: Partial<UserData>): Promise<void> {
  await editDocument(USERS, uid, data);
}
