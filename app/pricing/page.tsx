'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import { buildOrderUrl, catalog, type PlanId } from '@/config/catalog';
import KycNotice from '@/components/KycNotice';
import PaymentsSecurity from '@/components/PaymentsSecurity';
import Section from '@/components/layout/Section';
import { useI18n } from '@/lib/i18n';
import { getOrderPage, type OrderService } from '@/lib/order';

import styles from './page.module.css';

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
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
  const ipv6FallbackFromUsd = catalog.staticIpv6.fromUsd ?? 0.55;

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

      <Section id="static-isp" bg="white" className="scroll-mt-28">
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
            const unitLabelSource = localized?.period ?? plan.unit ?? 'per proxy / mo';
            const unitLabel = unitLabelSource.replace('month', 'mo');
            const features = localized?.features ?? plan.features;
            const badge = localized?.badge ?? plan.badge;
            const priceValue = plan.priceUsd ?? catalog.staticIsp.fromUsd ?? 0;

            return (
              <article key={plan.id} className={styles.planCard}>
                <div className={styles.planHeader}>
                  <h3 className={styles.planTitle}>{plan.title}</h3>
                  {badge ? <span className={styles.planBadge}>{badge}</span> : null}
                </div>
                <p className={styles.planPrice}>
                  {formatUsd(priceValue)}
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

      </Section>

      <Section id="static-ipv6" bg="muted" className="scroll-mt-28">
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

        <div className={styles.planGrid}>
          {catalog.staticIpv6.plans.map((plan) => {
            const hasPrice = typeof plan.priceUsd === 'number';
            const priceLabel = hasPrice
              ? formatUsd(plan.priceUsd ?? 0)
              : `from ${formatUsd(ipv6FallbackFromUsd)}`;
            const unitLabelSource = plan.unit ?? 'per proxy / mo';
            const unitLabel = unitLabelSource.replace('month', 'mo');

            return (
              <article key={plan.id} className={styles.planCard}>
                <div className={styles.planHeader}>
                  <h3 className={styles.planTitle}>{plan.title}</h3>
                  {plan.badge ? <span className={styles.planBadge}>{plan.badge}</span> : null}
                </div>
                <p className={styles.planPrice}>
                  {priceLabel}
                  <span className={styles.planUnit}>{unitLabel}</span>
                </p>
                <ul className={styles.planFeatures}>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className={styles.planFooter}>
                  <Link
                    href={buildOrderUrl({ service: 'static-ipv6', plan: plan.id, duration: 'monthly' })}
                    className={styles.planCta}
                  >
                    {buyNowLabel}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="rotating" bg="white" className="scroll-mt-28">
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

        <div
          data-layout="rotating-grid"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {catalog.rotating.tiers.map((tier) => {
            const pricePerGb = tier.pricePerGbUsd ?? 0;
            const totalUsd = tier.totalUsd ?? pricePerGb * tier.gb;

            return (
              <article
                key={tier.id}
                className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div>
                  <h3 className="text-lg font-medium">{tier.gb} GB</h3>
                  <p className="mt-1 text-gray-700">
                    {`${formatUsd(pricePerGb)}/ GB (Total ${formatUsd(totalUsd)})`}
                  </p>
                </div>
                <Link
                  href={buildOrderUrl({ service: 'rotating', duration: 'monthly' })}
                  className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gray-900 px-4 py-2 text-white hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  {buyNowLabel}
                </Link>
              </article>
            );
          })}
        </div>
      </Section>

      <Section bg="white" className="pt-10">
        <KycNotice dataTestId="pricing-kyc-notice" className="text-left mb-6" />
        <PaymentsSecurity
          title={orderPage.copy.paymentTitle}
          note={orderPage.paymentNote}
          methods={orderPage.paymentMethods}
          methodsAriaLabel={orderPage.copy.paymentMethodsLabel}
        />
      </Section>
    </div>
  );
}
