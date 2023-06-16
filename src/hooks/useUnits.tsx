import { useUser } from "@/context/User";
import { METRIC, Units, updateUserDocument } from "@/firebase/firestore/user";
import useStore from "@/store";
import { useEffect, useRef, useState } from "react";

export function useUnits() {
  const { user, userData } = useUser();
  const [units, _setUnits] = useState<Units>(METRIC);
  const setUnits = useRef<(units: Units) => void>(() => null);
  const localUnits = useStore((state) => state.units);
  const setLocalUnits = useStore((state) => state.setUnits);

  useEffect(() => {
    if (userData && user) {
      _setUnits(userData.units);
      setUnits.current = (units: Units) =>
        updateUserDocument(user.uid, { units });
    } else {
      _setUnits(localUnits);
      setUnits.current = setLocalUnits;
    }
  }, [userData, localUnits, user, setLocalUnits]);

  return {
    units,
    setUnits,
  };
}
