"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/components/LocaleContext";

function num(q: string | null, fallback = 0) {
  const n = q ? Number(q) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

function PaymentMethodCard({
  title,
  subtitle,
  feeNote,
  disabled,
  onPay,
  selected,
}: {
  title: string;
  subtitle?: string;
  feeNote?: string;
  disabled?: boolean;
  onPay?: () => void;
  selected?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border ${
        selected ? "border-zinc-300" : "border-zinc-200"
      } bg-white p-4 sm:p-5 shadow-sm hover:shadow transition cursor-pointer ${
        disabled ? "bg-zinc-100 text-zinc-400 pointer-events-none" : ""
      }`}
      onClick={!disabled ? onPay : undefined}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-base sm:text-lg font-semibold">{title}</div>
          {subtitle ? (
            <div className="text-sm text-zinc-500 mt-0.5">{subtitle}</div>
          ) : null}
        </div>
        <div className={`h-5 w-5 rounded-full border ${selected ? "bg-black" : "bg-white"}`} />
      </div>
      {feeNote ? (
        <div className="text-xs text-zinc-500 mt-2">{feeNote}</div>
      ) : null}
    </div>
  );
}

export default function PaymentPage() {
  const search = useSearchParams();
  const router = useRouter();
  const { locale } = useLocale();

  const copy = useMemo(() => {
    if (locale === "ru") {
      return {
        pageTitle: "Оплата",
        paymentMethods: {
          crypto: {
            title: "Криптовалюта",
            subtitle: "Оплата через NOWPayments (инвойс в новой вкладке)",
            feeNote: "На стороне провайдера может взиматься небольшая комиссия сети.",
          },
          card: { title: "Банковская карта", subtitle: "Скоро" },
          paypal: { title: "PayPal", subtitle: "Скоро" },
        },
        loadingLabel: "Создаём счёт…",
        payLabel: (amount: number) => `Оплатить $${amount}`,
        backButton: "Вернуться к настройке заказа",
        summary: {
          title: "Сводка заказа",
          serviceLabel: "Услуга",
          categoryLabel: "Категория",
          planLabel: "Тариф",
          priceSectionLabel: "СТОИМОСТЬ",
          priceUnitSuffix: "за прокси / мес",
          totalLabel: "Итого",
          totalDetails: (ips: number, months: number, autoRenew: boolean) =>
            `${ips} IP • ${months} мес • Автопродление ${autoRenew ? "включено" : "выключено"}`,
        },
        whatsIncludedTitle: "Что входит",
        whatsIncludedItems: [
          "До 3 пользователей",
          "1 ГБ трафика",
          "Без апгрейда скорости",
          "Без доп. параллельности",
        ],
        sslNote: "SSL безопасная оплата. 256-битное шифрование защищает ваши данные.",
        defaultPlan: "Базовый",
        errorFallback: "Ошибка оплаты",
      } as const;
    }

    return {
      pageTitle: "Payment",
      paymentMethods: {
        crypto: {
          title: "Cryptocurrency",
          subtitle: "Pay via NOWPayments (invoice opens in a new tab)",
          feeNote: "The provider may charge a small network fee.",
        },
        card: { title: "Bank card", subtitle: "Coming soon" },
        paypal: { title: "PayPal", subtitle: "Coming soon" },
      },
      loadingLabel: "Creating invoice…",
      payLabel: (amount: number) => `Pay $${amount}`,
      backButton: "Back to order setup",
      summary: {
        title: "Order summary",
        serviceLabel: "Service",
        categoryLabel: "Category",
        planLabel: "Plan",
        priceSectionLabel: "PRICE",
        priceUnitSuffix: "per proxy / mo",
        totalLabel: "Total",
        totalDetails: (ips: number, months: number, autoRenew: boolean) =>
          `${ips} IP • ${months} mo • Auto-renew ${autoRenew ? "on" : "off"}`,
      },
      whatsIncludedTitle: "What's included",
      whatsIncludedItems: [
        "Up to 3 users",
        "1 GB of traffic",
        "No speed upgrade",
        "No extra concurrency",
      ],
      sslNote: "SSL secure payment. 256-bit encryption protects your data.",
      defaultPlan: "Basic",
      errorFallback: "Payment error",
    } as const;
  }, [locale]);

  const service = search.get("service") ?? "Static Residential Proxy";
  const category = search.get("category") ?? "Plans";
  const plan = search.get("plan") ?? copy.defaultPlan;
  const pricePerIp = num(search.get("price"), 0);
  const ips = num(search.get("ips"), 1);
  const months = num(search.get("months"), 1);
  const autoRenew = (search.get("autoRenew") ?? "false") === "true";

  const total = useMemo(() => {
    const t = pricePerIp * ips * months;
    return Math.round(t * 100) / 100;
  }, [pricePerIp, ips, months]);

  const [selectedMethod, setSelectedMethod] = useState<"crypto" | "card" | "paypal" | null>("crypto");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function payWithCrypto() {
    setLoading(true);
    setError(null);
    try {
      const body = {
        amountUSD: total,
        order: { service, category, plan, pricePerIp, ips, months, autoRenew },
      };
      const res = await fetch("/api/pay/nowpayments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const t = await res.json().catch(() => ({}));
        throw new Error(t?.message || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { invoiceUrl: string; invoiceId?: string };
      window.open(data.invoiceUrl, "_blank", "noopener,noreferrer");
      router.push(`/checkout/success?amount=${total}`);
    } catch (e: any) {
      setError(e?.message || copy.errorFallback);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-2xl font-bold">{copy.pageTitle}</h1>

            <PaymentMethodCard
              title={copy.paymentMethods.crypto.title}
              subtitle={copy.paymentMethods.crypto.subtitle}
              feeNote={copy.paymentMethods.crypto.feeNote}
              selected={selectedMethod === "crypto"}
              onPay={() => setSelectedMethod("crypto")}
            />

            <PaymentMethodCard
              title={copy.paymentMethods.card.title}
              subtitle={copy.paymentMethods.card.subtitle}
              disabled
              selected={selectedMethod === "card"}
              onPay={() => setSelectedMethod("card")}
            />
            <PaymentMethodCard
              title={copy.paymentMethods.paypal.title}
              subtitle={copy.paymentMethods.paypal.subtitle}
              disabled
              selected={selectedMethod === "paypal"}
              onPay={() => setSelectedMethod("paypal")}
            />

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 bg-black text-white font-semibold disabled:opacity-60 w-full sm:w-auto"
                disabled={loading || selectedMethod !== "crypto"}
                onClick={payWithCrypto}
              >
                {loading ? copy.loadingLabel : copy.payLabel(total)}
              </button>
              <button
                className="text-sm text-zinc-600 underline underline-offset-2 hover:text-zinc-800"
                onClick={() => router.push("/checkout")}
              >
                {copy.backButton}
              </button>
            </div>

            {error ? <div className="mt-3 text-sm text-red-600">{error}</div> : null}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="text-2xl font-bold">{copy.summary.title}</div>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-zinc-500">{copy.summary.serviceLabel}</dt><dd className="font-medium text-right max-w-[55%]">{service}</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-500">{copy.summary.categoryLabel}</dt><dd className="font-medium text-right max-w-[55%]">{category}</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-500">{copy.summary.planLabel}</dt><dd className="font-medium text-right max-w-[55%]">{plan}</dd></div>
              </dl>

              <div className="mt-5 text-xs text-zinc-500">{copy.summary.priceSectionLabel}</div>
              <div className="mt-1 text-sm">${pricePerIp.toFixed(2)} <span className="text-zinc-500">{copy.summary.priceUnitSuffix}</span></div>

              <div className="mt-4 rounded-xl bg-zinc-50 p-4">
                <div className="text-zinc-500 text-xs">{copy.summary.totalLabel}</div>
                <div className="text-2xl font-bold">${total.toFixed(2)}</div>
                <div className="text-xs text-zinc-500 mt-1">{copy.summary.totalDetails(ips, months, autoRenew)}</div>
              </div>

              <div className="mt-6">
                <div className="text-sm font-semibold mb-2">{copy.whatsIncludedTitle}</div>
                <ul className="space-y-1 text-sm">
                  {copy.whatsIncludedItems.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-6 text-xs text-zinc-500">{copy.sslNote}</div>
      </div>
    </div>
  );
}
