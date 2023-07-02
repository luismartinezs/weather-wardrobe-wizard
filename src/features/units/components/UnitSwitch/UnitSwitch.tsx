import { IMPERIAL, METRIC } from "@/firebase/firestore/user";
import { useUnits } from "@/features/units/hooks/useUnits";
import { FormControl, Show, Switch, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

const UnitSwitch = (): JSX.Element => {
  const { t } = useTranslation();
  const { units, setUnits } = useUnits();

  return (
    <FormControl
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      alignItems="center"
      w="fit-content"
      minW="60px"
    >
      <Show above="md">
        <Text as="span" color={units === METRIC ? "white" : "gray.500"}>
          {t("metric")}
        </Text>
      </Show>
      <Show below="md">
        <Text as="span" color="gray.400" fontSize="sm">
          {units.replace(/^\w/, (c) => c.toUpperCase())}
        </Text>
      </Show>
      <Switch
        id="unitSwitch"
        mx={1}
        aria-label="Toggle units"
        onChange={() => setUnits(units === METRIC ? IMPERIAL : METRIC)}
        sx={{
          ".chakra-switch__track": {
            bg: "gray.500",
          },
        }}
        isChecked={units === IMPERIAL}
        data-testid="unit-switch"
      />
      <Show above="md">
        <Text as="span" color={units === IMPERIAL ? "white" : "gray.500"}>
          {t("imperial")}
        </Text>
      </Show>
    </FormControl>
  );
};

export default UnitSwitch;
