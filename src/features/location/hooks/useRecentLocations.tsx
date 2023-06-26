import { useMemo } from "react";

import { useUser } from "@/context/User";
import { useDocument } from "@/firebase/hooks/useDocument";
import {
  UserLocationData,
  getRecentLocationRef,
} from "@/firebase/firestore/recentLocations";

export const useRecentLocations = () => {
  const { user } = useUser();
  const ref = useMemo(() => {
    if (!user?.uid) return;
    return getRecentLocationRef<UserLocationData>(user.uid);
  }, [user?.uid]);
  const { data, ...rest } = useDocument<UserLocationData>(ref);

  return {
    recentLocations: data?.locations || [],
    ...rest,
  };
};
