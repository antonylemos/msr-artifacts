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

`package.json:4-8` (`workspaces` npm com `apps/*`, `packages/*` e `packages/config/*`).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-78 (manifesto da raiz do workspace) | — | — (package.json:18-22 `build` só encadeia `tsc -b` e o `vite build` de cada app com `--config apps/<app>/vite.config.ts`; sem config de build própria) | — | — | No | Raiz de coordenação do workspace, sem entrada nem build de UI próprios. |
| apps/footer | apps/footer/package.json;apps/footer/vite.config.ts | apps/footer/package.json:1-11 | apps/footer/index.html:10 (`/src/main.tsx`); apps/footer/src/main.tsx:5 (`createRoot(...).render`) | apps/footer/vite.config.ts:8-54 (config própria, porta 3002, `outDir: '../../dist/footer'`); apps/footer/package.json:8 (`vite build`) | package.json:5 (`apps/*`) | .github/workflows/ci-cd.yml:117 (`npm run build --workspace @microfrontend/${{ matrix.app }}`) e `:134-137`, `:151-152` (S3/CloudFront próprios do footer) | Yes | Aplicação React/Vite com entrada, build e deploy próprios. |
| apps/header | apps/header/package.json;apps/header/vite.config.ts | apps/header/package.json:1-12 | apps/header/index.html:10 (`/src/main.tsx`); apps/header/src/main.tsx:5 (`createRoot(...).render`) | apps/header/vite.config.ts:8-70 (config própria, porta 3001, `outDir: "../../dist/header"`); apps/header/package.json:8 (`vite build`) | package.json:5 (`apps/*`) | .github/workflows/ci-cd.yml:117 e `:129-132`, `:151-152` (S3/CloudFront próprios do header) | Yes | Aplicação React/Vite com entrada, build e deploy próprios. |
| apps/host | apps/host/package.json;apps/host/vite.config.ts | apps/host/package.json:1-11 | apps/host/index.html:11 (`/src/main.tsx`); apps/host/src/main.tsx:10-16 (`createRoot(...).render(<App />)`) | apps/host/vite.config.ts:9-98 (config própria, porta 3000, `outDir: '../../dist/host'`); apps/host/package.json:8 (`vite build`) | package.json:5 (`apps/*`) | .github/workflows/ci-cd.yml:117 e `:144-147`, `:151-152` (S3/CloudFront próprios do host) | Yes | Aplicação React/Vite com entrada, build e deploy próprios. |
| apps/products | apps/products/package.json;apps/products/vite.config.ts | apps/products/package.json:1-12 | apps/products/index.html:10 (`/src/main.tsx`); apps/products/src/main.tsx:5 (`createRoot(...).render`) | apps/products/vite.config.ts:8-70 (config própria, porta 3003, `outDir: "../../dist/products"`); apps/products/package.json:8 (`vite build`) | package.json:5 (`apps/*`) | .github/workflows/ci-cd.yml:117 e `:139-142`, `:151-152` (S3/CloudFront próprios do products) | Yes | Aplicação React/Vite com entrada, build e deploy próprios. |
| packages/config/eslint-config | packages/config/eslint-config/package.json | packages/config/eslint-config/package.json:1-18 | — | — (packages/config/eslint-config/package.json:7 `tsc -p tsconfig.json` compila só a config de lint) | package.json:7 (`packages/config/*`) | — | No | Configuração compartilhada de ESLint, não é frontend. |
| packages/config/tailwind-config | packages/config/tailwind-config/package.json | packages/config/tailwind-config/package.json:1-12 | — | — | package.json:7 (`packages/config/*`) | — | No | Configuração compartilhada do Tailwind (exports em `:6-8`), sem entrada de aplicação. |
| packages/shared | packages/shared/package.json | packages/shared/package.json:1-16 | — | — | package.json:6 (`packages/*`) | — | No | Biblioteca compartilhada (cliente HTTP, React Query, store Zustand; packages/shared/src/index.ts:1-4), sem entrada de aplicação. |
| packages/types | packages/types/package.json | packages/types/package.json:1-9 | — | — | package.json:6 (`packages/*`) | — | No | Pacote só de tipos (packages/types/src/index.ts:1-3), sem entrada de aplicação. |
| packages/ui | packages/ui/package.json | packages/ui/package.json:1-12 | — | — | package.json:6 (`packages/*`) | — | No | Biblioteca de componentes compartilhada (packages/ui/src/index.ts:1-6), sem entrada de aplicação. |

## Resumo

Aplicações frontend no snapshot: 4 (apps/footer, apps/header, apps/host, apps/products).

## Notas

- N = 4 coincide com `frontend_units: 4` da classificação.
- O job `deploy` do único workflow (`.github/workflows/ci-cd.yml:85-152`) roda em matriz sobre os apps afetados, calculados por scripts/ci/affected-workspaces.mjs:3 e `:37-46` (`apps = ['header', 'footer', 'products', 'host']`); cada app é construído pelo seu workspace e publicado em bucket e distribuição próprios. Mudança em `packages/*` marca os quatro apps (scripts/ci/affected-workspaces.mjs:4-13 e `:43-44`).
