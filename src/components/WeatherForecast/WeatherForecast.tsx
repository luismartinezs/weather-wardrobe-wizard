import { LocationSuggestion } from "@/types/weatherApi";
import { fetchErrorHandler } from "@/util/dataFetch";
import { Box, Button, Container } from "@chakra-ui/react";
import { useQuery } from "react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { getFiveDayForecast } from "@/util/weather";
import ClothingSuggestions from "../ClothingSuggestions";
import { format } from "date-fns";
import ForecastCard from "@/components/ForecastCard";
import useStore from "@/store";
import { useEffect, useState } from "react";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";
import { type StoreState } from "@/store";

function useButtonLabel(selectedLocation: StoreState["selectedLocation"]) {
  const [buttonLabel, setButtonLabel] = useState(
    "You didn't select a location"
  );

  useEffect(() => {
    if (selectedLocation) {
      setButtonLabel(`Get weather in ${selectedLocation.name}`);
    }
  }, [selectedLocation]);

  return buttonLabel;
}

const WeatherForecast = (): JSX.Element => {
  const selectedLocation = useStore((state) => state.selectedLocation);
  const buttonLabel = useButtonLabel(selectedLocation);
  const { forecast, isLoading, isError, error, refetch } = useWeatherForecast();

  let content = <></>;

  if (isError) {
    content = <ErrorMessage error={error} />;
  }

  if (selectedLocation && forecast) {
    content = <ForecastCard />;
  }

  return (
    <>
      <Container>
        <Button
          isDisabled={!selectedLocation}
          onClick={() => refetch()}
          w="100%"
          isLoading={isLoading}
          loadingText="Fetching weather..."
          bgGradient="linear(160deg, secondary.500, primary.500)"
          _hover={{
            bgGradient: "linear(160deg, secondary.600, primary.600)",
          }}
        >
          {buttonLabel}
        </Button>
      </Container>
      <Box mt={8}>{content}</Box>
    </>
  );
};

export default WeatherForecast;
