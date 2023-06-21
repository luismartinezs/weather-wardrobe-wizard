import { useUser } from "@/context/User";
import { addRecentLocation } from "@/firebase/firestore/recentLocations";
import { useForecastAdapter } from "@/hooks/useForecastAdapter";
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
  const { isLoading, refetch } = useForecastAdapter();
  const { user } = useUser();

  const handleClick = () => {
    if (user?.uid && selectedLocation) {
      addRecentLocation(user?.uid, selectedLocation);
    }
    refetch();
  };

  return (
    <Button
      isDisabled={!selectedLocation}
      onClick={handleClick}
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
