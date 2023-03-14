import { LocationSuggestion } from "@/types/weatherApi";
import { fetchErrorHandler } from "@/util/dataFetch";
import { Box, Button, Container } from "@chakra-ui/react";
import { useQuery } from "react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { getFiveDayForecast } from "@/util/weather";
import ClothingSuggestions from "../ClothingSuggestions";
import { format } from "date-fns";
import ForecastCard from "@/components/ForecastCard";

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
        <ForecastCard location={location} forecast={forecast} />
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
          {location
            ? `Get weather in ${location.name}`
            : "You didn't select a location"}
        </Button>
      </Container>
      <Box mt={8}>{content}</Box>
    </>
  );
};

export default WeatherForecast;
