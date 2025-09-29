import type { Locale } from "../components/LocaleContext";

export type PricingTier = {
  id: string;
  name: string;
  headline?: string;
  price: string;
  period: string;
  description?: string;
  features: string[];
  ctaLabel?: string;
  ctaHref: string;
  ribbon?: string;
};

export type PricingCategory = {
  id: string;
  label: string;
  tiers: PricingTier[];
};

export type PricingPageData = {
  slug: string;
  title: string;
  subtitle: string;
  highlight: string;
  categories: PricingCategory[];
  paymentNote: string;
  paymentMethods: string[];
};

export type LocalizedPricingPage = Record<Locale, PricingPageData>;

const ORDER_LINK = "https://soksline.com/order";

export const STATIC_RESIDENTIAL_PRICING: LocalizedPricingPage = {
  ru: {
    slug: "static-residential",
    title: "Тарифы Static Residential Proxy — скорость до 1 Гбит/с",
    subtitle: "Статические резидентские прокси обеспечивают стабильный доступ на нужный срок.",
    highlight: "Надёжные IP • Высокая производительность • Sticky-сессии",
    paymentNote: "SSL Secure Payment. Ваши данные защищены 256-битным шифрованием.",
    paymentMethods: ["Visa", "Mastercard", "AMEX", "PayPal", "BTC", "USDT"],
    categories: [
      {
        id: "basic",
        label: "Базовые",
        tiers: [
          {
            id: "trial",
            name: "7 дней",
            price: "$1.99",
            period: "за прокси",
            features: [
              "Безлимитный трафик",
              "Неограниченные потоки",
              "Sticky-сессии",
              "SOCKS5 и HTTP/S",
              "Таргетинг по стране и ISP",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
          {
            id: "month",
            name: "1 месяц",
            headline: "Самый популярный",
            price: "$1.49",
            period: "за прокси",
            ribbon: "ЛУЧШИЙ ПАКЕТ",
            features: [
              "Безлимитный трафик",
              "Неограниченные потоки",
              "Sticky-сессии",
              "SOCKS5 и HTTP/S",
              "Таргетинг по стране и ISP",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
          {
            id: "year",
            name: "12 месяцев",
            headline: "Экономия 15%",
            price: "$1.27",
            period: "за прокси",
            features: [
              "Безлимитный трафик",
              "Неограниченные потоки",
              "Sticky-сессии",
              "SOCKS5 и HTTP/S",
              "Таргетинг по стране и ISP",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
        ],
      },
      {
        id: "premium",
        label: "Премиум",
        tiers: [
          {
            id: "premium-25",
            name: "25 прокси",
            price: "$2.39",
            period: "за прокси / мес",
            features: [
              "Безлимитный трафик",
              "Выделенные подсети",
              "Sticky-сессии",
              "Двойная авторизация",
              "Приоритетная поддержка",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
          {
            id: "premium-100",
            name: "100 прокси",
            ribbon: "-10%",
            price: "$2.19",
            period: "за прокси / мес",
            features: [
              "Безлимитный трафик",
              "Выделенные подсети",
              "Sticky-сессии",
              "Двойная авторизация",
              "Приоритетная поддержка",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
          {
            id: "premium-250",
            name: "250 прокси",
            price: "$1.99",
            period: "за прокси / мес",
            features: [
              "Безлимитный трафик",
              "Выделенные подсети",
              "Sticky-сессии",
              "Двойная авторизация",
              "Приоритетная поддержка",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
        ],
      },
    ],
  },
  en: {
    slug: "static-residential",
    title: "Static Residential Proxy Plans – Speeds Up To 1Gbps",
    subtitle: "Static residential proxies to guarantee consistent access for as long as you need.",
    highlight: "Reliable residential IPs • High-performance routing • Sticky sessions",
    paymentNote: "SSL Secure Payment. Your information is protected by 256-bit SSL.",
    paymentMethods: ["Visa", "Mastercard", "AMEX", "PayPal", "BTC", "USDT"],
    categories: [
      {
        id: "basic",
        label: "Basic",
        tiers: [
          {
            id: "trial",
            name: "7 Day Trial",
            price: "$1.99",
            period: "per proxy",
            features: [
              "Unlimited Bandwidth",
              "Unlimited Threads",
              "Sticky Sessions",
              "SOCKS5 and HTTP/S",
              "Country & ISP-level targeting",
            ],
            ctaHref: ORDER_LINK,
          },
          {
            id: "month",
            name: "1 Month",
            headline: "Most Popular",
            price: "$1.49",
            period: "per proxy",
            ribbon: "BEST FORMULA",
            features: [
              "Unlimited Bandwidth",
              "Unlimited Threads",
              "Sticky Sessions",
              "SOCKS5 and HTTP/S",
              "Country & ISP-level targeting",
            ],
            ctaHref: ORDER_LINK,
          },
          {
            id: "year",
            name: "12 Months",
            headline: "Save 15%",
            price: "$1.27",
            period: "per proxy",
            features: [
              "Unlimited Bandwidth",
              "Unlimited Threads",
              "Sticky Sessions",
              "SOCKS5 and HTTP/S",
              "Country & ISP-level targeting",
            ],
            ctaHref: ORDER_LINK,
          },
        ],
      },
      {
        id: "premium",
        label: "Premium",
        tiers: [
          {
            id: "premium-25",
            name: "25 Proxies",
            price: "$2.39",
            period: "per proxy / month",
            features: [
              "Unlimited Bandwidth",
              "Dedicated Subnets",
              "Sticky Sessions",
              "Dual Authentication",
              "Priority Support",
            ],
            ctaHref: ORDER_LINK,
          },
          {
            id: "premium-100",
            name: "100 Proxies",
            ribbon: "SAVE 10%",
            price: "$2.19",
            period: "per proxy / month",
            features: [
              "Unlimited Bandwidth",
              "Dedicated Subnets",
              "Sticky Sessions",
              "Dual Authentication",
              "Priority Support",
            ],
            ctaHref: ORDER_LINK,
          },
          {
            id: "premium-250",
            name: "250 Proxies",
            price: "$1.99",
            period: "per proxy / month",
            features: [
              "Unlimited Bandwidth",
              "Dedicated Subnets",
              "Sticky Sessions",
              "Dual Authentication",
              "Priority Support",
            ],
            ctaHref: ORDER_LINK,
          },
        ],
      },
    ],
  },
};

export const STATIC_IPV6_PRICING: LocalizedPricingPage = {
  ru: {
    slug: "static-residential-ipv6",
    title: "Доступные тарифы Static Residential IPv6",
    subtitle: "IPv6-статик без ограничений для любых задач и автоматизации.",
    highlight: "Гибкая стоимость • Поддержка SOCKS5 и HTTP • Ротация подсетей",
    paymentNote: "SSL Secure Payment. Ваши данные защищены 256-битным шифрованием.",
    paymentMethods: ["Visa", "Mastercard", "AMEX", "PayPal", "BTC", "USDT"],
    categories: [
      {
        id: "monthly",
        label: "Помесечно",
        tiers: [
          {
            id: "ipv6-10",
            name: "10 прокси",
            price: "$0.63",
            period: "за прокси / мес",
            features: [
              "SOCKS5 и HTTP/S",
              "Sticky-сессии",
              "Поддержка API",
              "Таргетинг по стране",
              "Безлимитные потоки",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
          {
            id: "ipv6-50",
            name: "50 прокси",
            price: "$0.59",
            period: "за прокси / мес",
            features: [
              "SOCKS5 и HTTP/S",
              "Sticky-сессии",
              "Поддержка API",
              "Таргетинг по стране",
              "Безлимитные потоки",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
          {
            id: "ipv6-100",
            name: "100 прокси",
            price: "$0.56",
            period: "за прокси / мес",
            features: [
              "SOCKS5 и HTTP/S",
              "Sticky-сессии",
              "Поддержка API",
              "Таргетинг по стране",
              "Безлимитные потоки",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
        ],
      },
      {
        id: "quarterly",
        label: "На 3 месяца",
        tiers: [
          {
            id: "ipv6-q-10",
            name: "10 прокси",
            price: "$0.58",
            period: "за прокси / мес",
            features: [
              "SOCKS5 и HTTP/S",
              "Sticky-сессии",
              "Поддержка API",
              "Геотаргетинг",
              "Безлимитные потоки",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
          {
            id: "ipv6-q-50",
            name: "50 прокси",
            ribbon: "-8%",
            price: "$0.55",
            period: "за прокси / мес",
            features: [
              "SOCKS5 и HTTP/S",
              "Sticky-сессии",
              "Поддержка API",
              "Геотаргетинг",
              "Безлимитные потоки",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
          {
            id: "ipv6-q-100",
            name: "100 прокси",
            price: "$0.52",
            period: "за прокси / мес",
            features: [
              "SOCKS5 и HTTP/S",
              "Sticky-сессии",
              "Поддержка API",
              "Геотаргетинг",
              "Безлимитные потоки",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
        ],
      },
    ],
  },
  en: {
    slug: "static-residential-ipv6",
    title: "Affordable IPv6 Static Residential Proxy Pricing & Plans",
    subtitle: "Access the web safely and without any restrictions with Static Residential Proxies IPv6 for all your needs.",
    highlight: "Flexible pricing • SOCKS5 and HTTP support • Rotating subnets",
    paymentNote: "SSL Secure Payment. Your information is protected by 256-bit SSL.",
    paymentMethods: ["Visa", "Mastercard", "AMEX", "PayPal", "BTC", "USDT"],
    categories: [
      {
        id: "monthly",
        label: "Monthly",
        tiers: [
          {
            id: "ipv6-10",
            name: "10 Proxies",
            price: "$0.63",
            period: "per proxy / month",
            features: [
              "SOCKS5 and HTTP/S",
              "Sticky Sessions",
              "API Support",
              "Country targeting",
              "Unlimited threads",
            ],
            ctaHref: ORDER_LINK,
          },
          {
            id: "ipv6-50",
            name: "50 Proxies",
            price: "$0.59",
            period: "per proxy / month",
            features: [
              "SOCKS5 and HTTP/S",
              "Sticky Sessions",
              "API Support",
              "Country targeting",
              "Unlimited threads",
            ],
            ctaHref: ORDER_LINK,
          },
          {
            id: "ipv6-100",
            name: "100 Proxies",
            price: "$0.56",
            period: "per proxy / month",
            features: [
              "SOCKS5 and HTTP/S",
              "Sticky Sessions",
              "API Support",
              "Country targeting",
              "Unlimited threads",
            ],
            ctaHref: ORDER_LINK,
          },
        ],
      },
      {
        id: "quarterly",
        label: "Quarterly",
        tiers: [
          {
            id: "ipv6-q-10",
            name: "10 Proxies",
            price: "$0.58",
            period: "per proxy / month",
            features: [
              "SOCKS5 and HTTP/S",
              "Sticky Sessions",
              "API Support",
              "Geo targeting",
              "Unlimited threads",
            ],
            ctaHref: ORDER_LINK,
          },
          {
            id: "ipv6-q-50",
            name: "50 Proxies",
            ribbon: "SAVE 8%",
            price: "$0.55",
            period: "per proxy / month",
            features: [
              "SOCKS5 and HTTP/S",
              "Sticky Sessions",
              "API Support",
              "Geo targeting",
              "Unlimited threads",
            ],
            ctaHref: ORDER_LINK,
          },
          {
            id: "ipv6-q-100",
            name: "100 Proxies",
            price: "$0.52",
            period: "per proxy / month",
            features: [
              "SOCKS5 and HTTP/S",
              "Sticky Sessions",
              "API Support",
              "Geo targeting",
              "Unlimited threads",
            ],
            ctaHref: ORDER_LINK,
          },
        ],
      },
    ],
  },
};

export const ROTATING_RESIDENTIAL_PRICING: LocalizedPricingPage = {
  ru: {
    slug: "rotating-residential",
    title: "Тарифы Rotating Residential Proxy",
    subtitle: "Ротационные резидентские прокси с прозрачной ценой за трафик или лимиты.",
    highlight: "85M+ IP • Ротация по API • Страны и города",
    paymentNote: "SSL Secure Payment. Ваши данные защищены 256-битным шифрованием.",
    paymentMethods: ["Visa", "Mastercard", "AMEX", "PayPal", "BTC", "USDT"],
    categories: [
      {
        id: "bandwidth",
        label: "Оплата за трафик",
        tiers: [
          {
            id: "rotating-3",
            name: "3 GB",
            price: "$14.99",
            period: "за GB",
            features: [
              "Ротация по API",
              "Sticky до 30 мин",
              "Таргетинг по странам",
              "Поддержка ISP",
              "Доступ к дашборду",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
          {
            id: "rotating-10",
            name: "10 GB",
            price: "$49.99",
            period: "за GB",
            features: [
              "Ротация по API",
              "Sticky до 30 мин",
              "Таргетинг по странам",
              "Поддержка ISP",
              "Доступ к дашборду",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
          {
            id: "rotating-50",
            name: "50 GB",
            price: "$199.99",
            period: "за GB",
            features: [
              "Ротация по API",
              "Sticky до 30 мин",
              "Таргетинг по странам и городам",
              "Поддержка ISP",
              "Приоритетная поддержка",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
        ],
      },
      {
        id: "ports",
        label: "Выделенные порты",
        tiers: [
          {
            id: "rotating-port-5",
            name: "5 портов",
            price: "$149.99",
            period: "в месяц",
            features: [
              "Sticky до 60 мин",
              "Таргетинг по городам",
              "API и панель",
              "Безлимитные потоки",
              "Поддержка 24/7",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
          {
            id: "rotating-port-20",
            name: "20 портов",
            ribbon: "-12%",
            price: "$529.99",
            period: "в месяц",
            features: [
              "Sticky до 60 мин",
              "Таргетинг по городам",
              "API и панель",
              "Безлимитные потоки",
              "Поддержка 24/7",
            ],
            ctaHref: ORDER_LINK,
            ctaLabel: "Оформить",
          },
        ],
      },
    ],
  },
  en: {
    slug: "rotating-residential",
    title: "Rotating Residential Proxy Pricing",
    subtitle: "Transparent pricing for rotating residential proxies billed per traffic or dedicated ports.",
    highlight: "85M+ IPs • API rotation • Country & city targeting",
    paymentNote: "SSL Secure Payment. Your information is protected by 256-bit SSL.",
    paymentMethods: ["Visa", "Mastercard", "AMEX", "PayPal", "BTC", "USDT"],
    categories: [
      {
        id: "bandwidth",
        label: "Bandwidth",
        tiers: [
          {
            id: "rotating-3",
            name: "3 GB",
            price: "$14.99",
            period: "per GB",
            features: [
              "API rotation",
              "Sticky up to 30 min",
              "Country targeting",
              "ISP filtering",
              "Dashboard access",
            ],
            ctaHref: ORDER_LINK,
          },
          {
            id: "rotating-10",
            name: "10 GB",
            price: "$49.99",
            period: "per GB",
            features: [
              "API rotation",
              "Sticky up to 30 min",
              "Country targeting",
              "ISP filtering",
              "Dashboard access",
            ],
            ctaHref: ORDER_LINK,
          },
          {
            id: "rotating-50",
            name: "50 GB",
            price: "$199.99",
            period: "per GB",
            features: [
              "API rotation",
              "Sticky up to 30 min",
              "Country & city targeting",
              "ISP filtering",
              "Priority support",
            ],
            ctaHref: ORDER_LINK,
          },
        ],
      },
      {
        id: "ports",
        label: "Dedicated ports",
        tiers: [
          {
            id: "rotating-port-5",
            name: "5 Ports",
            price: "$149.99",
            period: "per month",
            features: [
              "Sticky up to 60 min",
              "City targeting",
              "API & dashboard",
              "Unlimited threads",
              "24/7 support",
            ],
            ctaHref: ORDER_LINK,
          },
          {
            id: "rotating-port-20",
            name: "20 Ports",
            ribbon: "SAVE 12%",
            price: "$529.99",
            period: "per month",
            features: [
              "Sticky up to 60 min",
              "City targeting",
              "API & dashboard",
              "Unlimited threads",
              "24/7 support",
            ],
            ctaHref: ORDER_LINK,
          },
        ],
      },
    ],
  },
};
