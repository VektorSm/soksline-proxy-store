import { useMemo } from 'react';

export default function PriceLabel({
  locale = 'ru',
  amount,
  unit = 'за прокси / мес',
  className = '',
}: {
  locale?: 'ru' | 'en' | string;
  amount: number;
  unit?: string;
  className?: string;
}) {
  const formatted = useMemo(() => {
    const nf = new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    return formattedParts(nf, locale);
  }, [amount, locale]);

  const currencyFirst = locale !== 'ru';

  return (
    <div className={className}>
      <div className="flex items-baseline gap-1 text-gray-900 [font-variant-numeric:tabular-nums]">
        {currencyFirst ? (
          <>
            <span className="text-base font-medium leading-none">{formatted.currency}</span>
            <span className="text-2xl font-semibold leading-none">{formatted.value}</span>
          </>
        ) : (
          <>
            <span className="text-2xl font-semibold leading-none">{formatted.value}</span>
            <span className="text-base font-medium leading-none">{formatted.currency}</span>
          </>
        )}
      </div>
      <div className="mt-1 text-sm text-gray-500 whitespace-nowrap">{unit}</div>
    </div>
  );
}

function formattedParts(nf: string, locale: string) {
  if (locale === 'ru') {
    const [value, currency] = nf.split('\u00A0');
    return { value, currency };
  }
  const match = nf.match(/^([^0-9]+)(.+)$/);
  return match ? { currency: match[1], value: match[2] } : { currency: '$', value: nf };
}
