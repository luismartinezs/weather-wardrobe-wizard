import { LocationSuggestion } from "@/types/weatherApi";
import { fetchErrorHandler } from "@/util/dataFetch";
import {
  Box,
  Button,
  Container,
  Heading,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { getFiveDayForecast } from "@/util/weather";
import ForecastListItem from "@/components/ForecastListItem";
import ClothingSuggestions from "../ClothingSuggestions";
import { format } from "date-fns";

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
    ["getWeatherForecast", location + format(new Date(), "MM/dd/yyyy")],
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

  if (isError) {
    content = <ErrorMessage error={error} />;
  }

  if (location && isSuccess && data) {
    const forecast = getFiveDayForecast(data);

    content = (
      <>
        <Heading as="h2" fontSize="lg" fontWeight="normal">
          Weather forecast in{" "}
          <Text as="span" color="primary.200" fontWeight="semibold">
            {location.name} (
            {[location.state, location.country].filter(Boolean).join(", ")})
          </Text>{" "}
          for the next 5 days:
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
        <Box mt={4}>
          <ClothingSuggestions forecast={forecast} />
        </Box>
      </>
    );
  }

  return (
    <>
      <Container>
        <Button
          isDisabled={!location}
          onClick={() => refetch()}
          w="100%"
          isLoading={isLoading}
          loadingText="Fetching weather..."
          bgGradient="linear(160deg, secondary.500, primary.500)"
          _hover={{
            bgGradient: "linear(160deg, secondary.600, primary.600)",
          }}
        >
          Get weather
        </Button>
      </Container>
      <Box mt={4}>{content}</Box>
    </>
  );
};

export default WeatherForecast;
