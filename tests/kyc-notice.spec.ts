import { test, expect } from '@playwright/test';

const maybeRoutes = [
  '/',
  '/pricing',
  '/products/rotating-residential',
  '/products/static-residential',
  '/products/isp-proxies',
]; // при наличии продуктовых страниц можно расширить

for (const r of maybeRoutes) {
  test(`KYC notice appears on ${r}`, async ({ page }) => {
    const url = r.includes('?') ? `${r}&lang=en` : `${r}?lang=en`;
    await page.goto(url);
    // ищем ключевую фразу (локализация по умолчанию EN)
    await expect(page.getByText('No KYC for basic plans', { exact: false }).first()).toBeVisible();
  });
}
