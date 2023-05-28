import { useAuthContext } from "@/context/AuthContext";
import { signIn } from "@/firebase/auth";
import { useState } from "react";

type ErrorType = Error | null;

export const useSignin = (name: string, password: string) => {
  const { auth } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

  const handleSignin = async () => {
    setError(null);
    setLoading(true);
    try {
      await signIn(auth, name, password);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSignin,
  };
};
