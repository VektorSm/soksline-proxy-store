export type BillingScheme =
  | 'per_proxy_per_month'
  | 'traffic_tier_per_month';

export function calcTotalUSD(opts: {
  scheme: BillingScheme;
  unitPriceUsd?: number;
  proxies?: number;
  tierTotalUsd?: number;
  months: number;
}): number {
  const months = Math.max(1, Number.isFinite(opts.months) ? Number(opts.months) : 1);

  if (opts.scheme === 'per_proxy_per_month') {
    const unit = Number(opts.unitPriceUsd ?? 0);
    const qty = Math.max(0, Number(opts.proxies ?? 0));
    return round2(unit * qty * months);
  }

  if (opts.scheme === 'traffic_tier_per_month') {
    const tier = Number(opts.tierTotalUsd ?? 0);
    return round2(tier * months);
  }

  return 0;
}

export function pluralMonthsRu(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} месяц`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} месяца`;
  return `${n} месяцев`;
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
