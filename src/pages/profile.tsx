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

export default function Profile() {
  const { user } = useUser();

  const providerId = user?.providerData[0]?.providerId;

  return (
    <Container maxW="container.sm">
      <AuthRoute>
        <Heading as="h1" size="lg">
          Profile
        </Heading>
        <Text fontSize="xl" mt={4}>
          Hello {user?.displayName || user?.email}!
        </Text>
        <Box mt={2}>
          <SignoutButton />
        </Box>
        {providerId === "password" ? (
          <>
            <Divider my={4} />
            <EditProfile />
            <Divider my={4} />
            <EditPassword />
          </>
        ) : (
          <Text mt={4}>You are signed in with {providerId}</Text>
        )}
        <Divider my={4} />
        <Card color="red" borderColor="red" border="1px">
          <CardHeader pb={2}>
            <Heading as="h2" size="md">
              Danger zone
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
