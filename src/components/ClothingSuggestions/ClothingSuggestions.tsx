import { type WeatherForecast } from "@/util/weather";
import { getClothingSuggestions } from "@/util/clothingSuggestionts";
import { baseTheme, Button, Flex, Heading, HStack } from "@chakra-ui/react";
import ClothingItem from "@/components/ClothingItem";
import { useEffect, useState } from "react";
import produce from "immer";
import useStore from "@/store";
import { useFilteredClothingSuggestions } from "@/store/clothingSuggestions";

type FilterType = "all" | "checked" | "unchecked";

const ClothingSuggestions = ({
  forecast,
}: {
  forecast: WeatherForecast[] | null;
}): JSX.Element => {
  const suggestions = useStore((state) => state.clothingSuggestions);
  const setSuggestions = useStore((state) => state.setClothingSuggestions);
  const checkedItems = useStore((state) => state.checkedClothingSuggestions);
  const setCheckedItems = useStore(
    (state) => state.setCheckedClothingSuggestions
  );
  const checkClothingSuggestion = useStore(
    (state) => state.checkClothingSuggestion
  );
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);
  const filteredItems = useFilteredClothingSuggestions();

  useEffect(() => {
    if (forecast) {
      setSuggestions(getClothingSuggestions(forecast));
    }
  }, [forecast, setSuggestions]);

  const handleCheckboxChange = (index: string) => {
    checkClothingSuggestion(index);
  };

  const handleFilterChange = (filterType: FilterType) => {
    setFilter(filterType);
  };

  if (!forecast) {
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
        <Button
          onClick={() => handleFilterChange("all")}
          variant="ghost"
          size="sm"
          fontWeight="thin"
          textDecor={filter === "all" ? "underline" : "none"}
        >
          Show All
        </Button>
        <Button
          onClick={() => handleFilterChange("checked")}
          variant="ghost"
          size="sm"
          fontWeight="thin"
          textDecor={filter === "checked" ? "underline" : "none"}
        >
          Show Checked
        </Button>
        <Button
          onClick={() => handleFilterChange("unchecked")}
          variant="ghost"
          size="sm"
          fontWeight="thin"
          textDecor={filter === "unchecked" ? "underline" : "none"}
        >
          Show Unchecked
        </Button>
        <Button
          variant="ghost"
          size="sm"
          fontWeight="thin"
          onClick={() => setCheckedItems([])}
        >
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
          <ClothingItem
            key={item.id}
            item={item}
            checked={checkedItems.includes(item.id)}
            onChange={() => handleCheckboxChange(item.id)}
          />
        ))}
      </Flex>
    </>
  );
};

export default ClothingSuggestions;
