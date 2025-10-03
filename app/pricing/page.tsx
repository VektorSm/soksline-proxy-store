import type { Metadata } from "next";
import PricingOverview from "./PricingOverview";

export const metadata: Metadata = {
  title: "Pricing | SoksLine",
  description: "Compare SoksLine Static ISP, Static IPv6, and Rotating Residential proxy plans.",
};

export default function Page() {
  return <PricingOverview />;
}
