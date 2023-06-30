import { getCurrency } from "@/utils/currency";
import { Box, Button, Card, Divider, Heading, Text } from "@chakra-ui/react";
import { Product } from "@stripe/firestore-stripe-payments";
import PlanFeatures from "@/features/plans/components/PlanFeatures";
import { featuresMap } from "@/features/plans/constants";
import StripeCheckoutButton from "@/features/plans/components/StripeCheckoutButton";
import useSubscription from "@/features/plans/hooks/useSubscription";
import { useUser } from "@/features/auth/context/User";
import { useState } from "react";
import { goToBillingPortal } from "@/firebase/payments";
import { formatTimestamp } from "@/utils/time";

const PlanBox = ({ plan }: { plan: Product }): JSX.Element => {
  const features =
    plan.metadata.firebaseRole && featuresMap[plan.metadata.firebaseRole];
  const { user } = useUser();
  const subscription = useSubscription(user);
  const [isBillingLoading, setBillingLoading] = useState(false);
  const isSubscribed = !!subscription && subscription.role === plan.role;

  const manageSubscription = () => {
    if (subscription) {
      setBillingLoading(true);
      goToBillingPortal();
    }
  };

  return (
    <>
      <Card borderRadius="8px" py={8} px={6} maxW="510px" minW="330px" flex="1">
        <Heading
          as="h2"
          fontSize="2xl"
          fontWeight="normal"
          mb={4}
          color="secondary.200"
        >
          {plan.name}
        </Heading>
        {plan.prices[0].unit_amount && (
          <Text mb={4}>
            <Text as="span" fontSize="5xl" fontWeight="bold">
              {getCurrency(plan.prices[0].unit_amount / 100, "EUR")}{" "}
            </Text>
            <Text as="span" color="gray.300" fontSize="lg">
              / {plan.prices[0].interval}
            </Text>
          </Text>
        )}
        <StripeCheckoutButton
          price={plan.prices[0]}
          isDisabled={isSubscribed || !plan.active}
        />
        {isSubscribed && (
          <Box textAlign="left">
            <Text mt={4} color="gray.400">
              You are currently subscribed to this plan{" "}
              {subscription.cancel_at_period_end && subscription.cancel_at && (
                <>until {formatTimestamp(subscription.cancel_at)}</>
              )}
            </Text>
            <Button
              colorScheme="gray"
              fontWeight="normal"
              color="gray.400"
              textDecoration="underline"
              onClick={manageSubscription}
              variant="link"
              display="inline"
              isLoading={isBillingLoading}
            >
              Click here to modify this subscription
            </Button>
          </Box>
        )}
        <Divider mt={10} mb={6} />
        {features && <PlanFeatures features={features} />}
      </Card>
    </>
  );
};

export default PlanBox;
