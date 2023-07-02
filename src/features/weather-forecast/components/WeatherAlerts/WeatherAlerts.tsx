import { useOneCall } from "@/features/weather-forecast/hooks/useOneCall";
import WeatherAlert from "../WeatherAlert/WeatherAlert";
import { Flex, List, ListItem, Text } from "@chakra-ui/react";
import useStore from "@/store";
import { useTranslation } from "next-i18next";

const WeatherAlerts = (): JSX.Element => {
  const { t } = useTranslation();
  const { alerts } = useOneCall();
  const selectedLocation = useStore((state) => state.selectedLocation);

  if (!alerts) {
    return <></>;
  }

  return (
    <>
      <Flex align="baseline" gap={2}>
        <Text>
          <Text as="span" color="gray.300">
            {t("alerts_for")}&nbsp;
          </Text>
          <Text as="span" color="primary.200">
            {selectedLocation?.name}
          </Text>
        </Text>
      </Flex>
      <List display="flex" flexDirection="column" gap={1}>
        {alerts
          .sort((a, b) => a.start - b.start)
          .map((alert, index) => (
            <ListItem key={index}>
              <WeatherAlert alert={alert} />
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default WeatherAlerts;
