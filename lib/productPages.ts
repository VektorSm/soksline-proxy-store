import type { Locale } from "../components/LocaleContext";

export type ProductMetric = {
  label: string;
  value: string | string[];
};

export type ProductPlanFeature = {
  label: string;
  included?: boolean;
};

export type ProductPlan = {
  id: string;
  name: string;
  price: string;
  period?: string;
  summary?: string;
  priceLabel?: string;
  compareAt?: string;
  badge?: string;
  features: ProductPlanFeature[];
  ctaLabel: string;
  ctaHref: string;
};

export type ProductPageData = {
  hero: {
    eyebrow?: string;
    title: string;
    description: string;
    cta: {
      label: string;
      href: string;
    };
    metrics: ProductMetric[];
  };
  offers: {
    title: string;
    description?: string;
    plans: ProductPlan[];
    note?: string;
  };
};

export type LocalizedProductPage = Record<Locale, ProductPageData>;

export const ISP_PRODUCT_PAGE: LocalizedProductPage = {
  ru: {
    hero: {
      eyebrow: "Static ISP Proxies",
      title: "Покупайте статические резидентские прокси",
      description:
        "Стабильность, высокая скорость и безопасность с статическими резидентскими прокси. Настройте доступ за минуты и управляйте сессиями через готовые дашборды.",
      cta: {
        label: "Купить",
        href: "/order?service=static-isp",
      },
      metrics: [
        { label: "Скорость", value: "До 1 Гбит/с" },
        { label: "Поддерживаемые ISP", value: "37+" },
        { label: "Протоколы", value: ["HTTP", "SOCKS5"] },
        { label: "Трафик", value: "Безлимит" },
        { label: "Выделенные IP", value: "Доступны" },
      ],
    },
    offers: {
      title: "Static ISP",
      description:
        "Подберите тариф под свою нагрузку и географию. Каждый план включает API для автоматизации и мгновенную выдачу.",
      plans: [
        {
          id: "basic",
          name: "Basic",
          priceLabel: "От",
          compareAt: "$2.29",
          price: "$1.95",
          period: "/месяц",
          summary: "Для одиночных пользователей с ограничением по трафику.",
          features: [
            { label: "До 3 пользователей" },
            { label: "1 ГБ трафика", included: false },
            { label: "Без апгрейда скорости", included: false },
            { label: "Без роста одновременных сессий", included: false },
          ],
          ctaLabel: "Продолжить",
          ctaHref: "/order?service=static-isp&plan=basic",
        },
        {
          id: "dedicated",
          name: "Dedicated",
          badge: "Популярно",
          priceLabel: "От",
          compareAt: "$2.49",
          price: "$2.12",
          period: "/месяц",
          summary: "Выделенные IPv4 с гибкой настройкой ASN и гео.",
          features: [
            { label: "Для одного пользователя" },
            { label: "Безлимитный трафик" },
            { label: "Апгрейды скорости" },
            { label: "Расширение по одновременным сессиям" },
          ],
          ctaLabel: "Продолжить",
          ctaHref: "/order?service=static-isp&plan=dedicated",
        },
        {
          id: "premium",
          name: "Premium",
          priceLabel: "От",
          compareAt: "$7.49",
          price: "$5.47",
          period: "/месяц",
          summary: "Enterprise-пулы с кастомной ротацией и SLA.",
          features: [
            { label: "IP без истории" },
            { label: "Безлимитный трафик" },
            { label: "Апгрейды скорости" },
            { label: "Расширение по сессиям" },
          ],
          ctaLabel: "Продолжить",
          ctaHref: "/order?service=static-isp&plan=premium",
        },
      ],
      note: "Нужны объёмы под заказ? Напишите в отдел продаж для кастомных пулов ISP.",
    },
  },
  en: {
    hero: {
      eyebrow: "Static ISP Proxies",
      title: "Buy Genuine Static Residential Proxies",
      description:
        "Experience high success rates, stability, security, and speed with static residential proxies. Set up access within minutes and manage sessions with ready-made dashboards.",
      cta: {
        label: "Buy Now",
        href: "/order?service=static-isp",
      },
      metrics: [
        { label: "Speed", value: "Up to 1 Gbps" },
        { label: "Supported ISPs", value: "37+" },
        { label: "Protocols", value: ["HTTP", "SOCKS5"] },
        { label: "Bandwidth", value: "Unlimited" },
        { label: "Dedicated IPs", value: "Available" },
      ],
    },
    offers: {
      title: "Static ISP",
      description:
        "Pick a tier that matches your concurrency and geo requirements. Every plan comes with automation-ready APIs and instant delivery.",
      plans: [
        {
          id: "basic",
          name: "Basic",
          priceLabel: "Starts at",
          compareAt: "$2.29",
          price: "$1.95",
          period: "/month",
          summary: "Entry plan for single-seat access with limited bandwidth.",
          features: [
            { label: "Used by up to 3 users" },
            { label: "Limited to 1GB bandwidth", included: false },
            { label: "No speed upgrades", included: false },
            { label: "No concurrency upgrades", included: false },
          ],
          ctaLabel: "Continue",
          ctaHref: "/order?service=static-isp&plan=basic",
        },
        {
          id: "dedicated",
          name: "Dedicated",
          badge: "Popular",
          priceLabel: "Starts at",
          compareAt: "$2.49",
          price: "$2.12",
          period: "/month",
          summary: "Dedicated IPv4 access with configurable ASN and geo targeting.",
          features: [
            { label: "Dedicated to a single user" },
            { label: "Unlimited bandwidth" },
            { label: "Speed upgrades" },
            { label: "Concurrency upgrades" },
          ],
          ctaLabel: "Continue",
          ctaHref: "/order?service=static-isp&plan=dedicated",
        },
        {
          id: "premium",
          name: "Premium",
          priceLabel: "Starts at",
          compareAt: "$7.49",
          price: "$5.47",
          period: "/month",
          summary: "Enterprise grade pools with custom rotation windows and SLA.",
          features: [
            { label: "Never used IP" },
            { label: "Unlimited bandwidth" },
            { label: "Speed upgrades" },
            { label: "Concurrency upgrades" },
          ],
          ctaLabel: "Continue",
          ctaHref: "/order?service=static-isp&plan=premium",
        },
      ],
      note: "Need custom volumes? Contact sales for bespoke ISP proxy pools.",
    },
  },
};

