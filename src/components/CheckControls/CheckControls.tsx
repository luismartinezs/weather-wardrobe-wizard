import useStore from "@/store";
import type { FilterType } from "@/store/checkedClothingItems";
import { Button, HStack } from "@chakra-ui/react";

const buttonStaticProps = {
  variant: "ghost",
  size: "sm",
  fontWeight: "thin",
};

const CheckControls = (): JSX.Element => {
  const setCheckedClothingItems = useStore(
    (state) => state.setCheckedClothingItems
  );
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);

  const handleFilterChange = (filterType: FilterType) => {
    setFilter(filterType);
  };

  const buttonProps = (_filter: FilterType) => ({
    onClick: () => handleFilterChange(_filter),
    textDecor: filter === _filter ? "underline" : "none",
    ...buttonStaticProps,
  });

  return (
    <HStack my={1}>
      <Button {...buttonProps("all")}>Show All</Button>
      <Button {...buttonProps("checked")}>Show Checked</Button>
      <Button {...buttonProps("unchecked")}>Show Unchecked</Button>
      <Button
        onClick={() => setCheckedClothingItems([])}
        {...buttonStaticProps}
      >
        Uncheck all
      </Button>
    </HStack>
  );
};

export default CheckControls;
