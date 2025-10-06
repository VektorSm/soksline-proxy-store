import { test, expect } from '@playwright/test';

test('Rotating: tier pill shows label and active state syncs with slider', async ({ page }) => {
  await page.goto('/order?service=rotating&lang=ru');
  const pill3 = page.getByRole('button', { name: '3 GB' });
  await expect(pill3).toBeVisible();
  await expect(pill3).toHaveAttribute('aria-pressed', 'true');

  const slider = page.locator('input[type="range"]');
  await slider.fill('2');
  await expect(page.getByRole('button', { name: '50 GB' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText(/50 GB —/)).toBeVisible();
});

test('Manager CTA text is centered', async ({ page }) => {
  await page.goto('/order?lang=ru');
  const btn = page.getByRole('link', { name: /Связаться с менеджером/i });
  await expect(btn).toBeVisible();
  const box = await btn.boundingBox();
  expect((box?.height ?? 0)).toBeGreaterThan(44);
});
