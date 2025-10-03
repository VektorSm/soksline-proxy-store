"use client";

import { SUPPORTED_LOCALES, type Locale } from "../config/site";
import { useI18n } from "../lib/i18n";
import styles from "./LanguageSwitcher.module.css";

const LABEL_SHORT: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
};

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className={styles.wrapper} role="group" aria-label={t("language.switcherLabel")}> 
      {SUPPORTED_LOCALES.map(option => {
        const isActive = option === locale;
        return (
          <button
            type="button"
            key={option}
            className={`${styles.button} ${isActive ? styles.buttonActive : styles.buttonInactive}`}
            aria-pressed={isActive}
            onClick={() => setLocale(option)}
          >
            {LABEL_SHORT[option]}
            <span className="sr-only">{t(`language.${option}`)}</span>
          </button>
        );
      })}
    </div>
  );
}
