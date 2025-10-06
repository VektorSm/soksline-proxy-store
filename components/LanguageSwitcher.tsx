'use client';

import clsx from 'clsx';
import React from 'react';
import { useI18n } from '@/lib/i18n';

type Locale = 'en' | 'ru';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useI18n();
  const items: Locale[] = ['en', 'ru'];

  return (
    <div
      className={clsx('inline-flex items-center gap-2', className)}
      role="group"
      aria-label="Language"
    >
      {items.map((item) => {
        const isActive = item === locale;
        return (
          <button
            key={item}
            type="button"
            onClick={() => setLocale(item)}
            aria-pressed={isActive}
            className={clsx(
              'inline-flex h-8 min-w-[40px] items-center justify-center rounded-full px-3 text-sm transition focus:outline-none focus-visible:ring focus-visible:ring-white/40',
              isActive
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            )}
          >
            {item.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
