---
schema: 1
id: 1254311775
full_name: kamulupraneeth/nextjs-mfe-platform
commit: 750571ab7142f074b39122b82f94eaf5dc4181fa
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 381 — kamulupraneeth/nextjs-mfe-platform

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| analytics-dashboard | analytics-dashboard/next.config.ts;analytics-dashboard/package.json | analytics-dashboard/package.json | analytics-dashboard/src/app/layout.tsx:9 (`RootLayout`, App Router); analytics-dashboard/src/app/page.tsx (route `/` under `basePath`) | analytics-dashboard/next.config.ts:3-7 (`basePath: "/analytics"`, `assetPrefix: "/analytics-assets"`); analytics-dashboard/package.json:7 (`next build`) | — | — | Yes | Next.js app with its own entry and build |
| host-shell | host-shell/next.config.ts;host-shell/package.json | host-shell/package.json | host-shell/src/app/layout.tsx:17 (`RootLayout`, App Router); host-shell/src/app/page.tsx (route `/`) | host-shell/next.config.ts:8-50 (`rewrites()` for the zones); host-shell/package.json:7 (`next build`) | — | — | Yes | Next.js app with its own entry and build |
| workspace-document | workspace-document/next.config.ts;workspace-document/package.json | workspace-document/package.json | workspace-document/src/app/layout.tsx:20 (`RootLayout`, App Router); workspace-document/src/app/page.tsx (route `/` under `basePath`) | workspace-document/next.config.ts:3-8 (`basePath: "/workspace"`, `assetPrefix: "/workspace-assets"`); workspace-document/package.json:7 (`next build`) | — | — | Yes | Next.js app with its own entry and build |

## Summary

Frontend applications in the snapshot: 3 (analytics-dashboard, host-shell, workspace-document).

## Notes

- N = 3 matches the classification’s `frontend_units: 3`.
- There is no `package.json` at the root, nor `pnpm-workspace.yaml`, `turbo.json`, `nx.json` or `lerna.json`; each app has its own `package-lock.json`. The apps’ `package.json` files have no `workspaces`, and the `ws-path-alias` occurrences (`<app>/tsconfig.json:21`) are internal `paths` aliases for each app.
- There is no Dockerfile, CI or `vercel.json`/`netlify.toml`. The `ops-hosting` occurrences are the standard create-next-app text in `<app>/README.md:21-34` ("Deploy on Vercel"), not deployment configuration.
- The root `README.md` (UTF-16) was removed from the acquisition by the `binaries` preset (`normalization.json`); this does not affect the table rows.
