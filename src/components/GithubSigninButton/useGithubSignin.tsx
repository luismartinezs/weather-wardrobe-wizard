import { useState } from "react";

import { githubSignUp } from "@/firebase/auth";

type ErrorType = Error | null;

export function useGithubSignin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

  const handleGithubSignUp = async () => {
    setError(null);
    setLoading(true);
    try {
      await githubSignUp();
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
    handleGithubSignUp,
  };
}
