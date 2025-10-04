"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PricingCategory, LocalizedPricingPage } from "../lib/pricing";
import { rotatingPricing } from "../config/pricing";
import { fmtUSD, normalizeTier } from "../lib/money";
import { useLocale } from "./LocaleContext";
import type { Locale } from "./LocaleContext";
import styles from "./PricingTemplate.module.css";
import KycNotice from "./KycNotice";
import Section from "@/components/layout/Section";

type PricingTemplateProps = {
  data: LocalizedPricingPage;
};

const CTA_FALLBACK: Record<Locale, string> = {
  ru: "Купить",
  en: "Buy Now",
};

const TOGGLE_ARIA_LABEL: Record<Locale, string> = {
  ru: "Варианты тарифов",
  en: "Pricing options",
};

const PAYMENTS_ARIA_LABEL: Record<Locale, string> = {
  ru: "Поддерживаемые способы оплаты",
  en: "Supported payment methods",
};

function resolveInitialCategory(categories: PricingCategory[]): string {
  return categories[0]?.id ?? "";
}

export default function PricingTemplate({ data }: PricingTemplateProps) {
  const { locale } = useLocale();
  const copy = data[locale];
  const [activeCategoryId, setActiveCategoryId] = useState<string>(() => resolveInitialCategory(copy.categories));

  const activeCategory = useMemo(
    () => copy.categories.find(category => category.id === activeCategoryId) ?? copy.categories[0],
    [copy.categories, activeCategoryId]
  );

  const isRotatingPricingPage = copy.slug === "rotating-residential";
  const rotatingTierMap = useMemo(() => {
    if (!isRotatingPricingPage) {
      return new Map<string, ReturnType<typeof normalizeTier>>();
    }

    return new Map(rotatingPricing.tiers.map(tier => [tier.id, normalizeTier(tier)]));
  }, [isRotatingPricingPage]);

  const getLinkProps = (href: string) => {
    if (/^https?:\/\//i.test(href)) {
      return { target: "_blank", rel: "noopener" as const };
    }

    return {};
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroHighlight}>{copy.highlight}</p>
          <h1 className={styles.heroTitle}>{copy.title}</h1>
          <p className={styles.heroSubtitle}>{copy.subtitle}</p>

          {copy.categories.length > 1 && (
            <div className={styles.toggle} role="tablist" aria-label={TOGGLE_ARIA_LABEL[locale]}>
              {copy.categories.map(category => {
                const isActive = category.id === activeCategory?.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.toggleButton} ${isActive ? styles.toggleButtonActive : ""}`}
                    onClick={() => setActiveCategoryId(category.id)}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Section bg="white" containerClassName={styles.plansSection}>
        <div className={styles.cardsGrid}>
          {activeCategory?.tiers.map(tier => {
            const ribbonPlacement = tier.ribbonPlacement ?? "top";
            const renderRibbon = (placement: "top" | "bottom") =>
              tier.ribbon ? (
                <span
                  className={`${styles.planRibbon} ${
                    placement === "top" ? styles.planRibbonTop : styles.planRibbonBottom
                  }`}
                >
                  {tier.ribbon}
                </span>
              ) : null;
            const normalizedRotatingTier =
              isRotatingPricingPage && activeCategory?.id === "bandwidth"
                ? rotatingTierMap.get(tier.id)
                : undefined;

            return (
              <article key={tier.id} className={styles.planCard}>
                {ribbonPlacement === "top" && renderRibbon("top")}
                <div className={styles.planBody}>
                  <div className={styles.planHeader}>
                    <h2 className={styles.planName}>{tier.name}</h2>
                    {tier.subLabel && <p className={styles.planSubLabel}>{tier.subLabel}</p>}
                    {tier.headline && <p className={styles.planHeadline}>{tier.headline}</p>}
                  </div>
                  <p className={styles.planPrice}>
                    {normalizedRotatingTier ? (
                      <span className={styles.rotatingPriceLabel}>
                        {normalizedRotatingTier.gb} GB — {fmtUSD(Number(normalizedRotatingTier.pricePerGbText))}/GB (Total {fmtUSD(normalizedRotatingTier.total)})
                      </span>
                    ) : (
                      <>
                        <span className={styles.planPriceValue}>{tier.price}</span>
                        <span className={styles.planPricePeriod}>{tier.period}</span>
                      </>
                    )}
                  </p>
                  <ul className={styles.planFeatures}>
                    {tier.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <KycNotice className={styles.planKycNotice} inline locale={locale} />
                </div>
                <div className={styles.planFooter}>
                  <Link
                    href={tier.ctaHref}
                    className={styles.planCta}
                    {...getLinkProps(tier.ctaHref)}
                  >
                    {tier.ctaLabel ?? CTA_FALLBACK[locale]}
                  </Link>
                  {ribbonPlacement === "bottom" && renderRibbon("bottom")}
                </div>
              </article>
            );
          })}
        </div>

        <footer className={styles.footer}>
          <p className={styles.paymentNote}>{copy.paymentNote}</p>
          <div className={styles.paymentMethods} aria-label={PAYMENTS_ARIA_LABEL[locale]}>
            {copy.paymentMethods.map(method => (
              <span key={method} className={styles.paymentChip}>
                {method}
              </span>
            ))}
          </div>
        </footer>
      </Section>
    </div>
  );
}
