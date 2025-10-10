'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { COMPANY } from '@/lib/company';
import NavLink from './NavLink';

type NavItem = { key: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { key: 'nav.pricing', href: '/pricing' },
  { key: 'footer.support', href: '/contact' },
  { key: 'nav.aml', href: '/aml' },
  { key: 'nav.privacy', href: '/privacy' },
  { key: 'nav.terms', href: '/tos' },
  { key: 'nav.aup', href: '/aup' },
  { key: 'nav.refunds', href: '/refund' },
  { key: 'nav.login', href: '/login' },
];

function formatSiren(value: string) {
  return value.replace(/(\d{3})(\d{3})(\d{3})/, '$1\u00A0$2\u00A0$3');
}

export default function Footer() {
  const { locale, t } = useI18n();
  const year = new Date().getFullYear();
  const formattedSiren = formatSiren(COMPANY.siren);

  const ruCopy = `© ${year} ${COMPANY.legal_name}. Все права защищены. Зарегистрирована во Франции (SIREN ${formattedSiren}). Адрес: ${COMPANY.registered_office}. Торговое наименование: ${COMPANY.brand}. Контакт: ${COMPANY.contact_email}`;
  const enCopy = `© ${year} ${COMPANY.legal_name}. All rights reserved. Registered in France (SIREN ${formattedSiren}). Registered office: ${COMPANY.registered_office}. Trading name: ${COMPANY.brand}. Contact: ${COMPANY.contact_email}`;
  const legalCopy = locale === 'ru' ? ruCopy : enCopy;

  const linkBaseStyle: React.CSSProperties = {
    color: 'rgba(226, 232, 240, 0.75)',
    textDecoration: 'none',
    fontWeight: 400,
    transition: 'color 0.2s ease',
  };

  const linkActiveStyle: React.CSSProperties = {
    color: '#f8fafc',
    fontWeight: 600,
  };

  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: '#0b1220',
        color: 'rgba(226, 232, 240, 0.7)',
        padding: '2rem 0',
      }}
    >
      <div
        style={{
          width: 'min(100%, 1120px)',
          margin: '0 auto',
          padding: '0 24px 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          fontSize: '0.9rem',
        }}
      >
        <strong style={{ color: '#f8fafc', fontSize: '1rem' }}>{COMPANY.brand}</strong>
        <span>{legalCopy}</span>
        <nav aria-label="Footer">
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem 1.5rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <NavLink href={item.href} style={linkBaseStyle} activeStyle={linkActiveStyle}>
                  {t(item.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
