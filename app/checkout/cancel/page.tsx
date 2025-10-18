import Link from "next/link";

export default function Cancel() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-2">Оплата отменена</h1>
      <p className="text-zinc-600">Вы можете вернуться к оформлению заказа и выбрать другой способ или попробовать ещё раз.</p>
      <Link href="/checkout" className="inline-block mt-6 rounded-xl bg-black text-white px-5 py-3">
        Вернуться к заказу
      </Link>
    </div>
  );
}
