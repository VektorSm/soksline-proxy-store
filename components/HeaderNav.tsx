"use client";

import Link from "next/link";
import { useState, useRef, useCallback, FocusEvent, MouseEvent } from "react";
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

const PRODUCT_MENU: DropdownConfig = {
  id: "products",
  label: "Продукты",
  sections: [
    {
      items: [
        {
          label: "ISP Proxies (DC/ISP)",
          description: "Доступ к дата-центровым и ISP пуллам для стабильных проектов",
          href: "/products/isp-proxies"
        },
        {
          label: "Static Residential",
          description: "Реальные жилые IP для долгих сессий и антидетект браузеров",
          href: "/products/static-residential"
        },
        {
          label: "Rotating Residential",
          description: "Автоматическая ротация IP и гибкие лимиты",
          href: "/products/rotating-residential"
        }
      ]
    }
  ]
};

const RESOURCES_MENU: DropdownConfig = {
  id: "resources",
  label: "Ресурсы",
  sections: [
    {
      heading: "Solutions",
      items: [
        { label: "Enterprise Solutions", href: "https://soksline.com/enterprise" },
        { label: "White Label Reseller", href: "https://soksline.com/reseller" },
        { label: "Referral Program", href: "https://soksline.com/referral" }
      ]
    },
    {
      heading: "Developers",
      items: [{ label: "API Documentation", href: "https://soksline.com/api" }]
    },
    {
      heading: "Resources",
      items: [
        { label: "Getting Started", href: "https://soksline.com/getting-started" },
        { label: "Blog", href: "https://soksline.com/blog" },
        { label: "Google Chrome Proxy Extension", href: "https://soksline.com/chrome" },
        { label: "Mozilla Firefox Proxy Add-On", href: "https://soksline.com/firefox" }
      ]
    },
    {
      heading: "Company",
      items: [
        { label: "Careers", href: "https://soksline.com/careers" },
        { label: "Contact Us", href: "https://soksline.com/contact" }
      ]
    }
  ]
};

const PRICING_MENU: DropdownConfig = {
  id: "pricing",
  label: "Цены",
  sections: [
    {
      heading: "Residential Proxies",
      items: [
        {
          label: "Static Residential Proxies",
          description: "Real business IPs for long-term use",
          meta: "Starts at $1.27 / proxy",
          href: "/pricing/static-residential"
        },
        {
          label: "Static Residential IPv6 Proxies",
          description: "Trillions ISP Static IPs from USA",
          meta: "Starts at $0.52 / proxy",
          href: "/pricing/static-residential-ipv6"
        },
        {
          label: "Rotating Residential Proxies",
          description: "Ethically sourced residential proxy pool",
          meta: "Starts at $4.99 / proxy",
          href: "/pricing/rotating-residential"
        }
      ]
    }
  ]
};

const NAV_LINKS = [PRODUCT_MENU, RESOURCES_MENU, PRICING_MENU];

const AUX_LINKS = [
  { label: "Решения", href: "#advantages" },
  { label: "Инфоцентр", href: "https://soksline.com/support" }
];

export default function HeaderNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
            <span>Proxy Store &amp; Dedicated rotation</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Главное меню">
          <ul className={styles.navList}>
            {NAV_LINKS.map(menu => (
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
            {AUX_LINKS.map(link => (
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
            <button type="button" className={styles.localeButton} aria-label="Русский">
              Ru
            </button>
            <span className={styles.localeDivider} aria-hidden="true">
              |
            </span>
            <button type="button" className={styles.localeButtonMuted} aria-label="English">
              En
            </button>
          </div>
          <Link href="https://soksline.com/login" className={styles.loginButton} target="_blank" rel="noopener">
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}
