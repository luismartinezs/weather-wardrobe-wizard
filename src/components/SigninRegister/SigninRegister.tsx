import { Container, Divider, HStack, Text } from "@chakra-ui/react";
import ThirdPartyConnect from "@/components/ThirdPartyConnect";

const SigninRegister = ({
  form,
  afterFormLink,
}: {
  form?: JSX.Element;
  afterFormLink?: JSX.Element;
}): JSX.Element => {
  return (
    <Container
      maxW="container.sm"
      px={8}
      py={12}
      bg="gray.700"
      borderRadius={5}
    >
      {form && form}
      {afterFormLink && afterFormLink}
      <HStack color="gray.400" mt={4}>
        <Divider color="gray.400" bgColor="gray.400" />
        <Text px={4}>OR</Text>
        <Divider bgColor="gray.400" />
      </HStack>
      <ThirdPartyConnect />
    </Container>
  );
};

export default SigninRegister;
