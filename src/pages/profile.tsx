import EditPassword from "@/components/EditPassword";
import EditProfile from "@/components/EditProfile";
import SignoutButton from "@/components/SignoutButton";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Box, Container, Divider, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const { user } = useAuthUser();

  const providerId = user?.providerData[0]?.providerId;

  if (!user) {
    router.push("/signin");
  }

  return (
    <Container maxW="container.sm">
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
    </Container>
  );
}
