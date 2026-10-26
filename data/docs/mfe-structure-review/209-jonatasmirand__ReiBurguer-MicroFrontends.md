---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| cardapio | cardapio/next.config.js;cardapio/next.config.mjs;cardapio/package.json | cardapio/package.json | cardapio/src/pages/_app.js:3 (`export default function App`, Pages Router); cardapio/src/pages/index.js:14 (route `/`) | cardapio/next.config.js:3-21 (configuration with `NextFederationPlugin`, taking precedence in Next 14); cardapio/package.json:7 (`next build`) | — | — | Yes | Next.js app with its own entry and build; remote `cardapio` |
| container | container/next.config.mjs;container/package.json | container/package.json | container/src/pages/_app.js:3 (`export default function App`, Pages Router); container/src/pages/index.js:8 (route `/`) | container/next.config.mjs:4-32 (`nextConfig` with `NextFederationPlugin`); container/package.json:7 (`next build`) | — | — | Yes | Next.js app with its own entry and build; host |
| pedido | pedido/next.config.mjs;pedido/package.json | pedido/package.json | pedido/src/pages/_app.js:3 (`export default function App`, Pages Router); pedido/src/pages/index.js:15 (route `/`) | pedido/next.config.mjs:4-31 (`nextConfig` with `NextFederationPlugin`); pedido/package.json:7 (`next build`) | — | — | Yes | Next.js app with its own entry and build; remote `pedido` |

## Summary

Frontend applications in the snapshot: 3 (cardapio, container, pedido).

## Notes

- N = 3 matches the classification’s `frontend_units: 3`.
- There is no `workspaces` in the `package.json` files, nor `pnpm-workspace.yaml`, `lerna.json`, `turbo.json`, `nx.json` or `rush.json`. The root has no `package.json`; the root `package-lock.json` has no packages (`package-lock.json:1-6`). The `workspace-config` marker for the three `package.json` files in `artifacts.csv` does not correspond to a workspace declaration, and `matches.csv` has no `ws-*` occurrences.
- The entry of the three apps follows the Pages Router convention (`src/pages/_app.js` + pages), invoked by `next build`, without a configuration declaration.
- `cardapio` has two `next.config` files: `next.config.mjs:13` exposes `./src/_components/Cardapio.jsx`, missing from the snapshot, whereas `next.config.js:11` exposes `./src/components/Cardapio.jsx`, which exists. Since `next.config.js` is loaded by Next 14, the missing reference is in a file not used by the build, and the row was `Yes`, not `Undetermined`.
- Deploy: no Dockerfile, `vercel.json`, `netlify.toml` or CI workflow in the snapshot. The `ops-hosting` occurrences are `README.md:94` (suggestion to host on Vercel) and the standard create-next-app text in `cardapio/README.md:25-38`. The Vercel homepage cited by the classification is metadata, not a snapshot artifact.
