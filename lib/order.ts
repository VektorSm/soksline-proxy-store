import type { Locale } from "../components/LocaleContext";
import {
  ROTATING_RESIDENTIAL_PRICING,
  STATIC_IPV6_PRICING,
  STATIC_RESIDENTIAL_PRICING,
  type LocalizedPricingPage,
  type PricingCategory,
  type PricingPageData,
  type PricingTier,
} from "./pricing";

export type OrderTier = PricingTier & {
  priceAmount: number;
};

export type OrderCategory = Omit<PricingCategory, "tiers"> & {
  tiers: OrderTier[];
};

export type OrderServiceCard = {
  title: string;
  headline: string;
  priceHint: string;
  highlights: string[];
  badge?: string;
};

type OrderSectionSource = {
  id: string;
  card: OrderServiceCard;
  detailTitle: string;
  detailSubtitle: string;
  detailHighlight: string;
  viewAllHref: string;
  categories: OrderCategory[];
  currency: string;
};

export type OrderSummaryCopy = {
  title: string;
  serviceLabel: string;
  categoryLabel: string;
  planLabel: string;
  unitLabel: string;
  totalLabel: string;
  featuresLabel: string;
  ctaLabel: string;
  disclaimer: string;
};

export type OrderPageCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  paymentTitle: string;
  paymentNoteFallback: string;
  paymentMethodsLabel: string;
  servicesSectionTitle: string;
  servicesSectionSubtitle: string;
  summary: OrderSummaryCopy;
  moreInfoLabel: string;
  contactTitle: string;
  contactSubtitle: string;
  contactCtaLabel: string;
  contactHref: string;
};

export type OrderPage = {
  copy: OrderPageCopy;
  services: OrderService[];
  paymentNote: string;
  paymentMethods: string[];
};

type ServiceDefinition = {
  id: string;
  pricing: LocalizedPricingPage;
  currency: string;
  cardCopy: Record<Locale, OrderServiceCard>;
};

const SERVICE_DEFINITIONS: ServiceDefinition[] = [
  {
    id: "static-residential",
    pricing: STATIC_RESIDENTIAL_PRICING,
    currency: "USD",
    cardCopy: {
      ru: {
        title: "Static Residential Proxy",
        headline: "Скорость до 1 Гбит/с",
        priceHint: "от $1.27 / мес",
        highlights: [
          "Надёжные IPv4",
          "Sticky-сессии до 60 мин",
          "Таргетинг по странам и ISP",
        ],
        badge: "Популярно",
      },
      en: {
        title: "Static Residential Proxy",
        headline: "Speeds up to 1 Gbps",
        priceHint: "from $1.27 / mo",
        highlights: [
          "Clean IPv4 pools",
          "Sticky sessions up to 60 min",
          "Country & ISP targeting",
        ],
        badge: "Popular",
      },
    },
  },
  {
    id: "static-residential-ipv6",
    pricing: STATIC_IPV6_PRICING,
    currency: "USD",
    cardCopy: {
      ru: {
        title: "Static Residential IPv6",
        headline: "Гибкая стоимость для скейлинга",
        priceHint: "от $0.55 / мес",
        highlights: [
          "SOCKS5 и HTTP/S",
          "Sticky-сессии",
          "Ротация подсетей",
        ],
      },
      en: {
        title: "Static Residential IPv6",
        headline: "Flexible pricing for scale",
        priceHint: "from $0.55 / mo",
        highlights: [
          "SOCKS5 & HTTP/S",
          "Sticky sessions",
          "Subnet rotation",
        ],
      },
    },
  },
  {
    id: "rotating-residential",
    pricing: ROTATING_RESIDENTIAL_PRICING,
    currency: "USD",
    cardCopy: {
      ru: {
        title: "Rotating Residential Proxy",
        headline: "Трафик или выделенные порты",
        priceHint: "от $14.99",
        highlights: [
          "85M+ IP",
          "Ротация по API",
          "Страны и города",
        ],
      },
      en: {
        title: "Rotating Residential Proxy",
        headline: "Pay per GB or dedicated ports",
        priceHint: "from $14.99",
        highlights: [
          "85M+ IPs",
          "API rotation",
          "Country & city targeting",
        ],
      },
    },
  },
];

