import { baseTheme, Flex, Heading } from "@chakra-ui/react";
import ClothingItem from "@/features/clothing-suggestions/components/ClothingItem";
import { useFilteredClothingItems } from "@/hooks/useFilteredClothingItems";
import ServerStateDisplayWrapper from "@/components/ServerStateDisplayWrapper";
import CheckControls from "@/components/CheckControls";

const ClothingSuggestions = (): JSX.Element => {
  const { filteredClothingItems, isLoading } = useFilteredClothingItems();

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
      <CheckControls />
      <Flex
        mt={2}
        gap={2}
        flexWrap="nowrap"
        overflowX="auto"
        pb={2}
        sx={{
          "::-webkit-scrollbar": {
            height: "8px",
            borderRadius: "8px",
            backgroundColor: baseTheme.colors.gray[700],
          },
          "::-webkit-scrollbar-track": {
            height: "8px",
            borderRadius: "8px",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: baseTheme.colors.gray[600],
            height: "8px",
            borderRadius: "8px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            backgroundColor: baseTheme.colors.gray[500],
          },
          "::-webkit-scrollbar-thumb:active": {
            backgroundColor: baseTheme.colors.gray[400],
          },
          scrollbarWidth: "auto",
          scrollbarColor: `${baseTheme.colors.gray[600]} ${baseTheme.colors.gray[700]}`,
        }}
        data-testid="clothing-suggestions"
      >
        {filteredClothingItems?.map((item) => (
          <ClothingItem key={item.id} item={item} />
        ))}
      </Flex>
    </ServerStateDisplayWrapper>
  );
};

export default ClothingSuggestions;
