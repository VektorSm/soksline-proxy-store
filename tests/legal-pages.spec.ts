import { test, expect } from '@playwright/test';

const routes = ['/aml', '/privacy', '/tos', '/aup', '/refund'];

test('legal pages render EN by default with ToC items linking to anchors', async ({ page }) => {
  for (const r of routes) {
    await page.goto(r);
    // h1 present
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // ToC exists and first link scrolls to a section
    const toc = page.getByRole('navigation', { name: /Contents/i });
    await expect(toc).toBeVisible();
    const firstLink = toc.locator('a').first();
    const href = await firstLink.getAttribute('href');
    expect(href?.startsWith('#')).toBeTruthy();
    await firstLink.click();
    await expect(page.locator(`section${href}`)).toBeVisible();
  }
});

test('RU locale shows RU titles', async ({ page }) => {
  await page.goto('/aml?lang=ru');
  await expect(page.getByRole('heading', { level: 1, name: 'AML Политика' })).toBeVisible();
});
