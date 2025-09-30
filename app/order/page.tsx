import { Suspense } from "react";

import OrderConfigurator from "./OrderConfigurator";

export const metadata = {
  title: "SoksLine — Configure your proxy order",
  description:
    "Choose a SoksLine proxy service, plan, geo targeting, and billing preferences before completing your purchase.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OrderConfigurator />
    </Suspense>
  );
}
