---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 273 — kod88vn/poc_next_mfa

## Workspace

`package.json:4-7` com `workspaces` (`apps/*`, `packages/*`), orquestrado por `turbo.json:5-26`.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-27 (manifesto da raiz, devDependencies `tsx` e `turbo`) | — | package.json:9 (`turbo build`, só delega aos pacotes do workspace) | — | — | No | Raiz do workspace npm, sem entrada nem configuração de build próprias. |
| apps/duda | apps/duda/next.config.js;apps/duda/package.json | apps/duda/package.json | apps/duda/app/layout.tsx:15 (`DudaLayout`, App Router); apps/duda/app/page.tsx:9 (página `DudaPage` sob `basePath: '/duda'`) | apps/duda/next.config.js:5-23 (`basePath: '/duda'`, `transpilePackages`); apps/duda/package.json:6 (`next build`) | package.json:5 (`apps/*`) | — | Yes | App Next.js com entrada e build próprios |
| apps/shell | apps/shell/next.config.js;apps/shell/package.json | apps/shell/package.json | apps/shell/app/layout.tsx:22 (`RootLayout`, App Router); apps/shell/app/page.tsx:46 (página `HomePage`, rota `/`) | apps/shell/next.config.js:5-44 (`rewrites()` para `/shop` e `/duda`); apps/shell/package.json:6 (`next build`) | package.json:5 (`apps/*`) | — | Yes | App Next.js com entrada e build próprios |
| apps/shop | apps/shop/next.config.js;apps/shop/package.json | apps/shop/package.json | apps/shop/app/layout.tsx:25 (`ShopLayout`, App Router); apps/shop/app/page.tsx:65 (página `ShopPage` sob `basePath: '/shop'`) | apps/shop/next.config.js:5-42 (`basePath: '/shop'`, `transpilePackages`); apps/shop/package.json:6 (`next build`) | package.json:5 (`apps/*`) | — | Yes | App Next.js com entrada e build próprios |
| packages/ui | packages/ui/package.json | packages/ui/package.json | — (packages/ui/package.json:5-11 `main`/`exports` apontam para `./src/index.ts`, biblioteca) | — (packages/ui/package.json:13-16 só `lint`/`type-check`; compilada pelas apps via `transpilePackages`) | package.json:6 (`packages/*`) | — | No | Biblioteca compartilhada `@repo/ui`, sem entrada de aplicação. |

## Resumo

Aplicações frontend no snapshot: 3 (apps/duda, apps/shell, apps/shop).

## Notas

- N = 3 coincide com `frontend_units: 3` da classificação.
- O `matches.csv` não tem ocorrências `ci-*`; tem 1 `ws-workspaces` (package.json:4), 3 `ws-path-alias` (por exemplo apps/duda/tsconfig.json:24) e 2 `ops-cors` (apps/duda/next.config.js:16 e apps/shop/next.config.js:35); a declaração `workspaces` foi confirmada abrindo `package.json:4-7`.
- Não há Dockerfile, workflow de CI nem configuração de hospedagem no snapshot; as apps sobem em portas locais fixas (apps/*/package.json:7 e `:9`).
- Nas apps Next.js a entrada segue a convenção do App Router (`app/layout.tsx` + `page.tsx`), invocada por `next build`.
