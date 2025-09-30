import styles from "./page.module.css";

export const metadata = {
  title: "Can I select a proxy location? | SoksLine",
  description:
    "Learn how SoksLine proxies let you choose the exact location you need across Static ISP, Static ISP IPv6, and Rotating Residential pools.",
};

export default function Page() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Guide</span>
          <h1 className={styles.title}>Can I select a proxy location?</h1>
          <p className={styles.lead}>
            Yes. Every SoksLine proxy order lets you choose the location that best fits your use case. Pick the country you
            need at checkout and tailor your traffic without extra configuration or delays.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Location controls by proxy type</h2>
          <p>
            Each proxy family gives you precise geo-targeting so you can deploy accounts, run automations, or monitor
            campaigns in the markets that matter most to you.
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Static ISP proxies.</strong> Select country-level locations across our premium ISP and datacenter blend
              for consistent uptime and low-latency scraping.
            </li>
            <li>
              <strong>Static ISP IPv6 proxies.</strong> Choose the country you need (including state-level routing across the
              United States) to tap into our vast IPv6 supply for high-volume tasks.
            </li>
            <li>
              <strong>Rotating Residential proxies.</strong> Target countries worldwide and drill down to popular
              states/regions for localized testing, ad verification, and automation.
            </li>
          </ul>
        </section>

        <footer className={styles.footer}>
          <p>
            Need a specific city or custom location mix? Message your account manager or reach us at support@soksline.com, and
            we&apos;ll provision the routing you require.
          </p>
        </footer>
      </article>
    </main>
  );
}
