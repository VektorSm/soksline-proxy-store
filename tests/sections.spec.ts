import { test, expect } from '@playwright/test';

test('sections alternate backgrounds and contain no hr elements', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('section');

  const hrs = await page.locator('hr').count();
  expect(hrs).toBe(0);

  const sections = page.locator('section');
  const count = await sections.count();
  expect(count).toBeGreaterThan(1);

  const hasMuted = await page.locator("section.bg-gray-50, section[data-variant='muted']").count();
  const hasWhite = await page.locator("section.bg-white, section[data-variant='white']").count();
  expect(hasMuted).toBeGreaterThan(0);
  expect(hasWhite).toBeGreaterThan(0);
});
