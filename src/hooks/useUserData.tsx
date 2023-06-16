import { useMemo } from "react";

import { useUser } from "@/context/User";
import { useDocument } from "@/hooks/useDocument";
import { UserData, getUserDataRef } from "@/firebase/firestore/user";

export const useUserData = () => {
  const { user } = useUser();
  const ref = useMemo(() => {
    if (!user?.uid) return;
    return getUserDataRef(user.uid);
  }, [user?.uid]);
  return useDocument<UserData>(ref);
};
