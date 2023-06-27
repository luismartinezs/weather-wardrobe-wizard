import type {
  ClothingItem,
  ViewMode,
} from "@/features/clothing-suggestions/types";
import { viewMode } from "@/features/clothing-suggestions/constants";
import { useCheckedClothingItems } from "@/features/clothing-suggestions/hooks/useCheckedClothingItems";
import FlexClothingItem from "../FlexClothingItem";

const ClothingItemAdapter = ({
  item,
  mode,
}: {
  item: ClothingItem;
  mode: ViewMode;
}): JSX.Element => {
  const { checked, checkClothingItem } = useCheckedClothingItems(item.id);

  if (mode === viewMode.flex) {
    return (
      <FlexClothingItem
        item={item}
        checked={!!checked}
        onChange={() => checkClothingItem(item.id)}
      />
    );
  }
  return <></>;
};

export default ClothingItemAdapter;
