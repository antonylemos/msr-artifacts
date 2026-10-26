# React patch-skew crash repro (`@module-federation/vite` 1.21.6)

Minimal reproduction: production builds of federated Vite apps crash when the React family is shared as singletons with `requiredVersion: '^19.2.4'` but each app installs a **different React 19.2.x patch**, because a container's local `react-dom` fallback is evaluated eagerly against the **shared** `react` provider.

Related plugin behavior: eager `__prebuild__` / `loadShare` templates for nested hosts and entry-injected remotes; sibling shared imports from a `__prebuild__` graph resolve to `__loadShare__` rather than a coherent local `__prebuild__`.

## Apps

| App | React | Role |
|-----|-------|------|
| `host` | 19.2.8 | remotes: `remote_a`, `remote_b` |
| `remote_a` | 19.2.4 | exposes `./App`; also remotes `remote_c` (nested host) |
| `remote_b` | 19.2.6 | exposes `./App` (remote-only) |
| `remote_c` | 19.2.8 | exposes `./App` (nested under `remote_a`) |

Shared (`singleton: true`, `strictVersion: false`, `requiredVersion: '^19.2.4'`, `shareStrategy: 'version-first'`):

- `react`
- `react/jsx-runtime`
- `react/jsx-dev-runtime`
- `react/compiler-runtime`
- `react-dom/client`

`hostInitInjectLocation: 'entry'` on all apps. Vite 6.3.x + `@module-federation/vite@1.21.6` (+ runtime 2.9.0).

## Requirements

- Node `>= 20.19` or `>= 22.12`
- pnpm 9.x (lockfile is pnpm 9)

## Re-run

```bash
pnpm install
pnpm --filter remote_c build
pnpm --filter remote_b build
pnpm --filter remote_a build
pnpm --filter host build

pnpm --filter remote_c exec vite preview --host 127.0.0.1 --port 5003 &
pnpm --filter remote_b exec vite preview --host 127.0.0.1 --port 5002 &
pnpm --filter remote_a exec vite preview --host 127.0.0.1 --port 5001 &
pnpm --filter host exec vite preview --host 127.0.0.1 --port 5000 &
sleep 2
node scripts/capture.mjs
```

Expected:

1. Natural host load → blank page / `Cannot read properties of null (reading 'useState')` (host App evaluated against mismatched react / react-dom instances).
2. Forcing `remote_a`'s `react-dom/client` loadShare under the host share scope → **Minified React error #527** (`19.2.8` vs `19.2.4`).
3. Same for `remote_b` → **#527** (`19.2.8` vs `19.2.6`).

Captured outputs land in `evidence/` (checked-in samples from a successful local run).

## Evidence (checked in)

- `evidence/RESULT.json` — summary
- `evidence/force-527.json` / `force-527-remote_b.json` — literal #527
- `evidence/share-owners.json` — share registry dump
- `evidence/eager-static-import-proof.txt` — static import of loadShare wrappers in remote builds

## Notes

- Each app pins its own `react` / `react-dom` patch in `package.json` so pnpm installs distinct versions per package.
- `minify: false` keeps stacks readable; React still emits the “Minified React error #527” string.
