import { Badge } from "@chakra-ui/react";
import { useUser } from "@/features/auth/context/User";
import useSubscription from "@/features/plans/hooks/useSubscription";

const SubscriptionPill = (): JSX.Element => {
  const { user } = useUser();
  const { subscription } = useSubscription(user);

  if (!subscription) {
    return <></>;
  }
  return (
    <Badge colorScheme="secondary" px={2} py={1} borderRadius="8px">
      {subscription.role}
    </Badge>
  );
};

export default SubscriptionPill;
