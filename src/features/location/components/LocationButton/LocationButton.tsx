import { useUser } from "@/features/auth/context/User";
import { addRecentLocation } from "@/firebase/firestore/recentLocations";
import { useForecastAdapter } from "@/features/weather-forecast/hooks/useForecastAdapter";
import useStore, { type StoreState } from "@/store";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

function useButtonLabel(selectedLocation: StoreState["selectedLocation"]) {
  const { t } = useTranslation();
  const [buttonLabel, setButtonLabel] = useState(t("did_not_select_location"));

  useEffect(() => {
    if (selectedLocation) {
      setButtonLabel(`${t("get_weather_in")} ${selectedLocation.name}`);
    }
  }, [selectedLocation, t]);

  return buttonLabel;
}

const LocationButton = (): JSX.Element => {
  const { t } = useTranslation();
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
      loadingText={t("fetching_weather")}
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
