import { Suspense } from 'react';

import OrderPageContent from './OrderPageContent';

export const metadata = {
  title: 'SoksLine — Order residential proxies',
  description:
    'Compare residential proxy products and jump to checkout with data synced from the latest SoksLine pricing tiers.',
};

export default function Page() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <Suspense fallback={null}>
        <OrderPageContent />
      </Suspense>
    </main>
  );
}
