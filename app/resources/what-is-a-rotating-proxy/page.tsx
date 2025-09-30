import styles from "./page.module.css";

export const metadata = {
  title: "What is a Rotating Proxy? | SoksLine",
  description:
    "Learn what rotating residential proxies are, how sessions work, and what to expect from expiration and renewals at SoksLine.",
};

export default function Page() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Guide</span>
          <h1 className={styles.title}>What is a rotating proxy?</h1>
          <p className={styles.lead}>
            A rotating residential proxy routes your internet traffic through multiple real residential IP addresses. This keeps
            your browsing private, automates IP changes, and helps prevent websites from blocking access to your requests.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How rotating residential proxies work</h2>
          <p>
            Our residential proxies offer flexible rotation options. You can let the IP change with every request, or keep the
            same IP active for the length of a session. A session is simply a randomly generated string that locks in one IP for
            that window of time, giving you a stable identity while the session lasts.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Expiration &amp; renewals</h2>
          <ul className={styles.list}>
            <li>
              <strong>No extensions or renewals.</strong> Rotating residential proxies cannot be extended. Once a package
              expires, you will need to purchase a new one.
            </li>
            <li>
              <strong>Additional bandwidth.</strong> If your rotating traffic runs out, it cannot be topped up. Simply buy a new
              package to continue working without interruptions.
            </li>
            <li>
              <strong>120-day expiration.</strong> Each proxy is valid for 120 days. After that period, the proxy expires and a
              new purchase is required.
            </li>
          </ul>
        </section>

        <footer className={styles.footer}>
          <p>
            Keep an eye on your usage to avoid unexpected service interruptions, and plan your rotations ahead of time for smooth
            automation.
          </p>
        </footer>
      </article>
    </main>
  );
}
