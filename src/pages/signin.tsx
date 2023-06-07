import { Text, Link } from "@chakra-ui/react";
import { signIn } from "@/firebase/auth";
import NextLink from "next/link";
import SigninRegister from "@/components/SigninRegister";
import AuthForm, { type FormData } from "@/components/AuthForm";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

function SignIn() {
  useAuthRedirect();

  const onSubmit = async (data: FormData) => {
    const res = await signIn(data.email, data.password);
    console.debug("signin", res);
    return res;
  };

  return (
    <SigninRegister
      form={
        <AuthForm onSubmit={onSubmit} buttonText="Sign in" title="Sign in" />
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
