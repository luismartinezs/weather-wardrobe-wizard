import type {
  ClothingItem,
  ViewMode,
} from "@/features/clothing-suggestions/types";
import { viewMode } from "@/features/clothing-suggestions/constants";
import { useCheckedClothingItems } from "@/features/clothing-suggestions/hooks/useCheckedClothingItems";
import FlexClothingItem from "@/features/clothing-suggestions/components/FlexClothingItem";
import ListClothingItem from "@/features/clothing-suggestions/components/ListClothingItem";
import GridClothingItem from "@/features/clothing-suggestions/components/GridClothingItem";

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
  if (mode === viewMode.grid) {
    return (
      <GridClothingItem
        item={item}
        checked={!!checked}
        onChange={() => checkClothingItem(item.id)}
      />
    );
  }
  return (
    <ListClothingItem
      item={item}
      checked={!!checked}
      onChange={() => checkClothingItem(item.id)}
    />
  );
};

export default ClothingItemAdapter;
