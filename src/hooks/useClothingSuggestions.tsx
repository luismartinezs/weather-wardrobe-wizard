import { useWeatherForecast } from "@/hooks/useWeatherForecast";
import { getClothingSuggestions } from "@/util/clothingSuggestions";

export const useClothingSuggestions = () => {
  const { forecast, ...rest } = useWeatherForecast();
  return {
    clothingSuggestions: getClothingSuggestions(forecast),
    ...rest,
  };
};
