import { WeatherForecast } from "@/util/weather";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import useStore from "@/store";
import { cToF, convertHour } from "@/util/util";

const ForecastListItem = ({
  dayForecast,
}: {
  dayForecast: WeatherForecast;
}): JSX.Element => {
  const { units } = useStore();

  function getTStr(temp: number): string {
    const symbol = units === "metric" ? "°C" : "°F";
    const t = units === "metric" ? temp : cToF(temp);
    return `${t}${symbol}`;
  }

  return (
    <ListItem key={dayForecast.date} my={2} flexGrow={1}>
      <Card borderRadius="2xl">
        <CardHeader pb={0}>
          <Heading as="h3" fontSize="md">
            {format(new Date(dayForecast.date), "MM/dd/yyyy")}
          </Heading>
        </CardHeader>
        <CardBody pt={4}>
          <div>
            <Text as="span" color="gray.400">
              Average T:{" "}
            </Text>
            <Text as="span">{getTStr(dayForecast.avgTemp)}</Text>
          </div>
          <div>
            <Text as="span" color="gray.400">
              Min T:{" "}
            </Text>
            <Text as="span">{getTStr(dayForecast.minTemp)} </Text>
            <Text as="span" color="gray.500">
              {convertHour(dayForecast.minTempHour)}
            </Text>
          </div>
          <div>
            <Text as="span" color="gray.400">
              Max T:{" "}
            </Text>
            <Text as="span">{getTStr(dayForecast.maxTemp)} </Text>
            <Text as="span" color="gray.500">
              {convertHour(dayForecast.maxTempHour)}
            </Text>
          </div>
          <div>
            <Text as="span" color="gray.400">
              Weather:{" "}
            </Text>
            <Text as="span">{dayForecast.weatherType}</Text>
          </div>
        </CardBody>
      </Card>
    </ListItem>
  );
};

export default ForecastListItem;
