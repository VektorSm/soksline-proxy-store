"use client";

import React, { useState } from "react";
import { CATEGORIES, CategoryId } from "../lib/products";
import styles from "./TopProductsTabs.module.css";

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
  const [activeCategory, setActiveCategory] = useState<CategoryId>(CATEGORIES[0].id);
  const current = CATEGORIES.find(category => category.id === activeCategory)!;

  return (
    <section className={styles.section} id="top-products">
      <div className={styles.sectionInner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Топ продукты SoksLine</h2>
          <p className={styles.subtitle}>{current.tagline}</p>
        </div>

        <div role="tablist" aria-label="Категории продуктов" className={styles.tablistWrapper}>
          {CATEGORIES.map(category => (
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
