import PricingTemplate from "../../../components/PricingTemplate";
import { STATIC_IPV6_PRICING } from "../../../lib/pricing";

export const metadata = {
  title: "Static Residential IPv6 Proxy Pricing | SoksLine",
  description: "Choose the right IPv6 static residential proxy package from SoksLine with monthly or yearly billing.",
};

export default function Page() {
  return <PricingTemplate data={STATIC_IPV6_PRICING} />;
}
