# SoksLine proxy store — MVP

Магазин прокси на Next.js (App Router).

## Стек

Next.js + React + Tailwind, Playwright, ESLint, Prettier, pnpm.

## Запуск

```bash
pnpm install
pnpm dev
```

## Скрипты

```bash
pnpm lint            # ESLint
pnpm typecheck       # TS --noEmit
pnpm build           # next build
pnpm test:e2e        # Playwright e2e
pnpm format          # Prettier write
pnpm scan:links      # проверка внешних ссылок
pnpm scan:public     # подсказка по неиспользуемым ассетам
```

## i18n (EN/RU)

Локали: `locales/en.json`, `locales/ru.json`, провайдер `I18nProvider`, переключатель `LanguageSwitcher`.
Ключи: `nav.*`, `hero.*`, `tabs.*`, `pages.*`.

## UI/UX гайд

- Разделители секций — только компонент `Section` (`bg-white`/`bg-gray-50`, `py-*`).
- Табы — доступность WAI-ARIA + управление с клавиатуры.
- CTA: Primary → `/pricing`, Secondary → `/contact`.

## KYC/Policies

Единая формулировка в `config/policies.ts` + i18n.
Шаблоны страниц: `/aml`, `/privacy`, `/tos`, `/aup`, `/refund`.

## Contributing

- Ветки: `feat/*`, `fix/*`, `chore/*`, `docs/*`, `test/*`, `ci/*`.
- Коммиты: Conventional Commits (`feat: ...`, `fix: ...`, `chore: ...`).
- Перед PR: прогнать `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test:e2e`, приложить скриншоты UI (если меняли), проверить внешние ссылки и что домен не ломается.
- Следовать чек-листу PR-шаблона.

## Лицензия

Добавить при необходимости.
