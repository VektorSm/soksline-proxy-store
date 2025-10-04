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
      <span aria-hidden="true">ℹ️ </span>
      <span>{text}</span>
    </Wrapper>
  );
}
