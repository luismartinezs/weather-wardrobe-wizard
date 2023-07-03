import {
  Container,
  Divider,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import ThirdPartyConnect from "@/features/auth/components/ThirdPartyConnect";
import { useTranslation } from "next-i18next";

const SigninRegister = ({
  form,
  afterFormLink,
}: {
  form?: JSX.Element;
  afterFormLink?: JSX.Element;
}): JSX.Element => {
  const { t } = useTranslation();
  const bg = useColorModeValue("gray.50", "gray.700");
  const divider = useColorModeValue("gray.700", "gray.400");

  return (
    <Container maxW="container.sm" px={8} py={12} bg={bg} borderRadius={5}>
      {form && form}
      {afterFormLink && afterFormLink}
      <HStack color={divider} mt={4}>
        <Divider color={divider} bgColor={divider} />
        <Text px={4} textTransform="uppercase">
          {t("or")}
        </Text>
        <Divider bgColor={divider} />
      </HStack>
      <ThirdPartyConnect />
    </Container>
  );
};

export default SigninRegister;
