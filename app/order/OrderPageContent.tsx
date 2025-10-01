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

function getDiscountMultiplier(tier: Nullable<OrderTier>): number {
  if (!tier?.ribbon) {
    return 1;
  }

  const match = tier.ribbon.match(/-([0-9]+(?:\.[0-9]+)?)%/);
  if (!match) {
    return 1;
  }

  const percent = Number.parseFloat(match[1]);
  if (!Number.isFinite(percent)) {
    return 1;
  }

  const multiplier = 1 - percent / 100;
  return multiplier > 0 ? multiplier : 0;
}

type Option = { value: string; label: string };

function getDefaultOptionValue(options: Option[], fallbackIndex = 0): string {
  if (options[fallbackIndex]) {
    return options[fallbackIndex].value;
  }

  return options[0]?.value ?? "";
}

export default function OrderPageContent() {
  const { locale } = useLocale();
  const page = useMemo(() => getOrderPage(locale), [locale]);

  const [serviceId, setServiceId] = useState(() => page.services[0]?.id ?? "");
  const activeService = useMemo<Nullable<OrderService>>(
    () =>
      page.services.find((service: OrderService) => service.id === serviceId) ??
      page.services[0],
    [page.services, serviceId],
  );

  useEffect(() => {
    setServiceId(page.services[0]?.id ?? "");
  }, [page.services]);

  const [categoryId, setCategoryId] = useState(() => getDefaultCategory(activeService)?.id ?? "");
  const activeCategory = useMemo<Nullable<OrderCategory>>(
    () =>
      activeService?.categories.find(
        (category: OrderCategory) => category.id === categoryId,
      ) ?? getDefaultCategory(activeService),
    [activeService, categoryId],
  );

  useEffect(() => {
    setCategoryId(getDefaultCategory(activeService)?.id ?? "");
  }, [activeService]);

  const [tierId, setTierId] = useState(() => getDefaultTier(activeCategory)?.id ?? "");
  const activeTier = useMemo<Nullable<OrderTier>>(
    () =>
      activeCategory?.tiers.find((tier: OrderTier) => tier.id === tierId) ??
      getDefaultTier(activeCategory),
    [activeCategory, tierId],
  );

  useEffect(() => {
    setTierId(getDefaultTier(activeCategory)?.id ?? "");
  }, [activeCategory]);

  const currency = activeService?.currency ?? "USD";
  const unitAmount = activeTier?.priceAmount ?? 0;
  const hasUnitPrice = unitAmount > 0;
  const totalMultiplier = activeTier?.totalMultiplier ?? 1;
  const discountMultiplier = getDiscountMultiplier(activeTier);
  const totalAmount = unitAmount * totalMultiplier * discountMultiplier;
  const unitPrice = hasUnitPrice
    ? formatCurrency(unitAmount, locale, currency)
    : activeTier?.price ?? "—";
  const totalPrice = hasUnitPrice
    ? formatCurrency(totalAmount, locale, currency)
    : activeTier?.price ?? "—";

  const isRotatingService = activeService?.id === "rotating-residential";
  const activeTiers = activeCategory?.tiers ?? [];
  const activeTierIndex = Math.max(
    0,
    activeTiers.findIndex((tier: OrderTier) => tier.id === activeTier?.id),
  );
  const rotatingSliderMax = Math.max(0, activeTiers.length - 1);

  const configurationOptions = useMemo(() => {
    const base = {
      locations: [
        { value: "us", label: locale === "ru" ? "США" : "United States" },
        { value: "gb", label: locale === "ru" ? "Великобритания" : "United Kingdom" },
        { value: "de", label: locale === "ru" ? "Германия" : "Germany" },
        { value: "fr", label: locale === "ru" ? "Франция" : "France" },
        { value: "nl", label: locale === "ru" ? "Нидерланды" : "Netherlands" },
      ],
      isps: [
        { value: "default", label: locale === "ru" ? "Любой" : "Any" },
        { value: "att", label: "AT&T" },
        { value: "verizon", label: "Verizon" },
        { value: "charter", label: locale === "ru" ? "Charter" : "Charter" },
      ],
      quantities: [
        { value: "10", label: locale === "ru" ? "10 прокси" : "10 proxies" },
        { value: "50", label: locale === "ru" ? "50 прокси" : "50 proxies" },
        { value: "100", label: locale === "ru" ? "100 прокси" : "100 proxies" },
        { value: "250", label: locale === "ru" ? "250 прокси" : "250 proxies" },
      ],
      periods: [
        { value: "weekly", label: locale === "ru" ? "7 дней" : "7 days" },
        { value: "monthly", label: locale === "ru" ? "1 месяц" : "1 month" },
        { value: "quarterly", label: locale === "ru" ? "3 месяца" : "3 months" },
        { value: "yearly", label: locale === "ru" ? "12 месяцев" : "12 months" },
      ],
    };

    return base;
  }, [locale]);

  const [selectedLocation, setSelectedLocation] = useState(() =>
    getDefaultOptionValue(configurationOptions.locations),
  );
  const [selectedIsp, setSelectedIsp] = useState(() =>
    getDefaultOptionValue(configurationOptions.isps),
  );
  const [selectedQuantity, setSelectedQuantity] = useState(() =>
    getDefaultOptionValue(configurationOptions.quantities),
  );
  const [selectedPeriod, setSelectedPeriod] = useState(() =>
    getDefaultOptionValue(configurationOptions.periods, 1),
  );
  const [autoRenew, setAutoRenew] = useState(true);

  useEffect(() => {
    setSelectedLocation(getDefaultOptionValue(configurationOptions.locations));
    setSelectedIsp(getDefaultOptionValue(configurationOptions.isps));
    setSelectedQuantity(getDefaultOptionValue(configurationOptions.quantities));
    setSelectedPeriod(getDefaultOptionValue(configurationOptions.periods, 1));
    setAutoRenew(true);
  }, [activeService, configurationOptions]);

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

          <section className={styles.servicesSection}>
            <header className={styles.servicesHeader}>
              <h2 className={styles.servicesTitle}>{page.copy.servicesSectionTitle}</h2>
              <p className={styles.servicesSubtitle}>{page.copy.servicesSectionSubtitle}</p>
            </header>
              <div className={styles.serviceCards}>
                {page.services.map((service: OrderService) => {
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
                      {service.card.highlights.map((highlight: string) => (
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

              {!isRotatingService && activeService.categories.length > 1 && (
                <div className={styles.categoryTabs}>
                  {activeService.categories.map((category: OrderCategory) => {
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

              {!isRotatingService ? (
                <>
                  <div className={styles.planSection}>
                    <div className={styles.planHeader}>
                      <h3 className={styles.planTitle}>
                        {locale === "ru" ? "План" : "Plan"}
                      </h3>
                      <p className={styles.planSubtitle}>
                        {locale === "ru"
                          ? "Выберите подходящий тариф и настройте детали ниже."
                          : "Pick the plan that fits and configure the details below."}
                      </p>
                    </div>
                    <div className={styles.planCards}>
                      {(activeCategory?.tiers ?? []).map((tier: OrderTier) => {
                        const isActive = tier.id === activeTier?.id;
                        return (
                          <button
                            key={tier.id}
                            type="button"
                            className={`${styles.planCard} ${isActive ? styles.planCardActive : ""}`.trim()}
                            onClick={() => setTierId(tier.id)}
                            aria-pressed={isActive}
                          >
                            <header className={styles.planCardHeader}>
                              <div>
                                <h4 className={styles.planName}>{tier.name}</h4>
                                {tier.subLabel && (
                                  <span className={styles.planSubLabel}>{tier.subLabel}</span>
                                )}
                                {tier.headline && (
                                  <span className={styles.planHeadline}>{tier.headline}</span>
                                )}
                              </div>
                              <div className={styles.planPrice}>
                                <span>{tier.price}</span>
                                <span className={styles.planPeriod}>{tier.period}</span>
                              </div>
                            </header>
                            {tier.description && (
                              <p className={styles.planDescription}>{tier.description}</p>
                            )}
                            <ul className={styles.planFeatures}>
                              {tier.features.map((feature: string) => (
                                <li key={feature}>{feature}</li>
                              ))}
                            </ul>
                            {tier.ribbon ? (
                              <span className={styles.planRibbon}>{tier.ribbon}</span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className={styles.configurator}>
                    <h3 className={styles.configTitle}>
                      {locale === "ru" ? "Настройки" : "Configuration"}
                    </h3>
                    <div className={styles.configGrid}>
                      <label className={styles.configField}>
                        <span className={styles.configLabel}>
                          {locale === "ru" ? "Местоположение прокси" : "Proxy location"}
                        </span>
                        <select
                          className={styles.configSelect}
                          value={selectedLocation}
                          onChange={(event) => setSelectedLocation(event.target.value)}
                        >
                          {configurationOptions.locations.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className={styles.configField}>
                        <span className={styles.configLabel}>ISP</span>
                        <select
                          className={styles.configSelect}
                          value={selectedIsp}
                          onChange={(event) => setSelectedIsp(event.target.value)}
                        >
                          {configurationOptions.isps.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className={styles.configField}>
                        <span className={styles.configLabel}>
                          {locale === "ru" ? "Количество прокси (IP)" : "Number of proxies"}
                        </span>
                        <select
                          className={styles.configSelect}
                          value={selectedQuantity}
                          onChange={(event) => setSelectedQuantity(event.target.value)}
                        >
                          {configurationOptions.quantities.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className={styles.configField}>
                        <span className={styles.configLabel}>
                          {locale === "ru" ? "Временной период" : "Billing period"}
                        </span>
                        <select
                          className={styles.configSelect}
                          value={selectedPeriod}
                          onChange={(event) => setSelectedPeriod(event.target.value)}
                        >
                          {configurationOptions.periods.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className={`${styles.configField} ${styles.configToggle}`}>
                        <div>
                          <span className={styles.configLabel}>
                            {locale === "ru" ? "Автопродление" : "Auto renewal"}
                          </span>
                          <span className={styles.configDescription}>
                            {locale === "ru"
                              ? "Оплата продлевается автоматически"
                              : "Enable automatic renewal"}
                          </span>
                        </div>
                        <button
                          type="button"
                          className={`${styles.toggle} ${autoRenew ? styles.toggleActive : ""}`.trim()}
                          onClick={() => setAutoRenew((prev) => !prev)}
                          aria-pressed={autoRenew}
                        >
                          <span className={styles.toggleHandle} />
                        </button>
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.rotatingConfigurator}>
                  <div className={styles.rotatingCard}>
                    <header className={styles.rotatingHeader}>
                      <div>
                        <h3 className={styles.rotatingTitle}>
                          {locale === "ru"
                            ? "Оплата за трафик"
                            : "Pay per traffic"}
                        </h3>
                        <p className={styles.rotatingSubtitle}>
                          {locale === "ru"
                            ? "Выберите, сколько гигабайт трафика требуется в месяц."
                            : "Choose how many gigabytes you need each month."}
                        </p>
                      </div>
                      <div className={styles.rotatingPrice}>
                        <span>{activeTier?.price ?? "—"}</span>
                        {activeTier?.period && (
                          <span className={styles.rotatingPeriod}>{activeTier.period}</span>
                        )}
                      </div>
                    </header>
                    <div className={styles.rotatingSlider}>
                      <input
                        type="range"
                        min={0}
                        max={rotatingSliderMax}
                        step={1}
                        value={activeTierIndex}
                        onChange={(event) => {
                          const index = Number.parseInt(event.target.value, 10);
                          const nextTier = activeTiers[index];
                          if (nextTier) {
                            setTierId(nextTier.id);
                          }
                        }}
                        aria-valuemin={0}
                        aria-valuemax={rotatingSliderMax}
                      />
                      <div className={styles.rotatingMarks}>
                        {activeTiers.map((tier: OrderTier) => {
                          const isActive = tier.id === activeTier?.id;
                          return (
                            <button
                              key={tier.id}
                              type="button"
                              className={`${styles.rotatingMark} ${isActive ? styles.rotatingMarkActive : ""}`.trim()}
                              onClick={() => setTierId(tier.id)}
                              aria-pressed={isActive}
                            >
                              {tier.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <ul className={styles.rotatingFeatures}>
                      {activeTier?.features.map((feature: string) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </section>
          )}

          <section className={styles.paymentCard}>
            <div>
              <h2 className={styles.paymentTitle}>{page.copy.paymentTitle}</h2>
              <p className={styles.paymentNote}>{page.paymentNote}</p>
            </div>
            <div className={styles.paymentMethods}>
              <span className={styles.paymentMethodsLabel}>{page.copy.paymentMethodsLabel}</span>
              <ul className={styles.paymentMethodsList}>
                {page.paymentMethods.map((method: string) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </div>
          </section>

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
                  {activeTier.features.map((feature: string) => (
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
