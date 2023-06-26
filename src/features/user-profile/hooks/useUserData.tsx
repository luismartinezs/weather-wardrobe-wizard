import { useCallback, useMemo } from "react";

import { useUser } from "@/context/User";
import { useDocument } from "@/firebase/hooks/useDocument";
import {
  DEFAULT_UNITS,
  UserData,
  addUserDocument,
  getUserDataRef,
  updateUserDocument,
} from "@/firebase/firestore/user";

export const useUserData = () => {
  const { user } = useUser();
  const ref = useMemo(() => {
    if (!user?.uid) return;
    return getUserDataRef(user.uid);
  }, [user?.uid]);
  const onSnapshotDataHandler = useCallback(
    async (data: UserData) => {
      if (!user?.uid) {
        return;
      }
      if (!data) {
        return addUserDocument(user?.uid, {
          units: DEFAULT_UNITS,
          checkedClothingItems: [],
        });
      }
      if (!data?.uid) {
        return;
      }
      if (!data?.units) {
        updateUserDocument(data.uid, { units: DEFAULT_UNITS });
      }
      if (!data?.checkedClothingItems) {
        updateUserDocument(data.uid, { checkedClothingItems: [] });
      }
    },
    [user]
  );

  return useDocument<UserData>(ref, onSnapshotDataHandler);
};
