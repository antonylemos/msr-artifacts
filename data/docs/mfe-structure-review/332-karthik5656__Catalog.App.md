---
schema: 1
id: 1350705751
full_name: karthik5656/Catalog.App
commit: 1982e0f3dae5a8508d354f9db91a089ba96d4bd6
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 332 — karthik5656/Catalog.App

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| src/frontend | src/frontend/package.json | src/frontend/package.json:1-21 (manifesto com só o script `test` placeholder e `packageManager`) | — | — | — | — | No | Só `package.json`, sem entrada nem build; os apps em `apps/` têm manifesto próprio. |
| src/frontend/apps/ui-catalog | src/frontend/apps/ui-catalog/package.json;src/frontend/apps/ui-catalog/vite.config.ts | src/frontend/apps/ui-catalog/package.json:1-33 (manifesto próprio) | src/frontend/apps/ui-catalog/index.html:11 (entrada `/src/main.tsx`); src/frontend/apps/ui-catalog/src/main.tsx:7 (`createRoot(...).render`) | src/frontend/apps/ui-catalog/vite.config.ts:74-110 (configuração própria); src/frontend/apps/ui-catalog/package.json:8 (`tsc -noemit && vite build`) | — | src/frontend/apps/ui-catalog/Dockerfile:1-23 (build com pnpm e nginx); .github/workflows/ci-pipeline.yml:238-247 (job constrói e publica a imagem `ui-catalog`) | Yes | Aplicação React (shell) com entrada e build Vite próprios. |
| src/frontend/apps/ui-catalog-consumer | src/frontend/apps/ui-catalog-consumer/package.json;src/frontend/apps/ui-catalog-consumer/vite.config.ts | src/frontend/apps/ui-catalog-consumer/package.json:1-33 (manifesto próprio) | src/frontend/apps/ui-catalog-consumer/index.html:11 (entrada `/src/main.tsx`); src/frontend/apps/ui-catalog-consumer/src/main.tsx:7 (`createRoot(...).render`) | src/frontend/apps/ui-catalog-consumer/vite.config.ts:7-53 (configuração própria); src/frontend/apps/ui-catalog-consumer/package.json:8 (`tsc --noemit && vite build`) | — | src/frontend/apps/ui-catalog-consumer/Dockerfile:1-23 (build com pnpm e nginx); .github/workflows/ci-pipeline.yml:250-259 (job constrói e publica a imagem `ui-catalog-consumer`) | Yes | Aplicação React (remoto) com entrada e build Vite próprios. |
| src/frontend/apps/ui-catalog-merchant | src/frontend/apps/ui-catalog-merchant/package.json;src/frontend/apps/ui-catalog-merchant/vite.config.ts | src/frontend/apps/ui-catalog-merchant/package.json:1-33 (manifesto próprio) | src/frontend/apps/ui-catalog-merchant/index.html:11 (entrada `/src/main.tsx`); src/frontend/apps/ui-catalog-merchant/src/main.tsx:7 (`createRoot(...).render`) | src/frontend/apps/ui-catalog-merchant/vite.config.ts:7-53 (configuração própria); src/frontend/apps/ui-catalog-merchant/package.json:8 (`tsc --noemit && vite build`) | — | src/frontend/apps/ui-catalog-merchant/Dockerfile:1-23 (build com pnpm e nginx); .github/workflows/ci-pipeline.yml:262-271 (job constrói e publica a imagem `ui-catalog-merchant`) | Yes | Aplicação React (remoto) com entrada e build Vite próprios. |

## Resumo

Aplicações frontend no snapshot: 3 (src/frontend/apps/ui-catalog, src/frontend/apps/ui-catalog-consumer, src/frontend/apps/ui-catalog-merchant).

## Notas

- N = 3 coincide com `frontend_units: 3` da classificação.
- Não há `pnpm-workspace.yaml`, `turbo.json`, `nx.json`, `lerna.json` nem `workspaces` em `package.json`; cada app tem o próprio `pnpm-lock.yaml`. Os `tsconfig*.json` marcados como `workspace-config` no `artifacts.csv` são configurações de TypeScript de cada app, não declaração de workspace.
- Os backends .NET em `src/backend/` também têm Dockerfile e job de CI, mas não estão no `units.csv` e não são frontend.
