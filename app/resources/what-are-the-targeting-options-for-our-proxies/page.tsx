import styles from "./page.module.css";

export const metadata = {
  title: "Какие варианты таргетинга есть у ваших прокси? | SoksLine",
  description:
    "Изучите уровни геотаргетинга в пулах Rotating Residential, Static ISP и Static ISP IPv6 от SoksLine и получите советы по выбору нужного решения.",
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

export default function Page() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Справка</span>
          <h1 className={styles.title}>Какие варианты таргетинга есть у ваших прокси?</h1>
          <p className={styles.lead}>
            Подберите уровень таргетинга, который лучше всего подходит для вашей задачи, в пулах Rotating Residential, Static
            ISP и Static ISP IPv6 от SoksLine.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Возможности геотаргетинга</h2>
          <p>
            Таблица ниже показывает глубину таргетинга для каждого типа прокси. Мы сосредоточены на резидентских решениях,
            поэтому перечислены только доступные сегодня варианты от SoksLine.
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Тип прокси</th>
                  <th scope="col">Страна</th>
                  <th scope="col">Регион / Штат</th>
                  <th scope="col">Город</th>
                  <th scope="col">Провайдер / Оператор</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className={styles.proxyName}>
                    Rotating Residential
                  </th>
                  <td className={styles.checkCell}>
                    <CheckBadge label="Доступен таргетинг на уровне страны" />
                  </td>
                  <td className={styles.checkCell}>
                    <CheckBadge label="Доступен таргетинг на уровне региона" />
                  </td>
                  <td className={styles.checkCell}>
                    <CheckBadge label="Доступен таргетинг на уровне города" />
                  </td>
                  <td className={styles.checkCell}>
                    <CheckBadge label="Доступен таргетинг по провайдерам" />
                  </td>
                </tr>
                <tr>
                  <th scope="row" className={styles.proxyName}>
                    Static ISP
                  </th>
                  <td className={styles.checkCell}>
                    <CheckBadge label="Доступен таргетинг на уровне страны" />
                  </td>
                  <td className={styles.checkCell}>
                    <CheckBadge label="Доступен таргетинг на уровне региона" />
                  </td>
                  <td className={styles.checkCell}>
                    <CheckBadge label="Доступен таргетинг на уровне города" />
                  </td>
                  <td className={styles.checkCell}>
                    <CrossBadge label="Таргетинг по провайдерам не поддерживается" />
                  </td>
                </tr>
                <tr>
                  <th scope="row" className={styles.proxyName}>
                    Static ISP IPv6
                  </th>
                  <td className={styles.checkCell}>
                    <CheckBadge label="Доступен таргетинг на уровне страны" />
                  </td>
                  <td className={styles.checkCell}>
                    <CrossBadge label="Таргетинг по регионам не поддерживается" />
                  </td>
                  <td className={styles.checkCell}>
                    <CrossBadge label="Таргетинг по городам не поддерживается" />
                  </td>
                  <td className={styles.checkCell}>
                    <CrossBadge label="Таргетинг по провайдерам не поддерживается" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Как выбрать подходящий уровень таргетинга</h2>
          <ul className={styles.list}>
            <li>
              <strong>Rotating Residential</strong> дает самые гибкие настройки. Выбирайте этот пул, если нужно закрепить сессии
              за определённым городом или провайдером для локального SEO, тестирования UX или проверки рекламы.
            </li>
            <li>
              <strong>Static ISP</strong> охватывает те же города и регионы, что и ротационный пул, но сохраняет один IP за вашим
              проектом. Идеально для долгих автоматизаций, e-commerce и управления аккаунтами, где важна постоянная идентичность.
            </li>
            <li>
              <strong>Static ISP IPv6</strong> подходит проектам, которым нужна только национальная представленность в большом
              масштабе. Используйте его, когда нужен недорогой охват по США без привязки к конкретным городам или провайдерам.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <p className={styles.note}>
            Нужна помощь с выбором подходящего пула? Свяжитесь с вашим аккаунт-менеджером или командой поддержки SoksLine — мы
            предложим оптимальное решение с учётом ваших требований к таргетингу.
          </p>
        </section>
      </article>
    </main>
  );
}
