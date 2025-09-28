import Link from "next/link";
import type { ProductPageData } from "../lib/productPages";
import styles from "./ProductTemplate.module.css";

type ProductTemplateProps = {
  data: ProductPageData;
};

export default function ProductTemplate({ data }: ProductTemplateProps) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          {data.hero.eyebrow && <p className={styles.heroEyebrow}>{data.hero.eyebrow}</p>}
          <h1 className={styles.heroTitle}>{data.hero.title}</h1>
          <p className={styles.heroDescription}>{data.hero.description}</p>

          <div className={styles.heroActions}>
            <Link href={data.hero.cta.href} className={styles.primaryCta} target="_blank" rel="noopener">
              {data.hero.cta.label}
            </Link>
          </div>

          {data.hero.metrics.length > 0 && (
            <dl className={styles.metrics}>
              {data.hero.metrics.map(metric => (
                <div key={metric.label} className={styles.metricCard}>
                  <dt className={styles.metricLabel}>{metric.label}</dt>
                  <dd className={styles.metricValue}>{metric.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section className={styles.offers}>
        <div className={styles.offersInner}>
          <header className={styles.offersHeader}>
            <h2 className={styles.offersTitle}>{data.offers.title}</h2>
            {data.offers.description && <p className={styles.offersDescription}>{data.offers.description}</p>}
          </header>

          <div className={styles.cards}>
            {data.offers.plans.map(plan => (
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

          {data.offers.note && <p className={styles.offersNote}>{data.offers.note}</p>}
        </div>
      </section>
    </main>
  );
}
