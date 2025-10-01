import type { Locale } from "../components/LocaleContext";

export type OrderOption = {
  id: string;
  label: string;
  description?: string;
};

export type OrderDurationOption = OrderOption & {
  multiplier: number;
  priceSuffix: string;
};

export type OrderPlan = {
  id: string;
  name: string;
  priceAmount: number;
  priceSuffix: string;
  summary: string;
  features: string[];
};

export type OrderService = {
  id: string;
  name: string;
  headline: string;
  priceHint: string;
  badge?: string;
  highlights: string[];
  currency: string;
  defaultPlanId?: string;
  plans: OrderPlan[];
  durations: OrderDurationOption[];
  locations: OrderOption[];
  ispOptions: OrderOption[];
};

export type OrderPageData = {
  title: string;
  subtitle: string;
  serviceSectionTitle: string;
  serviceSectionSubtitle: string;
  planSectionTitle: string;
  planSectionSubtitle: string;
  locationSectionTitle: string;
  locationSectionSubtitle: string;
  ispSectionTitle: string;
  ispSectionSubtitle: string;
  durationSectionTitle: string;
  durationSectionSubtitle: string;
  autoRenewLabel: string;
  autoRenewDescription: string;
  summaryTitle: string;
  summaryServiceLabel: string;
  summaryPlanLabel: string;
  summaryLocationLabel: string;
  summaryIspLabel: string;
  summaryDurationLabel: string;
  summaryTotalLabel: string;
  summaryAutoRenewOn: string;
  summaryAutoRenewOff: string;
  summaryFeaturesTitle: string;
  summaryCtaLabel: string;
  summaryDisclaimer: string;
  services: OrderService[];
};

export type LocalizedOrderPage = Record<Locale, OrderPageData>;

