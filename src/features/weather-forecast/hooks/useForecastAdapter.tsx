import { useWeatherForecast } from "@/features/weather-forecast/hooks/useWeatherForecast";
import { useOneCall } from "@/features/weather-forecast/hooks/useOneCall";

type Type = "onecall" | "weather-forecast";

export function useForecastAdapter(type: Type = "onecall") {
  const weatherForecast = useWeatherForecast();
  const onecall = useOneCall();

  return type === "onecall" ? onecall : weatherForecast;
}
