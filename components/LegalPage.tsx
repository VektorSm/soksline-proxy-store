import { useMemo } from "react";
import { useI18n } from "../lib/i18n";
import styles from "./LegalPage.module.css";

type LegalSection = {
  id: string;
  title: string;
  body: string;
};

type LegalContent = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

type LegalPageProps = {
  pageKey: string;
};

export default function LegalPage({ pageKey }: LegalPageProps) {
  const { t } = useI18n();
  const tocLabel = t<string>("legal.toc");
  const content = t<LegalContent>(`legal.pages.${pageKey}`);
  const sections = useMemo(() => content.sections ?? [], [content.sections]);

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.intro}>{content.intro}</p>
        </header>

        <nav className={styles.toc} aria-label={tocLabel}>
          <p className={styles.tocTitle}>{tocLabel}</p>
          <ol className={styles.tocList}>
            {sections.map(section => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        {sections.map(section => (
          <section key={section.id} id={section.id} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <p className={styles.sectionBody}>{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
