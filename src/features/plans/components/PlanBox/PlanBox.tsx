import { getCurrency } from "@/utils/currency";
import { Button, Card, Divider, Heading, Text } from "@chakra-ui/react";
import { Product } from "@stripe/firestore-stripe-payments";
import PlanFeatures from "@/features/plans/components/PlanFeatures";
import { featuresMap } from "@/features/plans/constants";

const PlanBox = ({ plan }: { plan: Product }): JSX.Element => {
  const features =
    plan.metadata.firebaseRole && featuresMap[plan.metadata.firebaseRole];

  return (
    <>
      <Card borderRadius="8px" py={8} px={6} maxW="510px" minW="330px">
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
        <Button size="lg" colorScheme="secondary" isDisabled={!plan.active}>
          Subscribe
        </Button>
        <Divider mt={10} mb={6} />
        {features && <PlanFeatures features={features} />}
      </Card>
      {/* <pre>{JSON.stringify(plan, null, 2)}</pre> */}
    </>
  );
};

export default PlanBox;
