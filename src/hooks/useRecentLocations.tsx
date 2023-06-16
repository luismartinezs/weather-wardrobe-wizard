import { useMemo } from "react";

import { useUser } from "@/context/User";
import { useCollection } from "@/hooks/useCollection";
import {
  UserLocationData,
  getRecentLocationQuery,
} from "@/firebase/firestore/recentLocations";

export const useRecentLocations = () => {
  const { user } = useUser();
  const query = useMemo(() => {
    if (!user?.uid) return;
    return getRecentLocationQuery(["userUid", "==", user?.uid]);
  }, [user?.uid]);
  const { data, ...rest } = useCollection<UserLocationData>(query);

  if (data.length > 1) {
    console.warn("Unexpected multiple user location data");
  }

  return {
    recentLocations: data[0]?.locations || [],
    ...rest,
  };
};
