'use client';

import React from 'react';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type Locale = 'en' | 'ru';

const DICTS: Record<Locale, Record<string, any>> = {
  en,
  ru,
};

const DEFAULT_LOCALE: Locale = 'en';

function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'ru';
}

function get(obj: any, path: string, fallback?: string) {
  return (
    path.split('.').reduce((o, k) => (o && k in o ? o[k] : undefined), obj) ?? fallback ?? path
  );
}

type Ctx = {
  locale: Locale;
  t: (key: string, fb?: string) => string;
  setLocale: (l: Locale, opts?: { persist?: boolean; updateUrl?: boolean }) => void;
};

const I18nContext = React.createContext<Ctx | null>(null);

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const paramsString = params?.toString() ?? '';

  const paramLocale = React.useMemo(() => {
    const search = new URLSearchParams(paramsString);
    const lang = search.get('lang');
    return isLocale(lang) ? lang : undefined;
  }, [paramsString]);

  const storedLocale = React.useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    const stored = window.localStorage.getItem('lang');
    return isLocale(stored) ? stored : undefined;
  }, []);

  const initial: Locale = initialLocale ?? paramLocale ?? storedLocale ?? DEFAULT_LOCALE;
  const [locale, _setLocale] = React.useState<Locale>(initial);

  React.useEffect(() => {
    if (!paramLocale) return;
    _setLocale((prev) => (prev === paramLocale ? prev : paramLocale));
  }, [paramLocale]);

  const setLocale = React.useCallback(
    (next: Locale, opts?: { persist?: boolean; updateUrl?: boolean }) => {
      _setLocale((prev) => (prev === next ? prev : next));

      if (opts?.persist !== false && typeof window !== 'undefined') {
        window.localStorage.setItem('lang', next);
      }

      if (opts?.updateUrl !== false && typeof window !== 'undefined') {
        const currentParams = new URLSearchParams(paramsString);
        currentParams.set('lang', next);
        const query = currentParams.toString();
        const targetPath = pathname ?? window.location.pathname;
        const url = query ? `${targetPath}?${query}` : targetPath;
        window.history.replaceState(null, '', url);

        if (router?.replace) {
          router.replace(url);
        }
      }
    },
    [paramsString, pathname, router],
  );

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('lang', locale);
  }, [locale]);

  React.useEffect(() => {
    if (!router?.replace || !pathname) return;
    const currentParams = new URLSearchParams(paramsString);
    const current = currentParams.get('lang');
    if (current === locale) return;
    currentParams.set('lang', locale);
    const query = currentParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [locale, paramsString, pathname, router]);

  const t = React.useCallback(
    (key: string, fb?: string) => get(DICTS[locale], key, fb) as string,
    [locale],
  );

  const value = React.useMemo<Ctx>(() => ({ locale, t, setLocale }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
