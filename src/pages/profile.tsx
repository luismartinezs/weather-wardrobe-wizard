import AuthRoute from "@/features/auth/components/AuthRoute";
import DeleteAccount from "@/features/user-profile/components/DeleteAccount";
import EditPassword from "@/features/user-profile/components/EditPassword";
import EditProfile from "@/features/user-profile/components/EditProfile";
import SignoutButton from "@/features/auth/components/SignoutButton";
import { useUser } from "@/features/auth/context/User";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
import SubscriptionPlanInfo from "@/features/plans/components/SubscriptionPlanInfo";
import { useTranslation } from "next-i18next";

export { commonGetServerSideProps as getServerSideProps } from "@/utils/commonGetServerSideProps";

export default function Profile() {
  const { t } = useTranslation();
  const { user } = useUser();

  const providerId = user?.providerData[0]?.providerId;

  return (
    <Container maxW="container.sm">
      <AuthRoute>
        <Heading as="h1" size="lg">
          {t("profile")}
        </Heading>
        <Text fontSize="xl" mt={4}>
          {t("hello")} {user?.displayName || user?.email}!
        </Text>
        <SubscriptionPlanInfo />
        {providerId === "password" ? (
          <>
            <Divider my={4} />
            <EditProfile />
            <Divider my={4} />
            <EditPassword />
          </>
        ) : (
          <Text mt={4}>
            {t("signed_in_with")} {providerId}
          </Text>
        )}
        <Box mt={4}>
          <SignoutButton />
        </Box>
        <Divider my={4} />
        <Card color="red" borderColor="red" border="1px">
          <CardHeader pb={2}>
            <Heading as="h2" size="md">
              {t("danger_zone")}
            </Heading>
          </CardHeader>
          <CardBody>
            <DeleteAccount />
          </CardBody>
        </Card>
      </AuthRoute>
    </Container>
  );
}
