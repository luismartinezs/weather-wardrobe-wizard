import { useEffect, useState } from "react";
import {
  Query,
  FirestoreError,
  onSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export function useCollection<T>(
  query?: Query,
  onSnapshotDataHandler?: (docs: T[]) => void
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    setLoading(true);

    if (!query) {
      setData([]);
      setLoading(false);
      setError(null);
      return;
    }

    const unsubscribe = onSnapshot(
      query,
      (querySnapshot) => {
        const docs: T[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
          const data = doc.data() as T;
          if (data) {
            docs.push(data);
          }
        });
        setData(docs);
        if (onSnapshotDataHandler) {
          onSnapshotDataHandler(docs);
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
  }, [query, onSnapshotDataHandler]);

  return { data, loading, error };
}
