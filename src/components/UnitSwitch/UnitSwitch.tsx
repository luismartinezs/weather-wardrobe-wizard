import useStore from "@/store";
import { FormControl, Show, Switch, Text } from "@chakra-ui/react";

const UnitSwitch = (): JSX.Element => {
  const { units, setUnits } = useStore();

  return (
    <FormControl
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      alignItems="center"
      w="fit-content"
      minW="60px"
    >
      <Show above="md">
        <Text as="span" color={units === "metric" ? "white" : "gray.500"}>
          Metric
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
        onChange={() => setUnits(units === "metric" ? "imperial" : "metric")}
        sx={{
          ".chakra-switch__track": {
            bg: "gray.500",
          },
        }}
        isChecked={units === "imperial"}
      />
      <Show above="md">
        <Text as="span" color={units === "imperial" ? "white" : "gray.500"}>
          Imperial
        </Text>
      </Show>
    </FormControl>
  );
};

export default UnitSwitch;
