'use client';

import React, { useMemo } from 'react';
import KycNotice from '../KycNotice';
import { useLocale } from '../LocaleContext';
import { getCategories, type CategoryId, type Category } from '../../lib/products';
import styles from './CategoryPanel.module.css';

type CategoryPanelProps = {
  categoryId: CategoryId;
};

export default function CategoryPanel({ categoryId }: CategoryPanelProps) {
  const { locale } = useLocale();

  const category: Category | undefined = useMemo(() => {
    const categories = getCategories(locale);
    return categories.find((item) => item.id === categoryId);
  }, [categoryId, locale]);

  if (!category) {
    return null;
  }

  return (
    <div className={styles.panel}>
      <p className={styles.tagline}>{category.tagline}</p>
      <div className={styles.cards}>
        {category.items.map((item) => (
          <article key={item.name} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <p className={styles.cardPrice}>{item.price}</p>
            </div>
            <ul className={styles.featureList}>
              {item.features.map((feature) => (
                <li key={feature} className={styles.featureItem}>
                  <span className={styles.featureDot} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {item.bestFor ? <p className={styles.cardMeta}>{item.bestFor}</p> : null}
          </article>
        ))}
      </div>
      <KycNotice inline className={styles.kycNotice} locale={locale} />
      {category.note ? <p className={styles.note}>{category.note}</p> : null}
    </div>
  );
}
