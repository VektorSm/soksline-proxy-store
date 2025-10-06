'use client';

import cn from 'clsx';

export default function Switch({
  checked,
  onChange,
  className = '',
  label,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  className?: string;
  label?: string;
  id?: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full border transition-colors focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2',
        checked ? 'bg-gray-900 border-gray-900' : 'bg-gray-200 border-gray-300',
        className,
      )}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 transform rounded-full bg-white shadow transition',
          checked ? 'translate-x-5' : 'translate-x-1',
        )}
      />
    </button>
  );
}
