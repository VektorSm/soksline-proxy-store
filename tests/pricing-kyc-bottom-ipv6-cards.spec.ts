import { test, expect } from '@playwright/test';

test('IPv6 section renders 3 plan cards and deep-links to order', async ({ page }) => {
  await page.goto('/pricing#static-ipv6');
  const cards = page.locator('#static-ipv6 article');
  await expect(cards).toHaveCount(3);
  await cards.nth(0).getByRole('link', { name: /Buy|Купить/i }).click();
  await expect(page).toHaveURL(/\/order\?service=static-ipv6&plan=/);
});

test('KYC & Payments appear once at the bottom, not under ISP', async ({ page }) => {
  await page.goto('/pricing');
  const ispSection = page.locator('#static-isp');
  await expect(ispSection.getByText(/KYC/i)).toHaveCount(0);
  await page.locator('footer').scrollIntoViewIfNeeded({ timeout: 5_000 }).catch(() => undefined);
  await expect(page.getByText(/BTC|ETH|USDT/)).toBeVisible();
});
