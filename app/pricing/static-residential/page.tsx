import PricingTemplate from '../../../components/PricingTemplate';
import { STATIC_RESIDENTIAL_PRICING } from '../../../lib/pricing';

export const metadata = {
  title: 'Static Residential Proxy Plans | SoksLine',
  description:
    'Compare SoksLine static residential proxy pricing tiers with unlimited bandwidth and sticky sessions.',
};

export default function Page() {
  return <PricingTemplate data={STATIC_RESIDENTIAL_PRICING} />;
}
