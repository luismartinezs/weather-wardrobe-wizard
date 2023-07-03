import {
  Card,
  useId,
  Checkbox,
  CardBody,
  Text,
  Box,
  AspectRatio,
} from "@chakra-ui/react";
import Image from "next/image";
// import AmazonLink from "@/components/AmazonLink";
import type { ClothingItem as TClothingItem } from "@/features/clothing-suggestions/types";
import { useTranslation } from "next-i18next";

const size = {
  w: "340px",
};

type ClothingItemProps = {
  item: TClothingItem;
  checked: boolean;
  onChange: () => void;
};

const FlexClothingItem = ({
  item,
  checked,
  onChange,
}: ClothingItemProps): JSX.Element => {
  const { t } = useTranslation();
  const labelId = useId();

  return (
    <Card minW={size.w} w={size.w} maxW={size.w} data-testid="clothing-item">
      <CardBody>
        <Checkbox
          isChecked={checked}
          onChange={onChange}
          aria-labelledby={labelId}
          size="lg"
          display="flex"
          w="100%"
          sx={{
            ".chakra-checkbox__control": {
              position: "absolute",
            },
            ".chakra-checkbox__label": {
              width: "100%",
              margin: "0 2em",
            },
          }}
        >
          <Text
            id={labelId}
            textAlign="center"
            textTransform="uppercase"
            fontWeight="thin"
          >
            {t(item.id as string)}
          </Text>
        </Checkbox>
        <Box mt={4} borderRadius={5} overflow="hidden">
          <AspectRatio maxW="300px" ratio={1 / 1}>
            <Image
              src={item.imageUrl}
              alt={t(item.id as string)}
              width={300}
              height={300}
              style={{ objectFit: "cover" }}
            />
          </AspectRatio>
        </Box>
        {/* <Box textAlign="center" mt={4}>
          <AmazonLink url={item.url} />
        </Box> */}
      </CardBody>
    </Card>
  );
};

export default FlexClothingItem;
