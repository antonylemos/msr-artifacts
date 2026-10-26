---
schema: 1
id: 1042592063
full_name: Jyotisaini1234/moduleFederation
commit: 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 172 — Jyotisaini1234/moduleFederation

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| mfe1 | mfe1/package.json;mfe1/webpack.config.ts | mfe1/package.json | mfe1/webpack.config.ts:19 (`entry: './src/index.tsx'`); mfe1/webpack.config.ts:90-93 (`HtmlWebpackPlugin` with `template: './public/index.html'`); mfe1/src/bootstrap.tsx:12-19 (`hydrateRoot`/`createRoot(...).render(<App />)`) | mfe1/webpack.config.ts:18-101 + mfe1/package.json:9 (`"build": "node --loader ts-node/esm ./node_modules/webpack/bin/webpack.js --config webpack.config.ts --mode production"`) | — | — | Yes | React application with its own entry and webpack build. |
| mfe2 | mfe2/package.json;mfe2/webpack.config.ts | mfe2/package.json | mfe2/webpack.config.ts:13 (`entry: './src/index.tsx'`); mfe2/webpack.config.ts:43 (`HtmlWebpackPlugin` with `template: './public/index.html'`); mfe2/src/bootstrap.tsx:10-11 (`createRoot(container)`, `root.render(<App />)`) | mfe2/webpack.config.ts:12-45 + mfe2/package.json:9 (`"build": "node --loader ts-node/esm ./node_modules/webpack/bin/webpack.js --config webpack.config.ts --mode production"`) | — | — | Yes | React application with its own entry and webpack build. |

## Summary

Frontend applications in the snapshot: 2 (mfe1, mfe2).

## Notes

- N matches the classification’s `frontend_units: 2`: the host `mfe1` and the remote `mfe2`, both in the snapshot.
- The `package.json` and `tsconfig.json` files appear as `workspace-config` in `artifacts.csv`, but no `package.json` declares `workspaces` (mfe1/package.json:1-37, mfe2/package.json:1-36) and there is no root manifest. There are no `ws-*` or `ci-*` occurrences in `matches.csv`; the only `ops-*` is `ops-cors` in mfe1/webpack.config.ts:31 (dev server CORS header), which is not a deployment artifact.
- Each project has its own lockfile and development port (mfe1/webpack.config.ts:26, mfe2/webpack.config.ts:17: 3001/3002).
- `mfe1/src/server/server.ts` is an SSR server inside `mfe1`, without its own `package.json`, and does not become a row.
