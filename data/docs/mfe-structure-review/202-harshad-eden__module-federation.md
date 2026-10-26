---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 202 — harshad-eden/module-federation

## Workspace

`pnpm-workspace.yaml:1-3` (`packages:` com `apps/*` e `packages/*`); `package.json:6-9` (`workspaces` com os mesmos padrões).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-43 (manifesto do workspace `insurance-platform`, `private`) | — | — (package.json:16-22: `build` só delega aos pacotes e apps por `cd … && pnpm run build`) | — | — | No | Raiz de coordenação do workspace, sem entrada nem configuração de build de UI próprias. |
| apps/product-config | apps/product-config/package.json;apps/product-config/vite.config.ts | apps/product-config/package.json:1-9 (manifesto `@insurance/product-config`) | apps/product-config/index.html:10-11 (`#root` e `/src/main.tsx`); apps/product-config/src/main.tsx:7-13 (monta React) | apps/product-config/vite.config.ts:5-33 (configuração própria, porta 3004); apps/product-config/package.json:7 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Aplicação React com entrada e build Vite próprios. |
| apps/sales-portal | apps/sales-portal/package.json;apps/sales-portal/vite.config.ts | apps/sales-portal/package.json:1-9 (manifesto `@insurance/sales-portal`) | apps/sales-portal/index.html:10-11 (`#root` e `/src/main.tsx`); apps/sales-portal/src/main.tsx:7-13 (monta React) | apps/sales-portal/vite.config.ts:5-33 (configuração própria, porta 3001); apps/sales-portal/package.json:7 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Aplicação React com entrada e build Vite próprios. |
| apps/shell | apps/shell/package.json;apps/shell/vite.config.ts | apps/shell/package.json:1-9 (manifesto `@insurance/shell`) | apps/shell/index.html:10-11 (`#root` e `/src/main.tsx`); apps/shell/src/main.tsx:7-13 (monta React) | apps/shell/vite.config.ts:5-26 (configuração própria, porta 3000); apps/shell/package.json:7 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Aplicação React com entrada e build Vite próprios. |
| apps/underwriter-portal | apps/underwriter-portal/package.json;apps/underwriter-portal/vite.config.ts | apps/underwriter-portal/package.json:1-9 (manifesto `@insurance/underwriter-portal`) | apps/underwriter-portal/index.html:10-11 (`#root` e `/src/main.tsx`); apps/underwriter-portal/src/main.tsx:7-13 (monta React) | apps/underwriter-portal/vite.config.ts:5-33 (configuração própria, porta 3002); apps/underwriter-portal/package.json:7 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Aplicação React com entrada e build Vite próprios. |
| packages/shared-types | packages/shared-types/package.json | packages/shared-types/package.json:1-17 (manifesto `@insurance/shared-types`, `main: dist/index.js`) | — | packages/shared-types/package.json:8 (`tsc`, biblioteca) | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Pacote de tipos compartilhado, sem entrada de aplicação. |
| packages/shared-ui | packages/shared-ui/package.json | packages/shared-ui/package.json:1-39 (manifesto `@insurance/shared-ui`, `main: dist/index.js`) | — | packages/shared-ui/package.json:8 (`tsc` e `tailwindcss`, biblioteca) | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Biblioteca de componentes compartilhada, sem entrada de aplicação. |

## Resumo

Aplicações frontend no snapshot: 4 (apps/product-config, apps/sales-portal, apps/shell, apps/underwriter-portal).

## Notas

- N = 4 coincide com `frontend_units: 4` da classificação.
- As ocorrências `ops-hosting` estão todas em `DEPLOYMENT_GUIDE.md` (por exemplo `:35-46`, `:136-142`, `:205-207`), que descreve projetos Vercel por app e `vercel.json` por diretório; nenhum `vercel.json`, Dockerfile ou workflow existe no snapshot, então as células Deploy ficam `—`. O guia também cita `apps/employer-portal` e `apps/service-provider`, ausentes do snapshot.
- As ocorrências `ops-cors` (`apps/*/vite.config.ts:28`) são cabeçalhos do servidor de desenvolvimento dos remotos, não artefato de deploy.
