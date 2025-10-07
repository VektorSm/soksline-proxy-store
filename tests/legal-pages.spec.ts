import { test, expect } from '@playwright/test';

const legacyRoutes = ['/privacy', '/tos', '/aup', '/refund'];

test('legacy legal pages render EN by default with ToC items linking to anchors', async ({ page }) => {
  for (const r of legacyRoutes) {
    await page.goto(r);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    const toc = page.getByRole('navigation', { name: /Contents/i });
    await expect(toc).toBeVisible();
    const firstLink = toc.locator('a').first();
    const href = await firstLink.getAttribute('href');
    expect(href?.startsWith('#')).toBeTruthy();
    await firstLink.click();
    await expect(page.locator(`section${href}`)).toBeVisible();
  }
});

test('AML policy page exposes metadata, version badge, and print action', async ({ page }) => {
  await page.goto('/aml');

  const heading = page.getByRole('heading', {
    level: 1,
    name: 'AML / ПОД–ФТ Политика — v1.2 (MAIN)',
  });
  await expect(heading).toBeVisible();

  await expect(page.getByText('Последнее обновление:', { exact: false })).toBeVisible();
  await expect(page.getByText('v1.2 (MAIN)', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Print this page' })).toBeVisible();
});
