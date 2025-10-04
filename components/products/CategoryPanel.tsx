'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '../LocaleContext';
import { useI18n } from '@/lib/i18n';
import { getCategories, type CategoryId, type Category } from '../../lib/products';
import { getKycPolicy } from '@/config/policies';

type CategoryPanelProps = {
  categoryId: CategoryId;
};

const CATEGORY_LINKS: Record<CategoryId, string> = {
  isp: '/products/isp-proxies',
  ipv6: '/products/static-residential',
  rotating: '/products/rotating-residential',
};

export default function CategoryPanel({ categoryId }: CategoryPanelProps) {
  const { locale } = useLocale();
  const router = useRouter();
  const { t } = useI18n();

  const category: Category | undefined = useMemo(() => {
    const categories = getCategories(locale);
    return categories.find((item) => item.id === categoryId);
  }, [categoryId, locale]);

  if (!category) {
    return null;
  }

  const kycPolicy = getKycPolicy(locale);
  const href = CATEGORY_LINKS[category.id] ?? '/contact';

  return (
    <div className="text-left">
      <p className="max-w-3xl text-base text-gray-600 opacity-90 md:text-lg">{category.tagline}</p>

      <div className="mt-4 grid grid-cols-1 gap-6 items-stretch md:grid-cols-2">
        {category.items.map((item) => (
          <article
            key={item.name}
            className="flex h-full flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
          >
            <div className="grow">
              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              <p className="mt-2 font-medium text-blue-700">{item.price}</p>
              <ul className="mt-3 space-y-2 text-gray-700">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1 text-gray-400">
                      •
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {item.bestFor ? (
                <p className="mt-4 text-sm text-gray-600 opacity-80">{item.bestFor}</p>
              ) : null}
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => router.push(href)}
                className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-4 py-2 text-white transition hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-gray-300 focus-visible:ring-offset-2"
              >
                {t('common.buyNow')}
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-4 flex items-start gap-2 text-left text-sm text-gray-600">
        <span aria-hidden="true" className="mt-0.5 inline-flex h-4 w-4 items-center justify-center opacity-60">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <rect x="11" y="10" width="2" height="7" fill="white" />
            <rect x="11" y="7" width="2" height="2" fill="white" />
          </svg>
        </span>
        <span>{kycPolicy}</span>
      </p>

      {category.note ? (
        <p className="mt-2 text-left text-sm text-gray-600 opacity-70">{category.note}</p>
      ) : null}
    </div>
  );
}
