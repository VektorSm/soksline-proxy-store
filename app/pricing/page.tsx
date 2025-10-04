'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import { buildOrderUrl, catalog, type PlanId } from '@/config/catalog';
import KycNotice from '@/components/KycNotice';
import Section from '@/components/layout/Section';
import { useI18n } from '@/lib/i18n';
import { getOrderPage, type OrderService } from '@/lib/order';

import styles from './page.module.css';

function formatUsd(value: number) {
  return `$${value.toFixed(2)}`;
}

type PlanLocaleCopy = {
  features: string[];
  period?: string;
  badge?: string;
};

function extractPlanCopy(service: OrderService | undefined) {
  const copy = new Map<PlanId, PlanLocaleCopy>();
  if (!service) {
    return copy;
  }

  const tiers = service.categories.flatMap((category) => category.tiers);
  for (const plan of catalog.staticIsp.plans) {
    const match = tiers.find((tier) => tier.name === plan.title);
    if (!match) continue;
    copy.set(plan.id, {
      features: match.features,
      period: match.period,
      badge: match.headline,
    });
  }
  return copy;
}

export default function PricingPage() {
  const { t, locale } = useI18n();
  const orderPage = useMemo(() => getOrderPage(locale), [locale]);

  const staticService = useMemo(
    () => orderPage.services.find((service) => service.id === 'static-residential'),
    [orderPage],
  );
  const staticPlanCopy = useMemo(() => extractPlanCopy(staticService), [staticService]);

  const ipv6Service = useMemo(
    () => orderPage.services.find((service) => service.id === 'static-residential-ipv6'),
    [orderPage],
  );
  const rotatingService = useMemo(
    () => orderPage.services.find((service) => service.id === 'rotating-residential'),
    [orderPage],
  );

  const buyNowLabel = locale === 'ru' ? 'Купить' : t('common.buyNow', 'Buy Now');
  const ipv6PriceLabel = useMemo(() => {
    const hint = ipv6Service?.card.priceHint?.trim();
    if (hint) {
      return hint;
    }

    const fromUsd = catalog.staticIpv6.fromUsd;
    if (typeof fromUsd === 'number') {
      const price = formatUsd(fromUsd);
      const template = locale === 'ru'
        ? t('pages.pricing.staticIpv6.from', 'от $0.55 / мес')
        : t('pages.pricing.staticIpv6.from', 'from $0.55 / mo');
      return template.replace('$0.55', price);
    }

    return locale === 'ru'
      ? t('pages.pricing.staticIpv6.from', 'от $0.55 / мес')
      : t('pages.pricing.staticIpv6.from', 'from $0.55 / mo');
  }, [ipv6Service, locale, t]);
  const ipv6Highlights = ipv6Service?.card.highlights ?? [];

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroEyebrow}>{t('pages.pricing.hero.eyebrow', 'Pricing')}</span>
          <h1 className={styles.heroTitle}>{t('pages.pricing.hero.title', catalog.staticIsp.name)}</h1>
          <p className={styles.heroSubtitle}>
            {t(
              'pages.pricing.hero.subtitle',
              'Mirror of the latest plans available in the order flow.',
            )}
          </p>
          <p className={styles.heroDescription}>
            {t(
              'pages.pricing.hero.description',
              'Compare static and rotating residential proxy products with synced pricing and CTAs.',
            )}
          </p>
        </div>
      </header>

      <Section id="static-isp" bg="white">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {t('pages.pricing.staticIsp.title', catalog.staticIsp.name)}
          </h2>
          <p className={styles.sectionSubtitle}>
            {t(
              'pages.pricing.staticIsp.subtitle',
              staticService?.card.headline ?? catalog.staticIsp.summary ?? '',
            )}
          </p>
        </div>

        <div className={styles.planGrid}>
          {catalog.staticIsp.plans.map((plan) => {
            const localized = staticPlanCopy.get(plan.id);
            const unitLabel = localized?.period ?? plan.unit;
            const features = localized?.features ?? plan.features;
            const badge = localized?.badge ?? plan.badge;

            return (
              <article key={plan.id} className={styles.planCard}>
                <div className={styles.planHeader}>
                  <h3 className={styles.planTitle}>{plan.title}</h3>
                  {badge ? <span className={styles.planBadge}>{badge}</span> : null}
                </div>
                <p className={styles.planPrice}>
                  {formatUsd(plan.priceUsd)}
                  <span className={styles.planUnit}>{unitLabel}</span>
                </p>
                <ul className={styles.planFeatures}>
                  {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className={styles.planFooter}>
                  <Link
                    href={buildOrderUrl({ service: 'static-isp', plan: plan.id })}
                    className={styles.planCta}
                  >
                    {buyNowLabel}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.kycWrapper}>
          <KycNotice />
        </div>

        <div className={styles.paymentsCard}>
          <h3 className={styles.paymentTitle}>{orderPage.copy.paymentTitle}</h3>
          <p className={styles.paymentNote}>{orderPage.paymentNote}</p>
          <div className={styles.paymentMethods} aria-label={orderPage.copy.paymentMethodsLabel}>
            {orderPage.paymentMethods.map((method) => (
              <span key={method} className={styles.paymentChip}>
                {method}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section id="static-ipv6" bg="muted">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {t('pages.pricing.staticIpv6.title', catalog.staticIpv6.name)}
          </h2>
          <p className={styles.sectionSubtitle}>
            {t(
              'pages.pricing.staticIpv6.subtitle',
              ipv6Service?.card.headline ?? catalog.staticIpv6.summary ?? '',
            )}
          </p>
        </div>

        <div className={styles.ipv6Card}>
          <div>
            <div className={styles.ipv6Price}>{ipv6PriceLabel}</div>
            <ul className={styles.ipv6Features}>
              {ipv6Highlights.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <Link
            href={buildOrderUrl({ service: 'static-ipv6', duration: 'monthly' })}
            className={styles.ipv6Cta}
          >
            {buyNowLabel}
          </Link>
        </div>
      </Section>

      <Section id="rotating" bg="white">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {t('pages.pricing.rotating.title', catalog.rotating.name)}
          </h2>
          <p className={styles.sectionSubtitle}>
            {t(
              'pages.pricing.rotating.subtitle',
              rotatingService?.card.headline ?? '',
            )}
          </p>
        </div>

        <div className={styles.rotatingGrid}>
          {catalog.rotating.tiers.map((tier) => {
            const pricePerGb = tier.pricePerGbUsd ?? 0;
            const totalUsd = tier.totalUsd ?? pricePerGb * tier.gb;
            return (
              <article key={tier.id} className={styles.rotatingCard}>
                <div className={styles.rotatingTitle}>{`${tier.gb} GB`}</div>
                <div className={styles.rotatingPrice}>
                  {`${formatUsd(pricePerGb)} / GB (Total ${formatUsd(totalUsd)})`}
                </div>
                <Link
                  href={buildOrderUrl({ service: 'rotating', duration: 'monthly' })}
                  className={styles.rotatingCta}
                >
                  {buyNowLabel}
                </Link>
              </article>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
