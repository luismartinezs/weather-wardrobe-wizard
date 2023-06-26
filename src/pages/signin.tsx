import { Text, Link } from "@chakra-ui/react";
import { signIn } from "@/firebase/auth";
import NextLink from "next/link";
import SigninRegister from "@/features/auth/components/SigninRegister";
import AuthForm, { type FormData } from "@/features/auth/components/AuthForm";

function SignIn() {
  const onSubmit = async (data: FormData) => {
    return signIn(data.email, data.password);
  };

  return (
    <SigninRegister
      form={
        <AuthForm
          onSubmit={onSubmit}
          buttonText="Sign in"
          title="Sign in"
          redirectOnAuth="/"
        />
      }
      afterFormLink={
        <Link as={NextLink} mt="4" href="/register">
          <Text align="center" color="gray.400" fontSize="sm" mt={2}>
            Or register as a new user
          </Text>
        </Link>
      }
    />
  );
}

export default SignIn;
