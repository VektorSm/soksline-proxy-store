'use client';

import Section from '@/components/layout/Section';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useI18n } from '@/lib/i18n';

export default function Page() {
  const { t } = useI18n();
  return (
    <Section bg="white" aria-labelledby="contact-heading" containerClassName="not-prose">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <h1 id="contact-heading" className="text-3xl font-semibold">
            {t('pages.contact.title')}
          </h1>
          <LanguageSwitcher />
        </div>
        <p className="opacity-80">{t('pages.contact.intro')}</p>
        <form className="mt-2 grid max-w-xl gap-4">
          <label htmlFor="c-name" className="block text-sm font-medium">
            {t('pages.contact.name')}
            <input
              id="c-name"
              name="name"
              className="mt-1 w-full rounded border border-gray-300 p-3 focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
            />
          </label>
          <label htmlFor="c-email" className="block text-sm font-medium">
            {t('pages.contact.email')}
            <input
              id="c-email"
              name="email"
              inputMode="email"
              className="mt-1 w-full rounded border border-gray-300 p-3 focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
            />
          </label>
          <label htmlFor="c-msg" className="block text-sm font-medium">
            {t('pages.contact.msg')}
            <textarea
              id="c-msg"
              name="message"
              rows={5}
              className="mt-1 w-full rounded border border-gray-300 p-3 focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
            />
          </label>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl border border-transparent bg-gray-900 px-5 py-3 text-base font-medium text-white hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
          >
            {t('pages.contact.submit')}
          </button>
        </form>
      </div>
    </Section>
  );
}
