import { useEffect, useState } from "react";
import {
  DocumentReference,
  DocumentSnapshot,
  FirestoreError,
  onSnapshot,
} from "firebase/firestore";

type OnSnapshotHandler<T> = (snapshot: DocumentSnapshot<T>) => void;
type OnErrorHandler = (error: FirestoreError) => void;

export function useFirestoreRef<T>(
  ref: DocumentReference<T>,
  onSnapshotHandler: OnSnapshotHandler<T>,
  onErrorHandler?: OnErrorHandler
): {
  error: Error | null;
} {
  // NOTE a loading state is not applicable here
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(ref, onSnapshotHandler, (error) => {
      setError(error);
      if (typeof onErrorHandler === "function") {
        onErrorHandler(error);
      }
    });
    return () => unsubscribe();
  }, [ref, onSnapshotHandler, onErrorHandler]);

  return { error };
}
