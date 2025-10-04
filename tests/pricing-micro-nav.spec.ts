import { test, expect } from '@playwright/test';

test('micro-nav scrolls to anchors and highlights active item', async ({ page }) => {
  await page.goto('/pricing');
  const nav = page.getByRole('navigation', { name: /Pricing sections/i });

  await nav.getByRole('button', { name: /Static IPv6|Static Residential IPv6/ }).click();
  await expect(page).toHaveURL(/#static-ipv6/);
  await expect(page.locator('#static-ipv6')).toBeVisible();

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
  const rotatingBtn = nav.getByRole('button', { name: /Rotating/ });
  await expect(rotatingBtn).toHaveAttribute('aria-current', 'true');
});
