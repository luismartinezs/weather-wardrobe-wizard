import { useCallback } from "react";

import { Button, Flex } from "@chakra-ui/react";

import useStore from "@/store";
import type { FilterType } from "@/store/checkedClothingItems";
import { useCheckedClothingItems } from "@/features/clothing-suggestions/hooks/useCheckedClothingItems";

const buttonStaticProps = {
  variant: "ghost",
  size: "sm",
  fontWeight: "thin",
};

const CheckControls = (): JSX.Element => {
  const { setCheckedClothingItems } = useCheckedClothingItems();
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);

  const handleFilterChange = useCallback(
    (filterType: FilterType) => {
      setFilter(filterType);
    },
    [setFilter]
  );

  const buttonProps = (_filter: FilterType) => ({
    onClick: () => handleFilterChange(_filter),
    textDecor: filter === _filter ? "underline" : "none",
    ...buttonStaticProps,
  });

  return (
    <Flex my={1} flexWrap="wrap">
      <Button {...buttonProps("all")}>Show All</Button>
      <Button {...buttonProps("checked")}>Show Checked</Button>
      <Button {...buttonProps("unchecked")}>Show Unchecked</Button>
      <Button
        onClick={() => setCheckedClothingItems([])}
        {...buttonStaticProps}
      >
        Uncheck all
      </Button>
    </Flex>
  );
};

export default CheckControls;
