"use client";

import Link from "next/link";
import { useMemo } from "react";
import { KYC_POLICY, PRICING_MODE } from "../config/site";
import { useI18n } from "../lib/i18n";
import styles from "./PricingTemplate.module.css";

const FEATURE_PLACEHOLDER = "{kycPolicy}";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

type PricingTier = {
  id: string;
  name: string;
  price?: number;
  period?: string;
  pricingMode?: string;
  quantity?: number;
  pricePerGb?: number;
  features: string[];
  ctaHref: string;
};

type PricingCategory = {
  id: string;
  label: string;
  tiers: PricingTier[];
};

type PricingPageContent = {
  title: string;
  subtitle: string;
  highlight: string;
  categories: PricingCategory[];
  paymentNote: string;
  paymentMethods: string[];
};

type PricingTemplateProps = {
  pageKey: string;
};

function getPriceLabel(tier: PricingTier) {
  if (tier.pricingMode === PRICING_MODE && tier.quantity && tier.pricePerGb) {
    const total = tier.quantity * tier.pricePerGb;
    return `${tier.quantity} GB — ${currencyFormatter.format(tier.pricePerGb)}/GB (Total ${currencyFormatter.format(total)})`;
  }

  if (typeof tier.price === "number") {
    const value = currencyFormatter.format(tier.price);
    return tier.period ? `${value} ${tier.period}` : value;
  }

  return "";
}

export default function PricingTemplate({ pageKey }: PricingTemplateProps) {
  const { locale, t } = useI18n();
  const content = t<PricingPageContent>(`pricingPages.${pageKey}`);
  const kycPolicy = locale === "ru" ? KYC_POLICY : t<string>("kyc.policy");
  const buyLabel = t<string>("buttons.buy");

  const categories = useMemo(() => content.categories ?? [], [content.categories]);

  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <p className={styles.heroHighlight}>{content.highlight}</p>
          <h1 className={styles.heroTitle}>{content.title}</h1>
          <p className={styles.heroSubtitle}>{content.subtitle}</p>
        </div>
      </section>

      <section className={styles.bodySection}>
        <div className={styles.bodyInner}>
          {categories.map(category => (
            <div key={category.id}>
              <h2 className={styles.sectionTitle}>{category.label}</h2>
              <div className={styles.cardGrid}>
                {category.tiers.map(tier => (
                  <article key={tier.id} className={styles.planCard}>
                    <div>
                      <h3 className={styles.planName}>{tier.name}</h3>
                      <p className={styles.planPrice}>{getPriceLabel(tier)}</p>
                    </div>
                    <ul className={styles.planFeatures}>
                      {tier.features.map(feature => {
                        const text = feature.includes(FEATURE_PLACEHOLDER)
                          ? feature.replace(FEATURE_PLACEHOLDER, kycPolicy)
                          : feature;
                        return <li key={`${tier.id}-${feature}`}>{text}</li>;
                      })}
                    </ul>
                    <Link href={tier.ctaHref} className={styles.planCta}>
                      {buyLabel}
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ))}

          <div className={styles.footer}>
            <p className={styles.sectionSubtitle}>{content.paymentNote}</p>
            <div className={styles.paymentMethods}>
              {content.paymentMethods.map(method => (
                <span key={method} className={styles.paymentChip}>
                  {method}
                </span>
              ))}
            </div>
            <p className={styles.kycNote}>{kycPolicy}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
