import { Heading, Link } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

export { commonGetServerSideProps as getServerSideProps } from "@/utils/commonGetServerSideProps";

export default function Custom404() {
  const { t } = useTranslation();
  return (
    <>
      <Heading as="h1" fontSize="medium" fontWeight="normal">
        404 - {t("page_not_found")}
      </Heading>
      <Link as={NextLink} href="/" display="inline-block" mt={2}>
        {t("go_to_home")}
      </Link>
    </>
  );
}
