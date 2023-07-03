import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";
import { Product, getProducts } from "@stripe/firestore-stripe-payments";
import { payments } from "@/firebase/payments";
import PlanBox from "@/features/plans/components/PlanBox";
import { useUser } from "@/features/auth/context/User";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import { IncomingMessage } from "http";
import { commonGetServerSideProps } from "@/utils/commonGetServerSideProps";

export const getServerSideProps = async ({
  locale,
  req,
}: {
  locale: string;
  req: IncomingMessage;
}) => {
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
      ...(await commonGetServerSideProps({ locale, req })),
    },
  };
};

export default function Plans({ products }: { products: Product[] }) {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" fontSize="3xl">
          {t("purchase_subscription")}
        </Heading>
        {!user && (
          <Text mt={2} color="gray.300">
            <Link
              as={NextLink}
              href="/signin?redirect=/plans"
              textDecoration="underline"
              _hover={{
                color: "white",
              }}
            >
              {t("sign_in")}
            </Link>{" "}
            {t("before_purchasing_subscription")}
          </Text>
        )}
      </Box>
      <Flex wrap="wrap" gap={8} justify="center">
        {products.length ? (
          products.map((product) => <PlanBox plan={product} key={product.id} />)
        ) : (
          <Text fontSize="xl" color="gray.400">
            {t("no_plans_available")}
          </Text>
        )}
      </Flex>
    </>
  );
}
