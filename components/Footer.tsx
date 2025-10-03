"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_NAME } from "../config/site";
import { useI18n } from "../lib/i18n";
import styles from "./Footer.module.css";

type FooterLink = { label: string; href: string };

type FooterContent = {
  tagline: string;
  sections: { title: string; links: FooterLink[] }[];
  copyright: string;
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

export default function Footer() {
  const { t } = useI18n();
  const pathname = usePathname();
  const content = t<FooterContent>("footer", { brand: BRAND_NAME, year: new Date().getFullYear() });

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.tagline}>{content.tagline}</p>
        </div>

        <div className={styles.sections}>
          {content.sections.map(section => (
            <div key={section.title}>
              <p className={styles.sectionTitle}>{section.title}</p>
              <ul className={styles.linkList}>
                {section.links.map(link => {
                  const active = isActive(pathname, link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={styles.link}
                        aria-current={active ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <p className={styles.footerNote}>{content.copyright}</p>
      </div>
    </footer>
  );
}
