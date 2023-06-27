import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Text,
} from "@chakra-ui/react";
import { type Alert as TAlert } from "@/features/weather-forecast/utils/onecall";
import { formatTs } from "@/utils/time";

const WeatherAlert = ({ alert }: { alert: TAlert }): JSX.Element => {
  return (
    <Alert status="info" borderRadius="8px">
      <AlertIcon />
      <Flex flexDirection="column" align="start" justify="center">
        <AlertTitle>{alert.event}</AlertTitle>
        <AlertDescription>
          <Text as="span">{alert.description}&nbsp;</Text>
          <Text as="span" fontSize="sm" color="gray.400">
            From {formatTs(alert.start)} to {formatTs(alert.end)}.&nbsp;
          </Text>
          <Text as="span" fontSize="sm" color="gray.400">
            {alert.sender_name}
          </Text>
        </AlertDescription>
      </Flex>
    </Alert>
  );
};

export default WeatherAlert;
