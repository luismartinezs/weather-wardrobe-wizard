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
  return fetchErrorHandler(
    "/api/ai-suggestions",
    "There was an error trying to fetch AI suggestions",
    "POST",
    {
      forecast,
      locationName,
      countryName,
    }
  );
}

export function useAiSuggestions() {
  const selectedLocation = useStore((state) => state.selectedLocation);
  const { forecast } = useForecastAdapter();
  const forecastSummary = forecast && getForecastSummary(forecast);

  const query = useQuery<any, Error>(
    [
      "getAiSuggestions",
      `${forecast}${selectedLocation?.name}${selectedLocation?.country}`,
    ],
    () => {
      if (selectedLocation && forecastSummary) {
        return fetchAiSuggestions({
          forecast: forecastSummary,
          locationName: selectedLocation.name,
          countryName: selectedLocation.country,
        });
      }
    },
    {
      enabled: !!selectedLocation && !!forecastSummary,
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
