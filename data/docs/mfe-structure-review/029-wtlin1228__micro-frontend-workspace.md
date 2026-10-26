---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 029 — wtlin1228/micro-frontend-workspace

## Workspace

pnpm-workspace.yaml:1-2 (includes `packages/*`).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-16 (coordination manifest) | — | — | — | — | No | pnpm orchestration root, with no UI entry or application build of its own. |
| packages/app-mf-1 | packages/app-mf-1/module-federation.config.ts;packages/app-mf-1/package.json;packages/app-mf-1/rsbuild.config.ts | packages/app-mf-1/package.json:1-12 (own manifest) | packages/app-mf-1/src/index.tsx:1 (conventional Rsbuild entry); packages/app-mf-1/src/bootstrap.tsx:6-15 (mounts React) | packages/app-mf-1/rsbuild.config.ts:7-17 (own configuration); packages/app-mf-1/package.json:7 (`rsbuild build`) | pnpm-workspace.yaml:1-2 (`packages/*`) | — | Yes | React application with its own UI entry and Rsbuild build. |
| packages/app-mf-2 | packages/app-mf-2/module-federation.config.ts;packages/app-mf-2/package.json;packages/app-mf-2/rsbuild.config.ts | packages/app-mf-2/package.json:1-12 (own manifest) | packages/app-mf-2/src/index.tsx:1 (conventional Rsbuild entry); packages/app-mf-2/src/bootstrap.tsx:6-15 (mounts React) | packages/app-mf-2/rsbuild.config.ts:7-17 (own configuration); packages/app-mf-2/package.json:7 (`rsbuild build`) | pnpm-workspace.yaml:1-2 (`packages/*`) | — | Yes | React application with its own UI entry and Rsbuild build. |
| packages/app-qiankun-1 | packages/app-qiankun-1/package.json;packages/app-qiankun-1/rsbuild.config.ts | packages/app-qiankun-1/package.json:1-12 (own manifest) | packages/app-qiankun-1/src/index.tsx:1 (conventional Rsbuild entry); packages/app-qiankun-1/src/lifecycles.tsx:22-38 (mount starts the UI) | packages/app-qiankun-1/rsbuild.config.ts:5-16 (own configuration); packages/app-qiankun-1/package.json:7 (`rsbuild build`) | pnpm-workspace.yaml:1-2 (`packages/*`) | — | Yes | React application with its own UI entry and Rsbuild build. |
| packages/app-qiankun-2 | packages/app-qiankun-2/package.json;packages/app-qiankun-2/rsbuild.config.ts | packages/app-qiankun-2/package.json:1-12 (own manifest) | packages/app-qiankun-2/src/index.tsx:1 (conventional Rsbuild entry); packages/app-qiankun-2/src/lifecycles.tsx:22-38 (mount starts the UI) | packages/app-qiankun-2/rsbuild.config.ts:5-16 (own configuration); packages/app-qiankun-2/package.json:7 (`rsbuild build`) | pnpm-workspace.yaml:1-2 (`packages/*`) | — | Yes | React application with its own UI entry and Rsbuild build. |
| packages/host | packages/host/module-federation.config.ts;packages/host/package.json;packages/host/rsbuild.config.ts | packages/host/package.json:1-12 (own manifest) | packages/host/src/index.tsx:1 (conventional Rsbuild entry); packages/host/src/bootstrap.tsx:5-12 (mounts React) | packages/host/rsbuild.config.ts:7-17 (own configuration); packages/host/package.json:7 (`rsbuild build`) | pnpm-workspace.yaml:1-2 (`packages/*`) | — | Yes | React application with its own UI entry and Rsbuild build. |
| packages/lib-app-interface | packages/lib-app-interface/package.json | packages/lib-app-interface/package.json:1-19 (exported library) | — | packages/lib-app-interface/rslib.config.ts:4-16 (ESM library and types build); packages/lib-app-interface/package.json:16 (`rslib build`) | pnpm-workspace.yaml:1-2 (`packages/*`) | — | No | Contract and types library, with no entry that starts a UI. |

## Summary

Frontend applications in the snapshot: 5 (packages/app-mf-1, packages/app-mf-2, packages/app-qiankun-1, packages/app-qiankun-2, packages/host).

## Notes

- The qiankun application entries export lifecycles; the mount function starts their UI. They have their own build, although src/index.tsx does not invoke mount automatically.
- The lib-app-interface library uses RsLib and exports contract types/values; a library entry is not equivalent to an application entry.
- There are no ops-* or ci-* occurrences in matches.csv indicating separate deployment.
