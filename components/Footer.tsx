"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Footer() {
  const year = new Date().getFullYear();
  const params = useSearchParams();
  const lang = (params?.get("lang") || "en").toLowerCase();

  const t = lang === "ru"
    ? {
        pricing: "Цены",
        support: "Поддержка",
        aml: "Политика AML",
        privacy: "Конфиденциальность",
        terms: "Условия",
        aup: "AUP",
        refunds: "Возвраты",
        login: "Войти",
        legalLine: (
          <>
            © {year} VERIDAN. Все права защищены
            <span className="mx-2">•</span>
            Зарегистрирована во Франции (SIREN {"980\u00A0990\u00A0451"})
            <span className="mx-2">•</span>
            Зарегистрированный адрес: 61 Rue de Lyon, 75012 Paris, France
            <span className="mx-2">•</span>
            SoksLine — торговое наименование VERIDAN
            <span className="mx-2">•</span>
            Контакт:{" "}
            <a
              href="mailto:support@soksline.store"
              className="underline underline-offset-2"
            >
              support@soksline.store
            </a>
          </>
        ),
      }
    : {
        pricing: "Pricing",
        support: "Support",
        aml: "AML Policy",
        privacy: "Privacy",
        terms: "Terms",
        aup: "AUP",
        refunds: "Refunds",
        login: "Log in",
        legalLine: (
          <>
            © {year} VERIDAN. All rights reserved
            <span className="mx-2">•</span>
            Registered in France (SIREN {"980\u00A0990\u00A0451"})
            <span className="mx-2">•</span>
            Registered office: 61 Rue de Lyon, 75012 Paris, France
            <span className="mx-2">•</span>
            SoksLine is a trading name of VERIDAN
            <span className="mx-2">•</span>
            Contact:{" "}
            <a
              href="mailto:support@soksline.store"
              className="underline underline-offset-2"
            >
              support@soksline.store
            </a>
          </>
        ),
      };

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-3 text-sm">
          <strong className="block text-base text-white">SoksLine</strong>
          <p className="mt-1">{t.legalLine}</p>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href="/pricing" className="hover:underline">{t.pricing}</Link></li>
            <li><Link href="/support" className="hover:underline">{t.support}</Link></li>
            <li><Link href="/aml" className="hover:underline">{t.aml}</Link></li>
            <li><Link href="/privacy" className="hover:underline">{t.privacy}</Link></li>
            <li><Link href="/tos" className="hover:underline">{t.terms}</Link></li>
            <li><Link href="/aup" className="hover:underline">{t.aup}</Link></li>
            <li><Link href="/refund" className="hover:underline">{t.refunds}</Link></li>
            <li><Link href="/login" className="hover:underline">{t.login}</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

