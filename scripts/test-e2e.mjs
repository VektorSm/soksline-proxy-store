#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: false });
    child.on('close', (code, signal) => {
      if (code === 0) {
        resolve();
      } else {
        const message = signal
          ? `${command} ${args.join(' ')} exited with signal ${signal}`
          : `${command} ${args.join(' ')} exited with code ${code}`;
        reject(Object.assign(new Error(message), { code, signal }));
      }
    });
    child.on('error', reject);
  });
}

const extraArgs = process.argv.slice(2);
const installDepsSentinel = path.join(os.homedir(), '.cache', 'ms-playwright', '.deps-installed');
const skipInstallDeps = ['1', 'true'].includes(
  String(process.env.PLAYWRIGHT_SKIP_INSTALL_DEPS || '').toLowerCase(),
);

if (process.platform === 'linux' && !skipInstallDeps) {
  let shouldInstallDeps = false;
  try {
    await fs.access(installDepsSentinel);
  } catch {
    shouldInstallDeps = true;
  }

  if (shouldInstallDeps) {
    try {
      await run('pnpm', ['exec', 'playwright', 'install-deps']);
      await fs.mkdir(path.dirname(installDepsSentinel), { recursive: true });
      await fs.writeFile(installDepsSentinel, 'installed');
    } catch (error) {
      console.warn('Failed to install Playwright OS dependencies automatically.');
      console.warn('You may need to run "pnpm exec playwright install-deps" manually.');
      throw error;
    }
  }
} else if (skipInstallDeps) {
  console.warn('Skipping Playwright dependency installation because PLAYWRIGHT_SKIP_INSTALL_DEPS is set.');
}

await run('pnpm', ['exec', 'playwright', 'install']);
await run('pnpm', ['exec', 'playwright', 'test', ...extraArgs]);
