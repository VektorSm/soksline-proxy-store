import styles from "./page.module.css";

export const metadata = {
  title: "Какие решения вы предлагаете? | SoksLine",
  description:
    "Узнайте о решениях SoksLine: статических ISP, IPv6 ISP и ротационных резидентских сетях, адаптированных под ваши рабочие процессы.",
};

export default function Page() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Справка</span>
          <h1 className={styles.title}>Какие решения вы предлагаете?</h1>
          <p className={styles.meta}>12 дней назад · Обновлено</p>
        </header>

        <section className={styles.section}>
          <p>
            В SoksLine мы подбираем каждому клиенту решения, которые обеспечивают бесперебойную и легальную работу ключевых
            процессов вне зависимости от масштаба проекта.
          </p>
          <p>Вот какие услуги доступны уже сейчас:</p>
          <ul className={styles.list}>
            <li>
              <strong>Static ISP</strong> — выделенные ISP-IP с надежностью дата-центров для автоматизации, управления трафиком
              и безопасного серфинга.
            </li>
            <li>
              <strong>Static ISP IPv6</strong> — огромные диапазоны IPv6 из США на базе ISP-провайдеров для задач с высоким
              потреблением трафика и уникальными адресами.
            </li>
            <li>
              <strong>Rotating Residential</strong> — этичные жилые подключения с автоматической сменой IP для геотаргетинга,
              исследований и мультиаккаунтных операций.
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}
