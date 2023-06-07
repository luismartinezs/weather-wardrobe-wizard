import { type User } from "firebase/auth";
import { getDocumentsByUserUid, editDocument } from "@/firebase/firestore/api";

export type UserData = {
  uid: string;
  email: string;
}

const USERS = 'users';

const ongoingUserDocumentOperations: Record<string, any> = {};

export async function handleUserDocument(user: User): Promise<UserData | null> {
  // HACK to prevent double document creation, possibly a better alternative is to use a cloud function to handle this
  if (ongoingUserDocumentOperations[user.uid]) {
    console.log(`User document operation already ongoing for user with UID: ${user.uid}`);
    return null;
  }

  ongoingUserDocumentOperations[user.uid] = true;

  try {
    const userDataDocs = await getDocumentsByUserUid(USERS, user.uid);
    console.debug(`User data documents found for user with UID: ${user.uid}`, userDataDocs);

    if (!userDataDocs || userDataDocs.length === 0) {
      // const newUserData = {
      //   userUid: user.uid
      // };
      // const userDocRef = await addDocument(USERS, newUserData);

      // console.debug(`User document created for user with UID: ${user.uid}`, userDocRef);

      // return userDocRef ? newUserData : null;
      return null
    }

    if (userDataDocs.length > 1) {
      console.warn(`More than one user document found for user with UID: ${user.uid}`);
    }

    return userDataDocs[0].data as UserData;

  } catch (err) {
    console.error(`Error while handling user document for user with UID: ${user.uid}`, err);
    return null;
  } finally {
    delete ongoingUserDocumentOperations[user.uid];
  }
}

export async function updateUserDocument(uid: string, data: Partial<UserData>): Promise<void> {
  await editDocument(USERS, uid, data);
}
