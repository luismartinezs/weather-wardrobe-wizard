import ForecastCard from "@/components/ForecastCard";
import useStore from "@/store";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";
import ServerStateDisplayWrapper from "@/components/ServerStateDisplayWrapper";

const WeatherForecast = (): JSX.Element => {
  const selectedLocation = useStore((state) => state.selectedLocation);
  const { forecast, isLoading, isError, error } = useWeatherForecast();

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