export const ORDER_PAGE: LocalizedOrderPage = {
  ru: {
    title: "Настройка заказа",
    subtitle: "Соберите конфигурацию под свою задачу и получите готовые прокси после оплаты.",
    serviceSectionTitle: "Выберите услугу",
    serviceSectionSubtitle: "Поддерживаем как статические, так и ротационные residential-пулы.",
    planSectionTitle: "План",
    planSectionSubtitle: "Определите уровень доступа и объём ресурсов.",
    locationSectionTitle: "Местоположение прокси",
    locationSectionSubtitle: "Задайте страну выдачи и провайдера для подключения.",
    ispSectionTitle: "ISP",
    ispSectionSubtitle: "Укажите предпочитаемого интернет-провайдера.",
    durationSectionTitle: "Выбранный период",
    durationSectionSubtitle: "Настройте срок действия доступа и биллинг.",
    autoRenewLabel: "Автопродление",
    autoRenewDescription: "Продлевать подписку автоматически перед окончанием периода.",
    summaryTitle: "Сводка заказа",
    summaryServiceLabel: "Услуга",
    summaryPlanLabel: "План",
    summaryLocationLabel: "Локация",
    summaryIspLabel: "ISP",
    summaryDurationLabel: "Период",
    summaryTotalLabel: "Итого",
    summaryAutoRenewOn: "Автопродление активно",
    summaryAutoRenewOff: "Без автопродления",
    summaryFeaturesTitle: "Включено в пакет",
    summaryCtaLabel: "Далее",
    summaryDisclaimer: "SSL безопасная оплата. 256-битное шифрование защищает ваши данные.",
    services: [
      {
        id: "static-isp",
        name: "Static residential (ISP)",
        headline: "Реальные ASN провайдеров и высокая скорость", 
        priceHint: "от $1.95 / месяц",
        badge: "Популярно",
        highlights: [
          "Статические IPv4",
          "Безлимитный трафик",
          "Выбор городов и ASN",
        ],
        currency: "USD",
        defaultPlanId: "dedicated",
        plans: [
          {
            id: "basic",
            name: "Basic",
            priceAmount: 1.95,
            priceSuffix: "/месяц",
            summary: "Подходит для небольших команд и тестовых запусков.",
            features: [
              "До 3 пользователей",
              "Sticky-сессии",
              "HTTP/S и SOCKS5",
            ],
          },
          {
            id: "dedicated",
            name: "Dedicated",
            priceAmount: 2.12,
            priceSuffix: "/месяц",
            summary: "Выделенные IP с гибкой ротацией и SLA.",
            features: [
              "Неограниченные сессии",
              "Приоритетная поддержка",
              "API-доступ",
            ],
          },
          {
            id: "premium",
            name: "Premium",
            priceAmount: 5.47,
            priceSuffix: "/месяц",
            summary: "Enterprise-пулы с кастомными подсетями и аналитикой.",
            features: [
              "Чистые диапазоны",
              "Кастомные подсети",
              "Отдельный менеджер",
            ],
          },
        ],
        durations: [
          {
            id: "weekly",
            label: "7 дней",
            description: "Промо-доступ",
            multiplier: 0.25,
            priceSuffix: "за 7 дней",
          },
          {
            id: "monthly",
            label: "1 месяц",
            description: "Самый популярный",
            multiplier: 1,
            priceSuffix: "в месяц",
          },
          {
            id: "yearly",
            label: "12 месяцев",
            description: "Экономия 15%",
            multiplier: 12,
            priceSuffix: "в год",
          },
        ],
        locations: [
          { id: "us", label: "США" },
          { id: "uk", label: "Великобритания" },
          { id: "de", label: "Германия" },
          { id: "fr", label: "Франция" },
          { id: "au", label: "Австралия" },
          { id: "at", label: "Австрия" },
          { id: "bd", label: "Бангладеш" },
          { id: "be", label: "Бельгия" },
          { id: "br", label: "Бразилия" },
          { id: "hu", label: "Венгрия" },
          { id: "vn", label: "Вьетнам" },
          { id: "hn", label: "Гондурас" },
          { id: "hk", label: "Гонконг САР Китая" },
          { id: "gr", label: "Греция" },
          { id: "dk", label: "Дания" },
          { id: "il", label: "Израиль" },
          { id: "in", label: "Индия" },
          { id: "id", label: "Индонезия" },
          { id: "es", label: "Испания" },
          { id: "it", label: "Италия" },
          { id: "ca", label: "Канада" },
          { id: "co", label: "Колумбия" },
          { id: "lt", label: "Литва" },
          { id: "my", label: "Малайзия" },
          { id: "mx", label: "Мексика" },
          { id: "ng", label: "Нигерия" },
          { id: "nl", label: "Нидерланды" },
          { id: "no", label: "Норвегия" },
          { id: "ae", label: "Объединённые Арабские Эмираты" },
          { id: "pe", label: "Перу" },
          { id: "ph", label: "Филиппины" },
          { id: "fi", label: "Финляндия" },
          { id: "pl", label: "Польша" },
          { id: "pt", label: "Португалия" },
          { id: "ro", label: "Румыния" },
          { id: "ru", label: "Россия" },
          { id: "rs", label: "Сербия" },
          { id: "sg", label: "Сингапур" },
          { id: "sk", label: "Словакия" },
          { id: "kr", label: "Республика Корея" },
          { id: "th", label: "Таиланд" },
          { id: "tr", label: "Турция" },
          { id: "ua", label: "Украина" },
          { id: "hr", label: "Хорватия" },
          { id: "cz", label: "Чехия" },
          { id: "cl", label: "Чили" },
          { id: "ch", label: "Швейцария" },
          { id: "za", label: "ЮАР" },
        ],
        ispOptions: [
          { id: "comcast", label: "Comcast" },
          { id: "att", label: "AT&T" },
          { id: "verizon", label: "Verizon" },
          { id: "spectrum", label: "Spectrum" },
        ],
      },
      {
        id: "static-residential-ipv6",
        name: "Static residential IPv6",
        headline: "Пул IPv6 с мгновенной выдачей",
        priceHint: "$29.67 / месяц",
        highlights: [
          "Выделенные IPv6",
          "API и дашборд",
          "Ротация по расписанию",
        ],
        currency: "USD",
        defaultPlanId: "dedicated-ipv6",
        plans: [
          {
            id: "dedicated-ipv6",
            name: "Dedicated IPv6",
            priceAmount: 29.67,
            priceSuffix: "/месяц",
            summary: "IPv6-линии без шаринга и с управлением через панель.",
            features: [
              "Неограниченный трафик",
              "Кастомные подсети",
              "SLA 99.9%",
            ],
          },
        ],
        durations: [
          {
            id: "monthly",
            label: "1 месяц",
            description: "Мгновенный запуск",
            multiplier: 1,
            priceSuffix: "в месяц",
          },
          {
            id: "quarterly",
            label: "3 месяца",
            description: "-10%",
            multiplier: 3,
            priceSuffix: "за 3 месяца",
          },
          {
            id: "yearly",
            label: "12 месяцев",
            description: "Экономия 20%",
            multiplier: 12,
            priceSuffix: "в год",
          },
        ],
        locations: [{ id: "us", label: "США" }],
        ispOptions: [{ id: "dedicated", label: "Выделенные узлы" }],
      },
      {
        id: "rotating-residential",
        name: "Rotating residential",
        headline: "85M+ IP и гибкая ротация",
        priceHint: "$24.95 / GB",
        highlights: [
          "Ротация до 30 минут",
          "Выбор страны и города",
          "HTTP/S и SOCKS5",
        ],
        currency: "USD",
        defaultPlanId: "bandwidth",
        plans: [
          {
            id: "bandwidth",
            name: "Bandwidth Pool",
            priceAmount: 24.95,
            priceSuffix: "/GB",
            summary: "Оплата за использованный трафик без скрытых сборов.",
            features: [
              "Гибкая ротация",
              "Неограниченные потоки",
              "API-интеграция",
            ],
          },
        ],
        durations: [
          {
            id: "3gb",
            label: "3 GB",
            description: "Минимальный пакет",
            multiplier: 3,
            priceSuffix: "за 3 GB",
          },
          {
            id: "10gb",
            label: "10 GB",
            description: "Скидка 10%",
            multiplier: 10,
            priceSuffix: "за 10 GB",
          },
          {
            id: "50gb",
            label: "50 GB",
            description: "Скидка 15%",
            multiplier: 50,
            priceSuffix: "за 50 GB",
          },
        ],
        locations: [
          { id: "us", label: "США" },
          { id: "nl", label: "Нидерланды" },
          { id: "sg", label: "Сингапур" },
          { id: "br", label: "Бразилия" },
        ],
        ispOptions: [{ id: "global", label: "Резиденциальный пул" }],
      },
    ],
  },
  en: {
    title: "Configure your order",
    subtitle: "Build the package that fits your workflow and receive ready-to-use proxies after checkout.",
    serviceSectionTitle: "Choose a service",
    serviceSectionSubtitle: "We support both static and rotating residential pools.",
    planSectionTitle: "Plan",
    planSectionSubtitle: "Select the access level and resource allocation.",
    locationSectionTitle: "Proxy location",
    locationSectionSubtitle: "Decide on the exit country and ISP for your connections.",
    ispSectionTitle: "ISP",
    ispSectionSubtitle: "Choose your preferred internet provider.",
    durationSectionTitle: "Selected period",
    durationSectionSubtitle: "Define how long access should remain active.",
    autoRenewLabel: "Auto-renewal",
    autoRenewDescription: "Renew the subscription automatically before it expires.",
    summaryTitle: "Order summary",
    summaryServiceLabel: "Service",
    summaryPlanLabel: "Plan",
    summaryLocationLabel: "Location",
    summaryIspLabel: "ISP",
    summaryDurationLabel: "Period",
    summaryTotalLabel: "Total",
    summaryAutoRenewOn: "Auto-renew enabled",
    summaryAutoRenewOff: "Auto-renew disabled",
    summaryFeaturesTitle: "What's included",
    summaryCtaLabel: "Continue",
    summaryDisclaimer: "SSL secure payment. Your information is protected with 256-bit encryption.",
    services: [
      {
        id: "static-isp",
        name: "Static residential (ISP)",
        headline: "Real ISP ASN with premium speeds",
        priceHint: "from $1.95 / month",
        badge: "Popular",
        highlights: [
          "Static IPv4 access",
          "Unlimited bandwidth",
          "City & ASN targeting",
        ],
        currency: "USD",
        defaultPlanId: "dedicated",
        plans: [
          {
            id: "basic",
            name: "Basic",
            priceAmount: 1.95,
            priceSuffix: "/month",
            summary: "Perfect for testing and small teams.",
            features: [
              "Up to 3 users",
              "Sticky sessions",
              "HTTP/S & SOCKS5",
            ],
          },
          {
            id: "dedicated",
            name: "Dedicated",
            priceAmount: 2.12,
            priceSuffix: "/month",
            summary: "Dedicated IPs with flexible rotation and SLA.",
            features: [
              "Unlimited concurrency",
              "Priority support",
              "API access",
            ],
          },
          {
            id: "premium",
            name: "Premium",
            priceAmount: 5.47,
            priceSuffix: "/month",
            summary: "Enterprise pools with custom subnets and analytics.",
            features: [
              "Clean ranges",
              "Custom subnets",
              "Dedicated manager",
            ],
          },
        ],
        durations: [
          {
            id: "weekly",
            label: "7 days",
            description: "Promo access",
            multiplier: 0.25,
            priceSuffix: "per 7 days",
          },
          {
            id: "monthly",
            label: "1 month",
            description: "Most popular",
            multiplier: 1,
            priceSuffix: "per month",
          },
          {
            id: "yearly",
            label: "12 months",
            description: "Save 15%",
            multiplier: 12,
            priceSuffix: "per year",
          },
        ],
        locations: [
          { id: "us", label: "United States" },
          { id: "uk", label: "United Kingdom" },
          { id: "de", label: "Germany" },
          { id: "fr", label: "France" },
          { id: "au", label: "Australia" },
          { id: "at", label: "Austria" },
          { id: "bd", label: "Bangladesh" },
          { id: "be", label: "Belgium" },
          { id: "br", label: "Brazil" },
          { id: "hu", label: "Hungary" },
          { id: "vn", label: "Vietnam" },
          { id: "hn", label: "Honduras" },
          { id: "hk", label: "Hong Kong SAR China" },
          { id: "gr", label: "Greece" },
          { id: "dk", label: "Denmark" },
          { id: "il", label: "Israel" },
          { id: "in", label: "India" },
          { id: "id", label: "Indonesia" },
          { id: "es", label: "Spain" },
          { id: "it", label: "Italy" },
          { id: "ca", label: "Canada" },
          { id: "co", label: "Colombia" },
          { id: "lt", label: "Lithuania" },
          { id: "my", label: "Malaysia" },
          { id: "mx", label: "Mexico" },
          { id: "ng", label: "Nigeria" },
          { id: "nl", label: "Netherlands" },
          { id: "no", label: "Norway" },
          { id: "ae", label: "United Arab Emirates" },
          { id: "pe", label: "Peru" },
          { id: "ph", label: "Philippines" },
          { id: "fi", label: "Finland" },
          { id: "pl", label: "Poland" },
          { id: "pt", label: "Portugal" },
          { id: "ro", label: "Romania" },
          { id: "ru", label: "Russia" },
          { id: "rs", label: "Serbia" },
          { id: "sg", label: "Singapore" },
          { id: "sk", label: "Slovakia" },
          { id: "kr", label: "South Korea" },
          { id: "th", label: "Thailand" },
          { id: "tr", label: "Turkey" },
          { id: "ua", label: "Ukraine" },
          { id: "hr", label: "Croatia" },
          { id: "cz", label: "Czechia" },
          { id: "cl", label: "Chile" },
          { id: "ch", label: "Switzerland" },
          { id: "za", label: "South Africa" },
        ],
        ispOptions: [
          { id: "comcast", label: "Comcast" },
          { id: "att", label: "AT&T" },
          { id: "verizon", label: "Verizon" },
          { id: "spectrum", label: "Spectrum" },
        ],
      },
      {
        id: "static-residential-ipv6",
        name: "Static residential IPv6",
        headline: "Instant IPv6 pools",
        priceHint: "$29.67 / month",
        highlights: [
          "Dedicated IPv6",
          "Dashboard & API",
          "Scheduled rotation",
        ],
        currency: "USD",
        defaultPlanId: "dedicated-ipv6",
        plans: [
          {
            id: "dedicated-ipv6",
            name: "Dedicated IPv6",
            priceAmount: 29.67,
            priceSuffix: "/month",
            summary: "Exclusive IPv6 lines managed via dashboard.",
            features: [
              "Unlimited traffic",
              "Custom subnets",
              "99.9% SLA",
            ],
          },
        ],
        durations: [
          {
            id: "monthly",
            label: "1 month",
            description: "Instant provisioning",
            multiplier: 1,
            priceSuffix: "per month",
          },
          {
            id: "quarterly",
            label: "3 months",
            description: "-10%",
            multiplier: 3,
            priceSuffix: "per 3 months",
          },
          {
            id: "yearly",
            label: "12 months",
            description: "Save 20%",
            multiplier: 12,
            priceSuffix: "per year",
          },
        ],
        locations: [{ id: "us", label: "United States" }],
        ispOptions: [{ id: "dedicated", label: "Dedicated nodes" }],
      },
      {
        id: "rotating-residential",
        name: "Rotating residential",
        headline: "85M+ IPs with flexible rotation",
        priceHint: "$24.95 / GB",
        highlights: [
          "Rotation up to 30 min",
          "Country & city targeting",
          "HTTP/S & SOCKS5",
        ],
        currency: "USD",
        defaultPlanId: "bandwidth",
        plans: [
          {
            id: "bandwidth",
            name: "Bandwidth Pool",
            priceAmount: 24.95,
            priceSuffix: "/GB",
            summary: "Pay exactly for the traffic you consume.",
            features: [
              "Flexible rotation",
              "Unlimited threads",
              "API integration",
            ],
          },
        ],
        durations: [
          {
            id: "3gb",
            label: "3 GB",
            description: "Starter",
            multiplier: 3,
            priceSuffix: "per 3 GB",
          },
          {
            id: "10gb",
            label: "10 GB",
            description: "10% off",
            multiplier: 10,
            priceSuffix: "per 10 GB",
          },
          {
            id: "50gb",
            label: "50 GB",
            description: "15% off",
            multiplier: 50,
            priceSuffix: "per 50 GB",
          },
        ],
        locations: [
          { id: "us", label: "United States" },
          { id: "nl", label: "Netherlands" },
          { id: "sg", label: "Singapore" },
          { id: "br", label: "Brazil" },
        ],
        ispOptions: [{ id: "global", label: "Residential pool" }],
      },
    ],
  },
};
