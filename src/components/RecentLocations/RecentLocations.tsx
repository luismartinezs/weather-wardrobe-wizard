import { Heading, Wrap, WrapItem } from "@chakra-ui/react";

import RecentLocationItem from "@/components/RecentLocationItem";
import { useRecentLocations } from "@/hooks/useRecentLocations";
import { useUpdateLocationAndRefetchWeather } from "@/hooks/useUpdateLocationAndRefetchWeather";
import { useUser } from "@/context/User";
import { removeRecentLocation } from "@/firebase/firestore/recentLocations";

const RecentLocations = (): JSX.Element => {
  const { recentLocations, loading, error } = useRecentLocations();
  const { updateLocationAndRefetchWeather } =
    useUpdateLocationAndRefetchWeather();
  const { user } = useUser();

  const onLocationClick = async (location: any) => {
    updateLocationAndRefetchWeather(location);
  };

  const onLocationRemove = (index: number) => {
    if (!user?.uid) return;
    removeRecentLocation(user?.uid, index);
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
