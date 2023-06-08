import { Text, Link } from "@chakra-ui/react";
import { signUp } from "@/firebase/auth";
import NextLink from "next/link";
import SigninRegister from "@/components/SigninRegister";
import AuthForm, { type FormData } from "@/components/AuthForm";

function Register() {
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
          redirectOnAuth="/"
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
