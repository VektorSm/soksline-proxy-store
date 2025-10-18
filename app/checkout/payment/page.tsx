"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
        selected ? "border-black" : "border-zinc-200"
      } bg-white p-4 sm:p-5 shadow-sm hover:shadow transition cursor-pointer ${
        disabled ? "opacity-50 pointer-events-none" : ""
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

  const service = search.get("service") ?? "Static Residential Proxy";
  const category = search.get("category") ?? "Plans";
  const plan = search.get("plan") ?? "Базовый";
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
      setError(e?.message || "Payment error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold">Оплата</h1>

          <PaymentMethodCard
            title="Криптовалюта"
            subtitle="Оплата через NOWPayments (инвойс в новой вкладке)"
            feeNote="На стороне провайдера может взиматься небольшая комиссия сети."
            selected={selectedMethod === "crypto"}
            onPay={() => setSelectedMethod("crypto")}
          />

          <PaymentMethodCard title="Банковская карта" subtitle="Скоро" disabled selected={selectedMethod === "card"} onPay={() => setSelectedMethod("card")} />
          <PaymentMethodCard title="PayPal" subtitle="Скоро" disabled selected={selectedMethod === "paypal"} onPay={() => setSelectedMethod("paypal")} />

          <div className="pt-2 flex items-center gap-3">
            <button
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-black text-white font-semibold disabled:opacity-60"
              disabled={loading || selectedMethod !== "crypto"}
              onClick={payWithCrypto}
            >
              {loading ? "Создаём счёт…" : `Оплатить $${total}`}
            </button>
            <button className="text-sm text-zinc-600 underline" onClick={() => router.push("/checkout")}>
              Вернуться к настройке заказа
            </button>
          </div>

          {error ? <div className="mt-3 text-sm text-red-600">{error}</div> : null}
          <div className="mt-8 text-xs text-zinc-500">SSL безопасная оплата. 256‑битное шифрование защищает ваши данные.</div>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sticky top-6">
            <div className="text-2xl font-bold">Сводка заказа</div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-zinc-500">Услуга</dt><dd className="font-medium text-right max-w-[55%]">{service}</dd></div>
              <div className="flex justify-between"><dt className="text-zinc-500">Категория</dt><dd className="font-medium text-right max-w-[55%]">{category}</dd></div>
              <div className="flex justify-between"><dt className="text-zinc-500">Тариф</dt><dd className="font-medium text-right max-w-[55%]">{plan}</dd></div>
            </dl>

            <div className="mt-5 text-xs text-zinc-500">СТОИМОСТЬ</div>
            <div className="mt-1 text-sm">${pricePerIp.toFixed(2)} <span className="text-zinc-500">за прокси / мес</span></div>

            <div className="mt-4 rounded-xl bg-zinc-50 p-4">
              <div className="text-zinc-500 text-xs">Итого</div>
              <div className="text-2xl font-bold">${total.toFixed(2)}</div>
              <div className="text-xs text-zinc-500 mt-1">{ips} IP • {months} мес • Автопродление {autoRenew ? "включено" : "выключено"}</div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold mb-2">Что входит</div>
              <ul className="space-y-1 text-sm">
                <li className="flex gap-2"><span>✓</span> До 3 пользователей</li>
                <li className="flex gap-2"><span>✓</span> 1 ГБ трафика</li>
                <li className="flex gap-2"><span>✓</span> Без апгрейда скорости</li>
                <li className="flex gap-2"><span>✓</span> Без доп. параллельности</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
