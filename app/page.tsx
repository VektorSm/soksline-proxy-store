'use client';

import Link from 'next/link';
import Hero from '@/components/Hero';
import BackgroundHexSVG from '@/components/BackgroundHexSVG';
import TopProductsTabs from '@/components/TopProductsTabs';
import Section from '@/components/layout/Section';
import { useI18n } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import styles from './page.module.css';

type Advantage = { title: string; description: string };
type ShowcaseItem = { title: string; price: string; points: string[]; ctaHref: string };

type HomeContent = {
  showcase: {
    title: string;
    description: string;
    learnMoreLabel: string;
    items: ShowcaseItem[];
    metrics: string[];
  };
  advantages: {
    title: string;
    description: string;
    items: Advantage[];
  };
  payments: {
    title: string;
    description: string;
    methods: string[];
  };
};

const HOME_CONTENT: Record<Locale, HomeContent> = {
  ru: {
    showcase: {
      title: 'Выберите формат прокси',
      description:
        'ISP-статика, IPv6 и ротация — фиксируйте нужные параметры, комбинируйте пулы и управляйте подключениями через единый кабинет.',
      learnMoreLabel: 'Узнать больше →',
      items: [
        {
          title: 'Static ISP',
          price: 'от $5.90 / месяц',
          points: ['Дедикейт IPv4-подключения для долгих сессий', 'Выбор гео по городу и ASN'],
          ctaHref: '/pricing#static-residential',
        },
        {
          title: 'Static ISP IPv6',
          price: 'от $3.40 / месяц',
          points: ['IPv6-пулы для масштабных задач', 'Лёгкая интеграция через SOCKS5'],
          ctaHref: '/pricing/static-residential-ipv6#static-residential-ipv6',
        },
        {
          title: 'Rotating Residential',
          price: 'от $4.80 / GB',
          points: ['Автообновление IP по расписанию', 'Лимиты и сессии через API'],
          ctaHref: '/pricing/rotating-residential#rotating-residential',
        },
      ],
      metrics: ['180+ Proxy Locations', '99.9% Uptime'],
    },
    advantages: {
      title: 'Почему SoksLine',
      description:
        'Инструменты для маркетологов, команд по парсингу и продавцов аккаунтов. Фокус на стабильности и контроле.',
      items: [
        {
          title: 'Скорость без просадок',
          description:
            'Чистые пулы и аплинки уровня Tier-1 поддерживают стабильную полосу даже при пиковой нагрузке.',
        },
        {
          title: 'Глубокая фильтрация',
          description:
            'Тонкая настройка по ASN, городу и прокси-типу помогает подбирать доступы точечно.',
        },
        {
          title: 'Гибкие тарифы',
          description:
            'Статика, IPv6 и ротация — комбинируйте форматы и удерживайте расходы под контролем.',
        },
      ],
    },
    payments: {
      title: 'Способы оплаты',
      description:
        'Пополняйте баланс удобным способом: автоматические инвойсы, моментальные зачёты и выгрузки для бухгалтерии.',
      methods: ['BTC', 'ETH', 'USDT', 'TRX', 'LTC'],
    },
  },
  en: {
    showcase: {
      title: 'Choose your proxy format',
      description:
        'Lock in ISP statics, IPv6, or rotation — mix pools, tune the parameters, and manage every connection from a single dashboard.',
      learnMoreLabel: 'Learn more →',
      items: [
        {
          title: 'Static ISP',
          price: 'from $5.90 / month',
          points: ['Dedicated IPv4 access for long sessions', 'City- and ASN-level geo targeting'],
          ctaHref: '/pricing#static-residential',
        },
        {
          title: 'Static ISP IPv6',
          price: 'from $3.40 / month',
          points: ['IPv6 pools for large-scale tasks', 'Easy SOCKS5 integration'],
          ctaHref: '/pricing/static-residential-ipv6#static-residential-ipv6',
        },
        {
          title: 'Rotating Residential',
          price: 'from $4.80 / GB',
          points: ['Scheduled IP refresh', 'API-controlled limits and sessions'],
          ctaHref: '/pricing/rotating-residential#rotating-residential',
        },
      ],
      metrics: ['180+ Proxy Locations', '99.9% Uptime'],
    },
    advantages: {
      title: 'Why SoksLine',
      description:
        'Tooling for marketers, scraping teams, and account sellers with a focus on stability and control.',
      items: [
        {
          title: 'Peak performance',
          description:
            'Clean pools and Tier-1 uplinks keep bandwidth stable even when demand spikes.',
        },
        {
          title: 'Granular targeting',
          description:
            'Fine-tune pools by ASN, city, and proxy type to match each use case precisely.',
        },
        {
          title: 'Flexible pricing',
          description:
            'Combine static, IPv6, and rotating formats to balance costs and performance.',
        },
      ],
    },
    payments: {
      title: 'Payment methods',
      description:
        'Top up your balance the easy way: automated invoices, instant confirmations, and exports for finance teams.',
      methods: ['BTC', 'ETH', 'USDT', 'TRX', 'LTC'],
    },
  },
};

