import type { ClothingItem as TClothingItem } from "@/features/clothing-suggestions/types";
import {
  Checkbox,
  ListItem,
  useId,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

type ClothingItemProps = {
  item: TClothingItem;
  checked: boolean;
  onChange: () => void;
};

const ListClothingItem = ({
  item,
  checked,
  onChange,
}: ClothingItemProps): JSX.Element => {
  const { colorMode } = useColorMode();
  const label = useColorModeValue(
    checked ? "gray.500" : "gray.900",
    checked ? "gray.500" : "gray.100"
  );
  const checkboxBorderColor = useColorModeValue("gray.400", "gray.600");
  const { t } = useTranslation();
  const labelId = useId();
  const isLight = colorMode === "light";

  return (
    <ListItem
      bg={isLight ? "hsl(219, 50%, 90%)" : "hsl(219, 25%, 18%)"}
      py={2}
      px={3}
      borderRadius="8px"
      data-testid="clothing-item"
    >
      <Checkbox
        isChecked={checked}
        onChange={onChange}
        aria-labelledby={labelId}
        size="lg"
        display="flex"
        w="100%"
        borderColor={checkboxBorderColor}
      >
        <Text ml={2} id={labelId} color={label}>
          {t(item.id as string)}
        </Text>
      </Checkbox>
    </ListItem>
  );
};

export default ListClothingItem;
