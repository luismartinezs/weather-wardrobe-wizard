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
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function SignIn() {
  const router = useRouter();
  const { user } = useAuthContext();

  if (user) {
    const { redirect } = router.query;
    const _redirect = Array.isArray(redirect) ? redirect[0] : redirect;

    router.push(_redirect || "/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await signIn(data.email, data.password);
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
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" {...register("email")} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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
