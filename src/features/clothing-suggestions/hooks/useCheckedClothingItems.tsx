import {
  checkClothingItem as _serverCheckClothingItem,
  setCheckedClothingItems,
} from "@/firebase/firestore/checkedClothingItems";
import useStore from "@/store";
import { ClothingId } from "@/features/clothing-suggestions/utils/clothingSuggestions";
import { useDataStoreAdapter } from "@/hooks/useDataStoreAdapter";

export function useCheckedClothingItems(itemId?: ClothingId) {
  return useDataStoreAdapter<{
    checked: boolean | undefined;
    checkClothingItem: (id: ClothingId) => void;
    setCheckedClothingItems: (ids: ClothingId[]) => void;
  }>({
    useClientCallback: () => {
      const checkedClothingItems = useStore(
        (state) => state.checkedClothingItems
      );
      return {
        checked: itemId ? checkedClothingItems.includes(itemId) : undefined,
        checkClothingItem: useStore((state) => state.checkClothingItem),
        setCheckedClothingItems: useStore(
          (state) => state.setCheckedClothingItems
        ),
      };
    },
    useServerCallback: (userUid, userData) => {
      return {
        checked: itemId
          ? userData?.checkedClothingItems?.includes(itemId)
          : undefined,
        checkClothingItem: (id: ClothingId) =>
          _serverCheckClothingItem({
            userUid: userUid,
            id,
            checkedIds: userData?.checkedClothingItems,
          }),
        setCheckedClothingItems: (checkedIds: ClothingId[]) =>
          setCheckedClothingItems({
            userUid,
            checkedIds,
          }),
      };
    },
  });
}
