import type { Metadata } from 'next';
import Link from 'next/link';

import AMLContent from '@/content/legal/aml-v1.2-main.mdx';
import PrintButton from '@/components/legal/PrintButton';

const POLICY = {
  title: 'AML / ПОД–ФТ Политика — v1.2 (MAIN)',
  description:
    'Краткая AML/CFT политика SoksLine (CODE DESIGN LTD), UK. Разрешены криптоплатежи на L0 при низком риске, KYT до активации, лимиты, запрет privacy-коинов, refund-to-origin.',
  version: 'v1.2 (MAIN)',
  lastUpdated: '2025-02-14',
  companyLine: 'CODE DESIGN LTD (SoksLine), England & Wales, Company No. 16676185',
};

export const metadata: Metadata = {
  title: `${POLICY.title} | SoksLine`,
  description: POLICY.description,
};

export default function AMLPage() {
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(POLICY.lastUpdated));

  return (
    <main className="bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{POLICY.title}</h1>
            <p className="text-sm text-muted-foreground">{POLICY.companyLine}</p>
            <p className="text-sm text-muted-foreground">Последнее обновление: {formattedDate}</p>
          </div>
          <div className="flex items-center gap-2 self-start">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
              {POLICY.version}
            </span>
            <PrintButton className="rounded-2xl border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400" />
          </div>
        </header>

        <article className="prose prose-neutral dark:prose-invert prose-headings:scroll-mt-24">
          <AMLContent />
        </article>

        <footer className="mt-10 space-y-1 text-sm text-muted-foreground">
          <p>MLRO: Nicolae Buiuc — <a href="mailto:soksline@soksline.store">soksline@soksline.store</a></p>
          <p>Registered office: 61 Bridge Street, Kington, Herefordshire, HR5 3DJ, United Kingdom</p>
        </footer>

        <div className="mt-8 text-sm">
          <Link href="/legal" className="text-slate-700 underline underline-offset-4 hover:text-slate-900">
            Legal / Imprint
          </Link>
        </div>
      </div>
    </main>
  );
}
