"use client";

import TopProductsTabs from "../components/TopProductsTabs";
import { useLocale } from "../components/LocaleContext";
import type { Locale } from "../components/LocaleContext";
import styles from "./page.module.css";

type Advantage = { title: string; description: string };
type ShowcaseItem = { title: string; price: string; points: string[] };

type HomeContent = {
  hero: { eyebrow: string; title: string; subtitle: string };
  mediaLabel: string;
  showcase: {
    title: string;
    description: string;
    items: ShowcaseItem[];
    metrics: string[];
  };
  advantages: {
    title: string;
    description: string;
    items: Advantage[];
  };
  payments: {
    title: string;
    description: string;
    methods: string[];
  };
};

const HOME_CONTENT: Record<Locale, HomeContent> = {
  ru: {
    hero: {
      eyebrow: "SoksLine SOCKS5 proxy store",
      title: "Чистые SOCKS-прокси. Прямая линия скорости.",
      subtitle:
        "Покупайте и продавайте прокси в пару кликов. Умные фильтры, актуальная аналитика и прозрачные тарифы помогают командам запускать инфраструктуру без задержек.",
    },
    mediaLabel: "[Плейсхолдер изображения / видео превью]",
    showcase: {
      title: "Выберите формат прокси",
      description:
        "ISP-статика, IPv6 и ротация — фиксируйте нужные параметры, комбинируйте пулы и управляйте подключениями через единый кабинет.",
      items: [
        {
          title: "Static ISP",
          price: "от $5.90 / месяц",
          points: ["Дедикейт IPv4-подключения для долгих сессий", "Выбор гео по городу и ASN"],
        },
        {
          title: "Static ISP IPv6",
          price: "от $3.40 / месяц",
          points: ["IPv6-пулы для масштабных задач", "Лёгкая интеграция через SOCKS5"],
        },
        {
          title: "Rotating Residential",
          price: "от $4.80 / GB",
          points: ["Автообновление IP по расписанию", "Лимиты и сессии через API"],
        },
      ],
      metrics: ["180+ Proxy Locations", "99.9% Uptime"],
    },
    advantages: {
      title: "Почему SoksLine",
      description:
        "Инструменты для маркетологов, команд по парсингу и продавцов аккаунтов. Фокус на стабильности и контроле.",
      items: [
        {
          title: "Скорость без просадок",
          description: "Чистые пулы и аплинки уровня Tier-1 поддерживают стабильную полосу даже при пиковой нагрузке.",
        },
        {
          title: "Глубокая фильтрация",
          description: "Тонкая настройка по ASN, городу и прокси-типу помогает подбирать доступы точечно.",
        },
        {
          title: "Гибкие тарифы",
          description: "Статика, IPv6 и ротация — комбинируйте форматы и удерживайте расходы под контролем.",
        },
      ],
    },
    payments: {
      title: "Способы оплаты",
      description:
        "Пополняйте баланс удобным способом: автоматические инвойсы, моментальные зачёты и выгрузки для бухгалтерии.",
      methods: ["BTC", "ETH", "USDT", "TRX", "LTC"],
    },
  },
  en: {
    hero: {
      eyebrow: "SoksLine SOCKS5 proxy store",
      title: "Clean SOCKS proxies. Straight-line performance.",
      subtitle:
        "Buy and resell proxies in a couple of clicks. Smart filters, live analytics, and transparent pricing let your team launch infrastructure without delays.",
    },
    mediaLabel: "[Image or video preview placeholder]",
    showcase: {
      title: "Choose your proxy format",
      description:
        "Lock in ISP statics, IPv6, or rotation — mix pools, tune the parameters, and manage every connection from a single dashboard.",
      items: [
        {
          title: "Static ISP",
          price: "from $5.90 / month",
          points: ["Dedicated IPv4 access for long sessions", "City- and ASN-level geo targeting"],
        },
        {
          title: "Static ISP IPv6",
          price: "from $3.40 / month",
          points: ["IPv6 pools for large-scale tasks", "Easy SOCKS5 integration"],
        },
        {
          title: "Rotating Residential",
          price: "from $4.80 / GB",
          points: ["Scheduled IP refresh", "API-controlled limits and sessions"],
        },
      ],
      metrics: ["180+ Proxy Locations", "99.9% Uptime"],
    },
    advantages: {
      title: "Why SoksLine",
      description:
        "Tooling for marketers, scraping teams, and account sellers with a focus on stability and control.",
      items: [
        {
          title: "Peak performance",
          description: "Clean pools and Tier-1 uplinks keep bandwidth stable even when demand spikes.",
        },
        {
          title: "Granular targeting",
          description: "Fine-tune pools by ASN, city, and proxy type to match each use case precisely.",
        },
        {
          title: "Flexible pricing",
          description: "Combine static, IPv6, and rotating formats to balance costs and performance.",
        },
      ],
    },
    payments: {
      title: "Payment methods",
      description:
        "Top up your balance the easy way: automated invoices, instant confirmations, and exports for finance teams.",
      methods: ["BTC", "ETH", "USDT", "TRX", "LTC"],
    },
  },
};

