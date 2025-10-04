'use client';
import Link from 'next/link';

export default function Toc({ items }: { items: { id: string; title: string }[] }) {
  if (!items?.length) return null;
  return (
    <nav aria-label="Table of contents" className="rounded-xl border border-gray-200 p-4 bg-white">
      <h2 className="text-sm font-semibold mb-2 opacity-70">Contents</h2>
      <ul className="space-y-2">
        {items.map((s) => (
          <li key={s.id}>
            <Link href={`#${s.id}`} className="text-sm hover:underline">
              {s.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
