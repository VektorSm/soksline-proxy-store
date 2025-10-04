'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useI18n } from '@/lib/i18n';
import styles from './HeaderNav.module.css';

type NavItem = {
  key: `nav.${string}`;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { key: 'nav.pricing', href: '/pricing' },
  { key: 'nav.contact', href: '/contact' },
  { key: 'nav.aml', href: '/aml' },
  { key: 'nav.privacy', href: '/privacy' },
  { key: 'nav.tos', href: '/tos' },
  { key: 'nav.aup', href: '/aup' },
  { key: 'nav.refund', href: '/refund' },
];

export default function HeaderNav() {
  const { t } = useI18n();
  const pathname = usePathname();

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
            {NAV_ITEMS.map(item => {
              const isActive = pathname === item.href;

              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={styles.navLink}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <Link
            href="/login"
            className={styles.login}
            aria-current={pathname === '/login' ? 'page' : undefined}
          >
            {t('nav.login')}
          </Link>
        </div>
      </div>
    </header>
  );
}
