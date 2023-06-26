import { useUser } from "@/features/auth/context/User";
import { Units, updateUserDocument } from "@/firebase/firestore/user";
import useStore from "@/store";

export function useUnits() {
  const { user, userData } = useUser();
  const localUnits = useStore((state) => state.units);
  const setLocalUnits = useStore((state) => state.setUnits);

  const handleSetUnits = (newUnits: Units) => {
    if (user && userData) {
      updateUserDocument(user.uid, { units: newUnits });
    } else {
      setLocalUnits(newUnits);
    }
  };

  return {
    units: user && userData ? userData?.units : localUnits,
    setUnits: handleSetUnits,
  };
}
