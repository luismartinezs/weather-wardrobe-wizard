import { Text, Link } from "@chakra-ui/react";
import { signUp } from "@/firebase/auth";
import NextLink from "next/link";
import SigninRegister from "@/components/SigninRegister";
import AuthForm, { type FormData } from "@/components/AuthForm";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

function Register() {
  useAuthRedirect();

  const onSubmit = (data: FormData) => {
    signUp(data.email, data.password);
  };

  return (
    <SigninRegister
      form={
        <AuthForm
          onSubmit={onSubmit}
          buttonText="Create new user"
          title="Register"
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