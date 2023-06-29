export function getCurrency(
  price: number,
  currency: string = "EUR",
  locale: Parameters<typeof Intl.NumberFormat>[0] = "en",
  options: Parameters<typeof Intl.NumberFormat>[1] = {}
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: "compact",
    ...options,
  }).format(price);
}
