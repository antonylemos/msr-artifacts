import { existsSync, copyFileSync, mkdirSync, rmSync, cpSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const remotes = ['mf_remote_a', 'mf_remote_b', 'mf_remote_c'];
const stageDir = join(root, 'gh-pages-dist');

rmSync(stageDir, { recursive: true, force: true });
mkdirSync(stageDir, { recursive: true });
const hostBrowser = join(root, 'dist/apps/main-host/browser');
if (!existsSync(hostBrowser)) {
  console.error('Missing host build output. Run pnpm run gh-build first.');
  process.exit(1);
}
cpSync(hostBrowser, stageDir, { recursive: true });
for (const name of remotes) {
  const src = join(root, 'dist/apps', name, 'browser');
  if (!existsSync(src)) {
    console.error(`Missing remote build output: ${src}`);
    process.exit(1);
  }
  cpSync(src, join(stageDir, name), { recursive: true });
}
copyFileSync(join(stageDir, 'index.html'), join(stageDir, '404.html'));
writeFileSync(join(stageDir, '.nojekyll'), '');
