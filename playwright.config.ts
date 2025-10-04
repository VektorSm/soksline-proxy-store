import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:3000',
  },
  webServer: {
    command: 'pnpm exec next build && pnpm exec next start --hostname 0.0.0.0 --port 3000',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  globalSetup: './tests/playwright-global-setup.ts',
});
