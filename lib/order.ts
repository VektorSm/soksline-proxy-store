import type { Locale } from "../components/LocaleContext";
import {
  ROTATING_RESIDENTIAL_PRICING,
  STATIC_IPV6_PRICING,
  STATIC_RESIDENTIAL_PRICING,
  type PricingCategory,
  type PricingPageData,
} from "./pricing";

type OrderPageCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  paymentTitle: string;
  paymentMethodsLabel: string;
  moreInfoLabel: string;
  tierCtaFallback: string;
  contactTitle: string;
  contactSubtitle: string;
  contactCtaLabel: string;
  contactHref: string;
};

type OrderPageCopyByLocale = Record<Locale, OrderPageCopy>;

type OrderSection = {
  id: string;
  title: string;
  subtitle: string;
  highlight: string;
  moreInfoHref: string;
  categories: PricingCategory[];
};

type OrderSectionSource = {
  id: string;
  getData(locale: Locale): PricingPageData;
};

type OrderPage = OrderPageCopy & {
  paymentNote: string;
  paymentMethods: string[];
  sections: OrderSection[];
};

const ORDER_COPY: OrderPageCopyByLocale = {
  ru: {
    heroEyebrow: "Конструктор тарифов",
    heroTitle: "Соберите заказ за пару шагов",
    heroSubtitle: "Мы объединили ключевые тарифы SoksLine на одной странице.",
    heroDescription:
      "Выберите подходящий тип residential-прокси, сравните пакеты и переходите к оформлению. Все тарифы синхронизированы с разделом \"Цены\" и обновляются автоматически.",
    paymentTitle: "Оплата и безопасность",
    paymentMethodsLabel: "Поддерживаемые методы",
    moreInfoLabel: "Посмотреть все тарифы",
    tierCtaFallback: "Оформить",
    contactTitle: "Нужна индивидуальная конфигурация?",
    contactSubtitle:
      "Опишите проект и мы подберём пул, тариф и географию под вашу нагрузку.",
    contactCtaLabel: "Связаться с менеджером",
    contactHref: "/help-center",
  },
  en: {
    heroEyebrow: "Order workspace",
    heroTitle: "Build your order in a few clicks",
    heroSubtitle: "We gathered SoksLine pricing tiers in one streamlined view.",
    heroDescription:
      "Pick the proxy product you need, compare plans and jump straight to checkout. All data stays in sync with the Pricing pages and updates automatically.",
    paymentTitle: "Payments & security",
    paymentMethodsLabel: "Supported methods",
    moreInfoLabel: "View detailed pricing",
    tierCtaFallback: "Select",
    contactTitle: "Need a custom configuration?",
    contactSubtitle:
      "Tell us about your use case and we will tailor pool size, geography and billing.",
    contactCtaLabel: "Contact sales",
    contactHref: "/help-center",
  },
};

const SECTION_SOURCES: OrderSectionSource[] = [
  {
    id: "static-residential",
    getData: locale => STATIC_RESIDENTIAL_PRICING[locale],
  },
  {
    id: "static-residential-ipv6",
    getData: locale => STATIC_IPV6_PRICING[locale],
  },
  {
    id: "rotating-residential",
    getData: locale => ROTATING_RESIDENTIAL_PRICING[locale],
  },
];

function buildSections(locale: Locale) {
  return SECTION_SOURCES.map(source => {
    const data = source.getData(locale);
    return {
      id: source.id,
      title: data.title,
      subtitle: data.subtitle,
      highlight: data.highlight,
      moreInfoHref: `/pricing/${data.slug}`,
      categories: data.categories,
      paymentNote: data.paymentNote,
      paymentMethods: data.paymentMethods,
    };
  });
}

export function getOrderPage(locale: Locale): OrderPage {
  const copy = ORDER_COPY[locale];
  const sectionsWithPayments = buildSections(locale);
  const paymentNote = sectionsWithPayments.find(section => section.paymentNote)?.paymentNote ?? "";
  const paymentMethods = Array.from(
    new Set(sectionsWithPayments.flatMap(section => section.paymentMethods)),
  );

  const sections: OrderSection[] = sectionsWithPayments.map(({
    paymentMethods: _ignoredMethods,
    paymentNote: _ignoredNote,
    ...section
  }) => section);

  return {
    ...copy,
    paymentNote,
    paymentMethods,
    sections,
  };
}

export type { OrderPage, OrderSection };
