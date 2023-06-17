import { useClothingSuggestions } from "@/hooks/useClothingSuggestions";
import useStore from "@/store";
import { ClothingSuggestionWithId } from "@/util/clothingSuggestions";
import { FilterType } from "@/store/checkedClothingItems";
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
