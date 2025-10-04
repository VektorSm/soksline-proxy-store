'use client';

import { useI18n } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Page() {
  const { t } = useI18n();
  return (
    <section className="max-w-3xl mx-auto px-4 py-10" aria-labelledby="login-heading">
      <div className="flex items-center justify-between mb-6">
        <h1 id="login-heading" className="text-3xl font-semibold">
          {t('pages.login.title')}
        </h1>
        <LanguageSwitcher />
      </div>
      <p className="opacity-80">{t('pages.login.intro')}</p>
      <form className="mt-6 grid gap-4 max-w-sm">
        <label htmlFor="l-email" className="text-sm font-medium">
          {t('pages.login.email')}
        </label>
        <input
          id="l-email"
          name="email"
          inputMode="email"
          className="border rounded p-3 focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
        />
        <label htmlFor="l-pass" className="text-sm font-medium">
          {t('pages.login.password')}
        </label>
        <input
          id="l-pass"
          name="password"
          type="password"
          className="border rounded p-3 focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
        />
        <button
          type="button"
          className="px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
        >
          {t('pages.login.signIn')}
        </button>
      </form>
    </section>
  );
}
