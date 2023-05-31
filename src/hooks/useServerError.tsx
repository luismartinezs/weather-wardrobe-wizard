import { useState } from "react";

export function useServerError<T extends (...args: any[]) => Promise<any>>(
  asyncFunction: T
) {
  const [serverError, setServerError] = useState<string | null>(null);

  const wrappedFunction = async (...args: Parameters<T>) => {
    setServerError(null);
    try {
      await asyncFunction(...args);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setServerError(error.message);
      }
    }
  };

  return [wrappedFunction, serverError] as const;
}
