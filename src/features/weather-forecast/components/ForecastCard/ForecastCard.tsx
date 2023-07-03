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
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import UnitSwitch from "@/features/units/components/UnitSwitch";
import ForecastListItem from "@/features/weather-forecast/components/ForecastListItem";
import TemperatureChart from "@/features/weather-forecast/components/TemperatureChart";
import useStore from "@/store";
import { useForecastAdapter } from "@/features/weather-forecast/hooks/useForecastAdapter";
import { useTranslation } from "next-i18next";

const itemWidth = 150;

const ForecastCard = (): JSX.Element => {
  const locationName = useColorModeValue("primary.500", "primary.200");
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";
  const { t } = useTranslation();
  const { forecast } = useForecastAdapter("onecall");
  const selectedLocation = useStore((state) => state.selectedLocation);

  if (!selectedLocation || !forecast) {
    return <></>;
  }

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
            {t("daily_forecast_for")}{" "}
            <Text as="span" color={locationName}>
              {selectedLocation.name}
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
          backgroundImage: isLight
            ? `linear-gradient(to left, rgba(0, 0, 0, 0), white)`
            : `linear-gradient(to left, rgba(255, 255, 255, 0), ${baseTheme.colors.gray[700]})`,
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
          backgroundImage: isLight
            ? `linear-gradient(to right, rgba(0, 0, 0, 0), white)`
            : `linear-gradient(to right, rgba(255, 255, 255, 0), ${baseTheme.colors.gray[700]})`,
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
              backgroundColor: isLight
                ? baseTheme.colors.gray[300]
                : baseTheme.colors.gray[700],
            },
            "::-webkit-scrollbar-track": {
              height: "8px",
              borderRadius: "8px",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: isLight
                ? baseTheme.colors.gray[400]
                : baseTheme.colors.gray[600],
              height: "8px",
              borderRadius: "8px",
            },
            "::-webkit-scrollbar-thumb:hover": {
              backgroundColor: baseTheme.colors.gray[500],
            },
            "::-webkit-scrollbar-thumb:active": {
              backgroundColor: isLight
                ? baseTheme.colors.gray[600]
                : baseTheme.colors.gray[400],
            },
            scrollbarWidth: "auto",
            scrollbarColor: isLight
              ? `${baseTheme.colors.gray[400]} ${baseTheme.colors.gray[300]}`
              : `${baseTheme.colors.gray[600]} ${baseTheme.colors.gray[700]}`,
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
