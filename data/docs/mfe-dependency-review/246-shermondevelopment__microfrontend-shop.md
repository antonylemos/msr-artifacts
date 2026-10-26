---
schema: 1
id: 1254401059
full_name: shermondevelopment/microfrontend-shop
commit: 913349b85c59bff3b982808ac6d931b62f1d73bc
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 246 — shermondevelopment/microfrontend-shop

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:48 | devDependencies | @module-federation/vite | ^1.16.0 | module-federation | Yes | apps/host/vite.config.ts:2 (`import { federation } from '@module-federation/vite'`) and `:22-65` (`federation({ name: 'host', remotes: { header, footer, products }, shared })`); apps/header/vite.config.ts:3 and `:13-37` (`exposes: { "./Header": "./src/Header.tsx" }`); apps/footer/vite.config.ts:3 and `:13-21` (`exposes: { './Footer': './src/Footer.tsx' }`); apps/products/vite.config.ts:3 and `:13-37` (`exposes: { "./ProductsList": "./src/ProductsList.tsx" }`); the four configurations are used by the build: apps/host/package.json:8, apps/header/package.json:8, apps/footer/package.json:8, apps/products/package.json:8 (`vite build --config vite.config.ts`) and package.json:19-22 |
| packages/shared/package.json:10 | dependencies | @microfrontend/types | 0.0.0 | mfe-term | Yes | packages/shared/src/state/cart-store.ts:3 (`import type { CartProduct } from "@microfrontend/types"`), used in `:6`; the store is exported by packages/shared/src/index.ts:4 (`export { useCartStore } from './state/cart-store'`) and consumed by apps/header/src/Header.tsx:4 and `:16-18` (`useCartStore(...)`), module exposed in apps/header/vite.config.ts:18 and mounted by the host in apps/host/src/App.tsx:5 |

## Notes

- `@module-federation/vite`: the inspection placed all items in `other_package_matches` because the package is declared in the root `package.json` and used in the apps' `vite.config.ts` files (hoisted dependency in the npm workspace, `package.json:4-8`); the apps do not declare their own dependencies (apps/host/package.json:1-11).
- `@microfrontend/types` is the workspace's internal types package (packages/types/package.json:2; packages/types/src/index.ts:1-3 only re-exports types), captured by name by the `mfe-term` technology. The use is `import type`, erased during compilation, but it is a package import in a used file. The `other_package_matches` items (apps/host/src/App.tsx:5-7, `lazy(() => import('header/Header'))` etc.) are federated imports and do not use the package; the evidence came from searching outside the lists, which also found packages/ui/src/CartList.tsx:1, apps/products/src/api.ts:2 and apps/header/src/service/api.ts:2.

