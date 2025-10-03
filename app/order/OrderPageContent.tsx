"use client";

import { useI18n } from "../../lib/i18n";
import styles from "./page.module.css";

type OrderContent = {
  title: string;
  intro: string;
  steps: string[];
  contact: string;
};

export default function OrderPageContent() {
  const { t } = useI18n();
  const content = t<OrderContent>("order");

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.intro}>{content.intro}</p>
        </header>

        <ol className={styles.stepList}>
          {content.steps.map(step => (
            <li key={step} className={styles.stepItem}>
              {step}
            </li>
          ))}
        </ol>

        <p className={styles.contact}>{content.contact}</p>
      </div>
    </main>
  );
}
