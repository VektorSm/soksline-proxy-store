import { test, expect } from '@playwright/test';

test('IPv6 section renders 3 plan cards and deep-links to order', async ({ page }) => {
  await page.goto('/pricing#static-ipv6');
  const cards = page.locator('#static-ipv6 article');
  await expect(cards).toHaveCount(3);
  const firstCta = cards.nth(0).getByRole('link', { name: /Buy|Купить/i });
  const href = await firstCta.getAttribute('href');
  expect(href).toBeTruthy();
  expect(href).toContain('service=static-ipv6');
  expect(href).toMatch(/plan=(basic|dedicated|premium)/);
  expect(href).toContain('duration=monthly');
});

test('KYC & Payments appear once at the bottom, not under ISP', async ({ page }) => {
  await page.goto('/pricing');
  const ispSection = page.locator('#static-isp');
  await expect(ispSection.getByTestId('pricing-kyc-notice')).toHaveCount(0);
  await page.locator('footer').scrollIntoViewIfNeeded({ timeout: 5_000 }).catch(() => undefined);
  await expect(page.getByTestId('pricing-kyc-notice')).toHaveCount(1);
  await expect(page.getByTestId('payments-security')).toBeVisible();
});
