import React from 'react';
import { getKycPolicy, Locale } from '@/config/policies';

type Props = {
  locale?: Locale;         // 'en' | 'ru'; по умолчанию — 'en'
  className?: string;      // для отступов/типографики
  inline?: boolean;        // inline-версия внутри карточек
};

export default function KycNotice({ locale = 'en', className = '', inline = false }: Props) {
  const text = getKycPolicy(locale);
  const Wrapper: any = inline ? 'span' : 'div';
  return (
    <Wrapper className={inline ? `text-sm opacity-80 ${className}` : `text-sm opacity-80 mt-2 ${className}`}>
      {/* Без сторонних иконок — минималистично */}
      <span aria-hidden="true">ℹ️ </span>
      <span>{text}</span>
    </Wrapper>
  );
}
