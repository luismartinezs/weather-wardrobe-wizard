// NOTE next-i18nnext not working with 404 page https://github.com/i18next/next-i18next/issues/677
import { Heading, Link } from "@chakra-ui/react";
// import { useTranslation } from "next-i18next";
import NextLink from "next/link";

export default function Custom404() {
  // const { t } = useTranslation();
  return (
    <>
      <Heading as="h1" fontSize="medium" fontWeight="normal">
        {/* 404 - {t("page_not_found")} */}
        404 - Page not found
      </Heading>
      <Link as={NextLink} href="/" display="inline-block" mt={2}>
        {/* {t("go_to_home")} */}
        Go to Home
      </Link>
    </>
  );
}