export const STATIC_RESIDENTIAL_PAGE: LocalizedProductPage = {
  ru: {
    hero: {
      eyebrow: "Static Residential IPv6",
      title: "Статические резидентские IPv6-прокси",
      description:
        "Работайте безопасно и без блокировок. IPv6-статик сочетает высокую скорость с широкой географией, а управление доступно через панель или API.",
      cta: {
        label: "Купить",
        href: "/order?service=static-residential-ipv6",
      },
      metrics: [
        { label: "Уникальные IP", value: "5B+" },
        { label: "Выделенные узлы", value: "США" },
        { label: "Протоколы", value: ["HTTP", "SOCKS5"] },
        { label: "Трафик", value: "До 1 Гбит/с" },
        { label: "Аптайм", value: "99.9%" },
      ],
    },
    offers: {
      title: "Static ISP",
      description:
        "Простые тарифы и предсказуемая цена. IPv6-прокси помогают масштабировать автоматизацию и парсинг.",
      plans: [
        {
          id: "dedicated-ipv6",
          name: "Dedicated IPv6",
          price: "$29.67",
          period: "/месяц",
          summary: "Выделенные IPv6-линии с мгновенной выдачей и управлением через дашборд.",
          features: [
            { label: "Безлимитный трафик" },
            { label: "Кастомная ротация" },
            { label: "API и панель" },
          ],
          ctaLabel: "Продолжить",
          ctaHref: "/order?service=static-residential-ipv6&plan=dedicated-ipv6",
        },
      ],
      note: "IPv6 лучше всего подходит сервисам, поддерживающим новый протокол.",
    },
  },
  en: {
    hero: {
      eyebrow: "Static Residential IPv6",
      title: "Buy Static Residential IPv6 Proxies",
      description:
        "Access the web safely and without restrictions with Static Residential IPv6. Combine fast response times with diverse geo coverage and manage sessions via dashboard or API.",
      cta: {
        label: "Buy Now",
        href: "/order?service=static-residential-ipv6",
      },
      metrics: [
        { label: "Unique IP Addresses", value: "5B+" },
        { label: "Dedicated Nodes", value: "United States" },
        { label: "Protocols", value: ["HTTP", "SOCKS5"] },
        { label: "Traffic up to 1 Gbps", value: "Unlimited" },
        { label: "Uptime", value: "99.9%" },
      ],
    },
    offers: {
      title: "Static ISP",
      description: "Simple plans with predictable pricing. IPv6 proxies deliver scale for large automation tasks.",
      plans: [
        {
          id: "dedicated-ipv6",
          name: "Dedicated IPv6",
          price: "$29.67",
          period: "/month",
          summary: "Dedicated IPv6 lines with instant provisioning and dashboard management.",
          features: [
            { label: "Unlimited traffic" },
            { label: "Custom rotation" },
            { label: "API & dashboard" },
          ],
          ctaLabel: "Continue",
          ctaHref: "/order?service=static-residential-ipv6&plan=dedicated-ipv6",
        },
      ],
      note: "IPv6 works best with services that support the new protocol stack.",
    },
  },
};

