'use client';

type SummaryBarMobileProps = {
  total: string;
  totalLabel: string;
  summary?: string;
  ctaLabel: string;
  onNext: () => void;
};

export default function SummaryBarMobile({ total, totalLabel, summary, ctaLabel, onNext }: SummaryBarMobileProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <div>
          <div className="text-sm text-gray-600">{totalLabel}</div>
          {summary ? <div className="text-xs text-gray-500">{summary}</div> : null}
        </div>
        <div className="ml-auto text-xl font-semibold text-gray-900 [font-variant-numeric:tabular-nums]">{total}</div>
        <button
          onClick={onNext}
          className="ml-2 rounded-2xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
