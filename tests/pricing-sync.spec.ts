import { test, expect } from '@playwright/test';

test('pricing shows Static ISP plans Basic/Dedicated/Premium with correct prices and deep-links', async ({ page }) => {
  await page.goto('/pricing');
  const section = page.locator('#static-isp').first();

  await expect(section.getByRole('heading', { name: 'Basic' })).toBeVisible();
  await expect(section.getByRole('heading', { name: 'Dedicated' })).toBeVisible();
  await expect(section.getByRole('heading', { name: 'Premium' })).toBeVisible();

  await expect(section.getByText('$1.95', { exact: false })).toBeVisible();
  await expect(section.getByText('$3.95', { exact: false })).toBeVisible();
  await expect(section.getByText('$5.47', { exact: false })).toBeVisible();

  await section.getByRole('link', { name: /Buy Now/i }).first().click();
  await expect(page).toHaveURL(/\/order\?service=static-isp&plan=/);
});

test('ipv6 block shows "from $0.55 / mo" and links to order', async ({ page }) => {
  await page.goto('/pricing');
  const s = page.locator('#static-ipv6');
  await expect(s.getByText('from $0.55', { exact: false })).toBeVisible();
  await s.getByRole('link', { name: /Buy Now|Купить/ }).click();
  await expect(page).toHaveURL(/\/order\?service=static-ipv6/);
});

test('rotating tiers render with $/GB + Total', async ({ page }) => {
  await page.goto('/pricing#rotating');
  await expect(page.getByText('/ GB (Total $', { exact: false }).first()).toBeVisible();
});
