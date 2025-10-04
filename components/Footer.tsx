'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import NavLink from './NavLink';

const NAV_ITEMS: { key: `nav.${string}`; href: string }[] = [
  { key: 'nav.pricing', href: '/pricing' },
  { key: 'nav.contact', href: '/contact' },
  { key: 'nav.aml', href: '/aml' },
  { key: 'nav.privacy', href: '/privacy' },
  { key: 'nav.tos', href: '/tos' },
  { key: 'nav.aup', href: '/aup' },
  { key: 'nav.refund', href: '/refund' },
  { key: 'nav.login', href: '/login' },
];

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

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
        <strong style={{ color: '#f8fafc', fontSize: '1rem' }}>{t('brand')}</strong>
        <span>
          © {year} {t('brand')}. {t('footer.copyright')}
        </span>
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
            {NAV_ITEMS.map(item => (
              <li key={item.key}>
                <NavLink
                  href={item.href}
                  style={linkBaseStyle}
                  activeStyle={linkActiveStyle}
                >
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
