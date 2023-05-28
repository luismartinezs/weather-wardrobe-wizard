import { Flex, Text } from "@chakra-ui/react";
import GoogleSigninButton from "@/components/GoogleSigninButton";
import GithubSigninButton from "@/components/GithubSigninButton";

const ThirdPartyConnect = (): JSX.Element => {
  return (
    <>
      <Text mt={4} align="center">
        Connect with a third party service:
      </Text>
      <Flex mt={3} direction="column" gap={4}>
        <GoogleSigninButton />
        <GithubSigninButton />
      </Flex>
    </>
  );
};

export default ThirdPartyConnect;
