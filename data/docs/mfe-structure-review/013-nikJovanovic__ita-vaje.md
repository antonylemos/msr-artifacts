---
schema: 1
id: 1170818206
full_name: nikJovanovic/ita-vaje
commit: 842a007f3e2690f8a521f951fc899c4af560e931
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 013 — nikJovanovic/ita-vaje

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | — | — | — | docker-compose.yml:157-216 (orchestrates subdirectory services, not an artifact of this directory) | No | Root with neither entry nor build; `package.json:1-6` only declares `@biomejs/biome` |
| auth-mfe | auth-mfe/next.config.ts;auth-mfe/package.json | auth-mfe/package.json | auth-mfe/src/app/layout.tsx:28 (`RootLayout`, App Router); auth-mfe/src/app/auth/page.tsx (route `/auth`) | auth-mfe/next.config.ts:3-7 (`output: "standalone"`, `assetPrefix: "/auth-static"`); auth-mfe/package.json:7 (`next build`) | — | auth-mfe/Dockerfile:10 (`RUN bun run build`); .github/workflows/auth-mfe.yml:5-7 (`paths: auth-mfe/**`), :15 (`working-directory: auth-mfe`); docker-compose.yml:157-158 (`build: ./auth-mfe`) | Yes | Next.js app with its own entry and build |
| builds-mfe | builds-mfe/next.config.ts;builds-mfe/package.json | builds-mfe/package.json | builds-mfe/src/app/layout.tsx:28 (`RootLayout`, App Router); builds-mfe/src/app/builds/page.tsx (route `/builds`) | builds-mfe/next.config.ts:3-7 (`output: "standalone"`, `assetPrefix: "/builds-static"`); builds-mfe/package.json:7 (`next build`) | — | builds-mfe/Dockerfile:10 (`RUN bun run build`); .github/workflows/builds-mfe.yml:5-7 (`paths: builds-mfe/**`), :15 (`working-directory: builds-mfe`); docker-compose.yml:183-184 (`build: ./builds-mfe`) | Yes | Next.js app with its own entry and build |
| builds-service | builds-service/package.json | builds-service/package.json | builds-service/package.json:6 (`bun run src/index.ts`); builds-service/src/index.ts:15 (`export default {` of the Bun server) | — | — | builds-service/Dockerfile:24 (`ENTRYPOINT`); .github/workflows/builds-service.yml:5-7 (`paths: builds-service/**`); docker-compose.yml:34 (`build: ./builds-service`) | No | Backend service, not frontend |
| catalog-mfe | catalog-mfe/next.config.ts;catalog-mfe/package.json | catalog-mfe/package.json | catalog-mfe/src/app/layout.tsx:28 (`RootLayout`, App Router); catalog-mfe/src/app/catalog/page.tsx (route `/catalog`) | catalog-mfe/next.config.ts:3-7 (`output: "standalone"`, `assetPrefix: "/catalog-static"`); catalog-mfe/package.json:7 (`next build`) | — | catalog-mfe/Dockerfile:10 (`RUN bun run build`); .github/workflows/catalog-mfe.yml:5-7 (`paths: catalog-mfe/**`), :15 (`working-directory: catalog-mfe`); docker-compose.yml:170-171 (`build: ./catalog-mfe`) | Yes | Next.js app with its own entry and build |
| mobile-bff | mobile-bff/package.json | mobile-bff/package.json | mobile-bff/package.json:6 (`bun run src/index.ts`); mobile-bff/src/index.ts:19 (`app.listen(port)`) | — | — | mobile-bff/Dockerfile:21 (`CMD ["bun", "run", "start"]`); .github/workflows/mobile-bff.yml:5-7 (`paths: mobile-bff/**`); docker-compose.yml:130 (`build: ./mobile-bff`) | No | Backend-for-frontend (HTTP server), not frontend |
| parts-service | parts-service/package.json | parts-service/package.json | parts-service/package.json:6 (`bun run src/index.ts`); parts-service/src/index.ts:9-12 (`startGrpcServer`, `Bun.serve`) | — | — | parts-service/Dockerfile:25 (`ENTRYPOINT`); .github/workflows/parts-service.yml:5-7 (`paths: parts-service/**`); docker-compose.yml:15 (`build: ./parts-service`) | No | Backend service (gRPC/HTTP), not frontend |
| shell | shell/next.config.ts;shell/package.json | shell/package.json | shell/src/app/layout.tsx:28 (`RootLayout`, App Router); shell/src/app/page.tsx (route `/`) | shell/next.config.ts:3-31 (`output: "standalone"`, `rewrites()` for the zones); shell/package.json:7 (`next build`) | — | shell/Dockerfile:16 (`RUN bun run build`); .github/workflows/shell.yml:5-7 (`paths: shell/**`), :15 (`working-directory: shell`); docker-compose.yml:196-198 (`context: ./shell`) | Yes | Next.js app with its own entry and build |
| users-service | users-service/package.json | users-service/package.json | users-service/deno.json:4 (`deno run ... src/index.ts`); users-service/src/index.ts:40 (`app.listen({ port })`) | — | — | users-service/Dockerfile:15 (`ENTRYPOINT`); .github/workflows/users-service.yml:5-7 (`paths: users-service/**`); docker-compose.yml:74 (`build: ./users-service`) | No | Backend service (Deno), not frontend; `package.json:1-6` only declares drizzle |
| web-bff | web-bff/package.json | web-bff/package.json | web-bff/package.json:6 (`bun run src/index.ts`); web-bff/src/index.ts:22 (`export default {` of the Bun server) | — | — | web-bff/Dockerfile:21 (`CMD ["bun", "run", "start"]`); .github/workflows/web-bff.yml:5-7 (`paths: web-bff/**`); docker-compose.yml:102 (`build: ./web-bff`) | No | Backend-for-frontend (HTTP server), not frontend |

## Summary

Frontend applications in the snapshot: 4 (auth-mfe, builds-mfe, catalog-mfe, shell).

## Notes

- N = 4 matches the classification’s `frontend_units: 4`.
- There is no `workspaces` in the root `package.json:1-6`, nor `pnpm-workspace.yaml`, `turbo.json`, `nx.json` or `lerna.json`; each directory has its own lockfile (`bun.lock`, or `deno.lock`/`package-lock.json` in `users-service`). The `ws-path-alias` occurrences (`<app>/tsconfig.json:21`) are internal `paths` aliases for each app, not a workspace declaration.
- In the Next.js apps, the entry is not declared in configuration: it follows the App Router convention (`src/app/layout.tsx` + `page.tsx`), invoked by `next build`.
- The five backend directories have their own Dockerfile, workflow and compose service, but are not frontend.
