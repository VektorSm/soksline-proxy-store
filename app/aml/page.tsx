'use client';

import { useI18n } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Page() {
  const { t } = useI18n();
  return (
    <section className="max-w-3xl mx-auto px-4 py-10" aria-labelledby="aml-heading">
      <div className="flex items-center justify-between mb-6">
        <h1 id="aml-heading" className="text-3xl font-semibold">
          {t('pages.aml.title')}
        </h1>
        <LanguageSwitcher />
      </div>
      <p className="opacity-80 mb-4">{t('pages.aml.intro')}</p>
      <h2 className="text-xl font-medium mt-8 mb-2">{t('pages.aml.section1.title')}</h2>
      <p className="opacity-80">{t('pages.aml.section1.text')}</p>
      <h2 className="text-xl font-medium mt-8 mb-2">{t('pages.aml.section2.title')}</h2>
      <p className="opacity-80">{t('pages.aml.section2.text')}</p>
    </section>
  );
}
