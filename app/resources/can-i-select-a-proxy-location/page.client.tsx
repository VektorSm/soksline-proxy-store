"use client";

import { useLocale, type Locale } from "../../../components/LocaleContext";
import styles from "./page.module.css";

type Content = {
  eyebrow: string;
  title: string;
  lead: string;
  sectionTitle: string;
  sectionIntro: string;
  bullets: { label: string; description: string }[];
  footer: string;
};

const CONTENT: Record<Locale, Content> = {
  ru: {
    eyebrow: "Справка",
    title: "Могу ли я выбрать геолокацию прокси?",
    lead:
      "Да. Каждый заказ прокси SoksLine позволяет выбрать локацию, которая лучше всего подходит под ваш сценарий. Укажите нужную страну при оформлении и управляйте трафиком без дополнительной настройки и задержек.",
    sectionTitle: "Управление локациями по типам прокси",
    sectionIntro:
      "Каждый тип прокси дает точный геотаргетинг, чтобы вы могли запускать аккаунты, автоматизацию или мониторинг кампаний в нужных вам регионах.",
    bullets: [
      {
        label: "Static ISP прокси.",
        description:
          "Выбирайте страну в нашем премиальном пуле ISP и дата-центров для стабильной работы и низкой задержки при сборе данных.",
      },
      {
        label: "Static ISP IPv6 прокси.",
        description:
          "Укажите нужную страну (включая маршрутизацию по штатам в США), чтобы использовать наш огромный запас IPv6 для задач с большим объемом трафика.",
      },
      {
        label: "Rotating Residential прокси.",
        description:
          "Настраивайте таргетинг на страны по всему миру и углубляйтесь до популярных штатов и регионов для локализованного тестирования, проверки рекламы и автоматизации.",
      },
    ],
    footer:
      "Нужен конкретный город или индивидуальный набор локаций? Напишите вашему аккаунт-менеджеру или на support@soksline.com — мы настроим нужную вам маршрутизацию.",
  },
  en: {
    eyebrow: "Help Center",
    title: "Can I select a proxy location?",
    lead:
      "Yes. Every SoksLine proxy order lets you pick the location that fits your use case best. Choose the required country at checkout and manage traffic without extra setup or latency.",
    sectionTitle: "Location controls by proxy type",
    sectionIntro:
      "Each proxy format delivers precise geo targeting so you can run accounts, automation, or campaign monitoring in the regions you care about.",
    bullets: [
      {
        label: "Static ISP proxies.",
        description:
          "Select a country in our premium ISP and datacenter pool to keep uptime high and latency low for data collection.",
      },
      {
        label: "Static ISP IPv6 proxies.",
        description:
          "Specify the country you need—including state-level routing in the US—to tap into our vast IPv6 capacity for high-volume workloads.",
      },
      {
        label: "Rotating Residential proxies.",
        description:
          "Target countries worldwide and drill down to popular states and regions for localized testing, ad verification, and automation.",
      },
    ],
    footer:
      "Need a specific city or a custom mix of locations? Contact your account manager or write to support@soksline.com — we will configure the routing you need.",
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
          <p className={styles.lead}>{content.lead}</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.sectionTitle}</h2>
          <p>{content.sectionIntro}</p>
          <ul className={styles.list}>
            {content.bullets.map(item => (
              <li key={item.label}>
                <strong>{item.label}</strong> {item.description}
              </li>
            ))}
          </ul>
        </section>

        <footer className={styles.footer}>
          <p>{content.footer}</p>
        </footer>
      </article>
    </main>
  );
}
