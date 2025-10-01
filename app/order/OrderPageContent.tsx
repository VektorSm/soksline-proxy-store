"use client";

import Link from "next/link";

import { useLocale } from "../../components/LocaleContext";
import { getOrderPage } from "../../lib/order";

import styles from "./page.module.css";

export default function OrderPageContent() {
  const { locale } = useLocale();
  const page = getOrderPage(locale);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <span className={styles.heroEyebrow}>{page.heroEyebrow}</span>
          <h1 className={styles.heroTitle}>{page.heroTitle}</h1>
          <p className={styles.heroSubtitle}>{page.heroSubtitle}</p>
          <p className={styles.heroDescription}>{page.heroDescription}</p>
        </header>

        <section className={styles.paymentCard}>
          <div>
            <h2 className={styles.paymentTitle}>{page.paymentTitle}</h2>
            <p className={styles.paymentNote}>{page.paymentNote}</p>
          </div>
          <div className={styles.paymentMethods}>
            <span className={styles.paymentMethodsLabel}>{page.paymentMethodsLabel}</span>
            <ul className={styles.paymentMethodsList}>
              {page.paymentMethods.map(method => (
                <li key={method}>{method}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.sections}>
          {page.sections.map(section => (
            <article key={section.id} className={styles.sectionCard}>
              <header className={styles.sectionHeader}>
                <div>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  <p className={styles.sectionSubtitle}>{section.subtitle}</p>
                </div>
                <Link href={section.moreInfoHref} className={styles.moreLink}>
                  {page.moreInfoLabel}
                </Link>
              </header>

              <p className={styles.sectionHighlight}>{section.highlight}</p>

              <div className={styles.categories}>
                {section.categories.map(category => (
                  <div key={category.id} className={styles.category}>
                    <h3 className={styles.categoryTitle}>{category.label}</h3>
                    <div className={styles.tiers}>
                      {category.tiers.map(tier => (
                        <article key={tier.id} className={styles.tierCard}>
                          {tier.ribbon && <span className={styles.tierRibbon}>{tier.ribbon}</span>}
                          <div className={styles.tierHeader}>
                            <div>
                              <h4 className={styles.tierName}>{tier.name}</h4>
                              {tier.subLabel && <span className={styles.tierSubLabel}>{tier.subLabel}</span>}
                            </div>
                            <p className={styles.tierPrice}>
                              {tier.price}
                              <span className={styles.tierPeriod}>{tier.period}</span>
                            </p>
                          </div>
                          {tier.description && (
                            <p className={styles.tierDescription}>{tier.description}</p>
                          )}
                          <ul className={styles.tierFeatures}>
                            {tier.features.map(feature => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                          <Link href={tier.ctaHref} className={styles.tierCta}>
                            {tier.ctaLabel ?? page.tierCtaFallback}
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <aside className={styles.contactCard}>
          <div>
            <h2 className={styles.contactTitle}>{page.contactTitle}</h2>
            <p className={styles.contactSubtitle}>{page.contactSubtitle}</p>
          </div>
          <Link href={page.contactHref} className={styles.contactCta}>
            {page.contactCtaLabel}
          </Link>
        </aside>
      </div>
    </main>
  );
}
