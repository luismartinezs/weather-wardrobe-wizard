import { useQuery } from "react-query";
import { httpsCallable } from "firebase/functions";

import { useUser } from "@/features/auth/context/User";
import useSubscription from "@/features/plans/hooks/useSubscription";
import useStore from "@/store";
import { useForecastAdapter } from "@/features/weather-forecast/hooks/useForecastAdapter";
import { getForecastSummary } from "@/features/weather-forecast/utils/getForecastSummary";
import { functions } from "@/firebase/app";
import { useTranslation } from "next-i18next";

const aiSuggestions = httpsCallable(functions, "aiSuggestions");

export function useCallableAiSuggestions() {
  const { i18n } = useTranslation();
  const { user } = useUser();
  const { isSubscribed, isPremium } = useSubscription(user);
  const selectedLocation = useStore((state) => state.selectedLocation);
  const { forecast } = useForecastAdapter();
  const forecastSummary = forecast && getForecastSummary(forecast);
  const lang = i18n.resolvedLanguage;

  const query = useQuery<any, Error>(
    [
      "getCallableAiSuggestions",
      `${forecast}${selectedLocation?.name}${selectedLocation?.country}${lang}`,
    ],
    () => {
      if (isSubscribed && isPremium && selectedLocation && forecastSummary) {
        return aiSuggestions({
          forecast: forecastSummary,
          locationName: selectedLocation.name,
          countryName: selectedLocation.country,
          lang,
          model:
            process.env.NODE_ENV === "production" ? "gpt-4" : "gpt-3.5-turbo",
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
