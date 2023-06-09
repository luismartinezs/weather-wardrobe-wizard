import { Heading, Skeleton, Wrap, WrapItem } from "@chakra-ui/react";

import RecentLocationItem from "@/components/RecentLocationItem";
import { useRecentLocations } from "@/hooks/useRecentLocations";
import { useUpdateLocationAndRefetchWeather } from "@/hooks/useUpdateLocationAndRefetchWeather";
import { useUser } from "@/context/User";
import { removeRecentLocation } from "@/firebase/firestore/recentLocations";
import ServerStateDisplayWrapper from "../ServerStateDisplayWrapper";

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

  const content = (
    <>
      <Heading as="h2" fontSize="medium" fontWeight="normal" mb={4}>
        Recent locations:
      </Heading>
      <Wrap spacing={3}>
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

  return (
    <ServerStateDisplayWrapper
      isLoading={loading}
      isError={!!error}
      error={error}
      data={recentLocations}
      errorAsToast
      loadingComponent={<Skeleton>{content}</Skeleton>}
    >
      {content}
    </ServerStateDisplayWrapper>
  );
};

export default RecentLocations;
