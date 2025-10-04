"use client";

import React from "react";
import Tabs from "@/components/ui/Tabs";
import StaticIspCard from "@/components/products/StaticIspCard";
import StaticIpv6Card from "@/components/products/StaticIpv6Card";
import RotatingResidentialCard from "@/components/products/RotatingResidentialCard";

const TABS = [
  { id: "static-isp", label: "Static Residential (ISP)" },
  { id: "static-ipv6", label: "Static Residential (ISP) IPv6" },
  { id: "rotating", label: "Rotating Residential" },
];

export default function TopProductsTabs() {
  return (
    <section
      aria-labelledby="top-products-heading"
      className="py-12"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
        <h2 id="top-products-heading" style={{ fontSize: "2rem", fontWeight: 600, margin: "0 0 1rem" }}>
          Top Products by SoksLine
        </h2>

        <Tabs
          tabs={TABS}
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
