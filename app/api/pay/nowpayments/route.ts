import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amountUSD, order } = (await req.json()) as { amountUSD: number; order: Record<string, any> };
    if (!amountUSD || amountUSD <= 0) return NextResponse.json({ message: "Invalid amount" }, { status: 400 });

    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    if (!apiKey) return NextResponse.json({ message: "NOWPAYMENTS_API_KEY is missing" }, { status: 500 });

    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") || "https";
    const origin = `${proto}://${host}`;

    const payload = {
      price_amount: amountUSD,
      price_currency: "usd",
      order_id: `soksline_${Date.now()}`,
      order_description: `SoksLine order — ${order?.service || "proxy"}`,
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout/cancel`,
      is_fee_paid_by_user: true,
      is_fixed_rate: true,
    } as any;

    const res = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const t = await res.text();
      return NextResponse.json({ message: `NOWPayments error ${res.status}: ${t}` }, { status: 500 });
    }

    const data = await res.json();
    const invoiceUrl: string | undefined = data?.invoice_url || data?.invoice_url_preview;
    if (!invoiceUrl) return NextResponse.json({ message: "Invoice URL not returned" }, { status: 500 });

    return NextResponse.json({ invoiceUrl, invoiceId: data?.id ?? data?.invoice_id });
  } catch (e: any) {
    return NextResponse.json({ message: e?.message || "Unexpected error" }, { status: 500 });
  }
}
