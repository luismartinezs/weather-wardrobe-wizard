import { ClothingId } from "@/util/clothingSuggestions";
import { baseTheme, Button, Flex, Heading, HStack } from "@chakra-ui/react";
import ClothingItem from "@/components/ClothingItem";
import useStore from "@/store";
import { useClothingSuggestions } from "@/hooks/useClothingSuggestions";
import { useFilteredClothingItems } from "@/hooks/useFilteredClothingItems";

type FilterType = "all" | "checked" | "unchecked";

const buttonStaticProps = {
  variant: "ghost",
  size: "sm",
  fontWeight: "thin",
};

const ClothingSuggestions = (): JSX.Element => {
  const suggestions = useClothingSuggestions();
  const setCheckedItems = useStore((state) => state.setCheckedClothingItems);
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);
  const filteredItems = useFilteredClothingItems();

  const handleFilterChange = (filterType: FilterType) => {
    setFilter(filterType);
  };

  const buttonProps = (_filter: FilterType) => ({
    onClick: () => handleFilterChange(_filter),
    textDecor: filter === _filter ? "underline" : "none",
    ...buttonStaticProps,
  });

  if (!filteredItems) {
    return <></>;
  }

  return (
    <>
      <Heading
        as="h2"
        fontSize="lg"
        fontWeight="thin"
        textTransform="uppercase"
        letterSpacing={1.2}
      >
        Suggested clothing
      </Heading>
      <HStack my={1}>
        <Button {...buttonProps("all")}>Show All</Button>
        <Button {...buttonProps("checked")}>Show Checked</Button>
        <Button {...buttonProps("unchecked")}>Show Unchecked</Button>
        <Button onClick={() => setCheckedItems([])} {...buttonStaticProps}>
          Uncheck all
        </Button>
      </HStack>
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
      >
        {filteredItems.map((item) => (
          <ClothingItem key={item.id} item={item} />
        ))}
      </Flex>
    </>
  );
};

export default ClothingSuggestions;
