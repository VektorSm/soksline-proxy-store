'use client';
import Section from '@/components/layout/Section';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Toc from './Toc';

type Section = { id: string; title: string; paragraphs: string[] };
type LegalDict = { title: string; disclaimer?: string; intro?: string; sections: Section[] };

export default function LegalPage({ dict }: { dict: LegalDict }) {
  const sections = dict.sections ?? [];
  return (
    <Section bg="white" containerClassName="not-prose">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold">{dict.title}</h1>
          <LanguageSwitcher />
        </div>

        {dict.disclaimer && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
            {dict.disclaimer}
          </p>
        )}

        {dict.intro && <p className="opacity-80">{dict.intro}</p>}

        <div className="mt-6 grid gap-8 md:grid-cols-3">
          <article className="prose max-w-none md:col-span-2">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="mt-8 mb-2 text-xl font-medium">{s.title}</h2>
                {s.paragraphs?.map((p, i) => (
                  <p key={i} className="opacity-90">
                    {p}
                  </p>
                ))}
                <div className="mt-4">
                  <a href="#top" className="text-sm underline opacity-70">
                    Back to top
                  </a>
                </div>
              </section>
            ))}
          </article>

          <aside className="md:col-span-1 md:sticky md:top-20 md:self-start" id="top">
            <Toc items={sections.map(({ id, title }) => ({ id, title }))} />
          </aside>
        </div>
      </div>
    </Section>
  );
}
