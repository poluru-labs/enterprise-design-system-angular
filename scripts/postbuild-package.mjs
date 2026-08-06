/**
 * Patch dist/package.json after ng-packagr so the publishable package:
 * - does not inherit a root-only `files` field that breaks `npm publish ./dist`
 * - exposes design-token / global CSS via package `exports`
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkgPath = resolve(root, 'dist/package.json');

if (!existsSync(pkgPath)) {
  console.error('postbuild-package: dist/package.json not found. Run the library build first.');
  process.exit(1);
}

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

// Root package.json may declare files for a nested dist layout; that must not ship in dist/.
delete pkg.files;

const tokenCss = './src/lib/tokens/index.css';
const globalCss = './src/lib/styles/global.css';

for (const rel of [tokenCss, globalCss]) {
  if (!existsSync(resolve(root, 'dist', rel))) {
    console.error(`postbuild-package: missing asset ${rel}`);
    process.exit(1);
  }
}

pkg.exports = {
  ...(pkg.exports ?? {}),
  './tokens.css': {
    default: tokenCss,
  },
  './styles.css': {
    default: globalCss,
  },
  './tokens/*': {
    default: './src/lib/tokens/*',
  },
};

writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
console.log('postbuild-package: updated dist/package.json exports and removed files field');
