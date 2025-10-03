"use client";

import { useI18n } from "../../lib/i18n";
import styles from "./page.module.css";

type LoginContent = {
  title: string;
  intro: string;
  note: string;
};

export default function LoginPage() {
  const { t } = useI18n();
  const content = t<LoginContent>("login");

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.intro}>{content.intro}</p>
        <p className={styles.note}>{content.note}</p>
      </div>
    </main>
  );
}
