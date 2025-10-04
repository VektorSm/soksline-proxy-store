import { test, expect } from '@playwright/test';

test('hero renders with EN by default and CTAs present', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'SOCKS5 proxy store' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Buy now' })).toHaveAttribute('href', '/pricing');
  await expect(page.getByRole('link', { name: 'Contact sales' })).toHaveAttribute('href', '/contact');
  // badge visible
  await expect(page.getByText('180+ locations')).toBeVisible();
});

test('RU locale switches CTA labels', async ({ page }) => {
  await page.goto('/?lang=ru');
  await expect(page.getByRole('heading', { name: 'Магазин прокси SOCKS5' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Купить' })).toHaveAttribute('href', '/pricing');
  await expect(page.getByRole('link', { name: 'Связаться' })).toHaveAttribute('href', '/contact');
});
