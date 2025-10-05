import clsx from 'clsx';

interface PaymentsSecurityProps {
  title: string;
  note: string;
  methods: string[];
  methodsAriaLabel?: string;
  className?: string;
}

export default function PaymentsSecurity({
  title,
  note,
  methods,
  methodsAriaLabel,
  className = '',
}: PaymentsSecurityProps) {
  return (
    <div
      className={clsx(
        'w-full rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm sm:px-8',
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{note}</p>
      <div
        className="mt-4 flex flex-wrap gap-2"
        aria-label={methodsAriaLabel ?? title}
      >
        {methods.map((method) => (
          <span
            key={method}
            className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-sm font-medium text-gray-900 ring-1 ring-gray-200"
          >
            {method}
          </span>
        ))}
      </div>
    </div>
  );
}
