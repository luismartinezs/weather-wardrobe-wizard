import { checkClothingItem as _serverCheckClothingItem } from "@/firebase/firestore/checkedClothingItems";
import useStore from "@/store";
import { ClothingId } from "@/util/clothingSuggestions";
import { useDataStoreAdapter } from "@/hooks/useDataStoreAdapter";

export function useCheckedClothingItems(itemId: ClothingId) {
  return useDataStoreAdapter<{
    checked: boolean | undefined;
    checkClothingItem: (id: ClothingId) => void;
  }>({
    useClientCallback: () => {
      return {
        checked: useStore((state) => state.checkedClothingItems).includes(
          itemId
        ),
        checkClothingItem: useStore((state) => state.checkClothingItem),
      };
    },
    useServerCallback: (userUid, userData) => {
      return {
        checked: userData?.checkedClothingItems?.includes(itemId),
        checkClothingItem: (id: ClothingId) =>
          _serverCheckClothingItem({
            userUid: userUid,
            id,
            checkedIds: userData?.checkedClothingItems,
          }),
      };
    },
  });
}
