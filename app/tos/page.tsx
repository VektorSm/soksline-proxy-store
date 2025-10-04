'use client';
import { useI18n } from '@/lib/i18n';
import LegalPage from '@/components/legal/LegalPage';

export default function Page() {
  const { t } = useI18n();
  const dict = t('pages.tos') as any; // объект из i18n
  return <LegalPage dict={dict} />;
}
