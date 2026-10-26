---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 309 — tonoizer/react-mf-patch-skew-repro

## Workspace

`pnpm-workspace.yaml:1-5` (`packages`: `host`, `remote_a`, `remote_b`, `remote_c`).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-17 (root manifest; only orchestration scripts and `playwright-core`) | — | — | — | — | No | pnpm workspace root, with neither entry nor build of its own; the scripts only delegate to packages (`package.json:6-11`). |
| host | host/index.html;host/package.json;host/vite.config.js | host/package.json:1-19 (own manifest) | host/index.html:8-9 (`#root` and `/src/main.jsx` entry); host/src/main.jsx:5-9 (mounts React) | host/vite.config.js:13-39 (own configuration); host/package.json:6 (`vite build`) | pnpm-workspace.yaml:2 (`'host'`) | — | Yes | React application with its own entry and Vite build. |
| remote_a | remote_a/index.html;remote_a/package.json;remote_a/vite.config.js | remote_a/package.json:1-19 (own manifest) | remote_a/index.html:8-9 (`#root` and `/src/main.jsx` entry); remote_a/src/main.jsx:5 (mounts React) | remote_a/vite.config.js:13-38 (own configuration); remote_a/package.json:6 (`vite build`) | pnpm-workspace.yaml:3 (`'remote_a'`) | — | Yes | React application with its own entry and Vite build. |
| remote_b | remote_b/index.html;remote_b/package.json;remote_b/vite.config.js | remote_b/package.json:1-19 (own manifest) | remote_b/index.html:8-9 (`#root` and `/src/main.jsx` entry); remote_b/src/main.jsx:5 (mounts React) | remote_b/vite.config.js:13-31 (own configuration); remote_b/package.json:6 (`vite build`) | pnpm-workspace.yaml:4 (`'remote_b'`) | — | Yes | React application with its own entry and Vite build. |
| remote_c | remote_c/index.html;remote_c/package.json;remote_c/vite.config.js | remote_c/package.json:1-19 (own manifest) | remote_c/index.html:8-9 (`#root` and `/src/main.jsx` entry); remote_c/src/main.jsx:5 (mounts React) | remote_c/vite.config.js:13-31 (own configuration); remote_c/package.json:6 (`vite build`) | pnpm-workspace.yaml:5 (`'remote_c'`) | — | Yes | React application with its own entry and Vite build. |

## Summary

Frontend applications in the snapshot: 4 (host, remote_a, remote_b, remote_c).

## Notes

- N = 4 matches the classification’s `frontend_units: 4`; there is no external unit.
- There is no Dockerfile, CI or hosting configuration (no `ops-*` or `ci-*` occurrence in `matches.csv`). Each app has its own `preview` port (`*/vite.config.js:15`), and the root has a preview script per package (`package.json:8-11`), but this is local execution, not separate deployment.
- `scripts/` (Playwright, `scripts/capture.mjs`) and `evidence/` are not in `units.csv` and are not frontend.
