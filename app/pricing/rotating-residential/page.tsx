import PricingTemplate from "../../../components/PricingTemplate";
import { ROTATING_RESIDENTIAL_PRICING } from "../../../lib/pricing";

export const metadata = {
  title: "Rotating Residential Proxy Pricing | SoksLine",
  description: "Discover SoksLine rotating residential proxy packages with global coverage and flexible billing.",
};

export default function Page() {
  return <PricingTemplate data={ROTATING_RESIDENTIAL_PRICING} />;
}
