'use client';

import { ChangeEvent, useMemo, useState } from 'react';

import { useLocale } from '../../components/LocaleContext';
import type { Locale } from '../../components/LocaleContext';

import styles from './page.module.css';

type HelpCenterCopy = {
  title: string;
  description: string;
  requiredNote: string;
  email: {
    label: string;
    placeholder: string;
  };
  descriptionField: {
    label: string;
    placeholder: string;
  };
  attachments: {
    label: string;
    helper: string;
  };
  submitLabel: string;
};

const HELP_CENTER_COPY: Record<Locale, HelpCenterCopy> = {
  en: {
    title: 'Contact Us',
    description:
      'Let us know how we can help. A member of our support staff will respond as soon as possible.',
    requiredNote: 'Fields marked with an asterisk (*) are required.',
    email: {
      label: 'Your email address*',
      placeholder: 'name@example.com',
    },
    descriptionField: {
      label: 'Description*',
      placeholder: 'Please enter the details of your request.',
    },
    attachments: {
      label: 'Attachments',
      helper: 'Choose a file or drag and drop here',
    },
    submitLabel: 'Submit',
  },
  ru: {
    title: 'Свяжитесь с нами',
    description: 'Опишите, с чем нужна помощь. Команда поддержки ответит вам как можно быстрее.',
    requiredNote: 'Поля, отмеченные звёздочкой (*), обязательны для заполнения.',
    email: {
      label: 'Ваш e-mail*',
      placeholder: 'name@example.com',
    },
    descriptionField: {
      label: 'Описание*',
      placeholder: 'Опишите детали запроса',
    },
    attachments: {
      label: 'Вложения',
      helper: 'Выберите файл или перетащите его сюда',
    },
    submitLabel: 'Отправить',
  },
};

export default function HelpCenterPage() {
  const { locale } = useLocale();
  const copy = HELP_CENTER_COPY[locale];
  const [fileLabel, setFileLabel] = useState<string | null>(null);

  const attachmentText = useMemo(
    () => fileLabel ?? copy.attachments.helper,
    [copy.attachments.helper, fileLabel],
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setFileLabel(null);
      return;
    }

    const names = Array.from(files)
      .map((file) => file.name)
      .slice(0, 3);

    const formatted =
      files.length > 3 ? `${names.join(', ')} +${files.length - 3}` : names.join(', ');
    setFileLabel(formatted);
  };

  return (
    <div className={styles.page}>
      <section className={styles.panel} aria-labelledby="help-center-title">
        <header className={styles.header}>
          <h1 id="help-center-title" className={styles.title}>
            {copy.title}
          </h1>
          <p className={styles.description}>{copy.description}</p>
          <p className={styles.note}>{copy.requiredNote}</p>
        </header>

        <form className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-email">
              {copy.email.label}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className={styles.input}
              placeholder={copy.email.placeholder}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-description">
              {copy.descriptionField.label}
            </label>
            <textarea
              id="contact-description"
              name="description"
              required
              className={`${styles.input} ${styles.textarea}`}
              placeholder={copy.descriptionField.placeholder}
              rows={8}
            />
          </div>

          <div className={styles.field}>
            <span className={styles.label}>{copy.attachments.label}</span>
            <label className={styles.dropzone} htmlFor="contact-attachments">
              <input
                id="contact-attachments"
                name="attachments"
                type="file"
                className={styles.fileInput}
                multiple
                onChange={handleFileChange}
              />
              <span>{attachmentText}</span>
            </label>
          </div>

          <button type="submit" className={styles.submit}>
            {copy.submitLabel}
          </button>
        </form>
      </section>
    </div>
  );
}
