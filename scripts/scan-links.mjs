import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const roots = ['app', 'components', 'src'];
const files = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walk(fullPath);
    } else if (/\.(tsx?|jsx?)$/.test(fullPath)) {
      files.push(fullPath);
    }
  }
}

for (const root of roots) {
  try {
    walk(root);
  } catch (error) {
    // ignore missing directories
  }
}

let issues = 0;
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const rx = /<Link[^>]*href={(?:"|'|`)?(https?:\/\/[^"'`}\}]*)/g;
  let match;
  while ((match = rx.exec(text))) {
    const chunk = text.slice(match.index, match.index + 200);
    if (!/rel=.*noopener noreferrer/.test(chunk) || !/target=.*_blank/.test(chunk)) {
      console.log('WARN external link without security attrs in', file, '→', match[1]);
      issues++;
    }
  }
}

if (issues) {
  process.exitCode = 1;
}
