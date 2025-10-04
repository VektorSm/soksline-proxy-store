import ProductTemplate from '../../../components/ProductTemplate';
import { ISP_PRODUCT_PAGE } from '../../../lib/productPages';

export const metadata = {
  title: 'Static ISP Proxies | SoksLine',
  description:
    'Enterprise ISP proxy pools with high uptime, instant provisioning, and unlimited bandwidth for advertising, automation, and scraping.',
};

export default function Page() {
  return <ProductTemplate data={ISP_PRODUCT_PAGE} />;
}
