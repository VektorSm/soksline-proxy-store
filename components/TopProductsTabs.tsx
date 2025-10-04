'use client';

import React from 'react';
import Tabs from '@/components/ui/Tabs';
import StaticIspCard from '@/components/products/StaticIspCard';
import StaticIpv6Card from '@/components/products/StaticIpv6Card';
import RotatingResidentialCard from '@/components/products/RotatingResidentialCard';
import Section from '@/components/layout/Section';
import { useI18n } from '@/lib/i18n';

export default function TopProductsTabs() {
  const { t } = useI18n();
  const tabs = React.useMemo(
    () => [
      { id: 'static-isp', label: t('tabs.staticIsp') },
      { id: 'static-ipv6', label: t('tabs.staticIpv6') },
      { id: 'rotating', label: t('tabs.rotating') },
    ],
    [t],
  );

  return (
    <Section
      id="top-products"
      aria-labelledby="top-products-heading"
      bg="white"
      className="py-16 md:py-20"
      containerClassName="not-prose"
    >
      <div className="mb-6 text-left">
        <h2 id="top-products-heading" className="text-3xl font-semibold tracking-tight">
          {t('topProducts.title', 'Top Products by SoksLine')}
        </h2>
        <p className="mt-2 max-w-2xl opacity-80">
          {t(
            'topProducts.subtitle',
            'Static residential proxies tailored for long-term tasks and account work.',
          )}
        </p>
      </div>

      <Tabs
        tabs={tabs}
        idPrefix="top-products"
        ariaLabel={t('topProducts.tabsLabel', 'Top products')}
        renderPanel={(i) => {
          if (i === 0) return <StaticIspCard />;
          if (i === 1) return <StaticIpv6Card />;
          return <RotatingResidentialCard />;
        }}
      />
    </Section>
  );
}