const ORDER_COPY: Record<Locale, OrderPageCopy> = {
  ru: {
    heroEyebrow: "Конструктор тарифов",
    heroTitle: "Соберите заказ за пару шагов",
    heroSubtitle: "Сравните ключевые residential-продукты SoksLine на одной странице.",
    heroDescription:
      "Выберите подходящий тип прокси, изучите тарифы и переходите к оформлению. Все данные синхронизированы с разделом \"Цены\" и обновляются автоматически.",
    paymentTitle: "Оплата и безопасность",
    paymentNoteFallback: "SSL Secure Payment. Ваши данные защищены 256-битным шифрованием.",
    paymentMethodsLabel: "Поддерживаемые методы",
    servicesSectionTitle: "Выберите продукт",
    servicesSectionSubtitle: "Сравните основные residential-направления SoksLine.",
    summary: {
      title: "Сводка заказа",
      serviceLabel: "Услуга",
      categoryLabel: "Категория",
      planLabel: "Тариф",
      unitLabel: "Стоимость",
      totalLabel: "Итого",
      featuresLabel: "Что входит",
      ctaLabel: "Далее",
      disclaimer: "SSL безопасная оплата. 256-битное шифрование защищает ваши данные.",
    },
    moreInfoLabel: "Посмотреть все тарифы",
    contactTitle: "Нужна индивидуальная конфигурация?",
    contactSubtitle: "Опишите проект — подберём пул, тариф и географию под вашу нагрузку.",
    contactCtaLabel: "Связаться с менеджером",
    contactHref: "/help-center",
  },
  en: {
    heroEyebrow: "Order workspace",
    heroTitle: "Build your order in a few clicks",
    heroSubtitle: "Compare the key SoksLine residential products side by side.",
    heroDescription:
      "Pick the proxy type you need, review the pricing tiers and proceed to checkout. Everything stays in sync with the Pricing pages and updates automatically.",
    paymentTitle: "Payments & security",
    paymentNoteFallback: "SSL Secure Payment. Your information is protected by 256-bit SSL.",
    paymentMethodsLabel: "Supported methods",
    servicesSectionTitle: "Choose a product",
    servicesSectionSubtitle: "Compare the flagship SoksLine residential offerings.",
    summary: {
      title: "Order summary",
      serviceLabel: "Service",
      categoryLabel: "Category",
      planLabel: "Plan",
      unitLabel: "Unit price",
      totalLabel: "Total",
      featuresLabel: "Includes",
      ctaLabel: "Continue",
      disclaimer: "SSL secure checkout. 256-bit encryption keeps your data safe.",
    },
    moreInfoLabel: "View detailed pricing",
    contactTitle: "Need a custom configuration?",
    contactSubtitle: "Tell us about your project — we'll tailor the pool, pricing and geo coverage for your load.",
    contactCtaLabel: "Contact sales",
    contactHref: "/help-center",
  },
};

function parsePriceAmount(price: string): number {
  const match = price.match(/\d+[\d,.]*/);
  if (!match) {
    return 0;
  }

  const normalized = match[0].replace(/,/g, "");
  const amount = Number.parseFloat(normalized);
  return Number.isFinite(amount) ? amount : 0;
}

function buildCategories(data: PricingPageData): OrderCategory[] {
  return data.categories.map(category => ({
    ...category,
    tiers: category.tiers.map(tier => ({
      ...tier,
      priceAmount: parsePriceAmount(tier.price),
    })),
  }));
}

function buildService(locale: Locale, definition: ServiceDefinition): OrderService {
  const pricingData = definition.pricing[locale];
  const card = definition.cardCopy[locale];

  return {
    id: definition.id,
    card,
    detailTitle: pricingData.title,
    detailSubtitle: pricingData.subtitle,
    detailHighlight: pricingData.highlight,
    viewAllHref: `/pricing/${pricingData.slug}`,
    categories: buildCategories(pricingData),
    currency: definition.currency,
  };
}

export function getOrderPage(locale: Locale): OrderPage {
  const copy = ORDER_COPY[locale];
  const services = SERVICE_DEFINITIONS.map(definition => buildService(locale, definition));

  const paymentNote =
    SERVICE_DEFINITIONS.map(definition => definition.pricing[locale].paymentNote).find(Boolean) ??
    copy.paymentNoteFallback;

  const paymentMethods = Array.from(
    new Set(
      SERVICE_DEFINITIONS.flatMap(definition => definition.pricing[locale].paymentMethods ?? []),
    ),
  );

  return {
    copy,
    services,
    paymentNote,
    paymentMethods,
  };
}
