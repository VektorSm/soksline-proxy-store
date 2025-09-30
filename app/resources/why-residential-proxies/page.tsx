import styles from "./page.module.css";

export const metadata = {
  title: "Why Residential Proxies? | SoksLine",
  description:
    "Understand the value of residential proxies, including stability, rotation, privacy, and affordable security for long-term projects.",
};

export default function Page() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Guide</span>
          <h1 className={styles.title}>Why Residential Proxies?</h1>
          <p className={styles.meta}>12 days ago · Updated</p>
        </header>

        <section className={styles.section}>
          <p>
            A residential proxy is an address provided directly by your Internet Service Provider (ISP). It leverages real
            household IPs that legitimate proxy users rely on for trusted access.
          </p>
          <p>
            Residential proxies are ideal as a long-term solution for teams and operators who need consistency and stability
            throughout their projects.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What residential proxies provide</h2>
          <p>
            Residential proxy networks deliver the core elements you need to run resilient operations without sacrificing
            performance or privacy:
          </p>
          <ul className={styles.list}>
            <li>IP rotation</li>
            <li>Super speedy bandwidth privacy</li>
            <li>Security for an approachable price tag</li>
          </ul>
        </section>
      </article>
    </main>
  );
}
