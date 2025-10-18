import { Suspense } from 'react';

import OrderPageContent from '../order/OrderPageContent';

export const metadata = {
  title: 'SoksLine — Checkout',
  description:
    'Configure your SoksLine proxy plan, review the order summary, and proceed to payment with synced pricing details.',
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
