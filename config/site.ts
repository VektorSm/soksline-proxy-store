export const BRAND_NAME = "SoksLine";

export const PRICING_MODE = "perGb" as const;

export const BADGE_POINTS = {
  locations: 180,
  uptime: "99.9%",
  support: "24/7",
};

export const KYC_POLICY =
  "Без KYC для базовых планов. KYC — по запросу для кастомных конфигураций и чувствительных гео.";

export const SUPPORTED_LOCALES = ["en", "ru"] as const;
export const DEFAULT_LOCALE = "en";

export type Locale = (typeof SUPPORTED_LOCALES)[number];
