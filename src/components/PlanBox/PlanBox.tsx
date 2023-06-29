// Not being used for now, but most likely used soon because the stripe pricing table looks bad and does not SSR

import { getCurrency } from "@/utils/currency";
import { Button, Card, Heading, Text } from "@chakra-ui/react";
import { Product } from "@stripe/firestore-stripe-payments";

const PlanBox = ({ plan }: { plan: Product }): JSX.Element => {
  return (
    <Card borderRadius="8px" p={6}>
      <Heading as="h2" fontSize="2xl" fontWeight="normal" mb={4}>
        {plan.name}
      </Heading>
      {plan.description && <Text>{plan.description}</Text>}
      {plan.prices[0].unit_amount && (
        <Text>
          <Text as="span" fontSize="5xl" fontWeight="bold">
            {getCurrency(plan.prices[0].unit_amount / 100, "EUR")}{" "}
          </Text>
          <Text as="span" color="gray.300" fontSize="lg">
            / {plan.prices[0].interval}
          </Text>
        </Text>
      )}
      <Button size="lg" colorScheme="secondary">
        Subscribe
      </Button>
      <pre>{JSON.stringify(plan, null, 2)}</pre>
    </Card>
  );
};

export default PlanBox;
