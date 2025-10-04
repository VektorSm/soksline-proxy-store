'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useI18n } from '@/lib/i18n';
import { buildOrderUrl } from '@/config/catalog';
import { loadOrderPrefs } from '@/lib/orderPrefs';
import NavLink from './NavLink';

type NavItem = {
  key: `nav.${string}`;
  href: string;
};

const MAIN_NAV: NavItem[] = [
  { key: 'nav.pricing', href: '/pricing' },
  { key: 'nav.contact', href: '/contact' },
];

const DOC_LINKS: NavItem[] = [
  { key: 'nav.aml', href: '/aml' },
  { key: 'nav.privacy', href: '/privacy' },
  { key: 'nav.terms', href: '/tos' },
  { key: 'nav.aup', href: '/aup' },
  { key: 'nav.refunds', href: '/refund' },
];

function getStartOrderHref() {
  const prefs = loadOrderPrefs();
  if (prefs?.service) {
    return buildOrderUrl({
      service: prefs.service,
      plan: prefs.plan,
      duration: prefs.duration,
      tierId: prefs.tierId,
    });
  }

  return buildOrderUrl({ service: 'static-isp', plan: 'basic', duration: 'monthly' });
}

function DocsDropdown() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="rounded-lg px-2 py-1 text-[15px] transition hover:opacity-90 focus:outline-none focus-visible:ring focus-visible:ring-white/40 sm:text-sm"
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : 'false'}
        onClick={() => setOpen((value) => !value)}
      >
        {t('nav.docs')}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute left-0 z-40 mt-2 min-w-[200px] rounded-xl border border-gray-200 bg-white p-2 shadow-lg"
        >
          {DOC_LINKS.map((item) => (
            <NavLink
              key={item.key}
              role="menuitem"
              href={item.href}
              className="block rounded px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring focus-visible:ring-gray-200"
              activeClassName="bg-gray-50 font-semibold text-gray-900"
              inactiveClassName=""
              onClick={() => setOpen(false)}
            >
              {t(item.key)}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

function LangSwitchCompact() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="hidden items-center gap-1 md:flex">
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={clsx(
          'rounded-full px-2.5 py-1 text-sm transition focus:outline-none focus-visible:ring focus-visible:ring-white/40',
          locale === 'en'
            ? 'bg-gray-800 text-white'
            : 'bg-white/10 text-white/80 hover:bg-white/15'
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale('ru')}
        aria-pressed={locale === 'ru'}
        className={clsx(
          'rounded-full px-2.5 py-1 text-sm transition focus:outline-none focus-visible:ring focus-visible:ring-white/40',
          locale === 'ru'
            ? 'bg-white text-gray-900'
            : 'bg-white/10 text-white/80 hover:bg-white/15'
        )}
      >
        RU
      </button>
    </div>
  );
}

export default function HeaderNav() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 bg-[#0b1320] text-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="mr-2 flex shrink-0 items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 font-semibold">
            S
          </span>
          <span className="text-sm font-semibold sm:text-base">SoksLine</span>
        </Link>

        <nav className="hidden min-w-0 items-center gap-4 sm:flex" aria-label="Primary">
          {MAIN_NAV.map((item) => (
            <NavLink
              key={item.key}
              href={item.href}
              className="truncate rounded-lg px-2 py-1 text-[15px] transition focus:outline-none focus-visible:ring focus-visible:ring-white/40 sm:text-sm"
              activeClassName="text-white"
              inactiveClassName="text-white/80 hover:text-white"
            >
              {t(item.key)}
            </NavLink>
          ))}
          <DocsDropdown />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LangSwitchCompact />
          <NavLink
            href="/login"
            className="hidden items-center rounded-2xl bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 transition hover:shadow-sm focus:outline-none focus-visible:ring focus-visible:ring-white/40 sm:inline-flex"
            activeClassName="shadow-sm"
            inactiveClassName=""
          >
            {t('nav.login')}
          </NavLink>
          <Link
            href={getStartOrderHref()}
            className="inline-flex items-center rounded-2xl bg-white/10 px-3 py-1.5 text-sm font-semibold transition hover:bg-white/15 focus:outline-none focus-visible:ring focus-visible:ring-white/40"
            data-cta="start-order"
          >
            <span className="md:hidden lg:inline">{t('nav.startOrder')}</span>
            <span className="hidden md:inline lg:hidden">{t('nav.startOrder')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
