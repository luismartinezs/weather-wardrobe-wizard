import { Box, Button } from "@chakra-ui/react";
import { Price } from "@stripe/firestore-stripe-payments";
import { useCheckout } from "@/features/plans/hooks/useCheckout";
import ErrorMessage from "@/components/ErrorMessage";
import { useTranslation } from "next-i18next";

const StripeCheckoutButton = ({
  children,
  price,
  isDisabled,
}: {
  price: Price;
  children?: React.ReactNode;
  isDisabled?: boolean;
}): JSX.Element => {
  const { t } = useTranslation();
  const { checkout, loading, error } = useCheckout({
    price: price.id,
    payment_method_types: ["card"],
  });

  return (
    <>
      <Button
        size="lg"
        colorScheme="secondary"
        isDisabled={isDisabled}
        onClick={checkout}
        isLoading={loading}
      >
        {children || t("subscribe")}
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
