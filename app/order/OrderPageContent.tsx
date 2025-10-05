'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import ProgressStepper from '@/components/order/ProgressStepper';
import SummaryBarMobile from '@/components/order/SummaryBarMobile';
import StepperInput from '@/components/ui/StepperInput';
import { useLocale } from '../../components/LocaleContext';
import { getOrderPage } from '../../lib/order';
import { rotatingPricing } from '../../config/pricing';
import { fmtUsdByLocale, normalizeTier } from '../../lib/money';
import { loadOrderPrefs, saveOrderPrefs } from '@/lib/orderPrefs';
import { Check } from '@/components/icons/Check';
import type { OrderPrefs } from '@/lib/orderPrefs';

const panelClass =
  'rounded-2xl border border-gray-200 bg-white shadow-[0_8px_24px_rgba(2,6,23,.06)]';
const chipClass =
  'inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900';
const eyebrowClass = 'text-sm font-semibold uppercase tracking-wide text-gray-500';
const dimmedTextClass = 'text-gray-600';

function FeatureList({ items, className }: { items: string[]; className?: string }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={clsx('space-y-2 text-sm text-gray-600', className)}>
      {items.map((feature) => (
        <li key={feature} className="flex items-start gap-2">
          <Check className="mt-1 h-4 w-4 text-green-600" />
          <span>{feature}</span>
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
        'relative inline-flex h-8 w-14 items-center rounded-full border border-gray-300 bg-white transition focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2',
        checked ? 'bg-gray-900 text-white' : 'bg-white text-gray-500',
      )}
    >
      <span
        className={clsx(
          'inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition',
          checked ? 'translate-x-7' : 'translate-x-1 bg-gray-200',
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
  const defaultQuantityValue = useMemo(() => {
    const parsed = Number.parseInt(
      getDefaultOptionValue(configurationOptions.quantities),
      10,
    );
    return Number.isNaN(parsed) ? 1 : Math.max(1, parsed);
  }, [configurationOptions]);
  const [quantity, setQuantity] = useState(defaultQuantityValue);
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
  const [activeProgressStep, setActiveProgressStep] = useState<1 | 2 | 3 | 4>(2);

  useEffect(() => {
    setSelectedLocation(getDefaultOptionValue(configurationOptions.locations));
    setSelectedIsp(getDefaultOptionValue(configurationOptions.isps));
    setQuantity(defaultQuantityValue);
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
  }, [activeService, configurationOptions, defaultQuantityValue, initialDuration]);

  useEffect(() => {
    if (
      initialDuration &&
      configurationOptions.periods.some((option) => option.value === initialDuration)
    ) {
      setSelectedPeriod(initialDuration);
    }
  }, [configurationOptions, initialDuration]);

  const unitAmount = activeTier?.priceAmount ?? 0;
  const hasUnitPrice = unitAmount > 0;
  const safeQuantity = Math.max(1, quantity);
  const totalAmount = unitAmount * safeQuantity;
  const unitPrice = hasUnitPrice
    ? fmtUsdByLocale(locale, unitAmount)
    : activeTier?.price ?? '—';
  const totalPrice = hasUnitPrice
    ? fmtUsdByLocale(locale, totalAmount)
    : activeTier?.price ?? '—';
  const periodLabel = useMemo(
    () =>
      configurationOptions.periods.find((option) => option.value === selectedPeriod)?.label ?? '—',
    [configurationOptions, selectedPeriod],
  );
  const quantityLabel = useMemo(() => {
    if (locale === 'ru') {
      return `${safeQuantity} IP`;
    }
    return `${safeQuantity} ${safeQuantity === 1 ? 'IP' : 'IPs'}`;
  }, [locale, safeQuantity]);
  const miniSummary = `${quantityLabel} • ${periodLabel}`;

  const handleSelectService = useCallback((id: string) => {
    setServiceId(id);
    setActiveProgressStep(1);
  }, []);

  const handleSelectCategory = useCallback((id: string) => {
    setCategoryId(id);
    setActiveProgressStep(2);
  }, []);

  const handleSelectTier = useCallback((id: string) => {
    setTierId(id);
    setActiveProgressStep(2);
  }, []);

  const markSettingsStep = useCallback(() => {
    setActiveProgressStep(3);
  }, []);

  const handleNext = useCallback(() => {
    setActiveProgressStep(4);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const node = document.getElementById(sectionId);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

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
      <div className="mx-auto max-w-6xl px-4 pb-32 pt-24 sm:px-6 lg:px-8 lg:pt-32">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-10">
          <div className="flex flex-col gap-6 lg:gap-8">
            <section className={clsx(panelClass, 'space-y-6 p-6 sm:p-8 lg:p-10')}>
              <div>
                <span className={eyebrowClass}>{page.copy.heroEyebrow}</span>
                <ProgressStepper step={activeProgressStep} />
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
                  {page.copy.heroTitle}
                </h1>
                <p className="text-lg text-gray-600">{page.copy.heroSubtitle}</p>
                <p className="text-base text-gray-600">{page.copy.heroDescription}</p>
              </div>
            </section>

            <section
              id="product"
              className={clsx(panelClass, 'space-y-6 p-6 sm:p-8 lg:p-10')}
            >
              <header className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
                  {page.copy.servicesSectionTitle}
                </h2>
                <p className={dimmedTextClass}>{page.copy.servicesSectionSubtitle}</p>
              </header>
              <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {page.services.map((service: OrderService) => {
                  const isActive = service.id === activeService?.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      role="button"
                      className={clsx(
                        'flex h-full cursor-pointer flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-[0_8px_24px_rgba(2,6,23,.06)] transition focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2',
                        isActive ? 'bg-gray-50 ring-2 ring-gray-900' : 'hover:bg-gray-50',
                      )}
                      onClick={() => handleSelectService(service.id)}
                      aria-pressed={isActive}
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-semibold tracking-tight text-gray-900">
                            {service.card.title}
                          </h3>
                          {service.card.badge && <span className={chipClass}>{service.card.badge}</span>}
                        </div>
                        <p className="text-base font-medium text-gray-600">
                          {service.card.headline}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 [font-variant-numeric:tabular-nums]">
                        {service.card.priceHint}
                      </p>
                      <FeatureList items={service.card.highlights} />
                    </button>
                  );
                })}
              </div>
            </section>


            {activeService && (
              <section className={clsx(panelClass, 'space-y-8 p-6 sm:p-8 lg:p-10')}>
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
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
                          role="button"
                          className={clsx(
                            'rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2',
                            isActive ? 'bg-gray-900 text-white hover:bg-gray-900' : 'hover:bg-gray-50',
                          )}
                          onClick={() => handleSelectCategory(category.id)}
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
                    <div className="space-y-6" id="plan">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold tracking-tight text-gray-900">
                          {locale === 'ru' ? 'План' : 'Plan'}
                        </h3>
                        <p className={dimmedTextClass}>
                          {locale === 'ru'
                            ? 'Выберите подходящий тариф и настройте детали ниже.'
                            : 'Pick the plan that fits and configure the details below.'}
                        </p>
                      </div>
                      <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {(activeCategory?.tiers ?? []).map((tier: OrderTier) => {
                          const isActive = tier.id === activeTier?.id;
                          const tierPrice = tier.priceAmount
                            ? fmtUsdByLocale(locale, tier.priceAmount)
                            : tier.price;
                          return (
                            <button
                              key={tier.id}
                              type="button"
                              role="button"
                              className={clsx(
                                'flex h-full cursor-pointer flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-[0_8px_24px_rgba(2,6,23,.06)] transition focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2',
                                isActive ? 'bg-gray-50 ring-2 ring-gray-900' : 'hover:bg-gray-50',
                              )}
                              onClick={() => handleSelectTier(tier.id)}
                              aria-pressed={isActive}
                            >
                              <header className="flex items-start justify-between gap-4">
                                <div className="space-y-2">
                                  <h4 className="text-lg font-semibold tracking-tight text-gray-900">
                                    {tier.name}
                                  </h4>
                                  {tier.subLabel && (
                                    <span className="text-sm font-medium uppercase tracking-wide text-gray-500">
                                      {tier.subLabel}
                                    </span>
                                  )}
                                  {tier.headline && <span className={chipClass}>{tier.headline}</span>}
                                </div>
                                <div className="text-right">
                                  <span className="block text-lg font-semibold text-gray-900 [font-variant-numeric:tabular-nums]">
                                    {tierPrice}
                                  </span>
                                  {tier.period && (
                                    <span className="text-sm text-gray-500">{tier.period}</span>
                                  )}
                                </div>
                              </header>
                              {tier.description && (
                                <p className="text-sm text-gray-600">{tier.description}</p>
                              )}
                              <FeatureList items={tier.features} className="mt-auto" />
                              {tier.ribbon ? (
                                <span className="inline-flex w-fit items-center rounded-full bg-gray-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-900">
                                  {tier.ribbon}
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-6" id="settings">
                      <h3 className="text-xl font-semibold tracking-tight text-gray-900">
                        {locale === 'ru' ? 'Настройки' : 'Configuration'}
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="space-y-2">
                          <span className="text-sm font-medium text-gray-700">
                            {locale === 'ru' ? 'Местоположение прокси' : 'Proxy location'}
                          </span>
                          <select
                            className="block w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                            value={selectedLocation}
                            onChange={(event) => {
                              setSelectedLocation(event.target.value);
                              markSettingsStep();
                            }}
                          >
                            {configurationOptions.locations.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="space-y-2">
                          <span className="text-sm font-medium text-gray-700">ISP</span>
                          <select
                            className="block w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                            value={selectedIsp}
                            onChange={(event) => {
                              setSelectedIsp(event.target.value);
                              markSettingsStep();
                            }}
                          >
                            {configurationOptions.isps.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        <StepperInput
                          className="space-y-2"
                          label={locale === 'ru' ? 'Количество прокси (IP)' : 'Number of proxies'}
                          value={safeQuantity}
                          min={1}
                          onChange={(value) => {
                            setQuantity(value);
                            markSettingsStep();
                          }}
                        />
                        <label className="space-y-2">
                          <span className="text-sm font-medium text-gray-700">
                            {locale === 'ru' ? 'Временной период' : 'Billing period'}
                          </span>
                          <select
                            className="block w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                            value={selectedPeriod}
                            onChange={(event) => {
                              setSelectedPeriod(event.target.value);
                              markSettingsStep();
                            }}
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
                        <span className="text-sm font-medium text-gray-700">
                          {locale === 'ru' ? 'Автопродление' : 'Auto renewal'}
                        </span>
                        <label className="flex items-center gap-3">
                          <Switch
                            checked={autoRenew}
                            onChange={(value) => {
                              setAutoRenew(value);
                              markSettingsStep();
                            }}
                          />
                          <span className="text-sm text-gray-600">
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
                        <h3 className="text-xl font-semibold tracking-tight text-gray-900">
                          {locale === 'ru' ? 'Оплата за трафик' : 'Pay per traffic'}
                        </h3>
                        <p className={dimmedTextClass}>
                          {locale === 'ru'
                            ? 'Выберите, сколько гигабайт трафика требуется в месяц.'
                            : 'Choose how many gigabytes you need each month.'}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900 [font-variant-numeric:tabular-nums]">
                        {activeRotatingTier ? (
                          <span>
                            {activeRotatingTier.gb} GB — {fmtUsdByLocale(locale, activeRotatingTier.pricePerGb)} / GB ({' '}
                            {locale === 'ru' ? 'Всего' : 'Total'} {fmtUsdByLocale(locale, activeRotatingTier.total)})
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
                            handleSelectTier(nextTier.id);
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
                              role="button"
                              className={clsx(
                                'rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2',
                                isActive ? 'bg-gray-900 text-white hover:bg-gray-900' : 'hover:bg-gray-50',
                              )}
                              onClick={() => handleSelectTier(tier.id)}
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
            <section className={clsx(panelClass, 'space-y-6 p-6 sm:p-8 lg:p-10')}>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
                  {page.copy.paymentTitle}
                </h2>
                <p className={dimmedTextClass}>{page.paymentNote}</p>
              </div>
              <div className="space-y-3">
                <span className={eyebrowClass}>{page.copy.paymentMethodsLabel}</span>
                <ul className="flex flex-wrap gap-3 text-sm font-medium text-gray-900">
                  {page.paymentMethods.map((method: string) => (
                    <li key={method} className={chipClass}>
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className={clsx(panelClass, 'flex flex-col gap-6 p-6 sm:p-8 lg:p-10 sm:flex-row sm:items-center sm:justify-between')}>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
                  {page.copy.contactTitle}
                </h2>
                <p className={dimmedTextClass}>{page.copy.contactSubtitle}</p>
              </div>
              <Link
                href={page.copy.contactHref}
                className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              >
                {page.copy.contactCtaLabel}
              </Link>
            </section>
          </div>

          <aside className="sticky top-6 hidden self-start md:block">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_8px_24px_rgba(2,6,23,.06)] sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
                {page.copy.summary.title}
              </h2>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start justify-between gap-3">
                  <div>
                    <span className={eyebrowClass}>{page.copy.summary.serviceLabel}</span>
                    <span className="text-base font-medium text-gray-900">
                      {activeService?.card.title ?? '—'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToSection('product')}
                    className="text-sm text-gray-600 underline decoration-dotted transition hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                  >
                    {locale === 'ru' ? 'Изменить' : 'Edit'}
                  </button>
                </li>
                <li className="flex items-start justify-between gap-3">
                  <div>
                    <span className={eyebrowClass}>{page.copy.summary.categoryLabel}</span>
                    <span className="text-base font-medium text-gray-900">
                      {activeCategory?.label ?? '—'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToSection('plan')}
                    className="text-sm text-gray-600 underline decoration-dotted transition hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                  >
                    {locale === 'ru' ? 'Изменить' : 'Edit'}
                  </button>
                </li>
                <li className="flex items-start justify-between gap-3">
                  <div>
                    <span className={eyebrowClass}>{page.copy.summary.planLabel}</span>
                    <span className="text-base font-medium text-gray-900">
                      {activeTier?.name ?? '—'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToSection('plan')}
                    className="text-sm text-gray-600 underline decoration-dotted transition hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                  >
                    {locale === 'ru' ? 'Изменить' : 'Edit'}
                  </button>
                </li>
              </ul>

              <div className="mt-6 space-y-2">
                <span className={eyebrowClass}>{page.copy.summary.unitLabel}</span>
                <div>
                  <p className="text-base font-medium text-gray-900 [font-variant-numeric:tabular-nums]">{unitPrice}</p>
                  {activeTier?.period && (
                    <p className="text-sm text-gray-500">{activeTier.period}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-gray-100 px-4 py-3">
                <div className="text-sm text-gray-600">{page.copy.summary.totalLabel}</div>
                <div className="text-3xl font-semibold text-gray-900 [font-variant-numeric:tabular-nums]">{totalPrice}</div>
                <div className="mt-1 text-sm text-gray-500">{miniSummary}</div>
              </div>

              {activeTier && activeTier.features.length > 0 && (
                <div className="mt-6 space-y-3">
                  <p className="text-sm font-semibold text-gray-900">{page.copy.summary.featuresLabel}</p>
                  <FeatureList items={activeTier.features} />
                </div>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="mt-8 w-full rounded-2xl bg-gray-900 px-5 py-3 text-base font-semibold text-white transition hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              >
                {page.copy.summary.ctaLabel}
              </button>
              <p className="mt-4 text-sm text-gray-500">{page.copy.summary.disclaimer}</p>
            </div>
          </aside>
        </div>
      </div>
      <SummaryBarMobile
        total={totalPrice}
        totalLabel={page.copy.summary.totalLabel}
        summary={miniSummary}
        ctaLabel={page.copy.summary.ctaLabel}
        onNext={handleNext}
      />
    </div>
  );
}
