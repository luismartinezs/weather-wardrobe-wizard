import { Heading, Skeleton, Wrap, WrapItem } from "@chakra-ui/react";

import RecentLocationItem from "@/features/location/components/RecentLocationItem";
import { useRecentLocations } from "@/features/location/hooks/useRecentLocations";
import { useUpdateLocationAndRefetchWeather } from "@/hooks/useUpdateLocationAndRefetchWeather";
import { useUser } from "@/features/auth/context/User";
import { removeRecentLocation } from "@/firebase/firestore/recentLocations";
import ServerStateDisplayWrapper from "../../../../components/ServerStateDisplayWrapper";
import { useTranslation } from "next-i18next";

const RecentLocations = (): JSX.Element => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { recentLocations, loading, error } = useRecentLocations();
  const { updateLocationAndRefetchWeather } =
    useUpdateLocationAndRefetchWeather();

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
        {recentLocations.length > 0 && `${t("recent_locations")}:`}
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
