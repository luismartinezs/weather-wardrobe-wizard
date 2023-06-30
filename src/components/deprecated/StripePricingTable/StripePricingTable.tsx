import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": any;
    }
  }
}

type Mode = "test" | "live";

const StripePricingTable = ({ mode = "test" }: { mode: Mode }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  if (mode === "test") {
    return (
      <stripe-pricing-table
        pricing-table-id="prctbl_1NOIy7H7Vb9FHzCiO3AOb78d"
        publishable-key="pk_test_51LSlJeH7Vb9FHzCi6g4785zyHp7oqhDXSVGSTsAuHSxTp16Ki9bziMUI4UhkGDEOK8NcxHn1qREpOtEKLk1jJAz300utZW4tWM"
      ></stripe-pricing-table>
    );
  }
  return (
    <stripe-pricing-table
      pricing-table-id="prctbl_1NOIp0H7Vb9FHzCiYNFxBD0T"
      publishable-key="pk_live_51LSlJeH7Vb9FHzCi7OsCdRxLdAvXUp3BkgUZRIik1B8XIsTYq2VtXRes8cOlliFZAX2gVIQR5QGqR1YhKeTLp04K00qVSoUKAn"
    ></stripe-pricing-table>
  );
};

export default StripePricingTable;
