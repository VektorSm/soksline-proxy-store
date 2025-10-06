'use client';

import cn from 'clsx';
import type { SelectHTMLAttributes } from 'react';

import ChevronDown from '@/components/icons/ChevronDown';

export default function Select({
  className = '',
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative w-full">
      <select
        {...props}
        className={cn(
          'w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 shadow-sm',
          'appearance-none focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2',
          className,
        )}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
      />
    </div>
  );
}
