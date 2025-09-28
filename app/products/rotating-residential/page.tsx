import ProductTemplate from "../../../components/ProductTemplate";
import { ROTATING_RESIDENTIAL_PAGE } from "../../../lib/productPages";

export const metadata = {
  title: "Rotating Residential Proxies | SoksLine",
  description:
    "Rotating residential proxy pools with 85M+ IPs, flexible rotation, and granular country targeting for data collection and automation."
};

export default function Page() {
  return <ProductTemplate data={ROTATING_RESIDENTIAL_PAGE} />;
}
