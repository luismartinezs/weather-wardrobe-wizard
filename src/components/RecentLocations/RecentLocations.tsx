import { Heading, Wrap, WrapItem } from "@chakra-ui/react";

import RecentLocationItem from "@/components/RecentLocationItem";
import { useRecentLocations } from "@/hooks/useRecentLocations";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";
import useStore from "@/store";

const RecentLocations = (): JSX.Element => {
  const { recentLocations } = useRecentLocations();
  const setSelectedLocation = useStore((state) => state.setSelectedLocation);
  const { refetch } = useWeatherForecast();

  const onLocationClick = async (location: any) => {
    setSelectedLocation(location);
    await refetch();
  };

  const onLocationRemove = (index: number) => {
    //
  };

  if (!recentLocations || recentLocations.length === 0) {
    return <></>;
  }

  return (
    <>
      <Heading as="h2" size="sm" fontWeight="normal" mb={2}>
        Recent locations:
      </Heading>
      <Wrap>
        {recentLocations.map((location, index) => (
          <WrapItem key={`${location.lat}-${location.lon}`}>
            <RecentLocationItem
              location={location}
              onClick={() => onLocationClick(location)}
              onClose={() => onLocationRemove(index)}
            />
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};

export default RecentLocations;
