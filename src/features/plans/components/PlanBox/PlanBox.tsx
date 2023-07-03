import { getCurrency } from "@/utils/currency";
import {
  Card,
  Divider,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Product } from "@stripe/firestore-stripe-payments";
import PlanFeatures from "@/features/plans/components/PlanFeatures";
import { featuresMap } from "@/features/plans/constants";
import StripeCheckoutButton from "@/features/plans/components/StripeCheckoutButton";
import useSubscription from "@/features/plans/hooks/useSubscription";
import { useUser } from "@/features/auth/context/User";
import SubscriptionPlanInfo from "../SubscriptionPlanInfo";
import { useTranslation } from "next-i18next";

const PlanBox = ({ plan }: { plan: Product }): JSX.Element => {
  const { t } = useTranslation();
  const heading = useColorModeValue("secondary.500", "secondary.200");
  const mutedText = useColorModeValue("gray.500", "gray.300");
  const features =
    plan.metadata.firebaseRole && featuresMap[plan.metadata.firebaseRole];
  const { user } = useUser();
  const { subscription } = useSubscription(user);
  const isSubscribed = !!subscription && subscription.role === plan.role;
  const price = plan.prices[0];

  return (
    <Card borderRadius="8px" py={8} px={6} maxW="510px" minW="330px" flex="1">
      <Heading
        as="h2"
        fontSize="2xl"
        fontWeight="normal"
        mb={4}
        color={heading}
      >
        {plan.name}
      </Heading>
      {price.unit_amount && (
        <Text mb={4}>
          <Text as="span" fontSize="5xl" fontWeight="bold">
            {getCurrency(price.unit_amount / 100, "EUR")}{" "}
          </Text>
          {price.interval && (
            <Text as="span" color={mutedText} fontSize="lg">
              / {t(price.interval)}
            </Text>
          )}
        </Text>
      )}
      {price && (
        <StripeCheckoutButton
          price={price}
          isDisabled={isSubscribed || !plan.active}
        />
      )}
      <SubscriptionPlanInfo plan={plan} />
      <Divider mt={10} mb={6} />
      {features && <PlanFeatures features={features} />}
    </Card>
  );
};

export default PlanBox;
