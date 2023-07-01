import { Text, Link } from "@chakra-ui/react";
import { signUp } from "@/firebase/auth";
import NextLink from "next/link";
import SigninRegister from "@/features/auth/components/SigninRegister";
import AuthForm, { type FormData } from "@/features/auth/components/AuthForm";
import { useRouter } from "next/router";

function Register() {
  const { query } = useRouter();
  const redirect = Array.isArray(query.redirect)
    ? query.redirect[0]
    : query.redirect || "/";

  const onSubmit = async (data: FormData) => {
    return signUp(data.email, data.password, data.displayName);
  };

  return (
    <SigninRegister
      form={
        <AuthForm
          onSubmit={onSubmit}
          buttonText="Create new user"
          title="Register"
          type="register"
          redirectOnAuth={redirect || "/"}
        />
      }
      afterFormLink={
        <Link as={NextLink} mt="4" href="/signin">
          <Text align="center" color="gray.400" fontSize="sm" mt={2}>
            Or sign in as an existing user
          </Text>
        </Link>
      }
    />
  );
}

export default Register;
