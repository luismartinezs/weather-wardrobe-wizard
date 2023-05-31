import { doc, getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc, DocumentData, DocumentReference, getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import firebase_app from "@/firebase/config";

const db = getFirestore(firebase_app);

if (process.env.NEXT_PUBLIC_FIREBASE_EMULATOR !== undefined && process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === 'true') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

interface FirestoreDocument {
  id: string;
  data: DocumentData;
}

interface FirestoreCollection {
  [key: string]: DocumentData;
}

export async function getDocument(collectionName: string, documentId: string): Promise<FirestoreDocument | null> {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, data: docSnap.data() };
  } else {
    console.log(`No document with ID: ${documentId}`);
    return null;
  }
}

export async function getAllDocuments(collectionName: string): Promise<FirestoreCollection | null> {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);

  if (!snapshot.empty) {
    let allDocs: FirestoreCollection = {};
    snapshot.forEach(doc => {
      allDocs[doc.id] = doc.data();
    });
    return allDocs;
  } else {
    console.log(`No documents found in collection: ${collectionName}`);
    return null;
  }
}

export async function addDocument(collectionName: string, data: DocumentData): Promise<DocumentReference | null> {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef;
  } catch (e) {
    console.error(`Error adding document to ${collectionName}: `, e);
    return null;
  }
}

export async function editDocument(collectionName: string, documentId: string, data: DocumentData): Promise<void> {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, data);
}

export async function deleteDocument(collectionName: string, documentId: string): Promise<void> {
  const docRef = doc(db, collectionName, documentId);
  await deleteDoc(docRef);
}
