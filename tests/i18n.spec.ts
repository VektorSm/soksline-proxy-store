import { test, expect } from '@playwright/test';

test('i18n switch persists', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Buy now' })).toBeVisible();

  await page.getByRole('button', { name: 'RU' }).click();
  await expect(page.getByRole('link', { name: 'Купить' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('link', { name: 'Купить' })).toBeVisible();
  await expect(page).toHaveURL(/lang=ru/);

  await page.getByRole('button', { name: 'EN' }).click();
  await expect(page.getByRole('link', { name: 'Buy now' })).toBeVisible();
  await expect(page).toHaveURL(/lang=en/);
});
