"use client";

import React from "react";
import Tabs from "@/components/ui/Tabs";
import StaticIspCard from "@/components/products/StaticIspCard";
import StaticIpv6Card from "@/components/products/StaticIpv6Card";
import RotatingResidentialCard from "@/components/products/RotatingResidentialCard";
import { useI18n } from "@/lib/i18n";

export default function TopProductsTabs() {
  const { t } = useI18n();
  const tabs = React.useMemo(
    () => [
      { id: "static-isp", label: t("tabs.staticIsp") },
      { id: "static-ipv6", label: t("tabs.staticIpv6") },
      { id: "rotating", label: t("tabs.rotating") },
    ],
    [t]
  );

  return (
    <section
      aria-labelledby="top-products-heading"
      className="py-12"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
        <h2 id="top-products-heading" style={{ fontSize: "2rem", fontWeight: 600, margin: "0 0 1rem" }}>
          {t("topProducts.title", "Top Products by SoksLine")}
        </h2>

        <Tabs
          tabs={tabs}
          idPrefix="top-products"
          renderPanel={(i) => {
            if (i === 0) return <StaticIspCard />;
            if (i === 1) return <StaticIpv6Card />;
            return <RotatingResidentialCard />;
          }}
        />
      </div>
    </section>
  );
}
