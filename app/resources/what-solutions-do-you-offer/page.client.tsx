"use client";

import { useLocale, type Locale } from "../../../components/LocaleContext";
import styles from "./page.module.css";

type Content = {
  eyebrow: string;
  title: string;
  meta: string;
  intro: string;
  prompt: string;
  items: { name: string; description: string }[];
};

const CONTENT: Record<Locale, Content> = {
  ru: {
    eyebrow: "Справка",
    title: "Какие решения вы предлагаете?",
    meta: "12 дней назад · Обновлено",
    intro:
      "В SoksLine мы подбираем каждому клиенту решения, которые обеспечивают бесперебойную и легальную работу ключевых процессов вне зависимости от масштаба проекта.",
    prompt: "Вот какие услуги доступны уже сейчас:",
    items: [
      {
        name: "Static ISP",
        description:
          "— выделенные ISP-IP с надежностью дата-центров для автоматизации, управления трафиком и безопасного серфинга.",
      },
      {
        name: "Static ISP IPv6",
        description:
          "— огромные диапазоны IPv6 из США на базе ISP-провайдеров для задач с высоким потреблением трафика и уникальными адресами.",
      },
      {
        name: "Rotating Residential",
        description:
          "— этичные жилые подключения с автоматической сменой IP для геотаргетинга, исследований и мультиаккаунтных операций.",
      },
    ],
  },
  en: {
    eyebrow: "Help Center",
    title: "What solutions do you offer?",
    meta: "Updated 12 days ago",
    intro:
      "At SoksLine we tailor every setup to keep your core workflows compliant and uninterrupted, no matter how large the project is.",
    prompt: "Here is what you can order right now:",
    items: [
      {
        name: "Static ISP",
        description:
          "— dedicated ISP IPs with datacenter-grade reliability for automation, traffic operations, and secure browsing.",
      },
      {
        name: "Static ISP IPv6",
        description:
          "— massive US-based IPv6 ranges from ISP carriers for high-volume tasks that demand unique addresses.",
      },
      {
        name: "Rotating Residential",
        description:
          "— ethically sourced residential access with automated IP rotation for geo targeting, research, and multi-account workflows.",
      },
    ],
  },
};

export default function PageClient() {
  const { locale } = useLocale();
  const content = CONTENT[locale];

  return (
    <div className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>{content.eyebrow}</span>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.meta}>{content.meta}</p>
        </header>

        <section className={styles.section}>
          <p>{content.intro}</p>
          <p>{content.prompt}</p>
          <ul className={styles.list}>
            {content.items.map(item => (
              <li key={item.name}>
                <strong>{item.name}</strong> {item.description}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
