"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "../../components/LocaleContext";
import { ORDER_PAGE, type OrderService } from "../../lib/order";
import styles from "./page.module.css";

function findService(services: OrderService[], id?: string) {
  if (!services.length) {
    return undefined;
  }

  if (!id) {
    return services[0];
  }

  return services.find(service => service.id === id) ?? services[0];
}

function findOption<T extends { id: string }>(options: T[], id?: string, fallbackId?: string) {
  if (!options.length) {
    return undefined;
  }

  if (id) {
    const match = options.find(option => option.id === id);
    if (match) {
      return match;
    }
  }

  if (fallbackId) {
    const match = options.find(option => option.id === fallbackId);
    if (match) {
      return match;
    }
  }

  return options[0];
}

function formatCurrency(amount: number, locale: string, currency: string) {
  const formatter = new Intl.NumberFormat(locale === "ru" ? "ru-RU" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export default function OrderConfigurator() {
  const { locale } = useLocale();
  const copy = ORDER_PAGE[locale];
  const searchParams = useSearchParams();

  const serviceParam = searchParams.get("service") ?? undefined;
  const planParam = searchParams.get("plan") ?? undefined;
  const durationParam = searchParams.get("duration") ?? undefined;
  const locationParam = searchParams.get("location") ?? undefined;
  const ispParam = searchParams.get("isp") ?? undefined;
  const autoRenewParam = searchParams.get("autoRenew") ?? undefined;

  const initialService = useMemo(() => findService(copy.services, serviceParam), [copy.services, serviceParam]);
  const [serviceId, setServiceId] = useState(initialService?.id ?? "");

  useEffect(() => {
    setServiceId(initialService?.id ?? "");
  }, [initialService?.id]);

  const service = useMemo(() => findService(copy.services, serviceId), [copy.services, serviceId]);

  const initialPlan = useMemo(() => {
    if (!service) {
      return undefined;
    }

    return findOption(service.plans, planParam, service.defaultPlanId);
  }, [service, planParam]);

  const [planId, setPlanId] = useState(initialPlan?.id ?? "");

  useEffect(() => {
    setPlanId(initialPlan?.id ?? "");
  }, [initialPlan?.id, service?.id]);

  const initialDuration = useMemo(() => {
    if (!service) {
      return undefined;
    }

    return findOption(service.durations, durationParam, service.durations[0]?.id);
  }, [service, durationParam]);

  const [durationId, setDurationId] = useState(initialDuration?.id ?? "");

  useEffect(() => {
    setDurationId(initialDuration?.id ?? "");
  }, [initialDuration?.id, service?.id]);

  const initialLocation = useMemo(() => {
    if (!service) {
      return undefined;
    }

    return findOption(service.locations, locationParam);
  }, [service, locationParam]);

  const [locationId, setLocationId] = useState(initialLocation?.id ?? service?.locations[0]?.id ?? "");

  useEffect(() => {
    setLocationId(initialLocation?.id ?? service?.locations[0]?.id ?? "");
  }, [initialLocation?.id, service?.id, service?.locations]);

  const initialIsp = useMemo(() => {
    if (!service) {
      return undefined;
    }

    return findOption(service.ispOptions, ispParam);
  }, [service, ispParam]);

  const [ispId, setIspId] = useState(initialIsp?.id ?? service?.ispOptions[0]?.id ?? "");

  useEffect(() => {
    setIspId(initialIsp?.id ?? service?.ispOptions[0]?.id ?? "");
  }, [initialIsp?.id, service?.id, service?.ispOptions]);

  const [autoRenew, setAutoRenew] = useState(() => autoRenewParam !== "false");

  useEffect(() => {
    if (autoRenewParam === undefined) {
      return;
    }

    setAutoRenew(autoRenewParam !== "false" && autoRenewParam !== "0");
  }, [autoRenewParam]);

  const plan = service?.plans.find(item => item.id === planId) ?? service?.plans[0];
  const duration = service?.durations.find(item => item.id === durationId) ?? service?.durations[0];
  const location = service?.locations.find(item => item.id === locationId);
  const isp = service?.ispOptions.find(item => item.id === ispId);

  const totalAmount = plan && duration ? plan.priceAmount * duration.multiplier : 0;
  const formattedPlanPrice = plan ? formatCurrency(plan.priceAmount, locale, service?.currency ?? "USD") : "";
  const formattedTotal = formatCurrency(totalAmount, locale, service?.currency ?? "USD");

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.leftColumn}>
          <section className={styles.card}>
            <h1 className={styles.heroTitle}>{copy.title}</h1>
            <p className={styles.heroSubtitle}>{copy.subtitle}</p>
          </section>

          <section className={styles.card}>
            <header className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{copy.serviceSectionTitle}</h2>
              <p className={styles.sectionSubtitle}>{copy.serviceSectionSubtitle}</p>
            </header>

            <div className={styles.serviceCards}>
              {copy.services.map(option => {
                const isActive = option.id === service?.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`${styles.serviceCard} ${isActive ? styles.serviceCardActive : ""}`.trim()}
                    onClick={() => setServiceId(option.id)}
                    aria-pressed={isActive}
                  >
                    {option.badge && <span className={styles.serviceBadge}>{option.badge}</span>}
                    <h3 className={styles.serviceName}>{option.name}</h3>
                    <p className={styles.serviceHeadline}>{option.headline}</p>
                    <p className={styles.servicePrice}>{option.priceHint}</p>
                    <ul className={styles.serviceHighlights}>
                      {option.highlights.map(highlight => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </section>

          {service && service.plans.length > 0 && (
            <section className={styles.card}>
              <header className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{copy.planSectionTitle}</h2>
                <p className={styles.sectionSubtitle}>{copy.planSectionSubtitle}</p>
              </header>

              <div className={styles.planGrid}>
                {service.plans.map(option => {
                  const isActive = option.id === plan?.id;
                  const price = formatCurrency(option.priceAmount, locale, service.currency);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`${styles.planCard} ${isActive ? styles.planCardActive : ""}`.trim()}
                      onClick={() => setPlanId(option.id)}
                      aria-pressed={isActive}
                    >
                      <div>
                        <h3 className={styles.planName}>{option.name}</h3>
                        <p className={styles.planPrice}>
                          <span>{price}</span>
                          <span className={styles.planPriceSuffix}>{option.priceSuffix}</span>
                        </p>
                      </div>
                      <p className={styles.planSummary}>{option.summary}</p>
                      <ul className={styles.planFeatures}>
                        {option.features.map(feature => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {service && (
            <section className={styles.card}>
              <header className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{copy.locationSectionTitle}</h2>
                <p className={styles.sectionSubtitle}>{copy.locationSectionSubtitle}</p>
              </header>

              <div className={styles.selectGroup}>
                <div className={styles.selectWrapper}>
                  <label className={styles.selectLabel} htmlFor="order-location">
                    {copy.locationSectionTitle}
                  </label>
                  <select
                    id="order-location"
                    className={styles.select}
                    value={location?.id ?? ""}
                    onChange={event => setLocationId(event.target.value)}
                  >
                    {service.locations.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.selectWrapper}>
                  <label className={styles.selectLabel} htmlFor="order-isp">
                    {copy.ispSectionTitle}
                  </label>
                  <select
                    id="order-isp"
                    className={styles.select}
                    value={isp?.id ?? ""}
                    onChange={event => setIspId(event.target.value)}
                  >
                    {service.ispOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className={styles.selectHelp}>{copy.ispSectionSubtitle}</p>
                </div>
              </div>
            </section>
          )}

          {service && service.durations.length > 0 && (
            <section className={styles.card}>
              <header className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{copy.durationSectionTitle}</h2>
                <p className={styles.sectionSubtitle}>{copy.durationSectionSubtitle}</p>
              </header>

              <div className={styles.durationChips}>
                {service.durations.map(option => {
                  const isActive = option.id === duration?.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`${styles.durationButton} ${isActive ? styles.durationButtonActive : ""}`.trim()}
                      onClick={() => setDurationId(option.id)}
                      aria-pressed={isActive}
                    >
                      <span>{option.label}</span>
                      {option.description && (
                        <span className={styles.durationDescription}>{option.description}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          <section className={styles.card}>
            <div className={styles.toggleRow}>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  className={styles.toggleInput}
                  checked={autoRenew}
                  onChange={event => setAutoRenew(event.target.checked)}
                  aria-label={copy.autoRenewLabel}
                />
                <span className={styles.toggleSlider} aria-hidden="true" />
              </label>
              <div className={styles.toggleDescription}>
                <p className={styles.toggleTitle}>{copy.autoRenewLabel}</p>
                <p className={styles.toggleText}>{copy.autoRenewDescription}</p>
                <p className={styles.autoRenewState}>{autoRenew ? copy.summaryAutoRenewOn : copy.summaryAutoRenewOff}</p>
              </div>
            </div>
          </section>
        </div>

        <aside className={`${styles.card} ${styles.summaryCard}`}>
          <h2 className={styles.summaryTitle}>{copy.summaryTitle}</h2>
          <ul className={styles.summaryList}>
            <li>
              <p className={styles.summaryItemTitle}>{copy.summaryServiceLabel}</p>
              <p className={styles.summaryItemValue}>{service?.name}</p>
            </li>
            <li>
              <p className={styles.summaryItemTitle}>{copy.summaryPlanLabel}</p>
              <p className={styles.summaryItemValue}>{plan?.name}</p>
            </li>
            <li>
              <p className={styles.summaryItemTitle}>{copy.summaryLocationLabel}</p>
              <p className={styles.summaryItemValue}>{location?.label}</p>
            </li>
            <li>
              <p className={styles.summaryItemTitle}>{copy.summaryIspLabel}</p>
              <p className={styles.summaryItemValue}>{isp?.label}</p>
            </li>
            <li>
              <p className={styles.summaryItemTitle}>{copy.summaryDurationLabel}</p>
              <p className={styles.summaryItemValue}>{duration?.label}</p>
            </li>
          </ul>

          {plan && (
            <>
              <p className={styles.summaryFeaturesTitle}>{copy.summaryFeaturesTitle}</p>
              <ul className={styles.summaryFeatures}>
                {plan.features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </>
          )}

          <div className={styles.summaryTotal}>
            <div>
              <p className={styles.summaryTotalLabel}>{copy.summaryTotalLabel}</p>
              <p className={styles.summaryPeriod}>{duration?.priceSuffix}</p>
            </div>
            <div>
              <p className={styles.summaryTotalValue}>{formattedTotal}</p>
              {plan && <p className={styles.summaryPeriod}>{formattedPlanPrice}</p>}
            </div>
          </div>

          <button type="button" className={styles.summaryCta}>
            {copy.summaryCtaLabel}
          </button>
          <p className={styles.summaryDisclaimer}>{copy.summaryDisclaimer}</p>
        </aside>
      </div>
    </main>
  );
}
