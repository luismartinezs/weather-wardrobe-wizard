import { Container, Link } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container color="gray.400" py={6} maxW="2xl">
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
