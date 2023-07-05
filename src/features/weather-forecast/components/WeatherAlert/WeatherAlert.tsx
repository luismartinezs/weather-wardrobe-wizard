import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { type Alert as TAlert } from "@/features/weather-forecast/utils/onecall";
import { formatTs } from "@/utils/time";
import { useTranslation } from "next-i18next";

const WeatherAlert = ({ alert }: { alert: TAlert }): JSX.Element => {
  const { t } = useTranslation();
  const textMuted = useColorModeValue("gray.600", "gray.400");
  return (
    <Alert status="info" borderRadius="8px">
      <AlertIcon />
      <Flex flexDirection="column" align="start" justify="center">
        <AlertTitle>{alert.event}</AlertTitle>
        <AlertDescription>
          <Text as="span">{alert.description}&nbsp;</Text>
          <Text as="span" fontSize="sm" color={textMuted}>
            {t("fromTo", {
              from: formatTs(alert.start),
              to: formatTs(alert.end),
            })}
          </Text>
          <Text as="span" fontSize="sm" color={textMuted}>
            {alert.sender_name}
          </Text>
        </AlertDescription>
      </Flex>
    </Alert>
  );
};

export default WeatherAlert;
