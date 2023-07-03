import { Flex, ListItem, Text } from "@chakra-ui/react";
import { format, isToday, isTomorrow } from "date-fns";

import WeatherIcon from "@/features/weather-forecast/components/WeatherIcon";
import { WeatherForecast } from "@/features/weather-forecast/types";
import { useTranslation } from "next-i18next";
import { i18nMap } from "@/features/weather-forecast/utils/i18nMap";

function getWeekDay(dateString: string) {
  const _date = new Date(dateString);

  if (isTomorrow(_date)) return "Tomorrow";
  if (isToday(_date)) return "Today";

  return format(_date, "iiii");
}

function getMonthDay(dateString: string) {
  const _date = new Date(dateString);

  return format(_date, "MMM d");
}

const ForecastListItem = ({
  dayForecast,
  width = 200,
}: {
  dayForecast: WeatherForecast;
  width: number;
}): JSX.Element => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;

  return (
    <ListItem
      key={dayForecast.date}
      my={2}
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      w={`${width}px`}
      maxW={`${width}px`}
      minW={`${width}px`}
      data-testid="forecast-day"
    >
      <Text>{getWeekDay(dayForecast.date)}</Text>
      <Text color="gray.400" fontWeight="thin">
        {getMonthDay(dayForecast.date)}
      </Text>
      <Flex justify="center" align="center" h={20}>
        <WeatherIcon
          weatherCondition={dayForecast.weatherType}
          iconCode={dayForecast.weatherIcon}
        />
      </Flex>
      <Text color="gray.400">
        {locale && locale !== "en"
          ? i18nMap[locale][dayForecast.weatherType]
          : dayForecast.weatherType}
      </Text>
    </ListItem>
  );
};

export default ForecastListItem;
