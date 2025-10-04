'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useLocale } from '../../components/LocaleContext';
import { getOrderPage } from '../../lib/order';
import { rotatingPricing } from '../../config/pricing';
import { fmtUSD, normalizeTier } from '../../lib/money';
import { loadOrderPrefs, saveOrderPrefs } from '@/lib/orderPrefs';
import type { OrderPrefs } from '@/lib/orderPrefs';

import styles from './page.module.css';

type Nullable<T> = T | undefined;

type OrderPageData = ReturnType<typeof getOrderPage>;
type OrderService = OrderPageData['services'][number];
type OrderCategory = OrderService['categories'][number];
type OrderTier = OrderCategory['tiers'][number];

function formatCurrency(amount: number, locale: string, currency: string) {
  const formatter = new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US', {
    style: 'currency',
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

type Option = { value: string; label: string };

type OrderSelection = {
  serviceId: string;
  categoryId: string;
  tierId: string;
  duration?: OrderPrefs['duration'];
};

type OrderPrefsService = OrderPrefs['service'];
type OrderPrefsPlan = NonNullable<OrderPrefs['plan']>;
type OrderPrefsDuration = NonNullable<OrderPrefs['duration']>;

const PREF_SERVICE_TO_ORDER_SERVICE: Record<OrderPrefsService, string> = {
  'static-isp': 'static-residential',
  'static-ipv6': 'static-residential-ipv6',
  rotating: 'rotating-residential',
};

const ORDER_SERVICE_TO_PREF_SERVICE: Partial<Record<string, OrderPrefsService>> = {
  'static-residential': 'static-isp',
  'static-residential-ipv6': 'static-ipv6',
  'rotating-residential': 'rotating',
};

const PLAN_TO_TIER: Record<OrderPrefsPlan, string> = {
  basic: 'static-basic',
  dedicated: 'static-dedicated',
  premium: 'static-premium',
};

const TIER_TO_PLAN: Partial<Record<string, OrderPrefsPlan>> = {
  'static-basic': 'basic',
  'static-dedicated': 'dedicated',
  'static-premium': 'premium',
};

function isOrderPrefsService(value: string | null): value is OrderPrefsService {
  return value === 'static-isp' || value === 'static-ipv6' || value === 'rotating';
}

function isOrderPrefsPlan(value: string | null): value is OrderPrefsPlan {
  return value === 'basic' || value === 'dedicated' || value === 'premium';
}

function isOrderPrefsDuration(value: string | null): value is OrderPrefsDuration {
  return value === 'monthly' || value === 'yearly';
}

function findTierInfo(
  service: Nullable<OrderService>,
  tierId: string | null | undefined,
): { service: OrderService; category: OrderCategory; tier: OrderTier } | null {
  if (!service || !tierId) {
    return null;
  }

  for (const category of service.categories) {
    const tier = category.tiers.find((item) => item.id === tierId);
    if (tier) {
      return { service, category, tier };
    }
  }

  return null;
}

function resolveSelection(
  services: OrderService[],
  input: {
    service?: string | null;
    plan?: string | null;
    tierId?: string | null;
    duration?: string | null;
  },
): OrderSelection | null {
  if (services.length === 0) {
    return null;
  }

  let targetService: OrderService | undefined;

  const serviceCandidate = input.service;
  if (serviceCandidate) {
    if (isOrderPrefsService(serviceCandidate)) {
      const mappedId = PREF_SERVICE_TO_ORDER_SERVICE[serviceCandidate];
      targetService = services.find((service) => service.id === mappedId);
    }

    if (!targetService) {
      targetService = services.find((service) => service.id === serviceCandidate);
    }
  }

  const requestedTierId = input.tierId ?? undefined;
  let tierInfo: ReturnType<typeof findTierInfo> | null = null;

  if (requestedTierId && targetService) {
    tierInfo = findTierInfo(targetService, requestedTierId);
  }

  if (!tierInfo && requestedTierId) {
    for (const service of services) {
      tierInfo = findTierInfo(service, requestedTierId);
      if (tierInfo) {
        targetService = tierInfo.service;
        break;
      }
    }
  }

  if (!targetService) {
    targetService = services[0];
  }

  if (!tierInfo && input.plan) {
    const planId = input.plan;
    if (isOrderPrefsPlan(planId)) {
      const mappedTierId = PLAN_TO_TIER[planId];
      tierInfo = findTierInfo(targetService, mappedTierId);

      if (!tierInfo) {
        for (const service of services) {
          const candidate = findTierInfo(service, mappedTierId);
          if (candidate) {
            tierInfo = candidate;
            targetService = candidate.service;
            break;
          }
        }
      }
    }
  }

  if (!tierInfo) {
    const category = getDefaultCategory(targetService);
    const tier = getDefaultTier(category);
    tierInfo = category && tier ? { service: targetService, category, tier } : null;
  }

  if (!tierInfo) {
    return {
      serviceId: targetService.id,
      categoryId: getDefaultCategory(targetService)?.id ?? '',
      tierId: getDefaultTier(getDefaultCategory(targetService))?.id ?? '',
      duration: isOrderPrefsDuration(input.duration ?? null)
        ? (input.duration as OrderPrefsDuration)
        : undefined,
    } satisfies OrderSelection;
  }

  return {
    serviceId: tierInfo.service.id,
    categoryId: tierInfo.category.id,
    tierId: tierInfo.tier.id,
    duration: isOrderPrefsDuration(input.duration ?? null)
      ? (input.duration as OrderPrefsDuration)
      : undefined,
  } satisfies OrderSelection;
}

function getDefaultOptionValue(options: Option[], fallbackIndex = 0): string {
  if (options[fallbackIndex]) {
    return options[fallbackIndex].value;
  }

  return options[0]?.value ?? '';
}

export default function OrderPageContent() {
  const { locale } = useLocale();
  const page = useMemo(() => getOrderPage(locale), [locale]);
  const searchParams = useSearchParams();
  const searchParamsSnapshot = useMemo(
    () => ({
      service: searchParams.get('service'),
      plan: searchParams.get('plan'),
      tierId: searchParams.get('tier'),
      duration: searchParams.get('duration'),
    }),
    [searchParams],
  );

  const initialSelection = useMemo<OrderSelection>(() => {
    const fromQuery = resolveSelection(page.services, {
      service: searchParamsSnapshot.service,
      plan: searchParamsSnapshot.plan,
      tierId: searchParamsSnapshot.tierId,
      duration: searchParamsSnapshot.duration,
    });

    if (fromQuery) {
      return fromQuery;
    }

    const stored = loadOrderPrefs();
    if (stored) {
      const fromPrefs = resolveSelection(page.services, {
        service: stored.service,
        plan: stored.plan,
        tierId: stored.tierId,
        duration: stored.duration,
      });

      if (fromPrefs) {
        return fromPrefs;
      }
    }

    const fallbackService = page.services[0];
    const fallbackCategory = getDefaultCategory(fallbackService);
    const fallbackTier = getDefaultTier(fallbackCategory);

    return {
      serviceId: fallbackService?.id ?? '',
      categoryId: fallbackCategory?.id ?? '',
      tierId: fallbackTier?.id ?? '',
      duration: 'monthly',
    } satisfies OrderSelection;
  }, [page.services, searchParamsSnapshot]);

  const [serviceId, setServiceId] = useState(() => initialSelection.serviceId);
  const activeService = useMemo<Nullable<OrderService>>(
    () =>
      page.services.find((service: OrderService) => service.id === serviceId) ?? page.services[0],
    [page.services, serviceId],
  );

  const [categoryId, setCategoryId] = useState(() => initialSelection.categoryId);
  const activeCategory = useMemo<Nullable<OrderCategory>>(
    () =>
      activeService?.categories.find((category: OrderCategory) => category.id === categoryId) ??
      getDefaultCategory(activeService),
    [activeService, categoryId],
  );

  const [tierId, setTierId] = useState(() => initialSelection.tierId);
  const activeTier = useMemo<Nullable<OrderTier>>(
    () =>
      activeCategory?.tiers.find((tier: OrderTier) => tier.id === tierId) ??
      getDefaultTier(activeCategory),
    [activeCategory, tierId],
  );

  useEffect(() => {
    setServiceId(initialSelection.serviceId);
    setCategoryId(initialSelection.categoryId);
    setTierId(initialSelection.tierId);
  }, [initialSelection.categoryId, initialSelection.serviceId, initialSelection.tierId]);

  useEffect(() => {
    if (!page.services.some((service) => service.id === serviceId)) {
      setServiceId(initialSelection.serviceId);
    }
  }, [initialSelection.serviceId, page.services, serviceId]);

  useEffect(() => {
    if (!activeService) {
      return;
    }

    const hasCategory = activeService.categories.some((category) => category.id === categoryId);
    if (!hasCategory) {
      const fallbackCategory = getDefaultCategory(activeService);
      const fallbackTier = getDefaultTier(fallbackCategory);
      setCategoryId(fallbackCategory?.id ?? '');
      setTierId(fallbackTier?.id ?? '');
    }
  }, [activeService, categoryId]);

  useEffect(() => {
    if (!activeCategory) {
      return;
    }

    const hasTier = activeCategory.tiers.some((tier) => tier.id === tierId);
    if (!hasTier) {
      setTierId(getDefaultTier(activeCategory)?.id ?? '');
    }
  }, [activeCategory, tierId]);

  const isRotatingService = activeService?.id === 'rotating-residential';
  const activeTiers = activeCategory?.tiers ?? [];
  const activeTierIndex = Math.max(
    0,
    activeTiers.findIndex((tier: OrderTier) => tier.id === activeTier?.id),
  );
  const rotatingSliderMax = Math.max(0, activeTiers.length - 1);
  const rotatingTierMap = useMemo(
    () => new Map(rotatingPricing.tiers.map((tier) => [tier.id, normalizeTier(tier)])),
    [],
  );
  const activeRotatingTier =
    isRotatingService && activeTier ? rotatingTierMap.get(activeTier.id) : undefined;

  const initialDuration = initialSelection.duration;

  const configurationOptions = useMemo(() => {
    const base = {
      locations: [
        { value: 'us', label: locale === 'ru' ? 'США' : 'United States' },
        { value: 'gb', label: locale === 'ru' ? 'Великобритания' : 'United Kingdom' },
        { value: 'de', label: locale === 'ru' ? 'Германия' : 'Germany' },
        { value: 'fr', label: locale === 'ru' ? 'Франция' : 'France' },
        { value: 'nl', label: locale === 'ru' ? 'Нидерланды' : 'Netherlands' },
        { value: 'au', label: locale === 'ru' ? 'Австралия' : 'Australia' },
        { value: 'at', label: locale === 'ru' ? 'Австрия' : 'Austria' },
        { value: 'bd', label: locale === 'ru' ? 'Бангладеш' : 'Bangladesh' },
        { value: 'be', label: locale === 'ru' ? 'Бельгия' : 'Belgium' },
        { value: 'br', label: locale === 'ru' ? 'Бразилия' : 'Brazil' },
        { value: 'hu', label: locale === 'ru' ? 'Венгрия' : 'Hungary' },
        { value: 'vn', label: locale === 'ru' ? 'Вьетнам' : 'Vietnam' },
        { value: 'hn', label: locale === 'ru' ? 'Гондурас' : 'Honduras' },
        { value: 'hk', label: locale === 'ru' ? 'Гонконг САР Китая' : 'Hong Kong SAR China' },
        { value: 'gr', label: locale === 'ru' ? 'Греция' : 'Greece' },
        { value: 'dk', label: locale === 'ru' ? 'Дания' : 'Denmark' },
        { value: 'il', label: locale === 'ru' ? 'Израиль' : 'Israel' },
        { value: 'in', label: locale === 'ru' ? 'Индия' : 'India' },
        { value: 'id', label: locale === 'ru' ? 'Индонезия' : 'Indonesia' },
        { value: 'es', label: locale === 'ru' ? 'Испания' : 'Spain' },
        { value: 'it', label: locale === 'ru' ? 'Италия' : 'Italy' },
        { value: 'ca', label: locale === 'ru' ? 'Канада' : 'Canada' },
        { value: 'co', label: locale === 'ru' ? 'Колумбия' : 'Colombia' },
        { value: 'lt', label: locale === 'ru' ? 'Литва' : 'Lithuania' },
        { value: 'my', label: locale === 'ru' ? 'Малайзия' : 'Malaysia' },
        { value: 'mx', label: locale === 'ru' ? 'Мексика' : 'Mexico' },
        { value: 'ng', label: locale === 'ru' ? 'Нигерия' : 'Nigeria' },
        { value: 'no', label: locale === 'ru' ? 'Норвегия' : 'Norway' },
        {
          value: 'ae',
          label: locale === 'ru' ? 'Объединённые Арабские Эмираты' : 'United Arab Emirates',
        },
        { value: 'pe', label: locale === 'ru' ? 'Перу' : 'Peru' },
        { value: 'ph', label: locale === 'ru' ? 'Филиппины' : 'Philippines' },
        { value: 'fi', label: locale === 'ru' ? 'Финляндия' : 'Finland' },
        { value: 'pl', label: locale === 'ru' ? 'Польша' : 'Poland' },
        { value: 'pt', label: locale === 'ru' ? 'Португалия' : 'Portugal' },
        { value: 'ro', label: locale === 'ru' ? 'Румыния' : 'Romania' },
        { value: 'ru', label: locale === 'ru' ? 'Россия' : 'Russia' },
        { value: 'rs', label: locale === 'ru' ? 'Сербия' : 'Serbia' },
        { value: 'sg', label: locale === 'ru' ? 'Сингапур' : 'Singapore' },
        { value: 'sk', label: locale === 'ru' ? 'Словакия' : 'Slovakia' },
        { value: 'kr', label: locale === 'ru' ? 'Республика Корея' : 'South Korea' },
        { value: 'th', label: locale === 'ru' ? 'Таиланд' : 'Thailand' },
        { value: 'tr', label: locale === 'ru' ? 'Турция' : 'Turkey' },
        { value: 'ua', label: locale === 'ru' ? 'Украина' : 'Ukraine' },
        { value: 'hr', label: locale === 'ru' ? 'Хорватия' : 'Croatia' },
        { value: 'cz', label: locale === 'ru' ? 'Чехия' : 'Czechia' },
        { value: 'cl', label: locale === 'ru' ? 'Чили' : 'Chile' },
        { value: 'ch', label: locale === 'ru' ? 'Швейцария' : 'Switzerland' },
        { value: 'za', label: locale === 'ru' ? 'ЮАР' : 'South Africa' },
      ],
      isps: [
        { value: 'default', label: locale === 'ru' ? 'Любой' : 'Any' },
        { value: 'att', label: 'AT&T' },
        { value: 'verizon', label: 'Verizon' },
        { value: 'charter', label: locale === 'ru' ? 'Charter' : 'Charter' },
      ],
      quantities: [
        { value: '1', label: locale === 'ru' ? '1 прокси' : '1 proxy' },
        { value: '10', label: locale === 'ru' ? '10 прокси' : '10 proxies' },
        { value: '50', label: locale === 'ru' ? '50 прокси' : '50 proxies' },
        { value: '100', label: locale === 'ru' ? '100 прокси' : '100 proxies' },
        { value: '250', label: locale === 'ru' ? '250 прокси' : '250 proxies' },
      ],
      periods: [
        { value: 'weekly', label: locale === 'ru' ? '7 дней' : '7 days' },
        { value: 'monthly', label: locale === 'ru' ? '1 месяц' : '1 month' },
        { value: 'quarterly', label: locale === 'ru' ? '3 месяца' : '3 months' },
        { value: 'yearly', label: locale === 'ru' ? '12 месяцев' : '12 months' },
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
  const [selectedPeriod, setSelectedPeriod] = useState(() => {
    if (
      initialDuration &&
      configurationOptions.periods.some((option) => option.value === initialDuration)
    ) {
      return initialDuration;
    }

    return getDefaultOptionValue(configurationOptions.periods, 1);
  });
  const [autoRenew, setAutoRenew] = useState(true);

  useEffect(() => {
    setSelectedLocation(getDefaultOptionValue(configurationOptions.locations));
    setSelectedIsp(getDefaultOptionValue(configurationOptions.isps));
    setSelectedQuantity(getDefaultOptionValue(configurationOptions.quantities));
    setSelectedPeriod(() => {
      if (
        initialDuration &&
        configurationOptions.periods.some((option) => option.value === initialDuration)
      ) {
        return initialDuration;
      }

      return getDefaultOptionValue(configurationOptions.periods, 1);
    });
    setAutoRenew(true);
  }, [activeService, configurationOptions, initialDuration]);

  useEffect(() => {
    if (
      initialDuration &&
      configurationOptions.periods.some((option) => option.value === initialDuration)
    ) {
      setSelectedPeriod(initialDuration);
    }
  }, [configurationOptions, initialDuration]);

  const currency = activeService?.currency ?? 'USD';
  const unitAmount = activeTier?.priceAmount ?? 0;
  const hasUnitPrice = unitAmount > 0;
  const parsedQuantity = Number.parseInt(selectedQuantity, 10);
  const quantity = Number.isNaN(parsedQuantity) ? 1 : Math.max(1, parsedQuantity);
  const totalAmount = unitAmount * quantity;
  const unitPrice = hasUnitPrice
    ? formatCurrency(unitAmount, locale, currency)
    : (activeTier?.price ?? '—');
  const totalPrice = hasUnitPrice
    ? formatCurrency(totalAmount, locale, currency)
    : (activeTier?.price ?? '—');

  const activeServiceId = activeService?.id;
  const activeTierId = activeTier?.id;

  useEffect(() => {
    if (!activeServiceId || !activeTierId) {
      return;
    }

    const prefService = ORDER_SERVICE_TO_PREF_SERVICE[activeServiceId];
    if (!prefService) {
      return;
    }

    const prefs: OrderPrefs = { service: prefService, tierId: activeTierId };
    const planId = TIER_TO_PLAN[activeTierId];
    if (planId) {
      prefs.plan = planId;
    }

    if (selectedPeriod === 'monthly' || selectedPeriod === 'yearly') {
      prefs.duration = selectedPeriod;
    }

    saveOrderPrefs(prefs);
  }, [activeServiceId, activeTierId, selectedPeriod]);

  return (
    <div className={styles.page}>
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
                    className={`${styles.serviceCard} ${isActive ? styles.serviceCardActive : ''}`.trim()}
                    onClick={() => setServiceId(service.id)}
                    aria-pressed={isActive}
                  >
                    {service.card.badge && (
                      <span className={styles.serviceBadge}>{service.card.badge}</span>
                    )}
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
              {!isRotatingService && activeService.categories.length > 1 && (
                <div className={styles.categoryTabs}>
                  {activeService.categories.map((category: OrderCategory) => {
                    const isActive = category.id === activeCategory?.id;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        className={`${styles.categoryTab} ${isActive ? styles.categoryTabActive : ''}`.trim()}
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
                      <h3 className={styles.planTitle}>{locale === 'ru' ? 'План' : 'Plan'}</h3>
                      <p className={styles.planSubtitle}>
                        {locale === 'ru'
                          ? 'Выберите подходящий тариф и настройте детали ниже.'
                          : 'Pick the plan that fits and configure the details below.'}
                      </p>
                    </div>
                    <div className={styles.planCards}>
                      {(activeCategory?.tiers ?? []).map((tier: OrderTier) => {
                        const isActive = tier.id === activeTier?.id;
                        return (
                          <button
                            key={tier.id}
                            type="button"
                            className={`${styles.planCard} ${isActive ? styles.planCardActive : ''}`.trim()}
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
                      {locale === 'ru' ? 'Настройки' : 'Configuration'}
                    </h3>
                    <div className={styles.configGrid}>
                      <label className={styles.configField}>
                        <span className={styles.configLabel}>
                          {locale === 'ru' ? 'Местоположение прокси' : 'Proxy location'}
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
                          {locale === 'ru' ? 'Количество прокси (IP)' : 'Number of proxies'}
                        </span>
                        <input
                          type="number"
                          min={1}
                          step={1}
                          inputMode="numeric"
                          className={styles.configInput}
                          value={selectedQuantity}
                          onChange={(event) => setSelectedQuantity(event.target.value)}
                          placeholder={locale === 'ru' ? 'Введите количество' : 'Enter quantity'}
                        />
                      </label>
                      <label className={styles.configField}>
                        <span className={styles.configLabel}>
                          {locale === 'ru' ? 'Временной период' : 'Billing period'}
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
                            {locale === 'ru' ? 'Автопродление' : 'Auto renewal'}
                          </span>
                          <span className={styles.configDescription}>
                            {locale === 'ru'
                              ? 'Оплата продлевается автоматически'
                              : 'Enable automatic renewal'}
                          </span>
                        </div>
                        <button
                          type="button"
                          className={`${styles.toggle} ${autoRenew ? styles.toggleActive : ''}`.trim()}
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
                          {locale === 'ru' ? 'Оплата за трафик' : 'Pay per traffic'}
                        </h3>
                        <p className={styles.rotatingSubtitle}>
                          {locale === 'ru'
                            ? 'Выберите, сколько гигабайт трафика требуется в месяц.'
                            : 'Choose how many gigabytes you need each month.'}
                        </p>
                      </div>
                      <div className={styles.rotatingPrice}>
                        {activeRotatingTier ? (
                          <span className={styles.rotatingPriceLabel}>
                            {activeRotatingTier.gb} GB —{' '}
                            {fmtUSD(Number(activeRotatingTier.pricePerGbText))}/GB (Total{' '}
                            {fmtUSD(activeRotatingTier.total)})
                          </span>
                        ) : (
                          <>
                            <span>{activeTier?.price ?? '—'}</span>
                            {activeTier?.period && (
                              <span className={styles.rotatingPeriod}>{activeTier.period}</span>
                            )}
                          </>
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
                              className={`${styles.rotatingMark} ${isActive ? styles.rotatingMarkActive : ''}`.trim()}
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
                <span className={styles.summaryValue}>{activeService?.card.title ?? '—'}</span>
              </li>
              <li>
                <span className={styles.summaryLabel}>{page.copy.summary.categoryLabel}</span>
                <span className={styles.summaryValue}>{activeCategory?.label ?? '—'}</span>
              </li>
              <li>
                <span className={styles.summaryLabel}>{page.copy.summary.planLabel}</span>
                <span className={styles.summaryValue}>{activeTier?.name ?? '—'}</span>
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
    </div>
  );
}
