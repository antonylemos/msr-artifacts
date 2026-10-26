---
schema: 1
id: 1031213794
full_name: Axiean/micro-store
commit: 7ed9142db806ba9851416ae0b8bb207d5d10bdca
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 237 — Axiean/micro-store

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| cart-app | cart-app/next.config.ts;cart-app/package.json | cart-app/package.json | cart-app/src/app/layout.tsx:20 (`RootLayout`, App Router); cart-app/src/app/page.tsx:3 (`Home` page under `basePath: "/cart"`) | cart-app/next.config.ts:3-15 (`basePath: "/cart"`, `output: "standalone"`); cart-app/package.json:7 (`next build`) | — | cart-app/Dockerfile:22 (`RUN npm run build`); docker-compose.yml:20-23 (`cart-app` service, `context: ./cart-app`) | Yes | Next.js app with its own entry and build |
| store-app | store-app/next.config.ts;store-app/package.json | store-app/package.json | store-app/src/app/layout.tsx:10 (`RootLayout`, App Router); store-app/src/app/page.tsx (route `/`) | store-app/next.config.ts:6-43 (`output: "standalone"`, `rewrites()` for `/cart`); store-app/package.json:7 (`next build`) | — | store-app/Dockerfile:22 (`RUN npm run build`); docker-compose.yml:8-11 (`store-app` service, `context: ./store-app`) | Yes | Next.js app with its own entry and build |

## Summary

Frontend applications in the snapshot: 2 (cart-app, store-app).

## Notes

- N = 2 matches the classification’s `frontend_units: 2`.
- There is no `package.json` at the root, nor `pnpm-workspace.yaml`, `turbo.json`, `nx.json` or `lerna.json`; each app has its own `package-lock.json`. The `package.json` files marked as `workspace-config` in `artifacts.csv` have no `workspaces` field (`cart-app/package.json:1-28`, `store-app/package.json:1-28`).
- The `ws-path-alias` occurrences (`<app>/tsconfig.json:21`) are each app’s `paths` aliases. The `@repo/ui/*` alias points to `../../packages/ui/*` (`cart-app/tsconfig.json:22`, `store-app/tsconfig.json:23`), a directory missing from the snapshot and not imported in code (grep for `@repo/ui`).
- In the Next.js apps, the entry follows the App Router convention (`src/app/layout.tsx` + `page.tsx`), invoked by `next build`.
- The `ops-hosting` occurrences are the standard create-next-app README (`<app>/README.md:32-34`, “Deploy on Vercel”), not hosting configuration.
