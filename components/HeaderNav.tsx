"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_NAME } from "../config/site";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "../lib/i18n";
import styles from "./HeaderNav.module.css";

type NavItem = { label: string; href: string };

type HeaderContent = {
  tagline: string;
  navLabel: string;
  nav: NavItem[];
  supportLink: NavItem;
  login: string;
};

function isActive(pathname: string, href: string) {
  const [path] = href.split("#");
  if (!path) {
    return false;
  }
  if (path === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(path);
}

export default function HeaderNav() {
  const { t } = useI18n();
  const pathname = usePathname();
  const content = t<HeaderContent>("header");
  const contactLabel = t("buttons.contact");

  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label={BRAND_NAME}>
          <span className={styles.brandSymbol} aria-hidden="true">
            S
          </span>
          <span className={styles.brandCopy}>
            <strong>{BRAND_NAME}</strong>
            <span>{content.tagline}</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label={content.navLabel}>
          <ul className={styles.navList}>
            {content.nav.map(item => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`.trim()}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <Link href="/login" className={styles.loginLink}>
            {content.login}
          </Link>
          <Link href={content.supportLink.href} className={styles.contactButton}>
            {content.supportLink.label || contactLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
