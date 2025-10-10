import { test, expect } from '@playwright/test';

const primaryNavRoutes = ['/pricing', '/contact'];
const docsMenu: Array<{ href: string; label: string }> = [
  { href: '/aml', label: 'AML Policy' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/tos', label: 'Terms' },
  { href: '/aup', label: 'AUP' },
  { href: '/refund', label: 'Refunds' },
];
const stubHeadings: Record<string, string> = {
  '/aml': 'AML Policy',
  '/privacy': 'Privacy Policy',
  '/tos': 'Terms of Service',
  '/aup': 'Acceptable Use Policy',
  '/refund': 'Refund & Cancellation Policy',
  '/contact': 'Contact us',
  '/login': 'Log in',
};

const routes = Object.keys(stubHeadings);

test('header links stay on the same domain', async ({ page }) => {
  await page.goto('/');

  const header = page.getByRole('banner');
  const primaryNavLinks = header.getByRole('navigation', { name: 'Primary' }).locator('a');
  await expect(primaryNavLinks).toHaveCount(primaryNavRoutes.length);

  for (let i = 0; i < primaryNavRoutes.length; i += 1) {
    const link = primaryNavLinks.nth(i);
    await expect(link).toHaveAttribute('href', primaryNavRoutes[i]);
    await expect(link).not.toHaveAttribute('target', '_blank');
  }

  const docsButton = header.getByRole('button', { name: /docs/i });
  await expect(docsButton).toBeVisible();
  await docsButton.click();

  for (const { href, label } of docsMenu) {
    const item = header.getByRole('menuitem', { name: label });
    await expect(item).toHaveAttribute('href', href);
    await expect(item).not.toHaveAttribute('target', '_blank');
  }

  const loginLink = header.getByRole('link', { name: /log in/i });
  await expect(loginLink).toHaveAttribute('href', '/login');
  await expect(loginLink).not.toHaveAttribute('target', '_blank');
});

test('hero CTA keeps internal navigation safe', async ({ page }) => {
  await page.goto('/');

  const primaryCta = page.getByRole('link', { name: /buy now/i });
  await expect(primaryCta).toHaveAttribute(
    'href',
    '/order?service=static-isp&plan=basic&duration=monthly',
  );
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
  const header = page.getByRole('banner');

  await header.getByRole('button', { name: 'RU' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'AML Политика' })).toBeVisible();

  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'AML Политика' })).toBeVisible();
});
