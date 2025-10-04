'use client';

import { useState } from 'react';
import Link from 'next/link';
import Section from '@/components/layout/Section';
import { useI18n } from '@/lib/i18n';

export default function ContactPage() {
  const { t } = useI18n();
  const [v, setV] = useState({ name: '', email: '', message: '', website: '' });
  const [err, setErr] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setV((s) => ({ ...s, [id]: value }));
  };

  const validate = () => {
    const e: typeof err = {};
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!v.name.trim()) e.name = t('pages.contact.errName');
    if (!emailRx.test(v.email)) e.email = t('pages.contact.errEmail');
    if (v.message.trim().length < 10) e.message = t('pages.contact.errMsg');
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    if (v.website) {
      return;
    }

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      (document.getElementById('contact-status') as HTMLElement | null)?.focus();
    }, 700);
  };

  return (
    <Section bg="white" containerClassName="max-w-3xl">
      <h1 className="text-3xl font-semibold">{t('pages.contact.title')}</h1>
      <p className="opacity-80 mt-2">{t('pages.contact.intro')}</p>

      <div id="contact-status" role="status" tabIndex={-1} aria-live="polite" className="sr-only">
        {status === 'success'
          ? t('pages.contact.sent')
          : status === 'sending'
            ? t('pages.contact.sending')
            : ''}
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div className="hidden">
          <label htmlFor="website">Website</label>
          <input id="website" autoComplete="off" value={v.website} onChange={onChange} />
        </div>

        <div>
          <label htmlFor="name" className="text-sm font-medium">
            {t('pages.contact.name')}
          </label>
          <input
            id="name"
            autoComplete="name"
            className="mt-1 w-full rounded border border-gray-300 p-3"
            value={v.name}
            onChange={onChange}
            aria-invalid={!!err.name}
            aria-describedby={err.name ? 'err-name' : undefined}
          />
          {err.name && (
            <p id="err-name" className="mt-1 text-sm text-red-600">
              {err.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">
            {t('pages.contact.email')}
          </label>
          <input
            id="email"
            inputMode="email"
            autoComplete="email"
            className="mt-1 w-full rounded border border-gray-300 p-3"
            value={v.email}
            onChange={onChange}
            aria-invalid={!!err.email}
            aria-describedby={err.email ? 'err-email' : undefined}
          />
          {err.email && (
            <p id="err-email" className="mt-1 text-sm text-red-600">
              {err.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-medium">
            {t('pages.contact.msg')}
          </label>
          <textarea
            id="message"
            rows={6}
            className="mt-1 w-full rounded border border-gray-300 p-3"
            value={v.message}
            onChange={onChange}
            aria-invalid={!!err.message}
            aria-describedby={err.message ? 'err-message' : undefined}
          />
          {err.message && (
            <p id="err-message" className="mt-1 text-sm text-red-600">
              {err.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-2 inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-white hover:bg-black disabled:opacity-60 focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
          aria-label={t('pages.contact.submit')}
        >
          {status === 'sending' ? t('pages.contact.sending') : t('pages.contact.submit')}
        </button>

        <p className="text-sm text-gray-600">
          {t('pages.contact.privacyNote')}{' '}
          <Link href="/privacy" className="underline">
            {t('common.privacyPolicy')}
          </Link>
          .
        </p>

        {status === 'success' && (
          <div className="mt-2 rounded-lg bg-green-50 p-3 text-sm text-green-800 border border-green-200">
            {t('pages.contact.success')}
          </div>
        )}
      </form>
    </Section>
  );
}
