import { getStripePayments } from "@stripe/firestore-stripe-payments";

import { app } from "@/firebase/app";

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

export { payments };
