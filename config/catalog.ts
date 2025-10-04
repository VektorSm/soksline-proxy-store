import { getOrderPage } from '@/lib/order';
import { rotatingPricing } from './pricing';

export type ServiceId = 'static-isp' | 'static-ipv6' | 'rotating';
export type PlanId = 'basic' | 'dedicated' | 'premium';

export type Plan = {
  id: PlanId;
  title: string;
  priceUsd: number;
  unit: 'per proxy / mo';
  features: string[];
  badge?: string;
};

export type StaticCatalog = {
  id: 'static-isp' | 'static-ipv6';
  name: string;
  summary?: string;
  plans: Plan[];
  fromUsd?: number;
};

export type RotatingTier = {
  id: string;
  gb: number;
  pricePerGbUsd?: number;
  totalUsd?: number;
  badge?: string;
};

export type RotatingCatalog = {
  id: 'rotating';
  name: string;
  tiers: RotatingTier[];
};

export type Catalog = {
  staticIsp: StaticCatalog;
  staticIpv6: StaticCatalog;
  rotating: RotatingCatalog;
};

const ORDER_STATIC_PLAN_IDS: Record<PlanId, string> = {
  basic: 'static-basic',
  dedicated: 'static-dedicated',
  premium: 'static-premium',
};

function parseUsdFromText(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const match = value.match(/\d+[\d,.]*/);
  if (!match) return undefined;
  const normalized = match[0].replace(/,/g, '');
  const amount = Number.parseFloat(normalized);
  return Number.isFinite(amount) ? amount : undefined;
}

const orderPage = getOrderPage('en');

const staticService = orderPage.services.find((service) => service.id === 'static-residential');
const staticPlanById = new Map(
  (staticService?.categories ?? [])
    .flatMap((category) => category.tiers)
    .map((tier) => [tier.id, tier]),
);

const staticPlans: Plan[] = Object.entries(ORDER_STATIC_PLAN_IDS)
  .map(([planId, orderTierId]) => {
    const tier = staticPlanById.get(orderTierId);
    if (!tier) return undefined;
    return {
      id: planId as PlanId,
      title: tier.name,
      priceUsd: tier.priceAmount,
      unit: 'per proxy / mo',
      features: tier.features,
      badge: tier.headline,
    } satisfies Plan;
  })
  .filter(Boolean) as Plan[];

const ipv6Service = orderPage.services.find(
  (service) => service.id === 'static-residential-ipv6',
);

const rotatingService = orderPage.services.find((service) => service.id === 'rotating-residential');

const rotatingTiers: RotatingTier[] = rotatingPricing.tiers.map((tier) => {
  const totalUsd = tier.totalUsd;
  const pricePerGbUsd = tier.pricePerGbUsd ?? (tier.gb ? (totalUsd ?? 0) / tier.gb : undefined);
  return {
    id: tier.id,
    gb: tier.gb,
    totalUsd,
    pricePerGbUsd,
    badge: tier.badge,
  } satisfies RotatingTier;
});

export const catalog: Catalog = {
  staticIsp: {
    id: 'static-isp',
    name: staticService?.card.title ?? 'Static Residential Proxy',
    summary: staticService?.card.headline,
    plans: staticPlans,
  },
  staticIpv6: {
    id: 'static-ipv6',
    name: ipv6Service?.card.title ?? 'Static Residential IPv6',
    summary: ipv6Service?.card.headline,
    plans: [],
    fromUsd: parseUsdFromText(ipv6Service?.card.priceHint),
  },
  rotating: {
    id: 'rotating',
    name: rotatingService?.card.title ?? 'Rotating Residential Proxy',
    tiers: rotatingTiers,
  },
};

export function buildOrderUrl(params: {
  service: ServiceId;
  plan?: PlanId;
  duration?: 'monthly' | 'yearly';
}) {
  const q = new URLSearchParams({
    service: params.service,
    ...(params.plan ? { plan: params.plan } : {}),
    ...(params.duration ? { duration: params.duration } : { duration: 'monthly' }),
  });
  return `/order?${q.toString()}`;
}