export const ROTATING_RESIDENTIAL_PAGE: LocalizedProductPage = {
  ru: {
    hero: {
      eyebrow: "Rotating Residential",
      title: "Ротационные резидентские прокси",
      description:
        "Если важны анонимность, безопасность и высокий процент успешных запросов — ротационная резиденция справится. Настраивайте смену IP по расписанию или через API.",
      cta: {
        label: "Купить",
        href: "/order?service=rotating-residential",
      },
      metrics: [
        { label: "IP-адреса", value: "85M+" },
        { label: "Доступные страны", value: "180+" },
        { label: "Протоколы", value: ["HTTP", "SOCKS5"] },
        { label: "Таргетинг", value: "Страна / Город" },
        { label: "Аптайм", value: "99.9%" },
      ],
    },
    offers: {
      title: "Rotating Residential",
      description: "Выбирайте тип биллинга под задачу. Прозрачная цена и предсказуемые списания.",
      plans: [
        {
          id: "bandwidth",
          name: "Bandwidth Pool",
          price: "$24.95",
          period: "/GB",
          summary: "Оплата за трафик с точными лимитами и выбором стран.",
          features: [
            { label: "API-ротация" },
            { label: "Sticky до 30 минут" },
            { label: "Неограниченная параллельность" },
          ],
          ctaLabel: "Продолжить",
          ctaHref: "/order?service=rotating-residential&plan=bandwidth",
        },
      ],
      note: "Персональные требования по комплаенсу и KYC доступны по запросу.",
    },
  },
  en: {
    hero: {
      eyebrow: "Rotating Residential",
      title: "Buy Cheap Rotating Residential Proxies",
      description:
        "When you value anonymity, a high level of online security, and increased success in scraping activities — rotating residential proxies deliver. Rotate on schedule or via API triggers.",
      cta: {
        label: "Buy Now",
        href: "/order?service=rotating-residential",
      },
      metrics: [
        { label: "IP Addresses", value: "85M+" },
        { label: "Available Countries", value: "180+" },
        { label: "Protocols", value: ["HTTP", "SOCKS5"] },
        { label: "Targeting", value: "Country / City" },
        { label: "Uptime", value: "99.9%" },
      ],
    },
    offers: {
      title: "Rotating Residential",
      description: "Choose the traffic type that fits your workload. Transparent pricing with predictable billing.",
      plans: [
        {
          id: "bandwidth",
          name: "Bandwidth Pool",
          price: "$24.95",
          period: "/GB",
          summary: "Pay per traffic with granular limits and country selection.",
          features: [
            { label: "API rotation" },
            { label: "Sticky up to 30 min" },
            { label: "Unlimited concurrency" },
          ],
          ctaLabel: "Continue",
          ctaHref: "/order?service=rotating-residential&plan=bandwidth",
        },
      ],
      note: "Custom compliance or KYC requirements available upon request.",
    },
  },
};
