import * as React from 'react';

type Tab = { id: string; label: string };
type TabsProps = {
  tabs: Tab[];
  defaultIndex?: number;           // по умолчанию 0
  onChange?: (index: number) => void;
  className?: string;
  renderPanel: (index: number) => React.ReactNode; // ленивый рендер по индексу
  idPrefix?: string;               // для связки id/aria-controls
};

export default function Tabs({
  tabs,
  defaultIndex = 0,
  onChange,
  className = '',
  renderPanel,
  idPrefix = 'tabs'
}: TabsProps) {
  const [index, setIndex] = React.useState(defaultIndex);
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const count = tabs.length;

  const select = (i: number, focus = true) => {
    const next = Math.max(0, Math.min(count - 1, i));
    setIndex(next);
    onChange?.(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); select((index + 1) % count); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); select((index - 1 + count) % count); }
    else if (e.key === 'Home') { e.preventDefault(); select(0); }
    else if (e.key === 'End') { e.preventDefault(); select(count - 1); }
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex gap-2"
        onKeyDown={onKeyDown}
      >
        {tabs.map((t, i) => {
          const isSelected = i === index;
          const tabId = `${idPrefix}-tab-${i}`;
          const panelId = `${idPrefix}-panel-${i}`;
          return (
            <button
              key={t.id}
              id={tabId}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1} // roving tabindex
              className={
                `px-4 py-2 rounded-2xl border transition 
                 ${isSelected ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 text-gray-700'} 
                 focus:outline-none focus-visible:ring focus-visible:ring-offset-2`
              }
              onClick={() => select(i, false)}
              type="button"
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tabs.map((t, i) => {
        const isSelected = i === index;
        const panelId = `${idPrefix}-panel-${i}`;
        const tabId = `${idPrefix}-tab-${i}`;
        return (
          <div
            key={t.id}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={!isSelected}
            className={isSelected ? 'mt-6' : 'sr-only'}
          >
            {isSelected ? renderPanel(i) : null}
          </div>
        );
      })}
    </div>
  );
}
