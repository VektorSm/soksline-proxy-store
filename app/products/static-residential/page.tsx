import ProductTemplate from "../../../components/ProductTemplate";
import { STATIC_RESIDENTIAL_PAGE } from "../../../lib/productPages";

export const metadata = {
  title: "Static Residential IPv6 Proxies | SoksLine",
  description:
    "Scale automation with Static Residential IPv6 proxies featuring unlimited bandwidth, dashboard management, and granular geo control."
};

export default function Page() {
  return <ProductTemplate data={STATIC_RESIDENTIAL_PAGE} />;
}
