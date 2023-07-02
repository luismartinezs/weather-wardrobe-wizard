import { Heading, Link } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NextLink from "next/link";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

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
