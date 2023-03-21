import { useClothingSuggestions } from "@/hooks/useClothingSuggestions";
import useStore from "@/store";

export const useFilteredClothingItems = () => {
  const { clothingSuggestions } = useClothingSuggestions();

  return useStore((state) => {
    return clothingSuggestions?.filter((item) => {
      if (state.filter === "all") {
        return true;
      }
      if (state.filter === "checked") {
        return state.checkedClothingItems.includes(item.id);
      }
      if (state.filter === "unchecked") {
        return !state.checkedClothingItems.includes(item.id);
      }
      return false;
    });
  });
};
