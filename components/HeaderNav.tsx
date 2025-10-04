'use client';

import React from 'react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useI18n } from '@/lib/i18n';
import styles from './HeaderNav.module.css';

type NavItem = {
  key: `nav.${string}`;
  href: string;
  external?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { key: 'nav.pricing', href: '/pricing' },
  { key: 'nav.contact', href: 'https://soksline.com/contact', external: true },
  { key: 'nav.aml', href: 'https://soksline.com/aml-policy', external: true },
  { key: 'nav.privacy', href: 'https://soksline.com/privacy-policy', external: true },
  { key: 'nav.tos', href: 'https://soksline.com/terms-of-service', external: true },
  { key: 'nav.aup', href: 'https://soksline.com/acceptable-use-policy', external: true },
  { key: 'nav.refund', href: 'https://soksline.com/refund-policy', external: true },
];

export default function HeaderNav() {
  const { t } = useI18n();

  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            S
          </span>
          <span>{t('brand')}</span>
        </Link>

        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.navList}>
            {NAV_ITEMS.map(item => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener' : undefined}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <Link
            href="https://soksline.com/login"
            className={styles.login}
            target="_blank"
            rel="noopener"
          >
            {t('nav.login')}
          </Link>
        </div>
      </div>
    </header>
  );
}
