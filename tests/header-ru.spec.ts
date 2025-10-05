import { test, expect } from '@playwright/test';

test('RU header fits and groups legal links under Документы', async ({ page }) => {
  await page.goto('/?lang=ru');

  const header = page.getByRole('banner');

  await expect(header.getByRole('link', { name: 'Цены' })).toBeVisible();
  await expect(header.getByRole('link', { name: 'Контакты' })).toBeVisible();
  await expect(header.getByRole('button', { name: 'Документы' })).toBeVisible();
  await expect(header.getByRole('link', { name: 'Заказ' })).toBeVisible();

  await header.getByRole('button', { name: 'Документы' }).click();
  for (const name of ['AML', 'Приватность', 'Условия', 'AUP', 'Возвраты']) {
    await expect(header.getByRole('menuitem', { name })).toBeVisible();
  }
});
