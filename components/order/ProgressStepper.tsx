export default function ProgressStepper({ step = 2 }: { step?: 1 | 2 | 3 | 4 }) {
  const items = ['Продукт', 'План', 'Настройки', 'Оплата'];
  return (
    <ol className="mt-2 flex items-center gap-3 text-sm text-gray-500" aria-label="Шаги оформления">
      {items.map((title, index) => (
        <li key={title} className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${index + 1 <= step ? 'bg-gray-900' : 'bg-gray-300'}`}
          />
          <span className={index + 1 === step ? 'font-medium text-gray-900' : ''}>{title}</span>
          {index < items.length - 1 && <span className="mx-1 text-gray-300">›</span>}
        </li>
      ))}
    </ol>
  );
}
