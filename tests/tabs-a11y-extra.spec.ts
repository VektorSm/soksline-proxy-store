import { test, expect } from '@playwright/test';

test.describe('Top Products tabs — ARIA & keyboard', () => {
  test('roving tabindex + aria linking', async ({ page }) => {
    await page.goto('/');

    const tablist = page.getByRole('tablist').first();
    const tabs = tablist.getByRole('tab');
    await expect(tabs).toHaveCount(3);

    // только активный tab имеет tabIndex=0
    const t0 = tabs.nth(0);
    const t1 = tabs.nth(1);
    await expect(t0).toHaveAttribute('tabindex', '0');
    await expect(t1).toHaveAttribute('tabindex', '-1');

    // связка aria-controls / aria-labelledby
    const id0 = await t0.getAttribute('id');
    const controls0 = await t0.getAttribute('aria-controls');
    const panel0 = page.locator(`#${controls0}`);
    await expect(panel0).toHaveAttribute('aria-labelledby', id0!);

    // только активная панель видима
    await expect(panel0).toBeVisible();
    const panel1 = page.locator(`#${await t1.getAttribute('aria-controls')}`);
    await expect(panel1).toBeHidden();
  });

  test('keyboard: Arrow keys + Home/End cycle correctly', async ({ page }) => {
    await page.goto('/');
    const tabs = page.getByRole('tablist').first().getByRole('tab');

    await tabs.nth(0).focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('End');
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('Home');
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

    // wrap-around
    await page.keyboard.press('ArrowLeft');
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
  });
});
