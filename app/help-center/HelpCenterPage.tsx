"use client";

import { useI18n } from "../../lib/i18n";
import styles from "./page.module.css";

type HelpCenterSection = {
  title: string;
  items: string[];
};

type HelpCenterContent = {
  title: string;
  intro: string;
  sections: HelpCenterSection[];
};

export default function HelpCenterPage() {
  const { t } = useI18n();
  const content = t<HelpCenterContent>("helpCenter");

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.description}>{content.intro}</p>
        </header>

        <div className={styles.sectionGrid}>
          {content.sections.map(section => (
            <section key={section.title} className={styles.section}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <ul className={styles.itemList}>
                {section.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
