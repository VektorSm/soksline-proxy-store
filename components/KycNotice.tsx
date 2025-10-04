'use client';

import React from 'react';
import { getKycPolicy, Locale } from '@/config/policies';
import { useI18n } from '@/lib/i18n';

type Props = {
  locale?: Locale; // 'en' | 'ru'; по умолчанию — 'en'
  className?: string; // для отступов/типографики
  inline?: boolean; // inline-версия внутри карточек
};

export default function KycNotice({ locale, className = '', inline = false }: Props) {
  const { t } = useI18n();
  const text = locale ? getKycPolicy(locale) : t('kyc.policy');
  const Wrapper: any = inline ? 'span' : 'div';
  return (
    <Wrapper
      className={
        inline ? `text-sm opacity-80 ${className}` : `text-sm opacity-80 mt-2 ${className}`
      }
    >
      {/* Без сторонних иконок — минималистично */}
      <span aria-hidden="true" className="inline-block align-[-2px] opacity-60">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="10" />
          <rect x="11" y="10" width="2" height="7" fill="white" />
          <rect x="11" y="7" width="2" height="2" fill="white" />
        </svg>
      </span>{' '}
      <span>{text}</span>
    </Wrapper>
  );
}
