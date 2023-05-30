import React, { createContext, useContext } from "react";
import { type User } from "firebase/auth";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Flex, Spinner } from "@chakra-ui/react";

export const AuthContext = createContext<{
  user: User | null;
  refreshUser: () => Promise<void>;
  loading: boolean;
}>({
  user: null,
  refreshUser: async () => {},
  loading: false,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, loading, refreshUser } = useAuthUser();

  return (
    <AuthContext.Provider value={{ user, refreshUser, loading }}>
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
