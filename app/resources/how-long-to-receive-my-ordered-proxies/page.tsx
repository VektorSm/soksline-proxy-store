import styles from "./page.module.css";

export const metadata = {
  title: "How long does it take to receive my ordered proxies? | SoksLine",
  description:
    "Understand how quickly SoksLine delivers proxy orders and what happens if additional information is required for setup.",
};

export default function Page() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Guide</span>
          <h1 className={styles.title}>How long does it take to receive my ordered proxies?</h1>
          <p className={styles.meta}>11 days ago · Updated</p>
        </header>

        <section className={styles.section}>
          <p>Proxies are delivered within 24 hours from your order payment.</p>
          <p>
            In case any additional information is required from your side, a Proxy-Cheap account manager will get in touch
            with you as soon as possible.
          </p>
        </section>
      </article>
    </main>
  );
}
