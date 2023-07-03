import { Container, Link, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

const Footer = (): JSX.Element => {
  const { t } = useTranslation();
  const text = useColorModeValue("gray.500", "gray.400");

  return (
    <Container color={text} py={6} maxW="2xl">
      <small>
        {t("created_by")}{" "}
        <Link fontWeight={800} href="https://www.luis-martinez.net/" isExternal>
          Luis Martinez
        </Link>
      </small>
    </Container>
  );
};

export default Footer;
