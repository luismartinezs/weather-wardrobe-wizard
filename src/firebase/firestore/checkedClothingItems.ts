import { ClothingId } from "@/features/clothing-suggestions/utils/clothingSuggestions";
import { updateUserDocument } from "@/firebase/firestore/user";

export function checkClothingItem({
  userUid,
  id,
  checkedIds,
}: {
  userUid?: string;
  id: ClothingId;
  checkedIds?: ClothingId[];
}) {
  if (!userUid || !checkedIds) {
    return;
  }

  let newIds: ClothingId[];

  if (checkedIds.includes(id)) {
    newIds = checkedIds.filter((checkedId) => checkedId !== id);
  } else {
    newIds = [...checkedIds, id];
  }

  updateUserDocument(userUid, { checkedClothingItems: newIds });
}

export function setCheckedClothingItems({
  userUid,
  checkedIds,
}: {
  userUid?: string;
  checkedIds: ClothingId[];
}) {
  if (!userUid) {
    return;
  }

  updateUserDocument(userUid, { checkedClothingItems: checkedIds });
}
