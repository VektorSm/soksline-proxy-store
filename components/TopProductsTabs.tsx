"use client";
import { useState } from "react";
import { CATEGORIES, Category } from "../lib/products";

function TabButton({
  active, onClick, label
}: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      role="tab"
      aria-selected={active ? "true" : "false"}
      onClick={onClick}
      style={{
        padding: "10px 16px",
        borderRadius: 10,
        border: "1px solid rgba(0,0,0,0.08)",
        background: active ? "#111" : "#fff",
        color: active ? "#fff" : "#111",
        cursor: "pointer"
      }}
    >
      {label}
    </button>
  );
}

export default function TopProductsTabs() {
  const [active, setActive] = useState<Category["id"]>("isp");
  const current = CATEGORIES.find(c => c.id === active)!;

  return (
    <section style={{ marginTop: 48 }}>
      <h2 style={{ fontSize: 28, marginBottom: 12 }}>Top Products by SoksLine</h2>

      <div role="tablist" aria-label="Product categories" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <TabButton active={active === "isp"} onClick={() => setActive("isp")} label="Static Residential (ISP)" />
        <TabButton active={active === "ipv6"} onClick={() => setActive("ipv6")} label="Static Residential (ISP) IPv6" />
        <TabButton active={active === "rotating"} onClick={() => setActive("rotating")} label="Rotating Residential" />
      </div>

      <div role="tabpanel" aria-live="polite" style={{ marginTop: 20, background: "#fafafa", borderRadius: 14, padding: 16, border: "1px solid rgba(0,0,0,0.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th style={{ padding: "10px 8px" }}>Название</th>
              <th style={{ padding: "10px 8px" }}>Цена</th>
              <th style={{ padding: "10px 8px" }}>Особенности</th>
            </tr>
          </thead>
          <tbody>
            {current.items.map((p, idx) => (
              <tr key={idx} style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <td style={{ padding: "10px 8px" }}>{p.name}</td>
                <td style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>{p.price ?? "—"}</td>
                <td style={{ padding: "10px 8px" }}>
                  {p.features?.join(" · ") ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {current.note && <p style={{ marginTop: 12, color: "#555" }}>{current.note}</p>}
      </div>
    </section>
  );
}
