'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer
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
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          fontSize: '0.9rem',
        }}
      >
        <strong style={{ color: '#f8fafc', fontSize: '1rem' }}>{t('brand')}</strong>
        <span>
          © {year} {t('brand')}. {t('footer.copyright')}
        </span>
      </div>
    </footer>
  );
}
