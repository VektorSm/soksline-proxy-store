"use client";

import { useLocale, type Locale } from "../../../components/LocaleContext";
import styles from "./page.module.css";

type Content = {
  eyebrow: string;
  title: string;
  meta: string;
  intro: string[];
  benefitsTitle: string;
  benefitsIntro: string;
  benefits: string[];
};

const CONTENT: Record<Locale, Content> = {
  ru: {
    eyebrow: "Справка",
    title: "Зачем нужны резидентские прокси?",
    meta: "12 дней назад · Обновлено",
    intro: [
      "Резидентский прокси — это адрес, который предоставляет ваш интернет-провайдер (ISP). Это реальные домашние IP, на которые полагаются легальные пользователи прокси для надежного доступа.",
      "Такие прокси идеально подходят как долгосрочное решение для команд и специалистов, которым важны стабильность и предсказуемость на протяжении всего проекта.",
    ],
    benefitsTitle: "Что дают резидентские прокси",
    benefitsIntro:
      "Сети резидентских прокси обеспечивают ключевые элементы для устойчивой работы без ущерба для скорости и приватности:",
    benefits: [
      "Ротацию IP",
      "Высокую скорость при сохранении приватности",
      "Защиту по доступной цене",
    ],
  },
  en: {
    eyebrow: "Help Center",
    title: "Why Residential Proxies?",
    meta: "Updated 12 days ago",
    intro: [
      "A residential proxy is an address assigned by your internet service provider. These are real home IPs that legitimate proxy users rely on for trustworthy access.",
      "They work as a long-term solution for teams and specialists who need stable, predictable performance throughout the entire project.",
    ],
    benefitsTitle: "What residential proxies deliver",
    benefitsIntro:
      "Residential proxy networks provide the building blocks for resilient operations without compromising speed or privacy:",
    benefits: [
      "IP rotation",
      "High performance while staying private",
      "Cost-effective protection",
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
          {content.intro.map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.benefitsTitle}</h2>
          <p>{content.benefitsIntro}</p>
          <ul className={styles.list}>
            {content.benefits.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
