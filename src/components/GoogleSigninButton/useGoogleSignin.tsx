import { useState } from "react";

import { googleSignUp } from "@/firebase/auth";

type ErrorType = Error | null;

export function useGoogleSignin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

  const handleGoogleSignUp = async () => {
    setError(null);
    setLoading(true);
    try {
      await googleSignUp();
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
    handleGoogleSignUp,
  };
}
