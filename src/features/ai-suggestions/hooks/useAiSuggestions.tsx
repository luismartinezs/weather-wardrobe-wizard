// NOTE deprecated because serverless functions deployed to Netlify have a 10 second timeout
import { useUser } from "@/features/auth/context/User";
import useSubscription from "@/features/plans/hooks/useSubscription";
import { useForecastAdapter } from "@/features/weather-forecast/hooks/useForecastAdapter";
import {
  ForecastSummary,
  getForecastSummary,
} from "@/features/weather-forecast/utils/getForecastSummary";
import useStore from "@/store";
import { fetchErrorHandler } from "@/utils/dataFetch";
import { useQuery } from "react-query";

function fetchAiSuggestions({
  forecast,
  locationName,
  countryName,
}: {
  forecast: ForecastSummary;
  locationName: string;
  countryName?: string;
}) {
  return fetchErrorHandler({
    url: "/api/ai-suggestions",
    errorMessage: "There was an error trying to fetch AI suggestions",
    method: "POST",
    body: {
      forecast,
      locationName,
      countryName,
    },
  });
}

export function useAiSuggestions() {
  const { user } = useUser();
  const { isSubscribed, isPremium } = useSubscription(user);
  const selectedLocation = useStore((state) => state.selectedLocation);
  const { forecast } = useForecastAdapter();
  const forecastSummary = forecast && getForecastSummary(forecast);

  const query = useQuery<any, Error>(
    [
      "getAiSuggestions",
      `${forecast}${selectedLocation?.name}${selectedLocation?.country}`,
    ],
    () => {
      if (isSubscribed && isPremium && selectedLocation && forecastSummary) {
        return fetchAiSuggestions({
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
    suggestion: query.data,
    ...query,
  };
}
