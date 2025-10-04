import { test, expect } from '@playwright/test';

const navRoutes = ['/pricing', '/contact', '/aml', '/privacy', '/tos', '/aup', '/refund'];
const stubHeadings: Record<string, string> = {
  '/aml': 'AML Policy',
  '/privacy': 'Privacy Policy',
  '/tos': 'Terms of Service',
  '/aup': 'Acceptable Use Policy',
  '/refund': 'Refund Policy',
  '/contact': 'Contact us',
  '/login': 'Log in',
};

const routes = Object.keys(stubHeadings);

test('header links stay on the same domain', async ({ page }) => {
  await page.goto('/');

  const navLinks = page.locator('header nav a');
  await expect(navLinks).toHaveCount(navRoutes.length);

  for (let i = 0; i < navRoutes.length; i += 1) {
    const link = navLinks.nth(i);
    await expect(link).toHaveAttribute('href', navRoutes[i]);
    await expect(link).not.toHaveAttribute('target', '_blank');
  }

  const loginLink = page.getByRole('banner').getByRole('link', { name: /log in/i });
  await expect(loginLink).toHaveAttribute('href', '/login');
  await expect(loginLink).not.toHaveAttribute('target', '_blank');
});

test('hero CTA keeps internal navigation safe', async ({ page }) => {
  await page.goto('/');

  const primaryCta = page.getByRole('link', { name: /buy now/i });
  await expect(primaryCta).toHaveAttribute('href', '/pricing');
  await expect(primaryCta).not.toHaveAttribute('target', /.+/);
  await expect(primaryCta).not.toHaveAttribute('rel', /.+/);
});

test('legal and contact/login pages render', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1, name: stubHeadings[route] })).toBeVisible();
  }
});

test('language switcher works on stubs', async ({ page }) => {
  await page.goto('/aml');
  await page.getByRole('main').getByRole('button', { name: 'RU' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'AML Политика' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'AML Политика' })).toBeVisible();
});
