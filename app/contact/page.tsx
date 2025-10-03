"use client";

import { useI18n } from "../../lib/i18n";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact sales | SoksLine",
  description: "Reach the SoksLine sales team via email, Telegram, or dashboard chat.",
};

type ContactContent = {
  title: string;
  intro: string;
  items: string[];
};

export default function Page() {
  const { t } = useI18n();
  const content = t<ContactContent>("contact");

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.intro}>{content.intro}</p>
        <ul className={styles.list}>
          {content.items.map(item => (
            <li key={item} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
