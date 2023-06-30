import { getStripePayments } from "@stripe/firestore-stripe-payments";

import { app, functions } from "@/firebase/app";
import { httpsCallable } from "firebase/functions";

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

const goToBillingPortal = async () => {
  const functionRef = httpsCallable(
    functions,
    "ext-firestore-stripe-payments-createPortalLink"
  );

  await functionRef({
    returnUrl: `${window.location.origin}/profile`,
  })
    .then(({ data }: any) => window.location.assign(data.url))
    .catch((error) => console.log(error.message));
};

export { payments, goToBillingPortal };
