import {
  DocumentReference,
  FirestoreError,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export function useDocument<T>(
  ref?: DocumentReference,
  onSnapshotDataHandler?: (doc: T) => void
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    setLoading(true);

    if (!ref) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const unsubscribe = onSnapshot(
      ref,
      (doc) => {
        const data = doc.data() as T;
        setData(data);
        if (onSnapshotDataHandler) {
          onSnapshotDataHandler(data);
        }
        setError(null);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [ref, onSnapshotDataHandler]);

  return { data, loading, error };
}
