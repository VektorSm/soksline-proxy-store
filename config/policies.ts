export type Locale = 'en' | 'ru';

export const KYC_POLICY_EN =
  'No KYC for basic plans. KYC upon request for custom configurations and sensitive GEOs.';
export const KYC_POLICY_RU =
  'Без KYC для базовых планов. KYC — по запросу для кастомных конфигураций и чувствительных гео.';

export const KYC_POLICY: Record<Locale, string> = {
  en: KYC_POLICY_EN,
  ru: KYC_POLICY_RU,
};

export function getKycPolicy(locale: Locale = 'en') {
  return KYC_POLICY[locale] ?? KYC_POLICY_EN; // дефолт — EN
}
