'use client';

import { useEffect, useMemo, useState, type SVGProps } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useLocale } from '../../components/LocaleContext';
import { getOrderPage } from '../../lib/order';
import { rotatingPricing } from '../../config/pricing';
import { normalizeTier } from '../../lib/money';
import { loadOrderPrefs, saveOrderPrefs } from '@/lib/orderPrefs';
import type { OrderPrefs } from '@/lib/orderPrefs';

const panelClass = 'rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow)]';
const chipClass = 'inline-flex items-center rounded-full bg-[var(--chip)] px-2.5 py-1 text-sm font-medium text-slate-800';
const eyebrowClass = 'text-sm uppercase tracking-wider text-[var(--text-dim)]';
const dimmedTextClass = 'text-[var(--text-dim)]';

function CheckIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      className={clsx('h-4 w-4 text-emerald-500', className)}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5 8 14l8-8" />
    </svg>
  );
}

function FeatureList({ items, className }: { items: string[]; className?: string }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={clsx('space-y-2 text-sm text-[var(--text)]', className)}>
      {items.map((feature) => (
        <li key={feature} className="flex items-start gap-2">
          <CheckIcon className="mt-1" />
          <span className={dimmedTextClass}>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function Switch({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={clsx(
        'relative inline-flex h-8 w-14 items-center rounded-full border border-[var(--border)] bg-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2',
        checked ? 'bg-gray-900' : 'bg-white',
      )}
    >
      <span
        className={clsx(
          'inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition',
          checked ? 'translate-x-7' : 'translate-x-1 bg-[var(--muted)]',
        )}
      />
    </button>
  );
}

type Nullable<T> = T | undefined;

type OrderPageData = ReturnType<typeof getOrderPage>;
type OrderService = OrderPageData['services'][number];
type OrderCategory = OrderService['categories'][number];
type OrderTier = OrderCategory['tiers'][number];

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

function getDefaultCategory(service: Nullable<OrderService>): Nullable<OrderCategory> {
  return service?.categories[0];
}

function getDefaultTier(category: Nullable<OrderCategory>): Nullable<OrderTier> {
  return category?.tiers[0];
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
    () => page.services.find((service: OrderService) => service.id === serviceId) ?? page.services[0],
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

  const fmtUsd = useMemo(
    () => new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US', { style: 'currency', currency: 'USD' }),
    [locale],
  );

  const unitAmount = activeTier?.priceAmount ?? 0;
  const hasUnitPrice = unitAmount > 0;
  const parsedQuantity = Number.parseInt(selectedQuantity, 10);
  const quantity = Number.isNaN(parsedQuantity) ? 1 : Math.max(1, parsedQuantity);
  const totalAmount = unitAmount * quantity;
  const unitPrice = hasUnitPrice
    ? fmtUsd.format(unitAmount)
    : (activeTier?.price ?? '—');
  const totalPrice = hasUnitPrice
    ? fmtUsd.format(totalAmount)
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
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pt-32">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-10">
          <div className="flex flex-col gap-6 lg:gap-8">
            <section className={clsx(panelClass, 'p-6 sm:p-8 lg:p-10 space-y-6')}>
              <span className={eyebrowClass}>{page.copy.heroEyebrow}</span>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                  {page.copy.heroTitle}
                </h1>
                <p className="text-lg text-[var(--text-dim)]">{page.copy.heroSubtitle}</p>
                <p className="text-base text-[var(--text-dim)]">{page.copy.heroDescription}</p>
              </div>
            </section>

            <section className={clsx(panelClass, 'p-6 sm:p-8 lg:p-10 space-y-6')}>
              <header className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {page.copy.servicesSectionTitle}
                </h2>
                <p className={dimmedTextClass}>{page.copy.servicesSectionSubtitle}</p>
              </header>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {page.services.map((service: OrderService) => {
                  const isActive = service.id === activeService?.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      className={clsx(
                        'flex h-full flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-left transition hover:bg-[var(--muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900',
                        isActive && 'ring-2 ring-gray-900',
                      )}
                      onClick={() => setServiceId(service.id)}
                      aria-pressed={isActive}
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-semibold tracking-tight text-[var(--text)]">
                            {service.card.title}
                          </h3>
                          {service.card.badge && <span className={chipClass}>{service.card.badge}</span>}
                        </div>
                        <p className="text-base font-medium text-[var(--text-dim)]">
                          {service.card.headline}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[var(--text)]">{service.card.priceHint}</p>
                      <FeatureList items={service.card.highlights} />
                    </button>
                  );
                })}
              </div>
            </section>

            {activeService && (
              <section className={clsx(panelClass, 'p-6 sm:p-8 lg:p-10 space-y-8')}>
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {activeService.detailTitle}
                  </h2>
                  <p className={dimmedTextClass}>{activeService.detailSubtitle}</p>
                  {activeService.detailHighlight && (
                    <span className={chipClass}>{activeService.detailHighlight}</span>
                  )}
                </div>

                {!isRotatingService && activeService.categories.length > 1 && (
                  <div className="flex flex-wrap gap-3">
                    {activeService.categories.map((category: OrderCategory) => {
                      const isActive = category.id === activeCategory?.id;
                      return (
                        <button
                          key={category.id}
                          type="button"
                          className={clsx(
                            'rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900',
                            isActive && 'ring-2 ring-gray-900',
                          )}
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
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold tracking-tight">
                          {locale === 'ru' ? 'План' : 'Plan'}
                        </h3>
                        <p className={dimmedTextClass}>
                          {locale === 'ru'
                            ? 'Выберите подходящий тариф и настройте детали ниже.'
                            : 'Pick the plan that fits and configure the details below.'}
                        </p>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {(activeCategory?.tiers ?? []).map((tier: OrderTier) => {
                          const isActive = tier.id === activeTier?.id;
                          return (
                            <button
                              key={tier.id}
                              type="button"
                              className={clsx(
                                'flex h-full flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-5 text-left transition hover:bg-[var(--muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900',
                                isActive && 'ring-2 ring-gray-900 bg-white',
                              )}
                              onClick={() => setTierId(tier.id)}
                              aria-pressed={isActive}
                            >
                              <header className="flex items-start justify-between gap-4">
                                <div className="space-y-2">
                                  <h4 className="text-lg font-semibold tracking-tight text-[var(--text)]">
                                    {tier.name}
                                  </h4>
                                  {tier.subLabel && (
                                    <span className="text-sm font-semibold uppercase tracking-wide text-[var(--text-dim)]">
                                      {tier.subLabel}
                                    </span>
                                  )}
                                  {tier.headline && (
                                    <span className={chipClass}>{tier.headline}</span>
                                  )}
                                </div>
                                <div className="text-right">
                                  <span className="block text-lg font-semibold text-[var(--text)]">
                                    {tier.price}
                                  </span>
                                  {tier.period && (
                                    <span className="text-sm text-[var(--text-dim)]">{tier.period}</span>
                                  )}
                                </div>
                              </header>
                              {tier.description && (
                                <p className={clsx('text-sm', dimmedTextClass)}>{tier.description}</p>
                              )}
                              <FeatureList items={tier.features} />
                              {tier.ribbon ? (
                                <span className="inline-flex items-center rounded-full bg-black/5 px-2 py-0.5 text-xs font-semibold text-gray-900">
                                  {tier.ribbon}
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold tracking-tight">
                        {locale === 'ru' ? 'Настройки' : 'Configuration'}
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="space-y-2">
                          <span className="text-sm font-medium text-[var(--text)]">
                            {locale === 'ru' ? 'Местоположение прокси' : 'Proxy location'}
                          </span>
                          <select
                            className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-3 text-[var(--text)] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                        <label className="space-y-2">
                          <span className="text-sm font-medium text-[var(--text)]">ISP</span>
                          <select
                            className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-3 text-[var(--text)] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                        <label className="space-y-2">
                          <span className="text-sm font-medium text-[var(--text)]">
                            {locale === 'ru' ? 'Количество прокси (IP)' : 'Number of proxies'}
                          </span>
                          <input
                            type="number"
                            min={1}
                            step={1}
                            inputMode="numeric"
                            className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-3 text-[var(--text)] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                            value={selectedQuantity}
                            onChange={(event) => setSelectedQuantity(event.target.value)}
                            placeholder={locale === 'ru' ? 'Введите количество' : 'Enter quantity'}
                          />
                        </label>
                        <label className="space-y-2">
                          <span className="text-sm font-medium text-[var(--text)]">
                            {locale === 'ru' ? 'Временной период' : 'Billing period'}
                          </span>
                          <select
                            className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-3 text-[var(--text)] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-[var(--text)]">
                          {locale === 'ru' ? 'Автопродление' : 'Auto renewal'}
                        </span>
                        <label className="flex items-center gap-3">
                          <Switch checked={autoRenew} onChange={setAutoRenew} />
                          <span className={dimmedTextClass}>
                            {locale === 'ru'
                              ? 'Оплата продлевается автоматически'
                              : 'Billing renews automatically'}
                          </span>
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold tracking-tight">
                          {locale === 'ru' ? 'Оплата за трафик' : 'Pay per traffic'}
                        </h3>
                        <p className={dimmedTextClass}>
                          {locale === 'ru'
                            ? 'Выберите, сколько гигабайт трафика требуется в месяц.'
                            : 'Choose how many gigabytes you need each month.'}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-[var(--text)]">
                        {activeRotatingTier ? (
                          <span>
                            {activeRotatingTier.gb} GB — {fmtUsd.format(activeRotatingTier.pricePerGb)} / GB ({' '}
                            {locale === 'ru' ? 'Всего' : 'Total'} {fmtUsd.format(activeRotatingTier.total)})
                          </span>
                        ) : (
                          <span>{activeTier?.price ?? '—'}</span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-6">
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
                        className="w-full accent-gray-900"
                      />
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {activeTiers.map((tier: OrderTier) => {
                          const isActive = tier.id === activeTier?.id;
                          return (
                            <button
                              key={tier.id}
                              type="button"
                              className={clsx(
                                'rounded-xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900',
                                isActive && 'ring-2 ring-gray-900',
                              )}
                              onClick={() => setTierId(tier.id)}
                              aria-pressed={isActive}
                            >
                              {tier.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <FeatureList items={activeTier?.features ?? []} />
                  </div>
                )}
              </section>
            )}

            <section className={clsx(panelClass, 'p-6 sm:p-8 lg:p-10 space-y-6')}>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {page.copy.paymentTitle}
                </h2>
                <p className={dimmedTextClass}>{page.paymentNote}</p>
              </div>
              <div className="space-y-3">
                <span className={eyebrowClass}>{page.copy.paymentMethodsLabel}</span>
                <ul className="flex flex-wrap gap-3 text-sm font-medium text-[var(--text)]">
                  {page.paymentMethods.map((method: string) => (
                    <li key={method} className={chipClass}>
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className={clsx(panelClass, 'p-6 sm:p-8 lg:p-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between')}>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {page.copy.contactTitle}
                </h2>
                <p className={dimmedTextClass}>{page.copy.contactSubtitle}</p>
              </div>
              <Link
                href={page.copy.contactHref}
                className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
              >
                {page.copy.contactCtaLabel}
              </Link>
            </section>
          </div>

          <aside className="sticky top-6 self-start">
            <div className="rounded-2xl bg-white border border-[var(--border)] shadow-[var(--shadow)] p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {page.copy.summary.title}
              </h2>
              <ul className="mt-6 space-y-4">
                <li className="flex flex-col gap-1">
                  <span className={eyebrowClass}>{page.copy.summary.serviceLabel}</span>
                  <span className="text-base font-medium text-[var(--text)]">
                    {activeService?.card.title ?? '—'}
                  </span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className={eyebrowClass}>{page.copy.summary.categoryLabel}</span>
                  <span className="text-base font-medium text-[var(--text)]">
                    {activeCategory?.label ?? '—'}
                  </span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className={eyebrowClass}>{page.copy.summary.planLabel}</span>
                  <span className="text-base font-medium text-[var(--text)]">
                    {activeTier?.name ?? '—'}
                  </span>
                </li>
              </ul>

              <div className="mt-6 space-y-2">
                <span className={eyebrowClass}>{page.copy.summary.unitLabel}</span>
                <div>
                  <p className="text-base font-medium text-[var(--text)]">{unitPrice}</p>
                  {activeTier?.period && (
                    <p className="text-sm text-[var(--text-dim)]">{activeTier.period}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-[var(--muted)] px-4 py-5">
                <span className={eyebrowClass}>{page.copy.summary.totalLabel}</span>
                <span className="text-3xl font-semibold text-[var(--text)] [font-variant-numeric:tabular-nums]">
                  {totalPrice}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {activeTier && activeTier.features.length > 0 && (
                  <>
                    <p className="text-sm font-semibold text-[var(--text)]">
                      {page.copy.summary.featuresLabel}
                    </p>
                    <FeatureList items={activeTier.features} />
                  </>
                )}
              </div>

              <button
                type="button"
                className="mt-8 w-full rounded-2xl bg-gray-900 px-5 py-3 text-base font-semibold text-white transition hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
              >
                {page.copy.summary.ctaLabel}
              </button>
              <p className="mt-4 text-sm text-[var(--text-dim)]">{page.copy.summary.disclaimer}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
