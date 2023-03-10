import { LocationSuggestion } from "@/types/weatherApi";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  OrderedList,
  Text,
  baseTheme,
  Flex,
} from "@chakra-ui/react";
import { type WeatherForecast } from "@/util/weather";
import UnitSwitch from "../UnitSwitch";
import ForecastListItem from "@/components/ForecastListItem";
import TemperatureChart from "@/components/TemperatureChart";

const itemWidth = 150;

const ForecastCard = ({
  location,
  forecast,
}: {
  location: LocationSuggestion;
  forecast: WeatherForecast[];
}): JSX.Element => {
  return (
    <Card>
      <CardHeader pb={2}>
        <HStack
          w="100%"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={2}
        >
          <Heading
            as="h2"
            fontSize="lg"
            fontWeight="thin"
            textTransform="uppercase"
            letterSpacing={1.2}
          >
            Daily forecast for{" "}
            <Text as="span" color="primary.200">
              {location.name}
            </Text>
          </Heading>
          <UnitSwitch />
        </HStack>
      </CardHeader>
      <CardBody
        pt={2}
        pb={4}
        px={0}
        position="relative"
        _before={{
          content: "''",
          position: "absolute",
          zIndex: 1,
          left: 0,
          bottom: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0), ${baseTheme.colors.gray[700]})`,
          height: "100%",
          width: "2em",
          borderRadius: "0 0 0 0.5em",
        }}
        _after={{
          content: "''",
          position: "absolute",
          zIndex: 1,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0), ${baseTheme.colors.gray[700]})`,
          height: "100%",
          width: "2em",
          borderRadius: "0 0 0.5em 0",
        }}
      >
        <Flex
          flexDirection="column"
          overflowX="auto"
          sx={{
            "::-webkit-scrollbar": {
              height: "8px",
              borderRadius: "8px",
              backgroundColor: baseTheme.colors.gray[700],
            },
            "::-webkit-scrollbar-track": {
              height: "8px",
              borderRadius: "8px",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: baseTheme.colors.gray[600],
              height: "8px",
              borderRadius: "8px",
            },
            "::-webkit-scrollbar-thumb:hover": {
              backgroundColor: baseTheme.colors.gray[500],
            },
            "::-webkit-scrollbar-thumb:active": {
              backgroundColor: baseTheme.colors.gray[400],
            },
            scrollbarWidth: "auto",
            scrollbarColor: `${baseTheme.colors.gray[600]} ${baseTheme.colors.gray[700]}`,
          }}
        >
          <OrderedList
            styleType="none"
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            flexWrap="nowrap"
            gap={4}
            mx="auto"
            mt={2}
            pb={2}
          >
            {forecast.map((day) => (
              <ForecastListItem
                dayForecast={day}
                key={day.date}
                width={itemWidth}
              />
            ))}
          </OrderedList>
          <TemperatureChart
            data={forecast.map((day) => ({
              maxTemp: day.maxTemp,
              minTemp: day.minTemp,
            }))}
            pointWidth={itemWidth}
          />
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ForecastCard;
