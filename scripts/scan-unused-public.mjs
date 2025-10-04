import { readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';

const publicDir = 'public';
const codeDirs = ['app', 'components', 'src'];

const files = [];
(function walk(dir) {
  for (const file of readdirSync(dir)) {
    const path = join(dir, file);
    if (statSync(path).isDirectory()) {
      walk(path);
    } else {
      files.push(path);
    }
  }
})(publicDir);

const code = codeDirs
  .flatMap((dir) => {
    try {
      return [readFileSync(dir, 'utf8')];
    } catch (error) {
      return [];
    }
  })
  .join('\n');

const unused = files.filter((file) => !code.includes(file.replace(/^public/, '')));
const maybeUnused = unused.filter((file) => !/favicon|hero-placeholder/i.test(file));

console.log('Maybe unused public files:', maybeUnused);
