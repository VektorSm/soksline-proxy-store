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

export const CATEGORIES: Category[] = [
  {
    id: "isp",
    title: "Static Residential (ISP)",
    tagline: "Статичные резидентские прокси для стабильной работы и кабинетных задач.",
    items: [
      {
        name: "US / EU (shared pool)",
        price: "от $2.50 / IP",
        features: ["Sticky до 24 ч", "HTTP / SOCKS5", "Без KYC"],
        bestFor: "Управление рекламой и аккаунтами."
      },
      {
        name: "Dedicated country",
        price: "от $3.50 / IP",
        features: ["Точный геотаргетинг", "Замена 1 раз/мес", "Поддержка API"],
        bestFor: "Создание фермы под конкретный регион."
      }
    ],
    note: "Оптимально для стабильных задач: антидетект, кабинеты и маркетплейсы."
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
        bestFor: "Парсинг и регистрация с минимальной себестоимостью."
      },
      {
        name: "Country IPv6",
        price: "от $1.60 / IP",
        features: ["Гео по требованию", "Автоматическая выдача", "Готово к масштабированию"],
        bestFor: "Проекты с геопривязкой и массовыми потоками."
      }
    ],
    note: "IPv6 — дешево и быстро; убедитесь, что целевые сайты поддерживают IPv6."
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
        bestFor: "Сбор данных и массовые проверки."
      },
      {
        name: "Premium rotation",
        price: "от $15 / GB",
        features: ["Минимум спама", "Топовые ASN", "Выделенные сессии"],
        bestFor: "Чувствительные сценарии с повышенным контролем качества."
      }
    ],
    note: "Ротация для парсинга, скрейпа и высоких объёмов."
  }
];
