import styles from "./page.module.css";

export const metadata = {
  title: "What are the targeting options for our proxies? | SoksLine",
  description:
    "Explore the geo-targeting coverage for SoksLine rotating residential, static ISP, and static ISP IPv6 proxies, plus guidance on choosing the right option.",
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
          <span className={styles.eyebrow}>Guide</span>
          <h1 className={styles.title}>What are the targeting options for our proxies?</h1>
          <p className={styles.lead}>
            Choose the best targeting level for your workflow across the rotating residential, Static ISP, and Static ISP IPv6
            pools we provide at SoksLine.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Geo-targeting coverage</h2>
          <p>
            The matrix below outlines the available targeting depth for each proxy type we offer. We focus on residential-grade
            access, so the list is limited to the options you can purchase from SoksLine today.
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Proxy type</th>
                  <th scope="col">Country</th>
                  <th scope="col">Region / State</th>
                  <th scope="col">City</th>
                  <th scope="col">ISP / Carrier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className={styles.proxyName}>
                    Rotating Residential
                  </th>
                  <td className={styles.checkCell}>
                    <CheckBadge label="Country-level targeting available" />
                  </td>
                  <td className={styles.checkCell}>
                    <CheckBadge label="Region-level targeting available" />
                  </td>
                  <td className={styles.checkCell}>
                    <CheckBadge label="City-level targeting available" />
                  </td>
                  <td className={styles.checkCell}>
                    <CheckBadge label="ISP and carrier targeting available" />
                  </td>
                </tr>
                <tr>
                  <th scope="row" className={styles.proxyName}>
                    Static ISP
                  </th>
                  <td className={styles.checkCell}>
                    <CheckBadge label="Country-level targeting available" />
                  </td>
                  <td className={styles.checkCell}>
                    <CheckBadge label="Region-level targeting available" />
                  </td>
                  <td className={styles.checkCell}>
                    <CheckBadge label="City-level targeting available" />
                  </td>
                  <td className={styles.checkCell}>
                    <CrossBadge label="ISP targeting not supported" />
                  </td>
                </tr>
                <tr>
                  <th scope="row" className={styles.proxyName}>
                    Static ISP IPv6
                  </th>
                  <td className={styles.checkCell}>
                    <CheckBadge label="Country-level targeting available" />
                  </td>
                  <td className={styles.checkCell}>
                    <CrossBadge label="Region targeting not supported" />
                  </td>
                  <td className={styles.checkCell}>
                    <CrossBadge label="City targeting not supported" />
                  </td>
                  <td className={styles.checkCell}>
                    <CrossBadge label="ISP targeting not supported" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to pick the right targeting level</h2>
          <ul className={styles.list}>
            <li>
              <strong>Rotating Residential</strong> delivers the most granular controls. Choose this pool when you need to lock
              sessions to a specific metro area or carrier for localized SEO, user experience testing, or ad verification.
            </li>
            <li>
              <strong>Static ISP</strong> covers the same cities and regions as our rotating pool, but keeps a single IP tied to
              your project. It&apos;s ideal for long-running automations, e-commerce operations, or account management tasks that
              must retain a consistent identity.
            </li>
            <li>
              <strong>Static ISP IPv6</strong> is perfect for projects that only require national presence at massive scale. Use it
              when you want affordable U.S. coverage without needing specific municipalities or carriers.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <p className={styles.note}>
            Need help matching your use case to the right pool? Reach out to your account manager or the SoksLine support team
            and we&apos;ll recommend the best option based on your targeting requirements.
          </p>
        </section>
      </article>
    </main>
  );
}
