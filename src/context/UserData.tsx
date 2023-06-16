// NOTE user data is generated on user creation by firebase cloud function using extension rowy/firestore-user-document
import React, { useContext, createContext } from "react";
import { useUserData } from "@/hooks/useUserData";

const UserDataContext = createContext<ReturnType<typeof useUserData>>({
  loading: false,
  error: null,
  data: null,
});

export const UserDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userData = useUserData();

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserDataContext = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
