"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getCategories, type CategoryId } from "../lib/products";
import { useLocale } from "./LocaleContext";
import type { Locale } from "./LocaleContext";
import styles from "./TopProductsTabs.module.css";
import KycNotice from "./KycNotice";

const SECTION_TITLE: Record<Locale, string> = {
  ru: "Топ продукты SoksLine",
  en: "Top products by SoksLine",
};

const TABLIST_LABEL: Record<Locale, string> = {
  ru: "Категории продуктов",
  en: "Product categories",
};

type TabButtonProps = {
  categoryId: CategoryId;
  label: string;
  isActive: boolean;
  onSelect: (id: CategoryId) => void;
};

function TabButton({ categoryId, label, isActive, onSelect }: TabButtonProps) {
  return (
    <button
      type="button"
      id={`${categoryId}-tab`}
      className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ""}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`${categoryId}-panel`}
      onClick={() => onSelect(categoryId)}
    >
      {label}
    </button>
  );
}

export default function TopProductsTabs() {
  const { locale } = useLocale();
  const categories = useMemo(() => getCategories(locale), [locale]);
  const [activeCategory, setActiveCategory] = useState<CategoryId>(categories[0].id);

  useEffect(() => {
    if (!categories.some(category => category.id === activeCategory)) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  const current = categories.find(category => category.id === activeCategory) ?? categories[0];

  return (
    <section className={styles.section} id="top-products">
      <div className={styles.sectionInner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{SECTION_TITLE[locale]}</h2>
          <p className={styles.subtitle}>{current.tagline}</p>
        </div>

        <div role="tablist" aria-label={TABLIST_LABEL[locale]} className={styles.tablistWrapper}>
          {categories.map(category => (
            <TabButton
              key={category.id}
              categoryId={category.id}
              label={category.title}
              isActive={category.id === activeCategory}
              onSelect={setActiveCategory}
            />
          ))}
        </div>

        <div
          id={`${current.id}-panel`}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`${current.id}-tab`}
          className={styles.panel}
        >
          <div className={styles.cards}>
            {current.items.map(item => (
              <article key={item.name} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{item.name}</h3>
                  <p className={styles.cardPrice}>{item.price}</p>
                </div>
                <ul className={styles.featureList}>
                  {item.features.map(feature => (
                    <li key={feature} className={styles.featureItem}>
                      <span className={styles.featureDot} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <KycNotice className={styles.cardKycNotice} inline locale={locale} />
                {item.bestFor && <p className={styles.cardMeta}>{item.bestFor}</p>}
              </article>
            ))}
          </div>
          {current.note && <p className={styles.note}>{current.note}</p>}
        </div>
      </div>
    </section>
  );
}
