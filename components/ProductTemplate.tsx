'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import type { LocalizedProductPage } from '../lib/productPages';
import { useLocale } from './LocaleContext';
import styles from './ProductTemplate.module.css';
import KycNotice from './KycNotice';
import Section from '@/components/layout/Section';

function getLinkProps(href: string) {
  if (/^https?:\/\//i.test(href)) {
    return { target: '_blank', rel: 'noopener noreferrer' as const };
  }

  return {};
}

type ProductTemplateProps = {
  data: LocalizedProductPage;
  cardsVariant?: 'default' | 'compact';
};

export default function ProductTemplate({ data, cardsVariant = 'default' }: ProductTemplateProps) {
  const { locale } = useLocale();
  const copy = data[locale];
  const offersLayout = copy.offers.layout ?? 'cards';
  const isTextLayout = offersLayout === 'text';
  const plans = useMemo(() => copy.offers.plans ?? [], [copy.offers.plans]);
  const textSections = useMemo(() => copy.offers.textSections ?? [], [copy.offers.textSections]);
  const cardsClassName = `${styles.cards} ${
    cardsVariant === 'compact' ? styles.cardsCompact : ''
  }`.trim();
  const planIds = useMemo(
    () => (isTextLayout ? [] : plans.map((plan) => plan.id)),
    [isTextLayout, plans],
  );
  const [activePlanId, setActivePlanId] = useState<string | null>(planIds[0] ?? null);

  useEffect(() => {
    if (isTextLayout) {
      if (activePlanId !== null) {
        setActivePlanId(null);
      }
      return;
    }

    if (!activePlanId || !planIds.includes(activePlanId)) {
      setActivePlanId(planIds[0] ?? null);
    }
  }, [isTextLayout, planIds, activePlanId]);

  const handleCardKeyDown = (planId: string) => (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActivePlanId(planId);
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          {copy.hero.eyebrow && <p className={styles.heroEyebrow}>{copy.hero.eyebrow}</p>}
          <h1 className={styles.heroTitle}>{copy.hero.title}</h1>
          <p className={styles.heroDescription}>{copy.hero.description}</p>

          <div className={styles.heroActions}>
            <Link
              href={copy.hero.cta.href}
              className={styles.primaryCta}
              {...getLinkProps(copy.hero.cta.href)}
            >
              {copy.hero.cta.label}
            </Link>
          </div>

          {copy.hero.metrics.length > 0 && (
            <dl className={styles.metrics}>
              {copy.hero.metrics.map((metric) => {
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

      <Section bg="white" containerClassName={styles.offersSection}>
        <header className={styles.offersHeader}>
          <h2 className={styles.offersTitle}>{copy.offers.title}</h2>
          {copy.offers.description && (
            <p className={styles.offersDescription}>{copy.offers.description}</p>
          )}
        </header>

        {isTextLayout ? (
          <>
            <div className={styles.textSections}>
              {textSections.map((section) => (
                <article key={section.id} className={styles.textSection}>
                  <h3 className={styles.textSectionTitle}>{section.title}</h3>
                  <p className={styles.textSectionBody}>{section.body}</p>
                </article>
              ))}
            </div>
            <KycNotice className={styles.inlineKycNotice} locale={locale} />
          </>
        ) : (
          <div className={cardsClassName}>
            {plans.map((plan) => (
              <article
                key={plan.id}
                className={`${styles.card} ${
                  plan.badge ? styles.cardFeatured : ''
                } ${plan.id === activePlanId ? styles.cardActive : ''}`.trim()}
                onClick={() => setActivePlanId(plan.id)}
                onKeyDown={handleCardKeyDown(plan.id)}
                role="button"
                tabIndex={0}
                aria-pressed={plan.id === activePlanId}
              >
                <header className={styles.cardHeader}>
                  <div className={styles.cardTitleRow}>
                    <h3 className={styles.cardTitle}>{plan.name}</h3>
                    {plan.badge && <span className={styles.cardBadge}>{plan.badge}</span>}
                  </div>
                  <div className={styles.cardPriceBlock}>
                    {plan.priceLabel && (
                      <span className={styles.cardPriceLabel}>{plan.priceLabel}</span>
                    )}
                    <p className={styles.cardPrice}>
                      {plan.compareAt && (
                        <span className={styles.cardCompareAt}>{plan.compareAt}</span>
                      )}
                      <span className={styles.cardPriceValue}>{plan.price}</span>
                      {plan.period && <span className={styles.cardPricePeriod}>{plan.period}</span>}
                    </p>
                  </div>
                </header>

                {plan.summary && <p className={styles.cardSummary}>{plan.summary}</p>}

                <ul className={styles.cardFeatures}>
                  {plan.features.map((feature) => {
                    const included = feature.included ?? true;
                    return (
                      <li
                        key={feature.label}
                        className={`${styles.cardFeature} ${
                          included ? styles.featureIncluded : styles.featureExcluded
                        }`}
                      >
                        <span className={styles.featureIcon} aria-hidden="true">
                          {included ? '✓' : '✕'}
                        </span>
                        <span>{feature.label}</span>
                      </li>
                    );
                  })}
                </ul>

                <KycNotice className={styles.cardKycNotice} inline locale={locale} />

                <Link
                  href={plan.ctaHref}
                  className={styles.cardCta}
                  {...getLinkProps(plan.ctaHref)}
                >
                  {plan.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        )}

        {copy.offers.note && <p className={styles.offersNote}>{copy.offers.note}</p>}
      </Section>
    </div>
  );
}
