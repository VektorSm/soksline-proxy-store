'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  const baseStyle: React.CSSProperties = {
    padding: '4px 10px',
    borderRadius: '9999px',
    border: '1px solid rgba(148, 163, 184, 0.35)',
    fontSize: '0.8rem',
    fontWeight: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    color: '#e2e8f0',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
  };

  const activeStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    borderColor: 'transparent',
  };

  return (
    <div
      className={className}
      role="group"
      aria-label="Language"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
    >
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        style={{ ...baseStyle, ...(locale === 'en' ? activeStyle : {}) }}
        className="focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale('ru')}
        aria-pressed={locale === 'ru'}
        style={{ ...baseStyle, ...(locale === 'ru' ? activeStyle : {}) }}
        className="focus:outline-none focus-visible:ring focus-visible:ring-offset-2"
      >
        RU
      </button>
    </div>
  );
}
