import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const remotes = ['mf_remote_a', 'mf_remote_b', 'mf_remote_c'];

function normalizeBase(value) {
  let s = value.trim();
  if (!s.startsWith('/')) {
    s = `/${s}`;
  }
  if (!s.endsWith('/')) {
    s = `${s}/`;
  }
  return s;
}

function getBase() {
  const manual = process.env.GH_PAGES_BASE;
  if (manual) {
    return normalizeBase(manual);
  }
  const repo = process.env.GITHUB_REPOSITORY;
  if (repo) {
    const name = repo.split('/')[1];
    if (name) {
      return normalizeBase(`/${name}`);
    }
  }
  console.error(
    'Set GH_PAGES_BASE (example: /my-repo/) for a project site, or / for a user/org root site. In GitHub Actions, GITHUB_REPOSITORY is set automatically.'
  );
  process.exit(1);
}

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: root, stdio: 'inherit' });
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
}

const base = getBase();

run('pnpm', ['exec', 'nx', 'run', 'common-ui-lib:build']);

run('pnpm', ['exec', 'nx', 'run', 'main-host:build', '--', `--baseHref=${base}`]);

for (const name of remotes) {
  run('pnpm', ['exec', 'nx', 'run', `${name}:build`, '--', `--baseHref=${base}${name}/`]);
}

const manifest = {
  mf_remote_a: `${base}mf_remote_a/remoteEntry.json`,
  mf_remote_b: `${base}mf_remote_b/remoteEntry.json`,
  mf_remote_c: `${base}mf_remote_c/remoteEntry.json`,
};

const manifestPath = join(root, 'dist/apps/main-host/browser/federation.manifest.json');
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, '\t')}\n`);
