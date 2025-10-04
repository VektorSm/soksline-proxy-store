'use client';

import { useI18n } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Page() {
  const { t } = useI18n();
  return (
    <section className="max-w-3xl mx-auto px-4 py-10" aria-labelledby="contact-heading">
      <div className="flex items-center justify-between mb-6">
        <h1 id="contact-heading" className="text-3xl font-semibold">
          {t('pages.contact.title')}
        </h1>
        <LanguageSwitcher />
      </div>
      <p className="opacity-80">{t('pages.contact.intro')}</p>
      <form className="mt-6 grid gap-4 max-w-xl">
        <label htmlFor="c-name" className="text-sm font-medium">
          {t('pages.contact.name')}
        </label>
        <input
          id="c-name"
          name="name"
          className="border rounded p-3 focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
        />
        <label htmlFor="c-email" className="text-sm font-medium">
          {t('pages.contact.email')}
        </label>
        <input
          id="c-email"
          name="email"
          inputMode="email"
          className="border rounded p-3 focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
        />
        <label htmlFor="c-msg" className="text-sm font-medium">
          {t('pages.contact.msg')}
        </label>
        <textarea
          id="c-msg"
          name="message"
          className="border rounded p-3 focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
          rows={5}
        />
        <button
          type="button"
          className="px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
        >
          {t('pages.contact.submit')}
        </button>
      </form>
    </section>
  );
}
