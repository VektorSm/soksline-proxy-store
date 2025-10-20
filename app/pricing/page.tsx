'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import BackgroundHexSVG from '@/components/BackgroundHexSVG';
import { buildOrderUrl, catalog, type PlanId } from '@/config/catalog';
import KycNotice from '@/components/KycNotice';
import PaymentsSecurity from '@/components/PaymentsSecurity';
import Section from '@/components/layout/Section';
import PriceLabel from '@/components/ui/PriceLabel';
import { useI18n } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
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

const RU_FEATURE_TRANSLATIONS: Record<string, string> = {
  'socks5 & http/s': 'SOCKS5 и HTTP/S',
  'socks5 and http/s': 'SOCKS5 и HTTP/S',
  'sticky sessions': 'Липкие (sticky) сессии',
  'api support': 'Поддержка API',
  'country targeting': 'Таргетинг по странам',
  'unlimited threads': 'Безлимитные потоки',
};

function localizeFeatureCopy(feature: string, locale: Locale) {
  if (locale !== 'ru') {
    return feature;
  }

  const normalized = feature.trim().toLowerCase();
  return RU_FEATURE_TRANSLATIONS[normalized] ?? feature;
}

function localizeUnitLabel(label: string, locale: Locale) {
  if (locale !== 'ru') {
    return label;
  }

  const trimmed = label.trim();

  if (/per\s+proxy/i.test(trimmed) || /за\s+прокси/i.test(trimmed)) {
    return 'за 1 IP / месяц';
  }

  if (/per\s*gb/i.test(trimmed) || /\b\/\s*gb/i.test(trimmed) || /за\s*гб/i.test(trimmed)) {
    return 'за 1 ГБ';
  }

  return trimmed;
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
  const buyNowLabel = locale === 'ru' ? 'Купить' : t('common.buyNow', 'Buy Now');
  const ipv6FallbackFromUsd = catalog.staticIpv6.fromUsd ?? 0.55;
  return (
    <div className={styles.page}>
      <section className="relative isolate overflow-hidden bg-[#0B1220] text-white py-16 md:py-18">
        {/* мягкий вертикальный градиент */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 28%, rgba(0,0,0,0) 64%)',
          }}
        />
        {/* тонкая гекса-сетка поверх градиента */}
        <BackgroundHexSVG
          variant="hero"
          tone="dark"
          hexR={26}
          vbHeight={520}
          strokeOverride="rgba(255,255,255,0.06)"
          className="opacity-100"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide">
            PRICING
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Transparent proxy pricing
          </h1>
          <p className="mt-3 max-w-3xl text-white/80">
            Pay per IP (IPv4/IPv6) or per GB for rotation. Same plans as checkout. No hidden fees.
          </p>
          <div className="mt-4 text-sm text-white/60">
            180+ locations • 99.9% uptime • 24/7 support
          </div>
        </div>
      </section>

      <Section id="static-isp" bg="white" className="scroll-mt-28">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {t(
              'pages.pricing.staticIsp.title',
              locale === 'ru' ? 'Статические резидентские (IPv4)' : 'Static Residential (IPv4)',
            )}
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
            const normalizedUnitLabel = locale === 'ru'
              ? unitLabelSource
              : unitLabelSource.replace('month', 'mo');
            const unitLabel = localizeUnitLabel(normalizedUnitLabel, locale).replace(/\u00a0/g, ' ');
            const features = (localized?.features ?? plan.features).map((feature) =>
              localizeFeatureCopy(feature, locale),
            );
            const badge = localized?.badge ?? plan.badge;
            const priceValue = plan.priceUsd ?? catalog.staticIsp.fromUsd ?? 0;

            return (
              <article key={plan.id} className={styles.planCard}>
                <div className={styles.planIntro}>
                  <div className={styles.planHeader}>
                    <h3 className={styles.planTitle}>{plan.title}</h3>
                    {badge ? <span className={styles.planBadge}>{badge}</span> : null}
                  </div>
                  <PriceLabel
                    locale={locale}
                    amount={priceValue}
                    unit={unitLabel}
                    className={styles.planPrice}
                  />
                </div>
                <ul className={styles.planFeatures}>
                  {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className={styles.planFooter}>
                  <div className={styles.planSpacer} aria-hidden="true" />
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
            {t(
              'pages.pricing.staticIpv6.title',
              locale === 'ru' ? 'Статические резидентские (IPv6)' : 'Static Residential (IPv6)',
            )}
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
            const unitLabelSource = plan.unit ?? 'per proxy / mo';
            const normalizedUnitLabel = locale === 'ru'
              ? unitLabelSource
              : unitLabelSource.replace('month', 'mo');
            const unitLabel = localizeUnitLabel(normalizedUnitLabel, locale).replace(/\u00a0/g, ' ');
            const features = plan.features.map((feature) => localizeFeatureCopy(feature, locale));
            const amount = plan.priceUsd ?? ipv6FallbackFromUsd;

            return (
              <article key={plan.id} className={styles.planCard}>
                <div className={styles.planIntro}>
                  <div className={styles.planHeader}>
                    <h3 className={styles.planTitle}>{plan.title}</h3>
                    {plan.badge ? <span className={styles.planBadge}>{plan.badge}</span> : null}
                  </div>
                  <PriceLabel
                    locale={locale}
                    amount={amount}
                    unit={unitLabel}
                    className={styles.planPrice}
                  />
                </div>
                <ul className={styles.planFeatures}>
                  {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className={styles.planFooter}>
                  <div className={styles.planSpacer} aria-hidden="true" />
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

      <Section
        id="rotating"
        bg="white"
        className="scroll-mt-28 !py-0"
        containerClassName="max-w-7xl px-6 py-10"
      >
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="m-0 text-3xl font-extrabold tracking-tight">Rotating Residential</h2>
          <span
            aria-label="Price per GB"
            className="inline-flex items-center rounded-full bg-[#0B1220] px-2.5 py-1 text-xs font-medium text-white"
          >
            $5 / GB
          </span>
        </div>
        <p className="mt-2 text-gray-600">Transparent bandwidth tiers with pay-as-you-go pricing.</p>

        <div data-layout="rotating-grid" className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.rotating.tiers.map((tier) => {
            const pricePerGb = tier.pricePerGbUsd ?? 0;
            const totalUsd = tier.totalUsd ?? pricePerGb * tier.gb;
            const rotatingPriceLabel =
              locale === 'ru'
                ? `${formatUsd(pricePerGb)} за 1 ГБ (Итого ${formatUsd(totalUsd)})`
                : `${formatUsd(pricePerGb)}/ GB (Total ${formatUsd(totalUsd)})`;

            return (
              <article
                key={tier.id}
                className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div>
                  <h3 className="text-lg font-medium">{tier.gb} GB</h3>
                  <p className="mt-1 text-gray-700">{rotatingPriceLabel}</p>
                </div>
                <div className={styles.planSpacer} aria-hidden="true" />
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
