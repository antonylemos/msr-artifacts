---
schema: 1
id: 1254401059
full_name: shermondevelopment/microfrontend-shop
commit: 913349b85c59bff3b982808ac6d931b62f1d73bc
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 246 — shermondevelopment/microfrontend-shop

## Workspace

`package.json:4-8` (npm `workspaces` with `apps/*`, `packages/*` and `packages/config/*`).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-78 (workspace root manifest) | — | — (package.json:18-22 `build` only chains `tsc -b` and each app’s `vite build` with `--config apps/<app>/vite.config.ts`; no build configuration of its own) | — | — | No | Workspace coordination root, with neither UI entry nor build of its own. |
| apps/footer | apps/footer/package.json;apps/footer/vite.config.ts | apps/footer/package.json:1-11 | apps/footer/index.html:10 (`/src/main.tsx`); apps/footer/src/main.tsx:5 (`createRoot(...).render`) | apps/footer/vite.config.ts:8-54 (own configuration, port 3002, `outDir: '../../dist/footer'`); apps/footer/package.json:8 (`vite build`) | package.json:5 (`apps/*`) | .github/workflows/ci-cd.yml:117 (`npm run build --workspace @microfrontend/${{ matrix.app }}`) and `:134-137`, `:151-152` (footer’s own S3/CloudFront) | Yes | React/Vite application with its own entry, build and deployment. |
| apps/header | apps/header/package.json;apps/header/vite.config.ts | apps/header/package.json:1-12 | apps/header/index.html:10 (`/src/main.tsx`); apps/header/src/main.tsx:5 (`createRoot(...).render`) | apps/header/vite.config.ts:8-70 (own configuration, port 3001, `outDir: "../../dist/header"`); apps/header/package.json:8 (`vite build`) | package.json:5 (`apps/*`) | .github/workflows/ci-cd.yml:117 and `:129-132`, `:151-152` (header’s own S3/CloudFront) | Yes | React/Vite application with its own entry, build and deployment. |
| apps/host | apps/host/package.json;apps/host/vite.config.ts | apps/host/package.json:1-11 | apps/host/index.html:11 (`/src/main.tsx`); apps/host/src/main.tsx:10-16 (`createRoot(...).render(<App />)`) | apps/host/vite.config.ts:9-98 (own configuration, port 3000, `outDir: '../../dist/host'`); apps/host/package.json:8 (`vite build`) | package.json:5 (`apps/*`) | .github/workflows/ci-cd.yml:117 and `:144-147`, `:151-152` (host’s own S3/CloudFront) | Yes | React/Vite application with its own entry, build and deployment. |
| apps/products | apps/products/package.json;apps/products/vite.config.ts | apps/products/package.json:1-12 | apps/products/index.html:10 (`/src/main.tsx`); apps/products/src/main.tsx:5 (`createRoot(...).render`) | apps/products/vite.config.ts:8-70 (own configuration, port 3003, `outDir: "../../dist/products"`); apps/products/package.json:8 (`vite build`) | package.json:5 (`apps/*`) | .github/workflows/ci-cd.yml:117 and `:139-142`, `:151-152` (products’ own S3/CloudFront) | Yes | React/Vite application with its own entry, build and deployment. |
| packages/config/eslint-config | packages/config/eslint-config/package.json | packages/config/eslint-config/package.json:1-18 | — | — (packages/config/eslint-config/package.json:7 `tsc -p tsconfig.json` compiles only the lint configuration) | package.json:7 (`packages/config/*`) | — | No | Shared ESLint configuration, not frontend. |
| packages/config/tailwind-config | packages/config/tailwind-config/package.json | packages/config/tailwind-config/package.json:1-12 | — | — | package.json:7 (`packages/config/*`) | — | No | Shared Tailwind configuration (exports at `:6-8`), with no application entry. |
| packages/shared | packages/shared/package.json | packages/shared/package.json:1-16 | — | — | package.json:6 (`packages/*`) | — | No | Shared library (HTTP client, React Query, Zustand store; packages/shared/src/index.ts:1-4), with no application entry. |
| packages/types | packages/types/package.json | packages/types/package.json:1-9 | — | — | package.json:6 (`packages/*`) | — | No | Types-only package (packages/types/src/index.ts:1-3), with no application entry. |
| packages/ui | packages/ui/package.json | packages/ui/package.json:1-12 | — | — | package.json:6 (`packages/*`) | — | No | Shared component library (packages/ui/src/index.ts:1-6), with no application entry. |

## Summary

Frontend applications in the snapshot: 4 (apps/footer, apps/header, apps/host, apps/products).

## Notes

- N = 4 matches the classification’s `frontend_units: 4`.
- The `deploy` job in the only workflow (`.github/workflows/ci-cd.yml:85-152`) runs in a matrix over affected apps, calculated by scripts/ci/affected-workspaces.mjs:3 and `:37-46` (`apps = ['header', 'footer', 'products', 'host']`); each app is built through its workspace and published in its own bucket and distribution. A change in `packages/*` marks the four apps (scripts/ci/affected-workspaces.mjs:4-13 and `:43-44`).
