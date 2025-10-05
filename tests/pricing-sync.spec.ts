import { test, expect } from '@playwright/test';

test('pricing shows Static ISP plans Basic/Dedicated/Premium with correct prices and deep-links', async ({ page }) => {
  await page.goto('/pricing#static-isp');
  const section = page.locator('#static-isp');

  await expect(section.locator('article')).toHaveCount(3);
  await expect(section.getByRole('heading', { name: 'Basic' })).toBeVisible();
  await expect(section.getByRole('heading', { name: 'Dedicated' })).toBeVisible();
  await expect(section.getByRole('heading', { name: 'Premium' })).toBeVisible();

  await expect(section.getByText('$1.95', { exact: false })).toBeVisible();
  await expect(section.getByText('$3.95', { exact: false })).toBeVisible();
  await expect(section.getByText('$5.47', { exact: false })).toBeVisible();

  const firstCta = section.getByRole('link', { name: /Buy Now|Купить/ }).first();
  await expect(firstCta).toHaveAttribute('href', /service=static-isp&plan=/);
});

test('ipv6 block shows Basic/Dedicated/Premium plan cards with pricing and order links', async ({ page }) => {
  await page.goto('/pricing#static-ipv6');
  const section = page.locator('#static-ipv6');

  await expect(section.locator('article')).toHaveCount(3);
  await expect(section.getByRole('heading', { name: 'Basic' })).toBeVisible();
  await expect(section.getByRole('heading', { name: 'Dedicated' })).toBeVisible();
  await expect(section.getByRole('heading', { name: 'Premium' })).toBeVisible();

  const priceProbe = section.locator('article').first().getByText(/\$\d|from \$/);
  await expect(priceProbe.first()).toBeVisible();

  const ctas = section.getByRole('link', { name: /Buy Now|Купить/ });
  await expect(ctas).toHaveCount(3);
  await expect(ctas.first()).toHaveAttribute('href', /service=static-ipv6&plan=.+&duration=monthly/);
});

test('rotating tiers render with $/GB + Total', async ({ page }) => {
  await page.goto('/pricing#rotating');
  await expect(page.getByText('/ GB (Total $', { exact: false }).first()).toBeVisible();
});
