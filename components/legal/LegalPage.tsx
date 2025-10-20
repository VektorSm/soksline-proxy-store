'use client';
import { Fragment, ReactNode } from 'react';
import Link from 'next/link';
import PolicyMeta from '@/components/PolicyMeta';
import Section from '@/components/layout/Section';
import Toc from './Toc';

type ListItem = string | { text: string; subItems?: string[] };

type Paragraph =
  | string
  | {
      type: 'list';
      ordered?: boolean;
      items: ListItem[];
    };

type Section = { id: string; title: string; paragraphs: Paragraph[] };
type LegalDict = {
  title: string;
  disclaimer?: string;
  intro?: string;
  lastUpdated?: {
    iso: string;
    text: string;
    className?: string;
  };
  sections: Section[];
  backToTopLabel?: string;
};

function renderBoldSegments(text: string, keyPrefix: string) {
  const boldPattern = /\*\*([^*]+)\*\*/g;
  const elements: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let segmentIndex = 0;

  while ((match = boldPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(
        <Fragment key={`${keyPrefix}-text-${segmentIndex++}`}>
          {text.slice(lastIndex, match.index)}
        </Fragment>,
      );
    }
    elements.push(
      <strong key={`${keyPrefix}-bold-${segmentIndex++}`} className="font-semibold">
        {match[1]}
      </strong>,
    );
    lastIndex = boldPattern.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(
      <Fragment key={`${keyPrefix}-text-${segmentIndex++}`}>{text.slice(lastIndex)}</Fragment>,
    );
  }

  return elements;
}

function renderLineSegments(line: string, keyPrefix: string) {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const elements: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let segmentIndex = 0;

  while ((match = linkPattern.exec(line)) !== null) {
    if (match.index > lastIndex) {
      const prefix = `${keyPrefix}-text-${segmentIndex++}`;
      elements.push(...renderBoldSegments(line.slice(lastIndex, match.index), prefix));
    }

    const linkKey = `${keyPrefix}-link-${segmentIndex++}`;
    const linkChildren = renderBoldSegments(match[1], `${linkKey}-content`);
    const href = match[2];
    const linkClass = 'text-blue-600 hover:underline';

    if (href.startsWith('/')) {
      elements.push(
        <Link key={linkKey} href={href} className={linkClass}>
          {linkChildren}
        </Link>,
      );
    } else {
      elements.push(
        <a key={linkKey} href={href} className={linkClass}>
          {linkChildren}
        </a>,
      );
    }

    lastIndex = linkPattern.lastIndex;
  }

  if (lastIndex < line.length) {
    const prefix = `${keyPrefix}-text-${segmentIndex++}`;
    elements.push(...renderBoldSegments(line.slice(lastIndex), prefix));
  }

  return elements;
}

function renderRichText(text: string) {
  return text.split('\n').map((line, lineIndex) => (
    <Fragment key={`line-${lineIndex}`}>
      {lineIndex > 0 && <br />}
      {renderLineSegments(line, `line-${lineIndex}`)}
    </Fragment>
  ));
}

function renderListItem(item: ListItem, index: number) {
  if (typeof item === 'string') {
    return <li key={index}>{renderRichText(item)}</li>;
  }

  return (
    <li key={index}>
      {renderRichText(item.text)}
      {item.subItems?.length ? (
        <ul className="mt-2 ml-5 list-disc space-y-1">
          {item.subItems.map((subItem, subIndex) => (
            <li key={subIndex}>{renderRichText(subItem)}</li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function renderParagraph(paragraph: Paragraph, index: number) {
  if (typeof paragraph === 'string') {
    return (
      <p key={index} className="opacity-90">
        {renderRichText(paragraph)}
      </p>
    );
  }

  const ListTag = (paragraph.ordered ? 'ol' : 'ul') as 'ol' | 'ul';
  const listClass = paragraph.ordered ? 'list-decimal' : 'list-disc';
  const listClasses = `${listClass} ml-5 space-y-2`;

  return (
    <ListTag key={index} className={listClasses}>
      {paragraph.items.map((item, itemIndex) => renderListItem(item, itemIndex))}
    </ListTag>
  );
}

export default function LegalPage({ dict }: { dict: LegalDict }) {
  const sections = dict.sections ?? [];
  const backToTopLabel = dict.backToTopLabel ?? 'Back to top';
  return (
    <Section bg="white" containerClassName="not-prose">
      <div className="mx-auto max-w-5xl space-y-6" id="top">
        <div>
          <h1 className="text-3xl font-semibold mb-4">{dict.title}</h1>
          {dict.lastUpdated ? (
            <PolicyMeta
              iso={dict.lastUpdated.iso}
              className={dict.lastUpdated.className}
            >
              {dict.lastUpdated.text}
            </PolicyMeta>
          ) : null}
          {dict.disclaimer && (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
              {dict.disclaimer}
            </p>
          )}

          {dict.intro && (
            <p className="mt-4 opacity-80">{renderRichText(dict.intro)}</p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <article className="prose max-w-none md:col-span-2">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="mt-8 mb-2 text-xl font-medium">{s.title}</h2>
                <div className="space-y-3">
                  {s.paragraphs?.map((paragraph, index) => renderParagraph(paragraph, index))}
                </div>
              </section>
            ))}

            {sections.length > 0 && (
              <div className="mt-8">
                <a href="#top" className="text-sm underline opacity-70">
                  {backToTopLabel}
                </a>
              </div>
            )}
          </article>

          <aside className="md:col-span-1 md:sticky md:top-20 md:self-start">
            <Toc items={sections.map(({ id, title }) => ({ id, title }))} />
          </aside>
        </div>
      </div>
    </Section>
  );
}
