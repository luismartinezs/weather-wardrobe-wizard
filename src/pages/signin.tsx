import { Text, Link } from "@chakra-ui/react";
import { signIn } from "@/firebase/auth";
import NextLink from "next/link";
import SigninRegister from "@/features/auth/components/SigninRegister";
import AuthForm, { type FormData } from "@/features/auth/components/AuthForm";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

function SignIn() {
  const { t } = useTranslation();
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
          buttonText={t("sign_in")}
          title={t("sign_in")}
          redirectOnAuth={redirect || "/"}
        />
      }
      afterFormLink={
        <Link as={NextLink} mt="4" href="/register">
          <Text align="center" color="gray.400" fontSize="sm" mt={2}>
            {t("or_register")}
          </Text>
        </Link>
      }
    />
  );
}

export default SignIn;
