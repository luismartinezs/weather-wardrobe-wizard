import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Container,
  Input,
  Button,
  Text,
  Flex,
  Link,
  FormErrorMessage,
  FormLabel,
  FormControl,
  HStack,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { signIn } from "@/firebase/auth";
import NextLink from "next/link";
import GoogleSigninButton from "@/components/GoogleSigninButton";
import GithubSigninButton from "@/components/GithubSigninButton";

type FormData = {
  name: string;
  password: string;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required(),
});

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    signIn(data.name, data.password);
  });

  return (
    <Container
      maxW="container.sm"
      px={8}
      py={12}
      bg="gray.700"
      borderRadius={5}
    >
      <Flex as="form" onSubmit={onSubmit} direction="column" gap={4}>
        <Heading as="h1" size="lg" textAlign="center">
          Sign In
        </Heading>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" type="password" {...register("password")} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button
          w="100%"
          colorScheme="blue"
          type="submit"
          isLoading={isSubmitting}
        >
          Sign In
        </Button>
      </Flex>
      <Link as={NextLink} mt="4" href="/register">
        <Text align="center" color="gray.400" fontSize="sm" mt={2}>
          or register as a new user
        </Text>
      </Link>
      <HStack color="gray.400" mt={4}>
        <Divider color="gray.400" bgColor="gray.400" />
        <Text px={4}>OR</Text>
        <Divider bgColor="gray.400" />
      </HStack>
      <Text mt={4} align="center">
        Connect with a third party:
      </Text>
      <Flex mt={3} direction="column" gap={4}>
        <GoogleSigninButton />
        <GithubSigninButton />
      </Flex>
    </Container>
  );
}

export default SignIn;
