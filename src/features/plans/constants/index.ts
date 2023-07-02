// NOTE Stripe allows to set a list of features, but its API does not provide them
export const featuresMap: Record<string, string[]> = {
  premium: [
    "feat_ai_recommendations",
    // "Weather forecasts up to 16 days",
    // "Unlimited searches",
  ],
};
