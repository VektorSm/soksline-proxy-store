import { test, expect } from '@playwright/test';

test('rotating cards use horizontal grid on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto('/pricing#rotating');
  const grid = page.locator('[data-layout="rotating-grid"]');
  await expect(grid).toBeVisible();
  const cards = grid.locator('article');
  expect(await cards.count()).toBeGreaterThan(2);

  const b0 = await cards.nth(0).boundingBox();
  const b1 = await cards.nth(1).boundingBox();
  expect(Math.abs((b0?.y ?? 0) - (b1?.y ?? 0))).toBeLessThan(10);
});
