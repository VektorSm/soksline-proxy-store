import type { Locale } from "../components/LocaleContext";

export type CategoryId = "isp" | "ipv6" | "rotating";

export type ProductOffering = {
  name: string;
  price: string;
  features: string[];
  bestFor?: string;
};

export type Category = {
  id: CategoryId;
  title: string;
  tagline: string;
  items: ProductOffering[];
  note?: string;
};

const PRODUCT_CATEGORIES: Record<Locale, Category[]> = {
  ru: [
    {
      id: "isp",
      title: "Static Residential (ISP)",
      tagline: "Статичные резидентские прокси для стабильной работы и кабинетных задач.",
      items: [
        {
          name: "US / EU (shared pool)",
          price: "от $2.50 / IP",
          features: ["Sticky до 24 ч", "HTTP / SOCKS5", "Без KYC"],
          bestFor: "Управление рекламой и аккаунтами.",
        },
        {
          name: "Dedicated country",
          price: "от $3.50 / IP",
          features: ["Точный геотаргетинг", "Замена 1 раз/мес", "Поддержка API"],
          bestFor: "Создание фермы под конкретный регион.",
        },
      ],
      note: "Оптимально для стабильных задач: антидетект, кабинеты и маркетплейсы.",
    },
    {
      id: "ipv6",
      title: "Static Residential (ISP) IPv6",
      tagline: "Доступные IPv6-пулы с высокой пропускной способностью и нативным резолвингом.",
      items: [
        {
          name: "Global IPv6 pool",
          price: "от $1.20 / IP",
          features: ["IPv6 only", "Высокая скорость", "HTTP / SOCKS5"],
          bestFor: "Парсинг и регистрация с минимальной себестоимостью.",
        },
        {
          name: "Country IPv6",
          price: "от $1.60 / IP",
          features: ["Гео по требованию", "Автоматическая выдача", "Готово к масштабированию"],
          bestFor: "Проекты с геопривязкой и массовыми потоками.",
        },
      ],
      note: "IPv6 — дешево и быстро; убедитесь, что целевые сайты поддерживают IPv6.",
    },
    {
      id: "rotating",
      title: "Rotating Residential",
      tagline: "Ротация IP по запросу с балансом между скоростью и анонимностью.",
      items: [
        {
          name: "Standard rotation",
          price: "от $10 / GB",
          features: ["Резидентский пул", "Sticky до 30 мин", "HTTP / SOCKS5"],
          bestFor: "Сбор данных и массовые проверки.",
        },
        {
          name: "Premium rotation",
          price: "от $15 / GB",
          features: ["Минимум спама", "Топовые ASN", "Выделенные сессии"],
          bestFor: "Чувствительные сценарии с повышенным контролем качества.",
        },
      ],
      note: "Ротация для парсинга, скрейпа и высоких объёмов.",
    },
  ],
  en: [
    {
      id: "isp",
      title: "Static Residential (ISP)",
      tagline: "Static residential proxies tailored for long-term tasks and account work.",
      items: [
        {
          name: "US / EU (shared pool)",
          price: "from $2.50 / IP",
          features: ["Sticky up to 24h", "HTTP / SOCKS5", "No KYC"],
          bestFor: "Ad accounts and account management.",
        },
        {
          name: "Dedicated country",
          price: "from $3.50 / IP",
          features: ["Precise geo targeting", "1 swap / month", "API ready"],
          bestFor: "Building farms for a specific region.",
        },
      ],
      note: "Ideal for stable workloads: antidetect browsers, dashboards, and marketplaces.",
    },
    {
      id: "ipv6",
      title: "Static Residential (ISP) IPv6",
      tagline: "Affordable IPv6 pools with high throughput and native resolution.",
      items: [
        {
          name: "Global IPv6 pool",
          price: "from $1.20 / IP",
          features: ["IPv6 only", "High speed", "HTTP / SOCKS5"],
          bestFor: "Parsing and registrations with minimum cost.",
        },
        {
          name: "Country IPv6",
          price: "from $1.60 / IP",
          features: ["Geo on demand", "Automated delivery", "Scale ready"],
          bestFor: "Geo-focused projects with heavy traffic.",
        },
      ],
      note: "IPv6 is cheap and fast — double-check target services support the protocol.",
    },
    {
      id: "rotating",
      title: "Rotating Residential",
      tagline: "On-demand rotation balanced between speed and privacy.",
      items: [
        {
          name: "Standard rotation",
          price: "from $10 / GB",
          features: ["Residential pool", "Sticky up to 30 min", "HTTP / SOCKS5"],
          bestFor: "Data gathering and mass verifications.",
        },
        {
          name: "Premium rotation",
          price: "from $15 / GB",
          features: ["Low-noise IPs", "Top-tier ASNs", "Dedicated sessions"],
          bestFor: "Sensitive scenarios with extra quality control.",
        },
      ],
      note: "Rotation designed for scraping, crawling, and high-volume workloads.",
    },
  ],
};

export function getCategories(locale: Locale): Category[] {
  return PRODUCT_CATEGORIES[locale];
}
