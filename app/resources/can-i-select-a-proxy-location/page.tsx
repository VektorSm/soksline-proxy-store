import styles from "./page.module.css";

export const metadata = {
  title: "Могу ли я выбрать геолокацию прокси? | SoksLine",
  description:
    "Узнайте, как прокси SoksLine позволяют выбрать нужную вам геолокацию в пулах Static ISP, Static ISP IPv6 и Rotating Residential.",
};

export default function Page() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Справка</span>
          <h1 className={styles.title}>Могу ли я выбрать геолокацию прокси?</h1>
          <p className={styles.lead}>
            Да. Каждый заказ прокси SoksLine позволяет выбрать локацию, которая лучше всего подходит под ваш сценарий.
            Укажите нужную страну при оформлении и управляйте трафиком без дополнительной настройки и задержек.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Управление локациями по типам прокси</h2>
          <p>
            Каждый тип прокси дает точный геотаргетинг, чтобы вы могли запускать аккаунты, автоматизацию или мониторинг
            кампаний в нужных вам регионах.
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Static ISP прокси.</strong> Выбирайте страну в нашем премиальном пуле ISP и дата-центров для стабильной
              работы и низкой задержки при сборе данных.
            </li>
            <li>
              <strong>Static ISP IPv6 прокси.</strong> Укажите нужную страну (включая маршрутизацию по штатам в США), чтобы
              использовать наш огромный запас IPv6 для задач с большим объемом трафика.
            </li>
            <li>
              <strong>Rotating Residential прокси.</strong> Настраивайте таргетинг на страны по всему миру и углубляйтесь до
              популярных штатов и регионов для локализованного тестирования, проверки рекламы и автоматизации.
            </li>
          </ul>
        </section>

        <footer className={styles.footer}>
          <p>
            Нужен конкретный город или индивидуальный набор локаций? Напишите вашему аккаунт-менеджеру или на
            support@soksline.com — мы настроим нужную вам маршрутизацию.
          </p>
        </footer>
      </article>
    </main>
  );
}
