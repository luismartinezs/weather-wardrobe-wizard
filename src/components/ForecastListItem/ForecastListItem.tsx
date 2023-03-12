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

const ForecastListItem = ({
  dayForecast,
}: {
  dayForecast: WeatherForecast;
}): JSX.Element => {
  return (
    <ListItem key={dayForecast.date} my={2} flexGrow={1} flexShrink={1}>
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
            <Text as="span">{dayForecast.avgTemp}C</Text>
          </div>
          <div>
            <Text as="span" color="gray.400">
              Min T:{" "}
            </Text>
            <Text as="span">{dayForecast.minTemp}C </Text>
            <Text as="span" color="gray.500">
              {dayForecast.minTempHour}
            </Text>
          </div>
          <div>
            <Text as="span" color="gray.400">
              Max T:{" "}
            </Text>
            <Text as="span">{dayForecast.maxTemp}C </Text>
            <Text as="span" color="gray.500">
              {dayForecast.maxTempHour}
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
