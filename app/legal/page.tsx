'use client';

import { useI18n } from '@/lib/i18n';
import LegalPage from '@/components/legal/LegalPage';

export default function Page() {
  const { t } = useI18n();
  const dict = t('pages.legal') as any;
  return <LegalPage dict={dict} />;
}
