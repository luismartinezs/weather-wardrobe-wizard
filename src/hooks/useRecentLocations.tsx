import { useEffect, useState } from "react";
import { LocationSuggestion } from "@/types/weatherApi";
import { getUserRecentLocations } from "@/firebase/firestore/recentLocations";
import { useUser } from "@/context/User";
import { DocumentData, onSnapshot } from "firebase/firestore";

export const useRecentLocations = (): {
  recentLocations: LocationSuggestion[];
  id: string;
} => {
  const { user } = useUser();

  const [recentLocations, setRecentLocations] = useState<LocationSuggestion[]>(
    []
  );
  const [id, setId] = useState("");

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

    fetchRecentLocations();
  }, [user]);

  return { recentLocations, id };
};
