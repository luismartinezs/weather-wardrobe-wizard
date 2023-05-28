import SignoutButton from "@/components/SignoutButton";
import { useAuthContext } from "@/context/AuthContext";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const { user } = useAuthContext();

  if (!user) {
    router.push("/signin");
  }

  return (
    <Box>
      <Heading as="h1" size="lg">
        Profile
      </Heading>
      <Text fontSize="xl" mt={4}>
        Hello {user?.displayName || user?.email}!
      </Text>
      <Box mt={2}>
        <SignoutButton />
      </Box>
    </Box>
  );
}
