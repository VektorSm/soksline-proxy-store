import { test, expect } from '@playwright/test';

test('Plan prices aligned; unit does not wrap', async ({ page }) => {
  await page.goto('/order?service=static-ipv6&lang=ru');
  const cards = page.locator('[data-test="plan-card"]');
  const y0 = (await cards.nth(0).locator('h3').boundingBox())!.y;
  const y1 = (await cards.nth(1).locator('h3').boundingBox())!.y;
  expect(Math.abs(y0 - y1)).toBeLessThan(4);
  await expect(cards.nth(0).locator('text=за прокси / мес')).toHaveCSS('white-space', 'nowrap');
});

test('Auto-renew switch toggles and is visible', async ({ page }) => {
  await page.goto('/order?lang=ru');
  const sw = page.getByRole('switch', { name: /автопрод/i });
  await expect(sw).toBeVisible();
  const aria1 = await sw.getAttribute('aria-checked');
  await sw.click();
  const aria2 = await sw.getAttribute('aria-checked');
  expect(aria1).not.toBe(aria2);
});
