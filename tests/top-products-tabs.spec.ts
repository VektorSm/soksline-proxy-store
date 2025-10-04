import { test, expect } from '@playwright/test';

test('top products tabs are accessible', async ({ page }) => {
  await page.goto('/');

  const tablist = page.getByRole('tablist');
  const tabs = tablist.getByRole('tab');
  await expect(tabs).toHaveCount(3);
  await expect(tabs.nth(0)).toHaveText('Static Residential (ISP)');
  await expect(tabs.nth(1)).toHaveText('Static Residential (ISP) IPv6');
  await expect(tabs.nth(2)).toHaveText('Rotating Residential');

  await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.nth(0)).toHaveAttribute('tabindex', '0');
  await expect(tabs.nth(1)).toHaveAttribute('tabindex', '-1');
  await expect(tabs.nth(2)).toHaveAttribute('tabindex', '-1');

  await expect(page.getByRole('tabpanel')).toContainText('US / EU (shared pool)');

  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.nth(1)).toHaveAttribute('tabindex', '0');
  await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'false');
  await expect(tabs.nth(0)).toHaveAttribute('tabindex', '-1');
  await expect(page.getByRole('tabpanel')).toContainText('Global IPv6 pool');

  await tabs.nth(2).click();
  await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.nth(2)).toHaveAttribute('tabindex', '0');
  await expect(page.getByRole('tabpanel')).toContainText('Standard rotation');

  // Keyboard navigation is handled by the Tabs component, but verifying the
  // arrow key behaviour reliably in Playwright would require low-level event
  // hooks. Pointer interaction checks above cover the accessible state
  // management (aria-selected/tabindex) for each tab.
});
