import { Box, Heading } from "@chakra-ui/react";
import { Product, getProducts } from "@stripe/firestore-stripe-payments";
import { payments } from "@/firebase/payments";
import StripePricingTable from "@/components/StripePricingTable";

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
    where: [["metadata.app", "==", "weatherwardrobewizard"]],
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};

export default function Plans({ products }: { products: Product[] }) {
  return (
    <>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" fontSize="3xl">
          Purchase a subscription
        </Heading>
      </Box>
      <StripePricingTable mode="test" />
    </>
  );
}
