import { useEffect, useState } from "react";
import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from "@stripe/firestore-stripe-payments";
import { User } from "firebase/auth";
import { payments } from "@/firebase/payments";

function useSubscription(user: User | null) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) return;

    onCurrentUserSubscriptionUpdate(
      payments,
      (snapshot) => {
        setSubscription(
          snapshot.subscriptions.filter(
            (subscription) =>
              subscription.status === "active" ||
              subscription.status === "trialing"
          )[0]
        );
      },
      (err) => setError(err)
    );
  }, [user]);

  return { subscription, error };
}

export default useSubscription;
