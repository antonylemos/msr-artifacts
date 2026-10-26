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

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | — | — | — | docker-compose.yml:157-216 (orquestra os serviços dos subdiretórios, não um artefato deste diretório) | No | Raiz sem entrada nem build; `package.json:1-6` só declara `@biomejs/biome` |
| auth-mfe | auth-mfe/next.config.ts;auth-mfe/package.json | auth-mfe/package.json | auth-mfe/src/app/layout.tsx:28 (`RootLayout`, App Router); auth-mfe/src/app/auth/page.tsx (rota `/auth`) | auth-mfe/next.config.ts:3-7 (`output: "standalone"`, `assetPrefix: "/auth-static"`); auth-mfe/package.json:7 (`next build`) | — | auth-mfe/Dockerfile:10 (`RUN bun run build`); .github/workflows/auth-mfe.yml:5-7 (`paths: auth-mfe/**`), :15 (`working-directory: auth-mfe`); docker-compose.yml:157-158 (`build: ./auth-mfe`) | Yes | App Next.js com entrada e build próprios |
| builds-mfe | builds-mfe/next.config.ts;builds-mfe/package.json | builds-mfe/package.json | builds-mfe/src/app/layout.tsx:28 (`RootLayout`, App Router); builds-mfe/src/app/builds/page.tsx (rota `/builds`) | builds-mfe/next.config.ts:3-7 (`output: "standalone"`, `assetPrefix: "/builds-static"`); builds-mfe/package.json:7 (`next build`) | — | builds-mfe/Dockerfile:10 (`RUN bun run build`); .github/workflows/builds-mfe.yml:5-7 (`paths: builds-mfe/**`), :15 (`working-directory: builds-mfe`); docker-compose.yml:183-184 (`build: ./builds-mfe`) | Yes | App Next.js com entrada e build próprios |
| builds-service | builds-service/package.json | builds-service/package.json | builds-service/package.json:6 (`bun run src/index.ts`); builds-service/src/index.ts:15 (`export default {` do servidor Bun) | — | — | builds-service/Dockerfile:24 (`ENTRYPOINT`); .github/workflows/builds-service.yml:5-7 (`paths: builds-service/**`); docker-compose.yml:34 (`build: ./builds-service`) | No | Serviço backend, não é frontend |
| catalog-mfe | catalog-mfe/next.config.ts;catalog-mfe/package.json | catalog-mfe/package.json | catalog-mfe/src/app/layout.tsx:28 (`RootLayout`, App Router); catalog-mfe/src/app/catalog/page.tsx (rota `/catalog`) | catalog-mfe/next.config.ts:3-7 (`output: "standalone"`, `assetPrefix: "/catalog-static"`); catalog-mfe/package.json:7 (`next build`) | — | catalog-mfe/Dockerfile:10 (`RUN bun run build`); .github/workflows/catalog-mfe.yml:5-7 (`paths: catalog-mfe/**`), :15 (`working-directory: catalog-mfe`); docker-compose.yml:170-171 (`build: ./catalog-mfe`) | Yes | App Next.js com entrada e build próprios |
| mobile-bff | mobile-bff/package.json | mobile-bff/package.json | mobile-bff/package.json:6 (`bun run src/index.ts`); mobile-bff/src/index.ts:19 (`app.listen(port)`) | — | — | mobile-bff/Dockerfile:21 (`CMD ["bun", "run", "start"]`); .github/workflows/mobile-bff.yml:5-7 (`paths: mobile-bff/**`); docker-compose.yml:130 (`build: ./mobile-bff`) | No | Backend-for-frontend (servidor HTTP), não é frontend |
| parts-service | parts-service/package.json | parts-service/package.json | parts-service/package.json:6 (`bun run src/index.ts`); parts-service/src/index.ts:9-12 (`startGrpcServer`, `Bun.serve`) | — | — | parts-service/Dockerfile:25 (`ENTRYPOINT`); .github/workflows/parts-service.yml:5-7 (`paths: parts-service/**`); docker-compose.yml:15 (`build: ./parts-service`) | No | Serviço backend (gRPC/HTTP), não é frontend |
| shell | shell/next.config.ts;shell/package.json | shell/package.json | shell/src/app/layout.tsx:28 (`RootLayout`, App Router); shell/src/app/page.tsx (rota `/`) | shell/next.config.ts:3-31 (`output: "standalone"`, `rewrites()` para as zonas); shell/package.json:7 (`next build`) | — | shell/Dockerfile:16 (`RUN bun run build`); .github/workflows/shell.yml:5-7 (`paths: shell/**`), :15 (`working-directory: shell`); docker-compose.yml:196-198 (`context: ./shell`) | Yes | App Next.js com entrada e build próprios |
| users-service | users-service/package.json | users-service/package.json | users-service/deno.json:4 (`deno run ... src/index.ts`); users-service/src/index.ts:40 (`app.listen({ port })`) | — | — | users-service/Dockerfile:15 (`ENTRYPOINT`); .github/workflows/users-service.yml:5-7 (`paths: users-service/**`); docker-compose.yml:74 (`build: ./users-service`) | No | Serviço backend (Deno), não é frontend; `package.json:1-6` só declara drizzle |
| web-bff | web-bff/package.json | web-bff/package.json | web-bff/package.json:6 (`bun run src/index.ts`); web-bff/src/index.ts:22 (`export default {` do servidor Bun) | — | — | web-bff/Dockerfile:21 (`CMD ["bun", "run", "start"]`); .github/workflows/web-bff.yml:5-7 (`paths: web-bff/**`); docker-compose.yml:102 (`build: ./web-bff`) | No | Backend-for-frontend (servidor HTTP), não é frontend |

## Resumo

Aplicações frontend no snapshot: 4 (auth-mfe, builds-mfe, catalog-mfe, shell).

## Notas

- N = 4 coincide com `frontend_units: 4` da classificação.
- Não há `workspaces` no `package.json:1-6` da raiz nem `pnpm-workspace.yaml`, `turbo.json`, `nx.json` ou `lerna.json`; cada diretório tem lockfile próprio (`bun.lock`, ou `deno.lock`/`package-lock.json` em `users-service`). As ocorrências `ws-path-alias` (`<app>/tsconfig.json:21`) são aliases `paths` internos de cada app, não declaração de workspace.
- Nas apps Next.js a entrada não é declarada em configuração: segue a convenção do App Router (`src/app/layout.tsx` + `page.tsx`), invocada por `next build`.
- Os cinco diretórios de backend têm Dockerfile, workflow e serviço no compose próprios, mas não são frontend.
