'use client';

import Link from 'next/link';
import { buildOrderUrl } from '@/config/catalog';
import { useI18n } from '@/lib/i18n';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto max-w-7xl px-6"
    >
      <div className="grid min-h-[560px] grid-cols-1 items-center gap-12 py-16 md:min-h-[600px] lg:min-h-[640px] lg:grid-cols-12 lg:py-24">
        {/* Text */}
        <div className="max-w-[660px] lg:col-span-6">
          <h1
            id="hero-heading"
            className="mt-0 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight lg:text-6xl"
          >
            {t('hero.title')}
          </h1>

          <p className="mt-4 max-w-[600px] text-lg text-muted-foreground">{t('hero.subtitle')}</p>

          {/* Badge / trust bar */}
          <div className="mt-4 text-sm text-gray-600">{t('hero.badge')}</div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={buildOrderUrl({ service: 'static-isp', plan: 'basic', duration: 'monthly' })}
              className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-base font-medium text-white hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
              aria-label={t('hero.ctaPrimary')}
            >
              {t('hero.ctaPrimary')}
            </Link>

            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-gray-400 bg-white px-5 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-offset-2 sm:w-auto"
              aria-label={t('hero.ctaSecondary')}
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>

        {/* Media embed */}
        <div className="w-full max-w-[560px] lg:col-span-6 lg:justify-self-end">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/-HIKc--jBXM"
              title="SoksLine proxy store overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
