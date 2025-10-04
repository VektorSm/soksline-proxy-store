'use client';

import { useI18n } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Page() {
  const { t } = useI18n();
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">{t('pages.contact.title')}</h1>
        <LanguageSwitcher />
      </div>
      <p className="opacity-80">{t('pages.contact.intro')}</p>
      <form className="mt-6 grid gap-4 max-w-xl">
        <input className="border rounded p-3" placeholder={t('pages.contact.name')} />
        <input className="border rounded p-3" placeholder={t('pages.contact.email')} />
        <textarea
          className="border rounded p-3"
          rows={5}
          placeholder={t('pages.contact.msg')}
        />
        <button type="button" className="px-4 py-2 rounded bg-gray-900 text-white">
          {t('pages.contact.submit')}
        </button>
      </form>
    </main>
  );
}
