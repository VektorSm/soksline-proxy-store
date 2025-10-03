"use client";

import { useMemo } from "react";
import { useI18n } from "../lib/i18n";
import styles from "./ResourceArticle.module.css";

type ResourceSection = {
  title: string;
  body: string;
};

type ResourceArticleContent = {
  slug: string;
  title: string;
  intro: string;
  sections: ResourceSection[];
};

type ResourceArticleProps = {
  slug: string;
};

export default function ResourceArticle({ slug }: ResourceArticleProps) {
  const { t } = useI18n();
  const articles = t<ResourceArticleContent[]>("resources.list");

  const article = useMemo(() => articles.find(item => item.slug === slug), [articles, slug]);

  if (!article) {
    return null;
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.intro}>{article.intro}</p>
        </header>

        {article.sections.map(section => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <p className={styles.sectionBody}>{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
