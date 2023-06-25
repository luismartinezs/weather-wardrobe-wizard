import { useWeatherForecast } from "@/hooks/useWeatherForecast";
import { useOneCall } from "@/hooks/useOneCall";

type Type = "onecall" | "weather-forecast";

export function useForecastAdapter(type: Type = "onecall") {
  const weatherForecast = useWeatherForecast();
  const onecall = useOneCall();

  return type === "onecall" ? onecall : weatherForecast;
}
