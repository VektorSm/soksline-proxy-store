import styles from "./page.module.css";

export const metadata = {
  title: "What solutions do you offer? | SoksLine",
  description:
    "Discover the proxy solutions SoksLine provides, including static ISP, IPv6 ISP, and rotating residential networks tailored to your workflows.",
};

export default function Page() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Guide</span>
          <h1 className={styles.title}>What solutions do you offer?</h1>
          <p className={styles.meta}>12 days ago · Updated</p>
        </header>

        <section className={styles.section}>
          <p>
            At SoksLine, we pair every customer with proxy solutions that keep critical workflows online and compliant, no
            matter the scale of their projects.
          </p>
          <p>Here&apos;s the lineup of services available today:</p>
          <ul className={styles.list}>
            <li>
              <strong>Static ISP</strong> — dedicated ISP IPs with datacenter-grade reliability for automation, traffic
              management, and verified browsing.
            </li>
            <li>
              <strong>Static ISP IPv6</strong> — massive U.S. IPv6 ranges powered by ISP carriers for bandwidth-heavy tasks
              that demand unique addresses.
            </li>
            <li>
              <strong>Rotating Residential</strong> — ethically sourced household connections that refresh on demand to power
              geo-targeted research and multi-account operations.
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}
