"use client";

import { useLocale, type Locale } from "../../../components/LocaleContext";
import styles from "./page.module.css";

type BadgeType = "check" | "cross";

type Content = {
  eyebrow: string;
  title: string;
  lead: string;
  geoSection: {
    title: string;
    description: string;
    headings: string[];
    rows: {
      name: string;
      cells: { type: BadgeType; label: string }[];
    }[];
  };
  guidance: {
    title: string;
    items: { name: string; description: string }[];
  };
  note: string;
};

const CONTENT: Record<Locale, Content> = {
  ru: {
    eyebrow: "Справка",
    title: "Какие варианты таргетинга есть у ваших прокси?",
    lead:
      "Подберите уровень таргетинга, который лучше всего подходит для вашей задачи, в пулах Rotating Residential, Static ISP и Static ISP IPv6 от SoksLine.",
    geoSection: {
      title: "Возможности геотаргетинга",
      description:
        "Таблица ниже показывает глубину таргетинга для каждого типа прокси. Мы сосредоточены на резидентских решениях, поэтому перечислены только доступные сегодня варианты от SoksLine.",
      headings: [
        "Тип прокси",
        "Страна",
        "Регион / Штат",
        "Город",
        "Провайдер / Оператор",
      ],
      rows: [
        {
          name: "Rotating Residential",
          cells: [
            { type: "check", label: "Доступен таргетинг на уровне страны" },
            { type: "check", label: "Доступен таргетинг на уровне региона" },
            { type: "check", label: "Доступен таргетинг на уровне города" },
            { type: "check", label: "Доступен таргетинг по провайдерам" },
          ],
        },
        {
          name: "Static ISP",
          cells: [
            { type: "check", label: "Доступен таргетинг на уровне страны" },
            { type: "check", label: "Доступен таргетинг на уровне региона" },
            { type: "check", label: "Доступен таргетинг на уровне города" },
            { type: "cross", label: "Таргетинг по провайдерам не поддерживается" },
          ],
        },
        {
          name: "Static ISP IPv6",
          cells: [
            { type: "check", label: "Доступен таргетинг на уровне страны" },
            { type: "cross", label: "Таргетинг по регионам не поддерживается" },
            { type: "cross", label: "Таргетинг по городам не поддерживается" },
            { type: "cross", label: "Таргетинг по провайдерам не поддерживается" },
          ],
        },
      ],
    },
    guidance: {
      title: "Как выбрать подходящий уровень таргетинга",
      items: [
        {
          name: "Rotating Residential",
          description:
            "дает самые гибкие настройки. Выбирайте этот пул, если нужно закрепить сессии за определённым городом или провайдером для локального SEO, тестирования UX или проверки рекламы.",
        },
        {
          name: "Static ISP",
          description:
            "охватывает те же города и регионы, что и ротационный пул, но сохраняет один IP за вашим проектом. Идеально для долгих автоматизаций, e-commerce и управления аккаунтами, где важна постоянная идентичность.",
        },
        {
          name: "Static ISP IPv6",
          description:
            "подходит проектам, которым нужна только национальная представленность в большом масштабе. Используйте его, когда нужен недорогой охват по США без привязки к конкретным городам или провайдерам.",
        },
      ],
    },
    note:
      "Нужна помощь с выбором подходящего пула? Свяжитесь с вашим аккаунт-менеджером или командой поддержки SoksLine — мы предложим оптимальное решение с учётом ваших требований к таргетингу.",
  },
  en: {
    eyebrow: "Help Center",
    title: "What are the targeting options for our proxies?",
    lead:
      "Pick the targeting depth that suits your workflow in the SoksLine Rotating Residential, Static ISP, or Static ISP IPv6 pools.",
    geoSection: {
      title: "Geo targeting capabilities",
      description:
        "The table below shows how granular each proxy type gets. We focus on residential solutions, so only the options currently available from SoksLine are listed.",
      headings: [
        "Proxy type",
        "Country",
        "Region / State",
        "City",
        "Provider / Carrier",
      ],
      rows: [
        {
          name: "Rotating Residential",
          cells: [
            { type: "check", label: "Country-level targeting available" },
            { type: "check", label: "Region-level targeting available" },
            { type: "check", label: "City-level targeting available" },
            { type: "check", label: "Provider-level targeting available" },
          ],
        },
        {
          name: "Static ISP",
          cells: [
            { type: "check", label: "Country-level targeting available" },
            { type: "check", label: "Region-level targeting available" },
            { type: "check", label: "City-level targeting available" },
            { type: "cross", label: "Provider-level targeting not supported" },
          ],
        },
        {
          name: "Static ISP IPv6",
          cells: [
            { type: "check", label: "Country-level targeting available" },
            { type: "cross", label: "Region-level targeting not supported" },
            { type: "cross", label: "City-level targeting not supported" },
            { type: "cross", label: "Provider-level targeting not supported" },
          ],
        },
      ],
    },
    guidance: {
      title: "How to choose the right targeting depth",
      items: [
        {
          name: "Rotating Residential",
          description:
            "offers the most flexible controls. Choose this pool when you need to pin sessions to a specific city or provider for local SEO, UX testing, or ad verification.",
        },
        {
          name: "Static ISP",
          description:
            "covers the same cities and regions as the rotating pool while keeping a single IP assigned to your project. Perfect for long-running automation, e-commerce, or account management where identity consistency matters.",
        },
        {
          name: "Static ISP IPv6",
          description:
            "is best for projects that only need nationwide coverage at scale. Use it when you require affordable reach across the US without locking to individual cities or providers.",
        },
      ],
    },
    note:
      "Need help choosing the right pool? Contact your account manager or the SoksLine support team — we'll recommend the best setup for your targeting requirements.",
  },
};

function CheckBadge({ label }: { label: string }) {
  return (
    <span className={styles.badge}>
      <span className={styles.checkBadge} aria-hidden="true">
        ✓
      </span>
      <span className={styles.badgeLabel}>{label}</span>
    </span>
  );
}

function CrossBadge({ label }: { label: string }) {
  return (
    <span className={styles.badge}>
      <span className={styles.crossBadge} aria-hidden="true">
        ✕
      </span>
      <span className={styles.badgeLabel}>{label}</span>
    </span>
  );
}

const BADGE_COMPONENT: Record<BadgeType, (props: { label: string }) => JSX.Element> = {
  check: CheckBadge,
  cross: CrossBadge,
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
          <h2 className={styles.sectionTitle}>{content.geoSection.title}</h2>
          <p>{content.geoSection.description}</p>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {content.geoSection.headings.map(heading => (
                    <th key={heading} scope="col">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.geoSection.rows.map(row => (
                  <tr key={row.name}>
                    <th scope="row" className={styles.proxyName}>
                      {row.name}
                    </th>
                    {row.cells.map((cell, index) => {
                      const CellBadge = BADGE_COMPONENT[cell.type];
                      return (
                        <td key={`${row.name}-${index}`} className={styles.checkCell}>
                          <CellBadge label={cell.label} />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.guidance.title}</h2>
          <ul className={styles.list}>
            {content.guidance.items.map(item => (
              <li key={item.name}>
                <strong>{item.name}</strong> {item.description}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <p className={styles.note}>{content.note}</p>
        </section>
      </article>
    </main>
  );
}
