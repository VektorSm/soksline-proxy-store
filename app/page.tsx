import TopProductsTabs from "../components/TopProductsTabs";
import styles from "./page.module.css";

const ADVANTAGES = [
  {
    title: "Скорость без просадок",
    description: "Чистые пулы и аплинки уровня Tier-1 поддерживают стабильную полосу даже при пиковой нагрузке."
  },
  {
    title: "Глубокая фильтрация",
    description: "Тонкая настройка по ASN, городу и прокси-типу помогает подбирать доступы точечно."
  },
  {
    title: "Гибкие тарифы",
    description: "Статика, IPv6 и ротация — комбинируйте форматы и удерживайте расходы под контролем."
  },
  {
    title: "Платёжные сценарии",
    description: "От криптовалют до карт — подключите удобный метод и автоматизируйте пополнения."
  }
];

const PROXY_SHOWCASE = [
  {
    title: "Static ISP",
    price: "от $5.90 / месяц",
    points: [
      "Дедикейт IPv4-подключения для долгих сессий",
      "Выбор гео по городу и ASN"
    ]
  },
  {
    title: "Static ISP IPv6",
    price: "от $3.40 / месяц",
    points: [
      "IPv6-пулы для масштабных задач",
      "Лёгкая интеграция через SOCKS5"
    ]
  },
  {
    title: "Rotating Residential",
    price: "от $4.80 / GB",
    points: [
      "Автообновление IP по расписанию",
      "Лимиты и сессии через API"
    ]
  }
];

const PROXY_METRICS = ["180+ Proxy Locations", "99.9% Uptime"];

const PAYMENT_METHODS = ["USDT", "BTC", "ETH", "Visa/Mastercard", "SEPA", "СБП"];

export default function Page() {
  return (
    <main className={styles.page}>
      <section className={`${styles.section} ${styles.hero}`} id="hero">
        <div className={`${styles.sectionInner} ${styles.heroInner}`}>
          <span className={styles.heroEyebrow}>SoksLine Proxy Store</span>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Чистые SOCKS-прокси. Прямая линия скорости.</h1>
            <p className={styles.heroSubtitle}>
              Покупайте и продавайте прокси в пару кликов. Умные фильтры, актуальная аналитика и прозрачные тарифы
              помогают командам запускать инфраструктуру без задержек.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.media}`} aria-label="Промо-изображение" id="media-preview">
        <div className={`${styles.sectionInner} ${styles.mediaInner}`}>
          <span className={styles.mediaLabel}>[Плейсхолдер изображения / видео превью]</span>
        </div>
      </section>

      <section className={`${styles.section} ${styles.showcase}`} id="proxy-formats">
        <div className={`${styles.sectionInner} ${styles.showcaseInner}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Выберите формат прокси</h2>
            <p className={styles.sectionDescription}>
              ISP-статика, IPv6 и ротация — фиксируйте нужные параметры, комбинируйте пулы и управляйте подключениями через
              единый кабинет.
            </p>
          </div>
          <div className={styles.showcaseGrid}>
            {PROXY_SHOWCASE.map(item => (
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
          <ul className={styles.showcaseFootnotes} aria-label="Ключевые показатели">
            {PROXY_METRICS.map(metric => (
              <li key={metric}>{metric}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.advantages}`} id="advantages">
        <div className={`${styles.sectionInner} ${styles.advantagesInner}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Почему SoksLine</h2>
            <p className={styles.sectionDescription}>
              Инструменты для маркетологов, команд по парсингу и продавцов аккаунтов. Фокус на стабильности и контроле.
            </p>
          </div>
          <div className={styles.advantagesGrid}>
            {ADVANTAGES.map(item => (
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
            <h2 className={styles.paymentsTitle}>Способы оплаты</h2>
            <p className={styles.paymentsDescription}>
              Пополняйте баланс удобным способом: автоматические инвойсы, моментальные зачёты и выгрузки для бухгалтерии.
            </p>
          </div>
          <div className={styles.paymentsList}>
            {PAYMENT_METHODS.map(method => (
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
