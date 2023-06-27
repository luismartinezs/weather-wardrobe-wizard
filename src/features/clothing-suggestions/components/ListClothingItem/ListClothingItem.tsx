import type { ClothingItem as TClothingItem } from "@/features/clothing-suggestions/types";
import { Checkbox, ListItem, useId, Text } from "@chakra-ui/react";

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
  const labelId = useId();

  return (
    <ListItem
      bg="hsl(219, 25%, 18%)"
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
      >
        <Text ml={2} id={labelId} color={checked ? "gray.500" : "gray.100"}>
          {item.label}
        </Text>
      </Checkbox>
    </ListItem>
  );
};

export default ListClothingItem;
