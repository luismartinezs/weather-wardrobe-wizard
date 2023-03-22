import { useWeatherForecast } from "@/hooks/useWeatherForecast";
import useStore, { type StoreState } from "@/store";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

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

const LocationButton = (): JSX.Element => {
  const selectedLocation = useStore((state) => state.selectedLocation);
  const buttonLabel = useButtonLabel(selectedLocation);
  const { isLoading, refetch } = useWeatherForecast();

  return (
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
  );
};

export default LocationButton;
