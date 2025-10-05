export const fmtUSD = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export function fmtUsdByLocale(locale: string, value: number) {
  const nf = new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  return nf.format(value);
}

export function roundCents(n: number): number {
  return Math.round(n * 100) / 100;
}

export function normalizeTier(tier: { gb: number; pricePerGbUsd?: number; totalUsd?: number }) {
  const gb = tier.gb;
  const pricePerGb = tier.pricePerGbUsd ?? tier.totalUsd! / gb;
  const total = tier.totalUsd ?? pricePerGb * gb;

  return {
    gb,
    pricePerGb,
    total: roundCents(total),
    pricePerGbText: (Math.round(pricePerGb * 10000) / 10000).toFixed(pricePerGb < 1 ? 4 : 2),
  };
}
