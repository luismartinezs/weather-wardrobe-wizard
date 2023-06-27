import { Flex, Heading } from "@chakra-ui/react";
import { useFilteredClothingItems } from "@/features/clothing-suggestions/hooks/useFilteredClothingItems";
import ServerStateDisplayWrapper from "@/components/ServerStateDisplayWrapper";
import CheckControls from "@/features/clothing-suggestions/components/CheckControls";
import ClothingViewButton from "@/features/clothing-suggestions/components/ClothingViewButton";
import { useState } from "react";
import ClothingSuggestionsItemsWrapper from "@/features/clothing-suggestions/components/ClothingSuggestionsItemsWrapper";
import { ViewMode } from "@/features/clothing-suggestions/types";
import ClothingItemAdapter from "@/features/clothing-suggestions/components/ClothingItemAdapter";

const ClothingSuggestions = (): JSX.Element => {
  const { filteredClothingItems, isLoading } = useFilteredClothingItems();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const toggleView = () => {
    setViewMode((prev) => (prev === "list" ? "grid" : "list"));
  };

  return (
    <ServerStateDisplayWrapper
      isLoading={isLoading}
      data={filteredClothingItems}
      disableError
      disableLoading
    >
      <Heading
        as="h2"
        fontSize="lg"
        fontWeight="thin"
        textTransform="uppercase"
        letterSpacing={1.2}
      >
        Suggested clothing
      </Heading>
      <Flex justify="space-between" w="100%">
        <CheckControls />
        <ClothingViewButton mode={viewMode} onClick={toggleView} />
      </Flex>
      <ClothingSuggestionsItemsWrapper mode="flex">
        {filteredClothingItems?.map((item) => (
          <ClothingItemAdapter key={item.id} item={item} mode="flex" />
        ))}
      </ClothingSuggestionsItemsWrapper>
    </ServerStateDisplayWrapper>
  );
};

export default ClothingSuggestions;
