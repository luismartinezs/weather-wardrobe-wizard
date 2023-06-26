import ForecastCard from "@/features/weather-forecast/components/ForecastCard";
import useStore from "@/store";
import { useForecastAdapter } from "@/hooks/useForecastAdapter";
import ServerStateDisplayWrapper from "@/components/ServerStateDisplayWrapper";

const WeatherForecast = (): JSX.Element => {
  const selectedLocation = useStore((state) => state.selectedLocation);
  const { forecast, isLoading, isError, error } = useForecastAdapter();

  return (
    <ServerStateDisplayWrapper
      isLoading={isLoading}
      isError={isError}
      error={error}
      data={forecast}
    >
      {selectedLocation && <ForecastCard />}
    </ServerStateDisplayWrapper>
  );
};

export default WeatherForecast;
