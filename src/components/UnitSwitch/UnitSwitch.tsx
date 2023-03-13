import useStore from "@/store";
import { FormControl, Switch, Text } from "@chakra-ui/react";

const UnitSwitch = (): JSX.Element => {
  const { units, setUnits } = useStore();

  return (
    <FormControl display="flex" alignItems="center">
      <Text as="span" color={units === "metric" ? "white" : "gray.500"}>
        Metric
      </Text>
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
      <Text as="span" color={units === "imperial" ? "white" : "gray.500"}>
        Imperial
      </Text>
    </FormControl>
  );
};

export default UnitSwitch;
