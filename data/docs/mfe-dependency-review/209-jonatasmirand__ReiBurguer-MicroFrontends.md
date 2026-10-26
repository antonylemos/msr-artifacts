---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| cardapio/package.json:12 | dependencies | @module-federation/nextjs-mf | ^8.8.47 | module-federation | Yes | cardapio/next.config.js:1 (`require("@module-federation/nextjs-mf")`); cardapio/next.config.js:5-18 (`new NextFederationPlugin({ name: "cardapio", ... exposes: { "./Cardapio": "./src/components/Cardapio.jsx" } })` in `webpack(config)`); cardapio/package.json:7 (`next build`, which loads the `next.config` in the directory); container/src/pages/index.js:5 (the host consumes `import("cardapio/Cardapio")`) |
| container/package.json:12 | dependencies | @module-federation/nextjs-mf | ^8.8.47 | module-federation | Yes | container/next.config.mjs:1 (`import { NextFederationPlugin } from '@module-federation/nextjs-mf'`); container/next.config.mjs:7-29 (`new NextFederationPlugin({ name: 'container', remotes: { pedido, cardapio } })` in `webpack(config)`); container/package.json:7 (`next build`); container/src/pages/index.js:5-6 and :20-26 (`dynamic(() => import("cardapio/Cardapio"))` and `import("pedido/Pedido")`, mounted on route `/`) |
| pedido/package.json:12 | dependencies | @module-federation/nextjs-mf | ^8.8.47 | module-federation | Yes | pedido/next.config.mjs:1 (`import { NextFederationPlugin } from '@module-federation/nextjs-mf'`); pedido/next.config.mjs:7-29 (`new NextFederationPlugin({ name: 'pedido', exposes: { './Pedido': './src/_components/Pedido.jsx' } })` in `webpack(config)`); pedido/package.json:7 (`next build`); container/src/pages/index.js:6 (the host consumes `import("pedido/Pedido")`) |

## Notes

- `cardapio` has two configuration files importing the package. `cardapio/next.config.js:11` exposes `./src/components/Cardapio.jsx`, which exists; `cardapio/next.config.mjs:13` exposes `./src/_components/Cardapio.jsx`, absent from the snapshot. In Next 14's search order, `next.config.js` takes precedence, as already recorded in the classification. Whichever file is loaded, the package plugin is invoked; the contradiction affects the exposed path, not package use, so the row remained `Yes`.
- The search outside the lists (`grep -rn "module-federation"` in `*.js`, `*.jsx`, `*.mjs`, `*.json`, excluding lockfiles) finds only the three `package.json:12` and four `next.config` files already listed. The host's `cardapio/Cardapio` and `pedido/Pedido` imports are remote names resolved by the plugin, not package imports.
- The `dev` scripts (`<app>/package.json:6`) set `NEXT_PRIVATE_LOCAL_WEBPACK=true`; a script mention was not counted as use.

