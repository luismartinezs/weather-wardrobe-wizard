import { useUser } from "@/features/auth/context/User";
import { UserData } from "@/firebase/firestore/user";
import { useUserData } from "@/features/user-profile/hooks/useUserData";

// NOTE use this hook as an adapter for data that can come from the firestore database if the user is authenticated, or from the client store if the user is not authenticated
export function useDataStoreAdapter<ReturnType = Record<string, unknown>>({
  useClientCallback,
  useServerCallback,
}: {
  useClientCallback: () => ReturnType;
  useServerCallback: (id?: string, userData?: UserData | null) => ReturnType;
}): ReturnType {
  const { user } = useUser();
  const { data: userData } = useUserData();

  const clientData = useClientCallback();
  let serverData;

  serverData = useServerCallback(user?.uid, userData);

  return user && serverData !== undefined ? serverData : clientData;
}
