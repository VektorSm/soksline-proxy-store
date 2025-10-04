'use client';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Toc from './Toc';

type Section = { id: string; title: string; paragraphs: string[] };
type LegalDict = { title: string; disclaimer?: string; intro?: string; sections: Section[] };

export default function LegalPage({ dict }: { dict: LegalDict }) {
  const sections = dict.sections ?? [];
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold">{dict.title}</h1>
        <LanguageSwitcher />
      </div>

      {dict.disclaimer && (
        <p className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
          {dict.disclaimer}
        </p>
      )}

      {dict.intro && <p className="mt-4 opacity-80">{dict.intro}</p>}

      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_260px]">
        <article className="prose max-w-none">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-xl font-medium mt-8 mb-2">{s.title}</h2>
              {s.paragraphs?.map((p, i) => (
                <p key={i} className="opacity-90">{p}</p>
              ))}
              <div className="mt-4">
                <a href="#top" className="text-sm underline opacity-70">Back to top</a>
              </div>
            </section>
          ))}
        </article>

        <aside className="md:sticky md:top-20 md:self-start" id="top">
          <Toc items={sections.map(({ id, title }) => ({ id, title }))} />
        </aside>
      </div>
    </main>
  );
}
