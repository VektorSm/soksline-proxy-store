'use client';

import { useI18n } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Page() {
  const { t } = useI18n();
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">{t('pages.login.title')}</h1>
        <LanguageSwitcher />
      </div>
      <p className="opacity-80">{t('pages.login.intro')}</p>
      <form className="mt-6 grid gap-4 max-w-sm">
        <input className="border rounded p-3" placeholder={t('pages.login.email')} />
        <input
          className="border rounded p-3"
          type="password"
          placeholder={t('pages.login.password')}
        />
        <button type="button" className="px-4 py-2 rounded bg-gray-900 text-white">
          {t('pages.login.signIn')}
        </button>
      </form>
    </main>
  );
}
