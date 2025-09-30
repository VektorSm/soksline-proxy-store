import styles from "./page.module.css";

export const metadata = {
  title: "Сколько времени занимает получение заказанных прокси? | SoksLine",
  description:
    "Узнайте, как быстро SoksLine поставляет прокси и что происходит, если для настройки нужна дополнительная информация.",
};

export default function Page() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Справка</span>
          <h1 className={styles.title}>Сколько времени занимает получение заказанных прокси?</h1>
          <p className={styles.meta}>11 дней назад · Обновлено</p>
        </header>

        <section className={styles.section}>
          <p>Прокси доставляются в течение 24 часов после оплаты заказа.</p>
          <p>
            Если от вас потребуется дополнительная информация, аккаунт-менеджер Proxy-Cheap свяжется с вами как можно быстрее.
          </p>
        </section>
      </article>
    </main>
  );
}
