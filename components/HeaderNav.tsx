"use client";

import Link from "next/link";
import { useState, useRef, useCallback, FocusEvent, MouseEvent, Fragment } from "react";
import { Locale, useLocale } from "./LocaleContext";

import styles from "./HeaderNav.module.css";

type DropdownItem = {
  label: string;
  description?: string;
  href: string;
  meta?: string;
};

type DropdownSection = {
  heading?: string;
  items: DropdownItem[];
};

type DropdownConfig = {
  id: string;
  label: string;
  sections: DropdownSection[];
};

type NavigationCopy = {
  navLabel: string;
  brandTagline: string;
  navLinks: DropdownConfig[];
  auxLinks: { label: string; href: string }[];
  loginLabel: string;
};

const NAV_CONTENT: Record<Locale, NavigationCopy> = {
  ru: {
    navLabel: "Главное меню",
    brandTagline: "Proxy Store и выделенная ротация",
    loginLabel: "Войти",
    navLinks: [
      {
        id: "products",
        label: "Продукты",
        sections: [
          {
            items: [
              {
                label: "Статические ISP прокси (DC/ISP)",
                description: "Дата-центровые и ISP пуллы для стабильных проектов",
                href: "/products/isp-proxies",
              },
              {
                label: "Статические резидентские",
                description: "Реальные жилые IP для долгих сессий и антидетект браузеров",
                href: "/products/static-residential",
              },
              {
                label: "Ротационные резидентские",
                description: "Автоматическая смена IP и гибкие лимиты",
                href: "/products/rotating-residential",
              },
            ],
          },
        ],
      },
      {
        id: "pricing",
        label: "Цены",
        sections: [
          {
            heading: "Резидентские прокси",
            items: [
              {
                label: "Статические Residential",
                description: "Бизнес IP для стабильной работы",
                meta: "От $1.27 за IP",
                href: "/pricing/static-residential",
              },
              {
                label: "Статические Residential IPv6",
                description: "Триллионы ISP IPv6 из США",
                meta: "От $0.52 за IP",
                href: "/pricing/static-residential-ipv6",
              },
              {
                label: "Ротационные Residential",
                description: "Этичный пул резидентских IP",
                meta: "От $4.99 за IP",
                href: "/pricing/rotating-residential",
              },
            ],
          },
        ],
      },
      {
        id: "resources",
        label: "Ресурсы",
        sections: [
          {
            heading: "Решения",
            items: [
              { label: "Корпоративные решения", href: "https://soksline.com/enterprise" },
              { label: "Партнерская витрина", href: "https://soksline.com/reseller" },
              { label: "Партнерская программа", href: "https://soksline.com/referral" },
            ],
          },
          {
            heading: "Разработчикам",
            items: [{ label: "API документация", href: "https://soksline.com/api" }],
          },
          {
            heading: "Материалы",
            items: [
              { label: "С чего начать", href: "https://soksline.com/getting-started" },
              { label: "Блог", href: "https://soksline.com/blog" },
              { label: "Расширение для Chrome", href: "https://soksline.com/chrome" },
              { label: "Расширение для Firefox", href: "https://soksline.com/firefox" },
            ],
          },
          {
            heading: "Компания",
            items: [
              { label: "Вакансии", href: "https://soksline.com/careers" },
              { label: "Связаться", href: "https://soksline.com/contact" },
            ],
          },
        ],
      },
    ],
    auxLinks: [{ label: "Инфоцентр", href: "https://soksline.com/support" }],
  },
  en: {
    navLabel: "Primary navigation",
    brandTagline: "Proxy Store & Dedicated rotation",
    loginLabel: "Log in",
    navLinks: [
      {
        id: "products",
        label: "Products",
        sections: [
          {
            items: [
              {
                label: "Static ISP Proxies (DC/ISP)",
                description: "Datacenter and ISP pools for uptime-critical use cases",
                href: "/products/isp-proxies",
              },
              {
                label: "Static Residential",
                description: "Real residential IPs for long sessions and antidetect browsers",
                href: "/products/static-residential",
              },
              {
                label: "Rotating Residential",
                description: "Automated IP rotation with flexible limits",
                href: "/products/rotating-residential",
              },
            ],
          },
        ],
      },
      {
        id: "pricing",
        label: "Pricing",
        sections: [
          {
            heading: "Residential proxies",
            items: [
              {
                label: "Static Residential Proxies",
                description: "Real business IPs for long-term use",
                meta: "Starts at $1.27 / proxy",
                href: "/pricing/static-residential",
              },
              {
                label: "Static Residential IPv6 Proxies",
                description: "Trillions of ISP IPv6 addresses from the USA",
                meta: "Starts at $0.52 / proxy",
                href: "/pricing/static-residential-ipv6",
              },
              {
                label: "Rotating Residential Proxies",
                description: "Ethically sourced residential proxy pool",
                meta: "Starts at $4.99 / proxy",
                href: "/pricing/rotating-residential",
              },
            ],
          },
        ],
      },
      {
        id: "resources",
        label: "Resources",
        sections: [
          {
            heading: "Solutions",
            items: [
              { label: "Enterprise Solutions", href: "https://soksline.com/enterprise" },
              { label: "White Label Reseller", href: "https://soksline.com/reseller" },
              { label: "Referral Program", href: "https://soksline.com/referral" },
            ],
          },
          {
            heading: "Developers",
            items: [{ label: "API Documentation", href: "https://soksline.com/api" }],
          },
          {
            heading: "Resources",
            items: [
              { label: "Getting Started", href: "https://soksline.com/getting-started" },
              { label: "Blog", href: "https://soksline.com/blog" },
              { label: "Google Chrome Proxy Extension", href: "https://soksline.com/chrome" },
              { label: "Mozilla Firefox Proxy Add-On", href: "https://soksline.com/firefox" },
            ],
          },
          {
            heading: "Company",
            items: [
              { label: "Careers", href: "https://soksline.com/careers" },
              { label: "Contact Us", href: "https://soksline.com/contact" },
            ],
          },
        ],
      },
    ],
    auxLinks: [{ label: "Help Center", href: "https://soksline.com/support" }],
  },
};

