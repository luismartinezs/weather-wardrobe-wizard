import { Flex, ListItem, Text } from "@chakra-ui/react";
import { format, isToday, isTomorrow } from "date-fns";

import WeatherIcon from "@/features/weather-forecast/components/WeatherIcon";
import { WeatherForecast } from "@/features/weather-forecast/types";
import { useTranslation } from "next-i18next";
import { i18nMap } from "@/features/weather-forecast/utils/i18nMap";
import { useDateFnsLocale } from "@/hooks/useDateFnsLocale";

const ForecastListItem = ({
  dayForecast,
  width = 200,
}: {
  dayForecast: WeatherForecast;
  width: number;
}): JSX.Element => {
  const { i18n, t } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const dateFnsLocale = useDateFnsLocale();

  function getWeekDay(dateString: string) {
    const _date = new Date(dateString);

    if (isTomorrow(_date)) return t("tomorrow");
    if (isToday(_date)) return t("today");

    return format(_date, "iiii", {
      locale: dateFnsLocale,
    });
  }

  function getMonthDay(dateString: string) {
    const _date = new Date(dateString);

    return format(_date, "MMM d", {
      locale: dateFnsLocale,
    });
  }

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
      <Text textTransform="capitalize">{getWeekDay(dayForecast.date)}</Text>
      <Text color="gray.400" fontWeight="thin">
        {getMonthDay(dayForecast.date)}
      </Text>
      <Flex justify="center" align="center" h={20}>
        <WeatherIcon
          weatherCondition={dayForecast.weatherType}
          iconCode={dayForecast.weatherIcon}
        />
      </Flex>
      <Text color="gray.400" textTransform="capitalize">
        {locale && locale !== "en"
          ? i18nMap[locale][dayForecast.weatherType]
          : dayForecast.weatherType}
      </Text>
    </ListItem>
  );
};

export default ForecastListItem;
