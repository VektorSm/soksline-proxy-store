'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto max-w-6xl px-4 pt-16 pb-14 sm:pt-20 sm:pb-16"
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        {/* Text */}
        <div>
          <h1 id="hero-heading" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t('hero.title')}
          </h1>

          <p className="mt-4 text-lg leading-7 text-gray-700">{t('hero.subtitle')}</p>

          {/* Badge / trust bar */}
          <div className="mt-4 text-sm text-gray-600">{t('hero.badge')}</div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-medium bg-gray-900 text-white hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
              aria-label={t('hero.ctaPrimary')}
            >
              {t('hero.ctaPrimary')}
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-medium bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
              aria-label={t('hero.ctaSecondary')}
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>

        {/* Media placeholder (image only) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          <Image
            src="/hero-placeholder.svg"
            alt="Dashboard preview of SoksLine proxy store"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
