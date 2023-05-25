import React from "react";
import { type User } from "firebase/auth";
import { useAuthUser } from "@/hooks/useAuthUser";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Flex, Spinner } from "@chakra-ui/react";

export const AuthContext = React.createContext<{
  user: User | null;
}>({
  user: null,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, loading } = useAuthUser();

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <Flex h="100vh" w="100%" justify="center" align="center">
          <Spinner color="primary.500" size="lg" speed="0.8s" thickness="4px" />
        </Flex>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
