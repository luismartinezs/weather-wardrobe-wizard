import { useEffect, useState } from "react";
import { LocationSuggestion } from "@/types/weatherApi";
import { getUserRecentLocations } from "@/firebase/firestore/recentLocations";
import { useUser } from "@/context/User";
import { DocumentData, onSnapshot } from "firebase/firestore";

export const useRecentLocations = () => {
  const { user } = useUser();

  const [recentLocations, setRecentLocations] = useState<LocationSuggestion[]>(
    []
  );
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchRecentLocations = async () => {
      const userLocations = await getUserRecentLocations(user.uid);

      if (userLocations) {
        const { doc, ref } = userLocations;
        setRecentLocations(doc.data.locations);
        setId(doc.id);

        const unsubscribe = onSnapshot(
          ref,
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              const data = docSnapshot.data() as DocumentData;
              if (data && data.locations) {
                setRecentLocations(data.locations);
              }
            }
          },
          (error) => {
            console.error("Error listening for doc changes:", error);
          }
        );

        // Detach the listener when the component unmounts
        return () => unsubscribe();
      }
    };

    try {
      setLoading(true);
      fetchRecentLocations();
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  return { recentLocations, id, loading, error };
};
