import { useClothingSuggestions } from "@/features/clothing-suggestions/hooks/useClothingSuggestions";
import useStore from "@/store";
import { ClothingSuggestionWithId } from "@/features/clothing-suggestions/utils/clothingSuggestions";
import { FilterType } from "@/features/clothing-suggestions/store/checkedClothingItems";
import { useDataStoreAdapter } from "@/hooks/useDataStoreAdapter";

function getFilteredItems(
  clothingSuggestions: ClothingSuggestionWithId[] | null,
  checkedClothingItems: readonly (string | number)[] | undefined,
  filter: FilterType
) {
  if (!checkedClothingItems) {
    return;
  }
  return clothingSuggestions?.filter((item) => {
    if (filter === "checked") {
      return checkedClothingItems.includes(item.id);
    }
    if (filter === "unchecked") {
      return !checkedClothingItems.includes(item.id);
    }
    return filter === "all";
  });
}

export const useFilteredClothingItems = () => {
  const { clothingSuggestions, ...rest } = useClothingSuggestions();
  const filter = useStore((state) => state.filter);

  return useDataStoreAdapter<
    {
      filteredClothingItems: ClothingSuggestionWithId[] | undefined;
    } & Omit<ReturnType<typeof useClothingSuggestions>, "clothingSuggestions">
  >({
    useClientCallback: () => {
      return {
        filteredClothingItems: useStore((state) => {
          return getFilteredItems(
            clothingSuggestions,
            state.checkedClothingItems,
            state.filter
          );
        }),
        ...rest,
      };
    },
    useServerCallback: (userUid, userData) => {
      return {
        filteredClothingItems: getFilteredItems(
          clothingSuggestions,
          userData?.checkedClothingItems,
          filter
        ),
        ...rest,
      };
    },
  });
};
