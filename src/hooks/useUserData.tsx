import { useCallback, useMemo } from "react";

import { useUser } from "@/context/User";
import { useDocument } from "@/hooks/useDocument";
import {
  DEFAULT_UNITS,
  UserData,
  getUserDataRef,
  updateUserDocument,
} from "@/firebase/firestore/user";

export const useUserData = () => {
  const { user } = useUser();
  const ref = useMemo(() => {
    if (!user?.uid) return;
    return getUserDataRef(user.uid);
  }, [user?.uid]);
  const onSnapshotDataHandler = useCallback(async (data: UserData) => {
    if (!data.units) {
      updateUserDocument(data.uid, { units: DEFAULT_UNITS });
    }
    if (!data.checkedClothingItems) {
      updateUserDocument(data.uid, { checkedClothingItems: [] });
    }
  }, []);

  return useDocument<UserData>(ref, onSnapshotDataHandler);
};