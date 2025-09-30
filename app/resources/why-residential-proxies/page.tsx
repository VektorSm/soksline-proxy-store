import styles from "./page.module.css";

export const metadata = {
  title: "Зачем нужны резидентские прокси? | SoksLine",
  description:
    "Разберитесь, какие преимущества дают резидентские прокси: стабильность, ротацию, приватность и доступную защиту для долгосрочных проектов.",
};

export default function Page() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Справка</span>
          <h1 className={styles.title}>Зачем нужны резидентские прокси?</h1>
          <p className={styles.meta}>12 дней назад · Обновлено</p>
        </header>

        <section className={styles.section}>
          <p>
            Резидентский прокси — это адрес, который предоставляет ваш интернет-провайдер (ISP). Это реальные домашние IP,
            на которые полагаются легальные пользователи прокси для надежного доступа.
          </p>
          <p>
            Такие прокси идеально подходят как долгосрочное решение для команд и специалистов, которым важны стабильность и
            предсказуемость на протяжении всего проекта.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Что дают резидентские прокси</h2>
          <p>
            Сети резидентских прокси обеспечивают ключевые элементы для устойчивой работы без ущерба для скорости и
            приватности:
          </p>
          <ul className={styles.list}>
            <li>Ротацию IP</li>
            <li>Высокую скорость при сохранении приватности</li>
            <li>Защиту по доступной цене</li>
          </ul>
        </section>
      </article>
    </main>
  );
}
