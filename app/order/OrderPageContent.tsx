"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { useLocale } from "../../components/LocaleContext";
import { getOrderPage } from "../../lib/order";

import styles from "./page.module.css";

type Nullable<T> = T | undefined;

type OrderPageData = ReturnType<typeof getOrderPage>;
type OrderService = OrderPageData["services"][number];
type OrderCategory = OrderService["categories"][number];
type OrderTier = OrderCategory["tiers"][number];

function formatCurrency(amount: number, locale: string, currency: string) {
  const formatter = new Intl.NumberFormat(locale === "ru" ? "ru-RU" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
}

function getDefaultCategory(service: Nullable<OrderService>): Nullable<OrderCategory> {
  return service?.categories[0];
}

function getDefaultTier(category: Nullable<OrderCategory>): Nullable<OrderTier> {
  return category?.tiers[0];
}

export default function OrderPageContent() {
  const { locale } = useLocale();
  const page = useMemo(() => getOrderPage(locale), [locale]);

  const [serviceId, setServiceId] = useState(() => page.services[0]?.id ?? "");
  const activeService = useMemo<Nullable<OrderService>>(
    () => page.services.find(service => service.id === serviceId) ?? page.services[0],
    [page.services, serviceId],
  );

  useEffect(() => {
    setServiceId(page.services[0]?.id ?? "");
  }, [page.services]);

  const [categoryId, setCategoryId] = useState(() => getDefaultCategory(activeService)?.id ?? "");
  const activeCategory = useMemo<Nullable<OrderCategory>>(
    () => activeService?.categories.find(category => category.id === categoryId) ?? getDefaultCategory(activeService),
    [activeService, categoryId],
  );

  useEffect(() => {
    setCategoryId(getDefaultCategory(activeService)?.id ?? "");
  }, [activeService]);

  const [tierId, setTierId] = useState(() => getDefaultTier(activeCategory)?.id ?? "");
  const activeTier = useMemo<Nullable<OrderTier>>(
    () => activeCategory?.tiers.find(tier => tier.id === tierId) ?? getDefaultTier(activeCategory),
    [activeCategory, tierId],
  );

  useEffect(() => {
    setTierId(getDefaultTier(activeCategory)?.id ?? "");
  }, [activeCategory]);

  const currency = activeService?.currency ?? "USD";
  const unitAmount = activeTier?.priceAmount ?? 0;
  const hasUnitPrice = unitAmount > 0;
  const unitPrice = hasUnitPrice
    ? formatCurrency(unitAmount, locale, currency)
    : activeTier?.price ?? "—";
  const totalPrice = hasUnitPrice
    ? formatCurrency(unitAmount, locale, currency)
    : activeTier?.price ?? "—";

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.contentColumn}>
          <section className={styles.hero}>
            <span className={styles.heroEyebrow}>{page.copy.heroEyebrow}</span>
            <h1 className={styles.heroTitle}>{page.copy.heroTitle}</h1>
            <p className={styles.heroSubtitle}>{page.copy.heroSubtitle}</p>
            <p className={styles.heroDescription}>{page.copy.heroDescription}</p>
          </section>

          <section className={styles.paymentCard}>
            <div>
              <h2 className={styles.paymentTitle}>{page.copy.paymentTitle}</h2>
              <p className={styles.paymentNote}>{page.paymentNote}</p>
            </div>
            <div className={styles.paymentMethods}>
              <span className={styles.paymentMethodsLabel}>{page.copy.paymentMethodsLabel}</span>
              <ul className={styles.paymentMethodsList}>
                {page.paymentMethods.map(method => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.servicesSection}>
            <header className={styles.servicesHeader}>
              <h2 className={styles.servicesTitle}>{page.copy.servicesSectionTitle}</h2>
              <p className={styles.servicesSubtitle}>{page.copy.servicesSectionSubtitle}</p>
            </header>
            <div className={styles.serviceCards}>
              {page.services.map(service => {
                const isActive = service.id === activeService?.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    className={`${styles.serviceCard} ${isActive ? styles.serviceCardActive : ""}`.trim()}
                    onClick={() => setServiceId(service.id)}
                    aria-pressed={isActive}
                  >
                    {service.card.badge && <span className={styles.serviceBadge}>{service.card.badge}</span>}
                    <div className={styles.serviceCardHeader}>
                      <h3 className={styles.serviceName}>{service.card.title}</h3>
                      <p className={styles.serviceHeadline}>{service.card.headline}</p>
                    </div>
                    <p className={styles.servicePriceHint}>{service.card.priceHint}</p>
                    <ul className={styles.serviceHighlights}>
                      {service.card.highlights.map(highlight => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </section>

          {activeService && (
            <section className={styles.detailSection}>
              <header className={styles.detailHeader}>
                <div>
                  <h2 className={styles.detailTitle}>{activeService.detailTitle}</h2>
                  <p className={styles.detailSubtitle}>{activeService.detailSubtitle}</p>
                </div>
                <Link href={activeService.viewAllHref} className={styles.viewAllLink}>
                  {page.copy.moreInfoLabel}
                </Link>
              </header>

              <p className={styles.detailHighlight}>{activeService.detailHighlight}</p>

              {activeService.categories.length > 1 && (
                <div className={styles.categoryTabs}>
                  {activeService.categories.map(category => {
                    const isActive = category.id === activeCategory?.id;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        className={`${styles.categoryTab} ${isActive ? styles.categoryTabActive : ""}`.trim()}
                        onClick={() => setCategoryId(category.id)}
                        aria-pressed={isActive}
                      >
                        {category.label}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className={styles.tierGrid}>
                {activeCategory?.tiers.map(tier => {
                  const isActive = tier.id === activeTier?.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      className={`${styles.tierCard} ${isActive ? styles.tierCardActive : ""}`.trim()}
                      onClick={() => setTierId(tier.id)}
                      aria-pressed={isActive}
                    >
                      {tier.ribbon && <span className={styles.tierRibbon}>{tier.ribbon}</span>}
                      <header className={styles.tierHeader}>
                        <div>
                          <h3 className={styles.tierName}>{tier.name}</h3>
                          {tier.subLabel && <span className={styles.tierSubLabel}>{tier.subLabel}</span>}
                          {tier.headline && <span className={styles.tierHeadline}>{tier.headline}</span>}
                        </div>
                        <p className={styles.tierPrice}>
                          <span>{tier.price}</span>
                          <span className={styles.tierPeriod}>{tier.period}</span>
                        </p>
                      </header>
                      {tier.description && <p className={styles.tierDescription}>{tier.description}</p>}
                      <ul className={styles.tierFeatures}>
                        {tier.features.map(feature => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          <section className={styles.contactCard}>
            <div>
              <h2 className={styles.contactTitle}>{page.copy.contactTitle}</h2>
              <p className={styles.contactSubtitle}>{page.copy.contactSubtitle}</p>
            </div>
            <Link href={page.copy.contactHref} className={styles.contactCta}>
              {page.copy.contactCtaLabel}
            </Link>
          </section>
        </div>

        <aside className={styles.summaryColumn}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>{page.copy.summary.title}</h2>
            <ul className={styles.summaryList}>
              <li>
                <span className={styles.summaryLabel}>{page.copy.summary.serviceLabel}</span>
                <span className={styles.summaryValue}>{activeService?.card.title ?? "—"}</span>
              </li>
              <li>
                <span className={styles.summaryLabel}>{page.copy.summary.categoryLabel}</span>
                <span className={styles.summaryValue}>{activeCategory?.label ?? "—"}</span>
              </li>
              <li>
                <span className={styles.summaryLabel}>{page.copy.summary.planLabel}</span>
                <span className={styles.summaryValue}>{activeTier?.name ?? "—"}</span>
              </li>
            </ul>

            <div className={styles.summaryPriceRow}>
              <span className={styles.summaryLabel}>{page.copy.summary.unitLabel}</span>
              <div>
                <p className={styles.summaryValue}>{unitPrice}</p>
                {activeTier?.period && <p className={styles.summaryPeriod}>{activeTier.period}</p>}
              </div>
            </div>

            <div className={styles.summaryTotal}>
              <span className={styles.summaryLabel}>{page.copy.summary.totalLabel}</span>
              <span className={styles.summaryTotalValue}>{totalPrice}</span>
            </div>

            {activeTier && activeTier.features.length > 0 && (
              <>
                <p className={styles.summaryFeaturesTitle}>{page.copy.summary.featuresLabel}</p>
                <ul className={styles.summaryFeaturesList}>
                  {activeTier.features.map(feature => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </>
            )}

            <button type="button" className={styles.summaryCta}>
              {page.copy.summary.ctaLabel}
            </button>
            <p className={styles.summaryDisclaimer}>{page.copy.summary.disclaimer}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
