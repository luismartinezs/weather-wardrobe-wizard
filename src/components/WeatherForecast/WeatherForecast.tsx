import { LocationSuggestion } from "@/types/weatherApi";
import { fetchErrorHandler } from "@/util/dataFetch";
import {
  Box,
  Button,
  Container,
  Heading,
  OrderedList,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { getFiveDayForecast } from "@/util/weather";
import ForecastListItem from "@/components/ForecastListItem";

function fetchWeatherForecast(
  location: LocationSuggestion | null
): Promise<any> | undefined {
  if (!location) {
    return;
  }
  return fetchErrorHandler(
    `/api/weather-forecast?lat=${location.lat}&lon=${location.lon}`,
    "There was an error trying to fetch weather report"
  );
}

const WeatherForecast = ({
  location,
}: {
  location: LocationSuggestion | null;
}): JSX.Element => {
  const { data, isLoading, isError, error, refetch, isSuccess } = useQuery<
    any,
    Error
  >(
    ["getWeatherForecase", location],
    () => {
      return fetchWeatherForecast(location);
    },
    {
      enabled: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  let content = <></>;

  if (isLoading) {
    content = <Spinner color="gray.400" my={2} />;
  }

  if (isError) {
    content = <ErrorMessage error={error} />;
  }

  if (location && isSuccess && data) {
    const forecast = getFiveDayForecast(data);

    content = (
      <>
        <Heading as="h2" fontSize="lg" fontWeight="normal">
          Weather forecast in {location.name} for the next 5 days:
        </Heading>
        <OrderedList
          styleType="none"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={4}
          mx="auto"
        >
          {forecast.map((day) => (
            <ForecastListItem dayForecast={day} key={day.date} />
          ))}
        </OrderedList>
      </>
    );
  }

  return (
    <>
      <Container>
        <Button isDisabled={!location} onClick={() => refetch()} w="100%">
          Get weather
        </Button>
      </Container>
      <Box mt={4}>{content}</Box>
    </>
  );
};

export default WeatherForecast;
