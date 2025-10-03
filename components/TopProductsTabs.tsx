"use client";

import { useCallback, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { KYC_POLICY } from "../config/site";
import { useI18n } from "../lib/i18n";
import styles from "./TopProductsTabs.module.css";

const TAB_KEYS = ["staticIsp", "staticIpv6", "rotating"] as const;
type TabKey = (typeof TAB_KEYS)[number];

type TabCard = {
  name: string;
  price: string;
  features: string[];
};

type TabContent = {
  label: string;
  tagline: string;
  cards: TabCard[];
  note?: string;
};

type TopProductsContent = {
  title: string;
  description: string;
  tabs: Record<TabKey, TabContent> & Record<string, TabContent>;
};

const FEATURE_PLACEHOLDER = "{kycPolicy}";

export default function TopProductsTabs() {
  const { locale, t } = useI18n();
  const data = t<TopProductsContent>("topProducts");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = useMemo(() => {
    return TAB_KEYS.map(key => ({ key, content: data.tabs[key] })).filter(tab => Boolean(tab.content));
  }, [data.tabs]);

  const kycPolicy = locale === "ru" ? KYC_POLICY : t<string>("kyc.policy");

  const focusTab = useCallback(
    (index: number) => {
      const clamped = (index + tabs.length) % tabs.length;
      setActiveIndex(clamped);
      tabRefs.current[clamped]?.focus();
    },
    [tabs.length]
  );

  const handleKeyDown = useCallback(
    (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
      switch (event.key) {
        case "ArrowRight":
        case "Right":
          event.preventDefault();
          focusTab(index + 1);
          break;
        case "ArrowLeft":
        case "Left":
          event.preventDefault();
          focusTab(index - 1);
          break;
        case "Home":
          event.preventDefault();
          focusTab(0);
          break;
        case "End":
          event.preventDefault();
          focusTab(tabs.length - 1);
          break;
        default:
          break;
      }
    },
    [focusTab, tabs.length]
  );

  const activeTab = tabs[activeIndex] ?? tabs[0];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.subtitle}>{data.description}</p>
        </header>

        <div className={styles.tablist} role="tablist" aria-label={data.title}>
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                type="button"
                key={tab.key}
                id={`top-products-${tab.key}`}
                className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ""}`.trim()}
                role="tab"
                aria-selected={isActive}
                aria-controls={`top-products-${tab.key}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={handleKeyDown(index)}
                ref={element => {
                  tabRefs.current[index] = element;
                }}
              >
                {tab.content.label}
              </button>
            );
          })}
        </div>

        {activeTab && (
          <div
            id={`top-products-${activeTab.key}-panel`}
            role="tabpanel"
            aria-labelledby={`top-products-${activeTab.key}`}
            tabIndex={0}
            className={styles.panel}
          >
            <p className={styles.subtitle}>{activeTab.content.tagline}</p>

            <div className={styles.cards}>
              {activeTab.content.cards.map(card => (
                <article key={card.name} className={styles.card}>
                  <div>
                    <h3 className={styles.cardTitle}>{card.name}</h3>
                    <p className={styles.cardPrice}>{card.price}</p>
                  </div>
                  <ul className={styles.featureList}>
                    {card.features.map(feature => {
                      const text = feature.includes(FEATURE_PLACEHOLDER)
                        ? feature.replace(FEATURE_PLACEHOLDER, kycPolicy)
                        : feature;
                      return <li key={feature}>{text}</li>;
                    })}
                  </ul>
                </article>
              ))}
            </div>

            {activeTab.content.note && <p className={styles.note}>{activeTab.content.note}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
