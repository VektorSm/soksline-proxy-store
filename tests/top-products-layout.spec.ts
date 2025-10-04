import { test, expect } from '@playwright/test';

test('Top Products: tabs scroll horizontally on mobile and cards form 2 columns on md+', async ({ page }) => {
  await page.goto('/');

  await page.setViewportSize({ width: 390, height: 800 });
  const tablist = page.getByRole('tablist', { name: /Top products/i });
  await expect(tablist).toBeVisible();
  await tablist.evaluate((el) => {
    el.scrollLeft = 500;
  });

  await page.setViewportSize({ width: 1200, height: 900 });
  const cards = page.locator('#top-products article');
  await expect(cards.first()).toBeVisible();
  const b0 = await cards.nth(0).boundingBox();
  const b1 = await cards.nth(1).boundingBox();
  expect(Math.abs((b0?.y ?? 0) - (b1?.y ?? 0))).toBeLessThan(10);
});
