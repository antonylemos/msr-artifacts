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

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| cart-app | cart-app/next.config.ts;cart-app/package.json | cart-app/package.json | cart-app/src/app/layout.tsx:20 (`RootLayout`, App Router); cart-app/src/app/page.tsx:3 (página `Home` sob `basePath: "/cart"`) | cart-app/next.config.ts:3-15 (`basePath: "/cart"`, `output: "standalone"`); cart-app/package.json:7 (`next build`) | — | cart-app/Dockerfile:22 (`RUN npm run build`); docker-compose.yml:20-23 (serviço `cart-app`, `context: ./cart-app`) | Yes | App Next.js com entrada e build próprios |
| store-app | store-app/next.config.ts;store-app/package.json | store-app/package.json | store-app/src/app/layout.tsx:10 (`RootLayout`, App Router); store-app/src/app/page.tsx (rota `/`) | store-app/next.config.ts:6-43 (`output: "standalone"`, `rewrites()` para `/cart`); store-app/package.json:7 (`next build`) | — | store-app/Dockerfile:22 (`RUN npm run build`); docker-compose.yml:8-11 (serviço `store-app`, `context: ./store-app`) | Yes | App Next.js com entrada e build próprios |

## Resumo

Aplicações frontend no snapshot: 2 (cart-app, store-app).

## Notas

- N = 2 coincide com `frontend_units: 2` da classificação.
- Não há `package.json` na raiz nem `pnpm-workspace.yaml`, `turbo.json`, `nx.json` ou `lerna.json`; cada app tem `package-lock.json` próprio. Os arquivos `package.json` marcados como `workspace-config` no `artifacts.csv` não têm campo `workspaces` (`cart-app/package.json:1-28`, `store-app/package.json:1-28`).
- As ocorrências `ws-path-alias` (`<app>/tsconfig.json:21`) são aliases `paths` de cada app. O alias `@repo/ui/*` aponta para `../../packages/ui/*` (`cart-app/tsconfig.json:22`, `store-app/tsconfig.json:23`), diretório ausente do snapshot e não importado em código (grep por `@repo/ui`).
- Nas apps Next.js a entrada segue a convenção do App Router (`src/app/layout.tsx` + `page.tsx`), invocada por `next build`.
- As ocorrências `ops-hosting` são o README padrão do create-next-app (`<app>/README.md:32-34`, “Deploy on Vercel”), não configuração de hospedagem.
