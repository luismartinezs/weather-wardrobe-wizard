import { Text, Link } from "@chakra-ui/react";
import { signIn } from "@/firebase/auth";
import NextLink from "next/link";
import SigninRegister from "@/features/auth/components/SigninRegister";
import AuthForm, { type FormData } from "@/features/auth/components/AuthForm";
import { useRouter } from "next/router";

function SignIn() {
  const { query } = useRouter();
  const redirect = Array.isArray(query.redirect)
    ? query.redirect[0]
    : query.redirect || "/";

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
          redirectOnAuth={redirect || "/"}
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
