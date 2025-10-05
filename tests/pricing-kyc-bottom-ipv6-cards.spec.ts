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
  const rotatingSection = page.locator('#rotating');
  const footerNotice = page.getByTestId('pricing-kyc-notice').first();
  const payments = page.getByTestId('payments-security').first();

  await expect(page.getByTestId('pricing-kyc-notice')).toHaveCount(1);
  await expect(page.getByTestId('payments-security')).toHaveCount(1);

  const [rotatingBox, noticeBox, paymentsBox] = await Promise.all([
    rotatingSection.boundingBox(),
    footerNotice.boundingBox(),
    payments.boundingBox(),
  ]);

  expect(rotatingBox).toBeTruthy();
  expect(noticeBox).toBeTruthy();
  expect(paymentsBox).toBeTruthy();

  if (!rotatingBox || !noticeBox || !paymentsBox) return;

  expect(noticeBox.y).toBeGreaterThan(rotatingBox.y);
  expect(paymentsBox.y).toBeGreaterThan(rotatingBox.y);
});
