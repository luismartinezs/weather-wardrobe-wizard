import { useEffect } from "react";
import { useRouter } from "next/router";

import { Flex, Spinner } from "@chakra-ui/react";

import { useUser } from "@/context/User";

// This component is used to protect routes that require authentication. If the user is not authenticated, they will be redirected to the sign in page.
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, idle } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && !idle) {
      router.push("/signin");
    }
  }, [loading, user, router, idle]);

  if (idle || loading || !user) {
    return (
      <Flex w="100%" justify="center" align="center" my={8}>
        <Spinner />
      </Flex>
    );
  }

  return <>{children}</>;
};

export default AuthRoute;
