import { useQuery } from "react-query";
import { httpsCallable } from "firebase/functions";

import { useUser } from "@/features/auth/context/User";
import useSubscription from "@/features/plans/hooks/useSubscription";
import useStore from "@/store";
import { useForecastAdapter } from "@/features/weather-forecast/hooks/useForecastAdapter";
import { getForecastSummary } from "@/features/weather-forecast/utils/getForecastSummary";
import { functions } from "@/firebase/app";

const aiSuggestions = httpsCallable(functions, "aiSuggestions");

export function useCallableAiSuggestions() {
  const { user } = useUser();
  const { isSubscribed, isPremium } = useSubscription(user);
  const selectedLocation = useStore((state) => state.selectedLocation);
  const { forecast } = useForecastAdapter();
  const forecastSummary = forecast && getForecastSummary(forecast);

  const query = useQuery<any, Error>(
    [
      "getCallableAiSuggestions",
      `${forecast}${selectedLocation?.name}${selectedLocation?.country}`,
    ],
    () => {
      if (isSubscribed && isPremium && selectedLocation && forecastSummary) {
        return aiSuggestions({
          forecast: forecastSummary,
          locationName: selectedLocation.name,
          countryName: selectedLocation.country,
        });
      }
    },
    {
      enabled:
        !!selectedLocation && !!forecastSummary && isSubscribed && isPremium,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  return {
    suggestion: query.data?.data,
    ...query,
  };
}
