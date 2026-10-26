import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function runBuild() {
  if (process.env.SKIP_GH_BUILD === '1') {
    return;
  }
  const r = spawnSync('pnpm', ['run', 'gh-build'], {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  });
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
}

function stage() {
  const r = spawnSync('pnpm', ['run', 'gh-stage'], {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  });
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
}

function publish() {
  const r = spawnSync(
    'pnpm',
    ['exec', 'gh-pages', '-d', 'gh-pages-dist', '-t', '--nojekyll'],
    { cwd: root, stdio: 'inherit' }
  );
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
}

runBuild();
stage();
publish();
