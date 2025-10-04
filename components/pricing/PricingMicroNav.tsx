'use client';

import * as React from 'react';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useI18n } from '@/lib/i18n';

const SECTIONS = [
  { id: 'static-isp', dictKey: 'pricing.nav.staticIsp' },
  { id: 'static-ipv6', dictKey: 'pricing.nav.staticIpv6' },
  { id: 'rotating', dictKey: 'pricing.nav.rotating' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

export default function PricingMicroNav() {
  const { t } = useI18n();
  const [active, setActive] = React.useState<string>(SECTIONS[0].id);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const paramsString = params?.toString() ?? '';

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    let frame: number | null = null;

    const updateActive = () => {
      frame = null;

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      const doc = document.documentElement;
      if (doc && window.scrollY + window.innerHeight >= doc.scrollHeight - 10) {
        setActive('rotating');
        return;
      }

      const rotatingEl = document.getElementById('rotating');
      if (rotatingEl && rotatingEl.offsetTop <= scrollPosition + 400) {
        setActive('rotating');
        return;
      }

      let current: SectionId = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        if (el.offsetTop <= scrollPosition) {
          current = section.id;
        }
      }
      setActive(current);
    };

    const requestUpdate = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(updateActive);
    };

    const observer = new IntersectionObserver(
      requestUpdate,
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (hash && SECTIONS.some((section) => section.id === hash)) {
      setActive(hash);
    }
  }, []);

  const go = React.useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      const sp = new URLSearchParams(paramsString);
      const query = sp.toString();
      const href = query ? `${pathname}?${query}#${id}` : `${pathname}#${id}`;
      router.replace(href, { scroll: false });
      setActive(id);
    },
    [paramsString, pathname, router],
  );

  return (
    <nav
      aria-label="Pricing sections"
      className="sticky top-16 z-20 bg-white/70 dark:bg-neutral-900/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur"
    >
      <div className="mx-auto max-w-6xl px-4 py-3 overflow-x-auto">
        <ul className="flex w-max gap-2">
          {SECTIONS.map((section) => {
            const isActive = active === section.id;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => go(section.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={clsx(
                    'px-4 py-2 rounded-2xl border transition whitespace-nowrap focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-900 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900',
                    isActive
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50',
                  )}
                >
                  {t(section.dictKey)}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
