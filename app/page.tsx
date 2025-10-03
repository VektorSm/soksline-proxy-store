"use client";

import Link from "next/link";
import { BADGE_POINTS, BRAND_NAME, KYC_POLICY } from "../config/site";
import TopProductsTabs from "../components/TopProductsTabs";
import { useI18n } from "../lib/i18n";
import styles from "./page.module.css";

type IntroContent = {
  headline: string;
  copy: string;
};

type FeatureItem = {
  title: string;
  description: string;
};

type PaymentsContent = {
  title: string;
  description: string;
  methods: string[];
};

export default function Page() {
  const { locale, t } = useI18n();

  const heroEyebrow = t<string>("hero.eyebrow");
  const heroTitle = t<string>("hero.title");
  const heroSubtitle = t<string>("hero.subtitle");
  const heroBadge = t<string>("hero.badge", {
    locations: BADGE_POINTS.locations,
    uptime: BADGE_POINTS.uptime,
    support: BADGE_POINTS.support,
  });
  const heroPrimaryCta = t<string>("hero.primaryCta");
  const heroSecondaryCta = t<string>("hero.secondaryCta");
  const heroMediaAlt = t<string>("hero.mediaAlt");

  const intro = t<IntroContent>("home.intro");
  const featureItems = t<FeatureItem[]>("home.features.items");
  const payments = t<PaymentsContent>("home.payments");
  const kycTitle = t<string>("home.kyc.title");
  const kycDescription = locale === "ru" ? KYC_POLICY : t<string>("kyc.policy");

  return (
    <div className={styles.page}>
      <section className={`${styles.section} ${styles.heroSection}`}>
        <div className={`${styles.inner} ${styles.heroGrid}`}>
          <div>
            <span className={styles.heroEyebrow}>{heroEyebrow}</span>
            <h1 className={styles.heroTitle}>{heroTitle}</h1>
            <p className={styles.heroSubtitle}>{heroSubtitle}</p>
            <span className={styles.heroBadge}>{heroBadge}</span>

            <div className={styles.heroCtas}>
              <Link href="/pricing" className={styles.primaryButton}>
                {heroPrimaryCta}
              </Link>
              <Link href="/contact" className={styles.secondaryButton}>
                {heroSecondaryCta}
              </Link>
            </div>
          </div>

          <div className={styles.heroMedia} role="img" aria-label={heroMediaAlt}>
            {heroMediaAlt}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{intro.headline}</h2>
            <p className={styles.sectionSubtitle}>{intro.copy}</p>
          </div>

          <div className={styles.featuresGrid}>
            {featureItems.map(item => (
              <article key={item.title} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{item.title}</h3>
                <p className={styles.featureText}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TopProductsTabs />

      <section className={`${styles.section} ${styles.sectionMuted}`}>
        <div className={styles.inner}>
          <div className={styles.kycCard}>
            <h2 className={styles.kycTitle}>{kycTitle}</h2>
            <p className={styles.kycText}>{kycDescription}</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{payments.title}</h2>
            <p className={styles.sectionSubtitle}>{payments.description}</p>
          </div>

          <div className={styles.paymentsList}>
            {payments.methods.map(method => (
              <span key={method} className={styles.paymentBadge}>
                {method}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
