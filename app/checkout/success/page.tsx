import Link from "next/link";

export default function Success() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-2">Оплата создана</h1>
      <p className="text-zinc-600">Если вы ещё не завершили оплату в новой вкладке, вернитесь к счёту и оплатите. После подтверждения вы получите доступ в аккаунте.</p>
      <Link href="/" className="inline-block mt-6 rounded-xl bg-black text-white px-5 py-3">
        На главную
      </Link>
    </div>
  );
}
