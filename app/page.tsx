import TopProductsTabs from "../components/TopProductsTabs";

const BOT_URL = process.env.NEXT_PUBLIC_BOT_URL || "https://t.me/your_proxy_bot";

export default function Page() {
  return (
    <main style={{ display: "grid", gap: 32, padding: 32 }}>
      {/* Хиро — центрированный слоган */}
      <section style={{ textAlign: "center", padding: "40px 0" }}>
        <h1 style={{ fontSize: 42, margin: 0 }}>Чистые SOCKS-прокси. Прямая линия скорости.</h1>
        <p style={{ fontSize: 18, color: "#555" }}>
          Покупайте и продавайте прокси. Умные фильтры, актуальная аналитика и многое другое.
        </p>
        <a
          href={BOT_URL}
          target="_blank"
          rel="noopener"
          style={{
            display: "inline-block",
            marginTop: 14,
            padding: "12px 18px",
            borderRadius: 10,
            background: "#111",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600
          }}
        >
          Открыть бот
        </a>
      </section>

      {/* Изображение под слоганом (плейсхолдер) */}
      <section style={{ background: "#f4f4f4", borderRadius: 16, height: 240, display: "grid", placeItems: "center" }}>
        <span style={{ color: "#777" }}>[Тут будет изображение/баннер]</span>
      </section>

      {/* Блок «3-й скрин» — заглушка со структурой */}
      <section style={{ background: "#fafafa", borderRadius: 16, padding: 24, border: "1px solid rgba(0,0,0,0.06)" }}>
        <h2 style={{ marginTop: 0 }}>Почему SoksLine</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid rgba(0,0,0,0.06)" }}>
            <strong>Скорость</strong>
            <p style={{ margin: "6px 0 0" }}>Высокая пропускная способность без просадок.</p>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid rgba(0,0,0,0.06)" }}>
            <strong>Чистота пулов</strong>
            <p style={{ margin: "6px 0 0" }}>Фильтрация по ASN/стране, низкий спам-рейт.</p>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid rgba(0,0,0,0.06)" }}>
            <strong>Гибкость тарифов</strong>
            <p style={{ margin: "6px 0 0" }}>Статика, IPv6 и ротация — под разные задачи.</p>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid rgba(0,0,0,0.06)" }}>
            <strong>Оплата</strong>
            <p style={{ margin: "6px 0 0" }}>Крипта и классические методы (отображение ниже).</p>
          </div>
        </div>
      </section>

      {/* Табы продуктов */}
      <TopProductsTabs />

      {/* Способы оплаты */}
      <section style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid rgba(0,0,0,0.06)" }}>
        <h2 style={{ marginTop: 0 }}>Способы оплаты</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <span style={{ padding: "8px 12px", borderRadius: 8, background: "#f4f4f4" }}>USDT</span>
          <span style={{ padding: "8px 12px", borderRadius: 8, background: "#f4f4f4" }}>BTC</span>
          <span style={{ padding: "8px 12px", borderRadius: 8, background: "#f4f4f4" }}>ETH</span>
          <span style={{ padding: "8px 12px", borderRadius: 8, background: "#f4f4f4" }}>Visa/Mastercard (опц.)</span>
        </div>
      </section>
    </main>
  );
}