export default function Page() {
  const { locale } = useLocale();
  const copy = HOME_CONTENT[locale];

  return (
    <main className={styles.page}>
      <section className={`${styles.section} ${styles.hero}`} id="hero">
        <div className={`${styles.sectionInner} ${styles.heroInner}`}>
          <span className={styles.heroEyebrow}>{copy.hero.eyebrow}</span>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{copy.hero.title}</h1>
            <p className={styles.heroSubtitle}>{copy.hero.subtitle}</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.media}`} aria-label={copy.mediaLabel} id="media-preview">
        <div className={`${styles.sectionInner} ${styles.mediaInner}`}>
          <span className={styles.mediaLabel}>{copy.mediaLabel}</span>
        </div>
      </section>

      <section className={`${styles.section} ${styles.showcase}`} id="proxy-formats">
        <div className={`${styles.sectionInner} ${styles.showcaseInner}`}>
          <div className={`${styles.sectionHeader} ${styles.showcaseHeader}`}>
            <h2 className={styles.sectionTitle}>{copy.showcase.title}</h2>
            <p className={styles.sectionDescription}>{copy.showcase.description}</p>
          </div>
          <div className={styles.showcaseGrid}>
            {copy.showcase.items.map(item => (
              <article key={item.title} className={styles.showcaseCard}>
                <div className={styles.showcaseCardHeader}>
                  <h3 className={styles.showcaseCardTitle}>{item.title}</h3>
                  <span className={styles.showcaseCardPrice}>{item.price}</span>
                </div>
                <ul className={styles.showcaseList}>
                  {item.points.map(point => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <ul className={styles.showcaseFootnotes} aria-label={copy.showcase.title}>
            {copy.showcase.metrics.map(metric => (
              <li key={metric}>{metric}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.advantages}`} id="advantages">
        <div className={`${styles.sectionInner} ${styles.advantagesInner}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{copy.advantages.title}</h2>
            <p className={styles.sectionDescription}>{copy.advantages.description}</p>
          </div>
          <div className={styles.advantagesGrid}>
            {copy.advantages.items.map(item => (
              <article key={item.title} className={styles.advantageCard}>
                <h3 className={styles.advantageTitle}>{item.title}</h3>
                <p className={styles.advantageText}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TopProductsTabs />

      <section className={`${styles.section} ${styles.payments}`} id="payments">
        <div className={`${styles.sectionInner} ${styles.paymentsInner}`}>
          <div className={styles.paymentsHeader}>
            <h2 className={styles.paymentsTitle}>{copy.payments.title}</h2>
            <p className={styles.paymentsDescription}>{copy.payments.description}</p>
          </div>
          <div className={styles.paymentsList}>
            {copy.payments.methods.map(method => (
              <span key={method} className={styles.paymentBadge}>
                {method}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
