import { existsSync } from 'node:fs';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

function getBrowsersBasePath(): string {
  const override = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (override && override !== '') {
    if (override === '0') {
      return path.join(process.cwd(), 'node_modules', '@playwright', 'test');
    }
    return path.resolve(override);
  }

  if (process.platform === 'win32') {
    const localAppData = process.env.LOCALAPPDATA ?? path.join(os.homedir(), 'AppData', 'Local');
    return path.join(localAppData, 'ms-playwright');
  }

  if (process.platform === 'darwin') {
    return path.join(os.homedir(), 'Library', 'Caches', 'ms-playwright');
  }

  return path.join(os.homedir(), '.cache', 'ms-playwright');
}

async function hasRequiredBrowsers(dir: string): Promise<boolean> {
  try {
    const entries = await readdir(dir);
    if (!entries.length) {
      return false;
    }
    const prefixes = ['chromium', 'chromium_headless_shell', 'firefox', 'webkit'];
    return prefixes.every((prefix) => entries.some((name) => name.startsWith(prefix)));
  } catch {
    return false;
  }
}

function shouldSkipInstall(): boolean {
  const value = String(process.env.PLAYWRIGHT_SKIP_BROWSER_INSTALL ?? '').toLowerCase();
  return value === '1' || value === 'true';
}

export default async function globalSetup(): Promise<void> {
  if (shouldSkipInstall()) {
    return;
  }

  const cacheDir = getBrowsersBasePath();
  const sentinel = path.join(cacheDir, '.browsers-installed-v2');

  if (existsSync(sentinel) && (await hasRequiredBrowsers(cacheDir))) {
    return;
  }

  const npxExecutable = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const args = ['--yes', 'playwright', 'install'];
  const env = { ...process.env };
  if (process.platform === 'linux' && !env.DEBIAN_FRONTEND) {
    env.DEBIAN_FRONTEND = 'noninteractive';
  }

  if (process.platform === 'linux') {
    const depsResult = spawnSync(npxExecutable, ['--yes', 'playwright', 'install-deps'], {
      stdio: 'inherit',
      shell: false,
      env,
    });

    if (depsResult.error) {
      throw depsResult.error;
    }

    if (depsResult.status !== 0) {
      throw new Error(`playwright install-deps exited with status ${depsResult.status}`);
    }
  }

  const result = spawnSync(npxExecutable, args, {
    stdio: 'inherit',
    shell: false,
    env,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`playwright install exited with status ${result.status}`);
  }

  await mkdir(cacheDir, { recursive: true });
  await writeFile(sentinel, new Date().toISOString());
}
