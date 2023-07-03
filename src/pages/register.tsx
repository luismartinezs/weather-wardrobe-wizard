import { Text, Link } from "@chakra-ui/react";
import { signUp } from "@/firebase/auth";
import NextLink from "next/link";
import SigninRegister from "@/features/auth/components/SigninRegister";
import AuthForm, { type FormData } from "@/features/auth/components/AuthForm";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export { commonGetServerSideProps as getServerSideProps } from "@/utils/commonGetServerSideProps";

function Register() {
  const { t } = useTranslation();
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
          buttonText={t("create_new_user")}
          title={t("register")}
          type="register"
          redirectOnAuth={redirect || "/"}
        />
      }
      afterFormLink={
        <Link as={NextLink} mt="4" href="/signin">
          <Text align="center" color="gray.400" fontSize="sm" mt={2}>
            {t("or_sign_in")}
          </Text>
        </Link>
      }
    />
  );
}

export default Register;
