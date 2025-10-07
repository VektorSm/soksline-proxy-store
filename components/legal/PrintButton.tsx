'use client';

import { useCallback } from 'react';

type PrintButtonProps = {
  className?: string;
};

export default function PrintButton({ className }: PrintButtonProps) {
  const handlePrint = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }, []);

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={className}
      aria-label="Print this page"
    >
      Print this page
    </button>
  );
}
