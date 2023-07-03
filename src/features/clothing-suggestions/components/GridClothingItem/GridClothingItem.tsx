import type { ClothingItem as TClothingItem } from "@/features/clothing-suggestions/types";
import {
  AspectRatio,
  Box,
  Card,
  CardBody,
  Checkbox,
  GridItem,
  Text,
  useId,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";

type ClothingItemProps = {
  item: TClothingItem;
  checked: boolean;
  onChange: () => void;
};

const GridClothingItem = ({
  item,
  checked,
  onChange,
}: ClothingItemProps): JSX.Element => {
  const { t } = useTranslation();
  const labelId = useId();

  return (
    <GridItem minW="100%">
      <Card data-testid="clothing-item" borderRadius="8px">
        <CardBody
          p={{
            base: 3,
            md: 6,
          }}
        >
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
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {t(item.id as string)}
            </Text>
          </Checkbox>
          <Box
            mt={{
              base: 2,
              md: 3,
            }}
            borderRadius="8px"
            overflow="hidden"
          >
            <AspectRatio ratio={1 / 1}>
              <Image
                src={item.imageUrl}
                alt={t(item.id as string)}
                width={300}
                height={300}
                style={{ objectFit: "cover" }}
                priority={false}
              />
            </AspectRatio>
          </Box>
          {/* <Box textAlign="center" mt={4}>
          <AmazonLink url={item.url} />
        </Box> */}
        </CardBody>
      </Card>
    </GridItem>
  );
};

export default GridClothingItem;
