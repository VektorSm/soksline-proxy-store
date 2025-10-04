import { test, expect } from '@playwright/test';

test.describe('i18n basics', () => {
  test('EN by default, RU persists across navigation', async ({ page }) => {
    // по умолчанию EN
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Buy now' })).toBeVisible();

    // переключаем на RU
    await page.getByRole('button', { name: 'RU' }).click();
    await expect(page.getByRole('link', { name: 'Купить' })).toBeVisible();
    expect(page.url()).toContain('lang=ru');

    // переход на /contact сохраняет язык
    await page.getByRole('link', { name: /Contact|Контакты/ }).click();
    await expect(
      page.getByRole('heading', { level: 1, name: /Свяжитесь с нами|Contact us/ }),
    ).toBeVisible();
    expect(page.url()).toContain('lang=ru');

    // возврат на главную — язык остаётся RU
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Купить' })).toBeVisible();

    // переключаем обратно на EN
    await page.getByRole('button', { name: 'EN' }).click();
    await expect(page.getByRole('link', { name: 'Buy now' })).toBeVisible();
    expect(page.url()).toContain('lang=en');
  });

  test('KYC text is localized', async ({ page }) => {
    await page.goto('/'); // EN
    await expect(page.getByText('No KYC for basic plans', { exact: false })).toBeVisible();

    await page.goto('/?lang=ru');
    await expect(page.getByText('Без KYC для базовых планов', { exact: false })).toBeVisible();
  });
});
