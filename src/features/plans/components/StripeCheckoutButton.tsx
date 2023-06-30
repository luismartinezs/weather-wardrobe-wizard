import { Box, Button } from "@chakra-ui/react";
import { Price } from "@stripe/firestore-stripe-payments";
import { useCheckout } from "@/features/plans/hooks/useCheckout";
import ErrorMessage from "@/components/ErrorMessage";

const StripeCheckoutButton = ({
  children,
  price,
  isDisabled,
}: {
  price: Price;
  children?: React.ReactNode;
  isDisabled?: boolean;
}): JSX.Element => {
  const { checkout, loading, error } = useCheckout({ price: price.id });

  return (
    <>
      <Button
        size="lg"
        colorScheme="secondary"
        isDisabled={isDisabled}
        onClick={checkout}
        isLoading={loading}
      >
        {children || "Subscribe"}
      </Button>
      {error && (
        <Box mt={2}>
          <ErrorMessage error={error} />
        </Box>
      )}
    </>
  );
};

export default StripeCheckoutButton;
