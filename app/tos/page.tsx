'use client';

import { useI18n } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Page() {
  const { t } = useI18n();
  return (
    <section className="max-w-3xl mx-auto px-4 py-10" aria-labelledby="tos-heading">
      <div className="flex items-center justify-between mb-6">
        <h1 id="tos-heading" className="text-3xl font-semibold">
          {t('pages.tos.title')}
        </h1>
        <LanguageSwitcher />
      </div>
      <p className="opacity-80 mb-4">{t('pages.tos.intro')}</p>
      <p className="opacity-60">{t('pages.shared.comingSoon')}</p>
    </section>
  );
}
