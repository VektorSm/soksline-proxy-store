"use client";

import Link from "next/link";
import { KYC_POLICY } from "../config/site";
import { useI18n } from "../lib/i18n";
import styles from "./ProductTemplate.module.css";

type ProductMetric = {
  label: string;
  value: string;
};

type ProductSection = {
  title: string;
  body: string;
};

type ProductHero = {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref: string;
  metrics: ProductMetric[];
};

type ProductPageContent = {
  hero: ProductHero;
  sectionsTitle: string;
  sections: ProductSection[];
};

type ProductTemplateProps = {
  pageKey: string;
};

export default function ProductTemplate({ pageKey }: ProductTemplateProps) {
  const { locale, t } = useI18n();
  const content = t<ProductPageContent>(`productPages.${pageKey}`);
  const kycPolicy = locale === "ru" ? KYC_POLICY : t<string>("kyc.policy");
  const ctaLabel = content.hero.ctaLabel ?? t("buttons.buy");

  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>{content.hero.title}</h1>
          <p className={styles.heroDescription}>{content.hero.description}</p>

          <div className={styles.heroActions}>
            <Link href={content.hero.ctaHref} className={styles.primaryButton}>
              {ctaLabel}
            </Link>
          </div>

          {content.hero.metrics.length > 0 && (
            <div className={styles.metrics}>
              {content.hero.metrics.map(metric => (
                <div key={metric.label} className={styles.metricCard}>
                  <p className={styles.metricLabel}>{metric.label}</p>
                  <p className={styles.metricValue}>{metric.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.bodySection}>
        <div className={styles.bodyInner}>
          <h2 className={styles.sectionTitle}>{content.sectionsTitle}</h2>
          <div className={styles.featureGrid}>
            {content.sections.map(section => (
              <article key={section.title} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{section.title}</h3>
                <p className={styles.featureText}>{section.body}</p>
              </article>
            ))}
          </div>
          <p className={styles.kycNote}>{kycPolicy}</p>
        </div>
      </section>
    </div>
  );
}