const LOCALE_LABELS: Record<Locale, { short: string; full: string }> = {
  ru: { short: "Ru", full: "Русский" },
  en: { short: "En", full: "English" },
};

const LOCALES: Locale[] = ["ru", "en"];

export default function HeaderNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { locale, setLocale } = useLocale();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navContent = NAV_CONTENT[locale];

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handleOpen = useCallback(
    (id: string | null) => {
      clearCloseTimer();
      setOpenDropdown(id);
    },
    [clearCloseTimer]
  );

  const handleScheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      closeTimer.current = null;
    }, 150);
  }, [clearCloseTimer]);

  const handleItemClick = useCallback(() => {
    clearCloseTimer();
    setOpenDropdown(null);
  }, [clearCloseTimer]);

  const handleLocaleChange = useCallback(
    (nextLocale: Locale) => {
      setLocale(nextLocale);
      setOpenDropdown(null);
    },
    [setLocale]
  );

  const handleBlur = (event: FocusEvent<HTMLLIElement>) => {
    const nextFocus = event.relatedTarget as Node | null;
    if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
      setOpenDropdown(null);
    }
  };

  const handleMouseLeave = (event: MouseEvent<HTMLLIElement>) => {
    const related = event.relatedTarget as Node | null;
    if (!related || !event.currentTarget.contains(related)) {
      handleScheduleClose();
    }
  };

  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandIcon} aria-hidden="true">
            S
          </span>
          <span className={styles.brandCopy}>
            <strong>SoksLine</strong>
            <span>{navContent.brandTagline}</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label={navContent.navLabel}>
          <ul className={styles.navList}>
            {navContent.navLinks.map(menu => (
              <li
                key={menu.id}
                className={styles.navItem}
                onMouseEnter={() => handleOpen(menu.id)}
                onMouseLeave={handleMouseLeave}
                onFocus={() => handleOpen(menu.id)}
                onBlur={handleBlur}
              >
                <button
                  type="button"
                  className={`${styles.navTrigger} ${openDropdown === menu.id ? styles.navTriggerActive : ""}`}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === menu.id}
                >
                  {menu.label}
                  <span aria-hidden="true" className={styles.navCaret}>
                    ▾
                  </span>
                </button>

                <div
                  className={`${styles.dropdown} ${openDropdown === menu.id ? styles.dropdownOpen : ""}`}
                  role="menu"
                  onMouseEnter={() => handleOpen(menu.id)}
                  onMouseLeave={handleScheduleClose}
                >
                  {menu.sections.map(section => (
                    <div key={section.heading ?? menu.id} className={styles.dropdownColumn}>
                      {section.heading && <p className={styles.dropdownHeading}>{section.heading}</p>}
                      <ul className={styles.dropdownList}>
                        {section.items.map(item => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className={styles.dropdownLink}
                              target={item.href.startsWith("http") ? "_blank" : undefined}
                              rel={item.href.startsWith("http") ? "noopener" : undefined}
                              onClick={handleItemClick}
                            >
                              <span>
                                <span className={styles.dropdownLabel}>{item.label}</span>
                                {item.description && <span className={styles.dropdownDescription}>{item.description}</span>}
                              </span>
                              {item.meta && <span className={styles.dropdownMeta}>{item.meta}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            ))}
            {navContent.auxLinks.map(link => (
              <li key={link.label} className={styles.navItemSimple}>
                <Link
                  href={link.href}
                  className={styles.navLink}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.localeSwitch}>
            {LOCALES.map((option, index) => (
              <Fragment key={option}>
                <button
                  type="button"
                  className={`${styles.localeButton} ${
                    locale === option ? styles.localeButtonActive : styles.localeButtonInactive
                  }`}
                  onClick={() => handleLocaleChange(option)}
                  aria-pressed={locale === option}
                  aria-label={LOCALE_LABELS[option].full}
                >
                  {LOCALE_LABELS[option].short}
                </button>
                {index < LOCALES.length - 1 && (
                  <span className={styles.localeDivider} aria-hidden="true">
                    |
                  </span>
                )}
              </Fragment>
            ))}
          </div>
          <Link href="https://soksline.com/login" className={styles.loginButton} target="_blank" rel="noopener">
            {navContent.loginLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
