"use client";

import Link from "next/link";
import { useI18n } from "../../lib/i18n";
import styles from "./page.module.css";

export const metadata = {
  title: "Pricing | SoksLine",
  description: "Compare SoksLine Static ISP, Static IPv6, and Rotating Residential proxy plans.",
};

type PricingSummary = {
  title: string;
  subtitle: string;
  highlight: string;
};

const PAGES: Array<{ key: string; href: string }> = [
  { key: "staticResidential", href: "/pricing/static-residential" },
  { key: "staticResidentialIpv6", href: "/pricing/static-residential-ipv6" },
  { key: "rotatingResidential", href: "/pricing/rotating-residential" },
];

export default function Page() {
  const { t } = useI18n();

  const overview = t<{ title: string; subtitle: string }>("pricingOverview");

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>{overview.title}</h1>
          <p className={styles.subtitle}>{overview.subtitle}</p>
        </header>

        <div className={styles.grid}>
          {PAGES.map(page => {
            const data = t<PricingSummary>(`pricingPages.${page.key}`);
            return (
              <article key={page.key} className={styles.card}>
                <h2 className={styles.cardTitle}>{data.title}</h2>
                <p className={styles.cardText}>{data.subtitle}</p>
                <p className={styles.cardText}>{data.highlight}</p>
                <Link href={page.href} className={styles.cardLink}>
                  {t("buttons.viewDetails")}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
