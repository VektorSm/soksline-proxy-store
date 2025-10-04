'use client';

import React from 'react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useI18n } from '@/lib/i18n';
import { buildOrderUrl } from '@/config/catalog';
import { loadOrderPrefs } from '@/lib/orderPrefs';
import styles from './HeaderNav.module.css';
import NavLink from './NavLink';

function getStartOrderHref() {
  const prefs = loadOrderPrefs();
  if (prefs?.service) {
    return buildOrderUrl({
      service: prefs.service,
      plan: prefs.plan,
      duration: prefs.duration,
      tierId: prefs.tierId,
    });
  }

  return buildOrderUrl({ service: 'static-isp', plan: 'basic', duration: 'monthly' });
}

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <NavLink href="/" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            S
          </span>
          <span>{t('brand')}</span>
        </NavLink>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              return (
                <li key={item.key}>
                  <NavLink href={item.href} className={styles.navLink}>
                    {t(item.key)}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <NavLink href="/login" className={styles.login}>
            {t('nav.login')}
          </NavLink>
          <Link
            href={getStartOrderHref()}
            className={styles.startOrder}
            data-cta="start-order"
          >
            {t('nav.startOrder')}
          </Link>
        </div>
      </div>
    </div>
  );
}
