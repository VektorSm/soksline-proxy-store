import { test, expect } from '@playwright/test';

test('contact form validates and shows success (stub)', async ({ page }) => {
  await page.goto('/contact');

  await page.getByRole('button', { name: /Send|Отправить/ }).click();
  await expect(page.getByText(/enter your name|укажите имя/i)).toBeVisible();

  await page.getByLabel(/Your name|Имя/).fill('Alex');
  await page.getByLabel(/Email/i).fill('alex@example.com');
  await page.getByLabel(/Message|Сообщение/).fill('Hello there, need help.');
  await page.getByRole('button', { name: /Send|Отправить/ }).click();
  await expect(page.getByText(/Thanks|Спасибо/i)).toBeVisible();
});
