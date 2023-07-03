import { Flex, Text } from "@chakra-ui/react";
import GoogleSigninButton from "@/features/auth/components/GoogleSigninButton";
import GithubSigninButton from "@/features/auth/components/GithubSigninButton";
import { useTranslation } from "next-i18next";

const ThirdPartyConnect = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Text mt={4} align="center">
        {t("third_party_connect")}:
      </Text>
      <Flex mt={3} direction="column" gap={4}>
        <GoogleSigninButton />
        <GithubSigninButton />
      </Flex>
    </>
  );
};

export default ThirdPartyConnect;
