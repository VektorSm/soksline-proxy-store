'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  const baseStyle: React.CSSProperties = {
    padding: '4px 10px',
    borderRadius: '9999px',
    border: '1px solid transparent',
    fontSize: '0.8rem',
    fontWeight: 600,
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
    color: '#0f172a',
    cursor: 'pointer',
  };

  const activeStyle: React.CSSProperties = {
    backgroundColor: '#0f172a',
    color: '#ffffff',
  };

  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }} aria-label="Language">
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        style={{ ...baseStyle, ...(locale === 'en' ? activeStyle : {}) }}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale('ru')}
        aria-pressed={locale === 'ru'}
        style={{ ...baseStyle, ...(locale === 'ru' ? activeStyle : {}) }}
      >
        RU
      </button>
    </div>
  );
}
