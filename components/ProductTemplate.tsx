"use client";

import Link from "next/link";
import type { LocalizedProductPage } from "../lib/productPages";
import { useLocale } from "./LocaleContext";
import styles from "./ProductTemplate.module.css";

type ProductTemplateProps = {
  data: LocalizedProductPage;
  cardsVariant?: "default" | "compact";
};

export default function ProductTemplate({ data, cardsVariant = "default" }: ProductTemplateProps) {
  const { locale } = useLocale();
  const copy = data[locale];
  const cardsClassName = `${styles.cards} ${
    cardsVariant === "compact" ? styles.cardsCompact : ""
  }`.trim();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          {copy.hero.eyebrow && <p className={styles.heroEyebrow}>{copy.hero.eyebrow}</p>}
          <h1 className={styles.heroTitle}>{copy.hero.title}</h1>
          <p className={styles.heroDescription}>{copy.hero.description}</p>

          <div className={styles.heroActions}>
            <Link href={copy.hero.cta.href} className={styles.primaryCta} target="_blank" rel="noopener">
              {copy.hero.cta.label}
            </Link>
          </div>

          {copy.hero.metrics.length > 0 && (
            <dl className={styles.metrics}>
              {copy.hero.metrics.map(metric => {
                const values = Array.isArray(metric.value) ? metric.value : [metric.value];

                return (
                  <div key={metric.label} className={styles.metricCard}>
                    <dt className={styles.metricLabel}>{metric.label}</dt>
                    <dd className={styles.metricValue}>
                      {values.map((line, index) => (
                        <span key={`${metric.label}-${index}`} className={styles.metricValueLine}>
                          {line}
                        </span>
                      ))}
                    </dd>
                  </div>
                );
              })}
            </dl>
          )}
        </div>
      </section>

      <section className={styles.offers}>
        <div className={styles.offersInner}>
          <header className={styles.offersHeader}>
            <h2 className={styles.offersTitle}>{copy.offers.title}</h2>
            {copy.offers.description && <p className={styles.offersDescription}>{copy.offers.description}</p>}
          </header>

          <div className={cardsClassName}>
            {copy.offers.plans.map(plan => (
              <article
                key={plan.id}
                className={`${styles.card} ${plan.badge ? styles.cardFeatured : ""}`.trim()}
              >
                <header className={styles.cardHeader}>
                  <div className={styles.cardTitleRow}>
                    <h3 className={styles.cardTitle}>{plan.name}</h3>
                    {plan.badge && <span className={styles.cardBadge}>{plan.badge}</span>}
                  </div>
                  <div className={styles.cardPriceBlock}>
                    {plan.priceLabel && <span className={styles.cardPriceLabel}>{plan.priceLabel}</span>}
                    <p className={styles.cardPrice}>
                      {plan.compareAt && <span className={styles.cardCompareAt}>{plan.compareAt}</span>}
                      <span className={styles.cardPriceValue}>{plan.price}</span>
                      {plan.period && <span className={styles.cardPricePeriod}>{plan.period}</span>}
                    </p>
                  </div>
                </header>

                {plan.summary && <p className={styles.cardSummary}>{plan.summary}</p>}

                <ul className={styles.cardFeatures}>
                  {plan.features.map(feature => {
                    const included = feature.included ?? true;
                    return (
                      <li
                        key={feature.label}
                        className={`${styles.cardFeature} ${
                          included ? styles.featureIncluded : styles.featureExcluded
                        }`}
                      >
                        <span className={styles.featureIcon} aria-hidden="true">
                          {included ? "✓" : "✕"}
                        </span>
                        <span>{feature.label}</span>
                      </li>
                    );
                  })}
                </ul>

                <Link href={plan.ctaHref} className={styles.cardCta} target="_blank" rel="noopener">
                  {plan.ctaLabel}
                </Link>
              </article>
            ))}
          </div>

          {copy.offers.note && <p className={styles.offersNote}>{copy.offers.note}</p>}
        </div>
      </section>
    </main>
  );
}
