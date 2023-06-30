import { payments } from "@/firebase/payments";
import {
  SessionCreateParams,
  createCheckoutSession,
} from "@stripe/firestore-stripe-payments";
import { useState } from "react";

export function useCheckout(params: SessionCreateParams) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const checkout = async () => {
    setError(null);
    setLoading(true);
    try {
      const session = await createCheckoutSession(payments, params);
      setLoading(false);
      window.location.assign(session.url);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err);
      }
      console.error(err);
    }
  };
  return {
    loading,
    error,
    checkout,
  };
}
