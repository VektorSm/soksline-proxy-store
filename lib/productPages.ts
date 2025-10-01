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

export type ProductOfferTextSection = {
  id: string;
  title: string;
  body: string;
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
    layout?: "cards" | "text";
    plans?: ProductPlan[];
    textSections?: ProductOfferTextSection[];
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
      layout: "text",
      textSections: [
        {
          id: "basic",
          title: "Basic",
          body:
            "Подходит для личных проектов и тестовых запусков. Вы получаете выделенный статический IP с базовыми лимитами по трафику и управляете доступом через простой дашборд.",
        },
        {
          id: "dedicated",
          title: "Dedicated",
          body:
            "Оптимален для регулярных задач с повышенными требованиями. Выделенный IPv4, гибкая настройка ASN и географии, безлимитный трафик и поддержка расширения скорости.",
        },
        {
          id: "premium",
          title: "Premium",
          body:
            "Корпоративный уровень с кастомной ротацией, SLA и приоритетной поддержкой. Подходит для крупных пулов, где важна высочайшая стабильность и масштабируемость.",
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
      layout: "text",
      textSections: [
        {
          id: "basic",
          title: "Basic",
          body:
            "Ideal for pilots and side projects. You get a dedicated static IP with lightweight bandwidth allowances and simple dashboard management.",
        },
        {
          id: "dedicated",
          title: "Dedicated",
          body:
            "Built for steady workloads that need reliability. Dedicated IPv4 with configurable ASN and geo, unlimited traffic, and available speed upgrades.",
        },
        {
          id: "premium",
          title: "Premium",
          body:
            "Enterprise-grade delivery with custom rotation windows, contractual SLA, and priority support. Designed for large pools that demand maximum stability.",
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
        "Выделенные IPv6-адреса для проектов, которым важны стабильность, скорость и изоляция ресурсов.",
      layout: "text",
      textSections: [
        {
          id: "bandwidth",
          title: "Безлимитный трафик",
          body:
            "Прокси не ограничены по объёму передаваемых данных — поддерживайте длительные сессии и интенсивный парсинг без рисков по достижению лимитов.",
        },
        {
          id: "threads",
          title: "100 потоков",
          body:
            "Одновременная работа до ста соединений с одной учётной записи помогает ускорить сбор данных и автоматизацию даже при плотных расписаниях.",
        },
        {
          id: "speed",
          title: "100+ Mbps",
          body:
            "Высокая пропускная способность сохраняет скорость загрузки страниц и стабильность соединений, даже когда трафик распределён на множество задач.",
        },
        {
          id: "dedicated",
          title: "Выделенный IP-адрес",
          body:
            "Каждый IPv6-адрес закреплён за вами, что исключает пересечения с соседями и снижает вероятность блокировок со стороны целевых ресурсов.",
        },
        {
          id: "geography",
          title: "IPv6-адреса из США",
          body:
            "Арендуйте пул адресов из американских дата-центров, чтобы работать с сервисами, требующими присутствия в США.",
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
      description:
        "Dedicated IPv6 addresses for teams that need consistent performance, private resources, and US presence.",
      layout: "text",
      textSections: [
        {
          id: "bandwidth",
          title: "Unlimited Bandwidth",
          body:
            "Push large volumes of requests and sustain always-on sessions without worrying about overage fees or throttling.",
        },
        {
          id: "threads",
          title: "100 Threads",
          body:
            "Run up to one hundred concurrent connections per account so your crawlers and automation workflows finish faster.",
        },
        {
          id: "speed",
          title: "100+ Mbps",
          body:
            "Maintain quick page loads and reliable throughput even when your traffic is spread across multiple projects.",
        },
        {
          id: "dedicated",
          title: "Dedicated IP Address",
          body:
            "Each IPv6 address is reserved for you, keeping neighbors out of your pool and reducing the chance of destination blocks.",
        },
        {
          id: "geography",
          title: "IPv6 Addresses from the US",
          body:
            "Leverage US-based infrastructure to satisfy location requirements and maintain compliance with geo-sensitive platforms.",
        },
      ],
      note: "IPv6 works best with services that support the modern protocol stack.",
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
      description:
        "Раскройте всю мощь динамических IP: управляемая ротация, гибкий таргетинг и устойчивая скорость для задач любого масштаба.",
      layout: "text",
      textSections: [
        {
          id: "coverage",
          title: "Глобальный охват",
          body:
            "85+ миллионов резидентских IP в 180 странах помогают имитировать поведение реальных пользователей и обходить фильтры на любых площадках.",
        },
        {
          id: "rotation",
          title: "Гибкая ротация",
          body:
            "Настраивайте смену адресов по таймеру или по API-событиям, чтобы поддерживать чистые сессии и сохранять высокий процент успешных запросов.",
        },
        {
          id: "targeting",
          title: "Точный таргетинг",
          body:
            "Выбирайте страну и город, комбинируйте фильтры ASN и оператора для локализованных проверок, маркетинга и сбора данных.",
        },
        {
          id: "performance",
          title: "Скорость и стабильность",
          body:
            "Неограниченная параллельность, sticky-сессии до 30 минут и пропускная способность до 1 Гбит/с обеспечивают плавную работу даже под нагрузкой.",
        },
        {
          id: "tooling",
          title: "Инструменты и поддержка",
          body:
            "Панель управления, API, белые списки IP и помощь команды 24/7 помогают быстро интегрировать прокси в ваши процессы.",
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
      description:
        "Unlock the full power of dynamic IPs with scheduled rotation, precise targeting, and resilient throughput for any workload.",
      layout: "text",
      textSections: [
        {
          id: "coverage",
          title: "Global coverage",
          body:
            "85M+ residential IPs across 180 countries help you mirror real-user behavior and bypass filters on the sites that matter.",
        },
        {
          id: "rotation",
          title: "Flexible rotation",
          body:
            "Trigger IP changes on a timer or via API events to maintain clean sessions and protect your success rates at scale.",
        },
        {
          id: "targeting",
          title: "Precise targeting",
          body:
            "Pick country and city combinations, layer ASN and carrier filters, and localize your marketing, QA, or data-collection workflows.",
        },
        {
          id: "performance",
          title: "Performance you can trust",
          body:
            "Unlimited concurrency, sticky sessions up to 30 minutes, and throughput up to 1 Gbps keep high-volume automation stable.",
        },
        {
          id: "tooling",
          title: "Tooling & support",
          body:
            "Manage access through dashboards, APIs, and IP whitelists with round-the-clock help from our support engineers.",
        },
      ],
      note: "Custom compliance or KYC requirements available upon request.",
    },
  },
};
