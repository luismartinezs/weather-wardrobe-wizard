import React from "react";
import { type User } from "firebase/auth";
import { useAuthUser } from "@/hooks/useAuthUser";

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
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
