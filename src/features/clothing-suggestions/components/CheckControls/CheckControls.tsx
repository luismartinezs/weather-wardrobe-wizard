import { useCallback } from "react";

import { Button, Flex } from "@chakra-ui/react";

import useStore from "@/store";
import type { FilterType } from "@/features/clothing-suggestions/store/checkedClothingItems";
import { useCheckedClothingItems } from "@/features/clothing-suggestions/hooks/useCheckedClothingItems";
import { useTranslation } from "next-i18next";

const buttonStaticProps = {
  variant: "ghost",
  size: "sm",
  fontWeight: "thin",
};

const CheckControls = (): JSX.Element => {
  const { t } = useTranslation();
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
      <Button {...buttonProps("all")}>{t("show_all")}</Button>
      <Button {...buttonProps("checked")}>{t("show_checked")}</Button>
      <Button {...buttonProps("unchecked")}>{t("show_unchecked")}</Button>
      <Button
        onClick={() => setCheckedClothingItems([])}
        {...buttonStaticProps}
      >
        {t("uncheck_all")}
      </Button>
    </Flex>
  );
};

export default CheckControls;
