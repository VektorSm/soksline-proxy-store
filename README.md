# SoksLine Proxy Store

Next.js (App Router) демо витрина для магазина прокси.

## Скрипты

```bash
npm install       # установка зависимостей
npm run dev       # запуск development-сервера
npm run lint      # проверка ESLint
npm run build     # production-сборка
npm test          # unit-тесты Vitest
```

## Переменные окружения

- `NEXT_PUBLIC_BOT_URL` — ссылка на Telegram-бот, которая будет открываться из CTA на главной странице. По умолчанию используется заглушка `https://t.me/your_proxy_bot`.
