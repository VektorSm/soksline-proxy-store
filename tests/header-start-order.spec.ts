import { test, expect } from '@playwright/test';

test('header CTA opens /order with defaults', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Start order|Оформить заказ/ }).click();
  await expect(page).toHaveURL(/\/order\?service=static-isp&plan=basic&duration=monthly/);
});

test('hero Buy now leads to /order', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Buy now|Купить/ }).click();
  await expect(page).toHaveURL(/\/order\?/);
});
