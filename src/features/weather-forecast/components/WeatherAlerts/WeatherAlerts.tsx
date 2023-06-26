import { useOneCall } from "@/features/weather-forecast/hooks/useOneCall";
import WeatherAlert from "../WeatherAlert/WeatherAlert";
import { Flex, List, ListItem, Text } from "@chakra-ui/react";
import useStore from "@/store";

const WeatherAlerts = (): JSX.Element => {
  const { alerts } = useOneCall();
  const selectedLocation = useStore((state) => state.selectedLocation);

  if (!alerts) {
    return <></>;
  }

  return (
    <>
      <Flex align="baseline" gap={2}>
        <Text as="span" color="gray.300">
          Weather alerts for
        </Text>
        <Text as="span" color="primary.200">
          {selectedLocation?.name}
        </Text>
      </Flex>
      <List display="flex" flexDirection="column" gap={1}>
        {alerts
          .sort((a, b) => a.start - b.start)
          .map((alert) => (
            <ListItem key={alert.start}>
              <WeatherAlert alert={alert} />
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default WeatherAlerts;
