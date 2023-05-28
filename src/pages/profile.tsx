import SignoutButton from "@/components/SignoutButton";
import { useAuthContext } from "@/context/AuthContext";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const { user } = useAuthContext();

  if (!user) {
    router.push("/signin");
  }

  return (
    <Box>
      <Text fontSize="xl">Hello {user?.displayName || user?.email}!</Text>
      <Box mt={2}>
        <SignoutButton />
      </Box>
    </Box>
  );
}
