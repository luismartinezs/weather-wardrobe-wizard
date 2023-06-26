import { useForecastAdapter } from "@/features/weather-forecast/hooks/useForecastAdapter";
import { getClothingSuggestions } from "@/features/clothing-suggestions/utils/clothingSuggestions";

export const useClothingSuggestions = () => {
  const { forecast, ...rest } = useForecastAdapter();
  return {
    clothingSuggestions: getClothingSuggestions(forecast),
    ...rest,
  };
};
