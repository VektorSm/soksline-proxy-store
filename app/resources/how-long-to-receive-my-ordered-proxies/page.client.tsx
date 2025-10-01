"use client";

import { useLocale, type Locale } from "../../../components/LocaleContext";
import styles from "./page.module.css";

type Content = {
  eyebrow: string;
  title: string;
  meta: string;
  paragraphs: string[];
};

const CONTENT: Record<Locale, Content> = {
  ru: {
    eyebrow: "Справка",
    title: "Сколько времени занимает получение заказанных прокси?",
    meta: "11 дней назад · Обновлено",
    paragraphs: [
      "Прокси доставляются в течение 24 часов после оплаты заказа.",
      "Если от вас потребуется дополнительная информация, аккаунт-менеджер Proxy-Cheap свяжется с вами как можно быстрее.",
    ],
  },
  en: {
    eyebrow: "Help Center",
    title: "How long does it take to receive my ordered proxies?",
    meta: "11 days ago · Updated",
    paragraphs: [
      "Proxies are delivered within 24 hours after the payment is received.",
      "If we need additional details from you, a Proxy-Cheap account manager will reach out as soon as possible.",
    ],
  },
};

export default function PageClient() {
  const { locale } = useLocale();
  const content = CONTENT[locale];

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>{content.eyebrow}</span>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.meta}>{content.meta}</p>
        </header>

        <section className={styles.section}>
          {content.paragraphs.map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      </article>
    </main>
  );
}
