import PricingTemplate from '@/components/PricingTemplate';
import { STATIC_RESIDENTIAL_PRICING } from '@/lib/pricing';

export default function PricingPage() {
  return <PricingTemplate data={STATIC_RESIDENTIAL_PRICING} />;
}
