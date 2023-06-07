import { type User } from "firebase/auth";
import { getDocumentsByUserUid, addDocument, editDocument } from "@/firebase/firestore/api";

export type UserData = {
  uid: string;
}

const USERS = 'users';

export async function handleUserDocument(user: User): Promise<UserData | null> {
  const userDataDocs = await getDocumentsByUserUid(USERS, user.uid);

  if (!userDataDocs) {
    const userDocRef = await addDocument(USERS, {
      uid: user.uid
    });

    return userDocRef ? { uid: user.uid } : null;
  }

  if (userDataDocs.length > 1) {
    console.warn(`More than one user document found for user with UID: ${user.uid}`);
  }

  return userDataDocs[0].data as UserData;
}

export async function updateUserDocument(uid: string, data: Partial<UserData>): Promise<void> {
  await editDocument(USERS, uid, data);
}
