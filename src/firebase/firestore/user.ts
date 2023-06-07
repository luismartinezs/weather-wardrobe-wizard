import { editDocument } from "@/firebase/firestore/api";

export type UserData = {
  uid: string;
  email: string;
}

const USERS = 'users';

export async function updateUserDocument(uid: string, data: Partial<UserData>): Promise<void> {
  await editDocument(USERS, uid, data);
}
