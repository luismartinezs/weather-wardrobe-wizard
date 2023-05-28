// src/firebase/firestore.ts
import { getFirestore, doc, getDoc, setDoc, connectFirestoreEmulator } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import { type User } from "firebase/auth";

const db = getFirestore(firebase_app);
if (process.env.NEXT_PUBLIC_FIREBASE_EMULATOR !== undefined && process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === 'true') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

interface UserData {
  uid: string;
}

export async function getUserDocument(user: User): Promise<UserData> {
  const userDocRef = doc(db, 'users', user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    await setDoc(userDocRef, {
      uid: user.uid
    });
  }

  return userDocSnap.data() as UserData
}

export async function updateUserDocument(uid: string, data: Partial<UserData>): Promise<void> {
  const userDocRef = doc(db, 'users', uid);
  await setDoc(userDocRef, data, { merge: true });
}
