'use client';

import React from 'react';
import { I18nProvider, useI18n, type Locale } from '@/lib/i18n';

export type LocaleContextValue = {
  locale: Locale;
  setLocale: ReturnType<typeof useI18n>['setLocale'];
};

type LocaleProviderProps = {
  children: React.ReactNode;
  initialLocale?: Locale;
};

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  return <I18nProvider initialLocale={initialLocale}>{children}</I18nProvider>;
}

export function useLocale(): LocaleContextValue {
  const { locale, setLocale } = useI18n();
  return { locale, setLocale };
}

export type { Locale };
