'use client';
import { useId } from 'react';

type Props = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
  className?: string;
  label?: string;
};

export default function StepperInput({
  value,
  min = 1,
  max = 9999,
  step = 1,
  onChange,
  className = '',
  label,
}: Props) {
  const id = useId();
  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="flex overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => onChange(clamp(value - step))}
          className="px-3 py-2 text-lg leading-none text-gray-700 transition hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2"
        >
          −
        </button>
        <input
          id={id}
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(clamp(Number.parseInt(e.target.value || '0', 10) || 0))}
          className="w-full px-3 py-2 text-center text-base text-gray-900 outline-none [appearance:textfield] [font-variant-numeric:tabular-nums]"
        />
        <button
          type="button"
          onClick={() => onChange(clamp(value + step))}
          className="px-3 py-2 text-lg leading-none text-gray-700 transition hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-offset-2"
        >
          +
        </button>
      </div>
    </div>
  );
}