export default function Page() {
  const { locale } = useI18n();
  const copy = HOME_CONTENT[locale];

  return (
    <div className={styles.page}>
      <section className="relative isolate overflow-hidden">
        <BackgroundHexSVG variant="hero" />

        <div className="relative z-10">
          <Hero />
        </div>
      </section>

      <Section id="proxy-formats" bg="white" containerClassName={styles.showcaseSection}>
        <div className={`${styles.sectionHeader} ${styles.showcaseHeader}`}>
          <h2 className={styles.sectionTitle}>{copy.showcase.title}</h2>
          <p className={styles.sectionDescription}>{copy.showcase.description}</p>
        </div>
        <div className={styles.showcaseGrid}>
          {copy.showcase.items.map((item) => (
            <article key={item.title} className={styles.showcaseCard}>
              <div className={styles.showcaseCardHeader}>
                <h3 className={styles.showcaseCardTitle}>{item.title}</h3>
                <span className={styles.showcaseCardPrice}>{item.price}</span>
              </div>
              <ul className={styles.showcaseList}>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link
                href={item.ctaHref}
                className="inline-flex items-center gap-1 mt-3 text-blue-600 hover:underline"
              >
                {copy.showcase.learnMoreLabel}
              </Link>
            </article>
          ))}
        </div>
        <ul className={styles.showcaseFootnotes} aria-label={copy.showcase.title}>
          {copy.showcase.metrics.map((metric) => (
            <li key={metric}>{metric}</li>
          ))}
        </ul>
      </Section>

      <section
        id="advantages"
        data-variant="muted"
        className="relative isolate overflow-hidden bg-gray-50 py-12 sm:py-16"
      >
        <BackgroundHexSVG variant="section" hexR={16} className="opacity-100" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className={styles.advantagesSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{copy.advantages.title}</h2>
              <p className={styles.sectionDescription}>{copy.advantages.description}</p>
            </div>
            <div
              className={`${styles.advantagesGrid} grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3`}
            >
              {copy.advantages.items.map((item) => (
                <article
                  key={item.title}
                  className={`${styles.advantageCard} min-h-[140px] flex flex-col gap-3`}
                >
                  <h3 className={styles.advantageTitle}>{item.title}</h3>
                  <p className={styles.advantageText}>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TopProductsTabs />

      <Section
        id="payments"
        bg="muted"
        containerClassName={`${styles.paymentsSection} pt-6`}
      >
        <div className={styles.paymentsHeader}>
          <h2 className={`${styles.paymentsTitle} text-2xl sm:text-3xl font-semibold tracking-tight`}>
            {copy.payments.title}
          </h2>
          <p className={styles.paymentsDescription}>{copy.payments.description}</p>
        </div>
        <div className={`${styles.paymentsList} mt-4`}>
          {copy.payments.methods.map((method) => (
            <span key={method} className={styles.paymentBadge}>
              {method}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}
