import { useEffect, useState } from "react";
import {
  DocumentData,
  DocumentReference,
  onSnapshot,
} from "firebase/firestore";

type OnSnapshotDataHandler = (docData: DocumentData) => void;

export function useFirestoreRef<T>(
  ref: DocumentReference<T>,
  onSnapshotDataHandler: OnSnapshotDataHandler
): {
  error: Error | null;
} {
  // NOTE a loading state is not applicable here
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      ref,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          onSnapshotDataHandler(docSnapshot.data() as DocumentData);
        }
      },
      (error) => {
        setError(error);
      }
    );
    return () => unsubscribe();
  }, [ref, onSnapshotDataHandler]);

  return { error };
}
