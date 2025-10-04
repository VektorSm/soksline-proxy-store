"use client";

import { useLocale, type Locale } from "../../../components/LocaleContext";
import styles from "./page.module.css";

type Content = {
  eyebrow: string;
  title: string;
  lead: string;
  rotationTitle: string;
  rotationDescription: string;
  termsTitle: string;
  terms: { heading: string; body: string }[];
  footer: string;
};

const CONTENT: Record<Locale, Content> = {
  ru: {
    eyebrow: "Справка",
    title: "Что такое ротационный прокси?",
    lead:
      "Ротационный резидентский прокси направляет ваш трафик через несколько реальных домашних IP-адресов. Это сохраняет приватность, автоматизирует смену IP и помогает избежать блокировок со стороны сайтов.",
    rotationTitle: "Как работают ротационные резидентские прокси",
    rotationDescription:
      "Наши резидентские прокси предлагают гибкие варианты ротации. IP может меняться с каждым запросом или оставаться неизменным на протяжении всей сессии. Сессия — это случайно сгенерированная строка, которая закрепляет один IP на выбранный период, обеспечивая стабильную идентичность, пока сессия активна.",
    termsTitle: "Срок действия и продления",
    terms: [
      {
        heading: "Без продлений.",
        body: "Ротационные резидентские прокси нельзя продлить. После окончания срока действия пакета необходимо оформить новый.",
      },
      {
        heading: "Дополнительный трафик.",
        body: "Если израсходован весь трафик, пополнить его нельзя. Купите новый пакет, чтобы продолжить работу без пауз.",
      },
      {
        heading: "Срок 120 дней.",
        body: "Каждый прокси действует 120 дней. По истечении этого времени он деактивируется и требуется новая покупка.",
      },
    ],
    footer:
      "Следите за потреблением, чтобы избежать неожиданных перерывов в работе, и планируйте ротации заранее для плавной автоматизации.",
  },
  en: {
    eyebrow: "Help Center",
    title: "What is a rotating proxy?",
    lead:
      "A rotating residential proxy routes your traffic through multiple real home IP addresses. It keeps your activity private, automates IP changes, and helps you avoid website blocks.",
    rotationTitle: "How rotating residential proxies work",
    rotationDescription:
      "Our residential proxies offer flexible rotation modes. The IP can refresh on every request or stay fixed for an entire session. A session is a randomly generated string that locks one IP to you for the selected period, keeping identity consistent while it stays active.",
    termsTitle: "Validity and renewals",
    terms: [
      {
        heading: "No renewals.",
        body: "Rotating residential proxies cannot be renewed. When a plan expires you need to purchase a new one.",
      },
      {
        heading: "Additional traffic.",
        body: "Once the included traffic is used up, it can't be topped up. Buy another package to continue without interruptions.",
      },
      {
        heading: "120-day term.",
        body: "Each proxy remains active for 120 days. After that it is deactivated and a new purchase is required.",
      },
    ],
    footer:
      "Monitor consumption to avoid unexpected downtime and schedule rotations in advance to keep automation smooth.",
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
          <p className={styles.lead}>{content.lead}</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.rotationTitle}</h2>
          <p>{content.rotationDescription}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.termsTitle}</h2>
          <ul className={styles.list}>
            {content.terms.map(term => (
              <li key={term.heading}>
                <strong>{term.heading}</strong> {term.body}
              </li>
            ))}
          </ul>
        </section>

        <footer className={styles.footer}>
          <p>{content.footer}</p>
        </footer>
      </article>
    </div>
  );
}
