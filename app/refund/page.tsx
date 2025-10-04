'use client';

import { useI18n } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Page() {
  const { t } = useI18n();
  return (
    <section className="max-w-3xl mx-auto px-4 py-10" aria-labelledby="refund-heading">
      <div className="flex items-center justify-between mb-6">
        <h1 id="refund-heading" className="text-3xl font-semibold">
          {t('pages.refund.title')}
        </h1>
        <LanguageSwitcher />
      </div>
      <p className="opacity-80 mb-4">{t('pages.refund.intro')}</p>
      <p className="opacity-60">{t('pages.shared.comingSoon')}</p>
    </section>
  );
}
