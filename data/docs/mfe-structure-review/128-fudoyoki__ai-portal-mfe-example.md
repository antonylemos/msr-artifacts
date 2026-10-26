---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 128 — fudoyoki/ai-portal-mfe-example

## Workspace

`package.json:5-8` declara `workspaces` com `apps/*` e `packages/*` (npm workspaces); `turbo.json:3-25` define as tasks do Turborepo sobre esse workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-25 (manifesto do workspace) | — | — | — | docker-compose.yml:3-58 (orquestra os serviços `shell`, `mfe-dashboard` e `bff` dos subdiretórios, não um artefato deste diretório) | No | Raiz de coordenação do workspace; `package.json:10-11` só delega `dev`/`build` a `turbo run`. |
| apps/bff | apps/bff/package.json | apps/bff/package.json:1-32 (manifesto próprio) | — | apps/bff/package.json:6 (`nest build`); apps/bff/nest-cli.json:1-8 (configuração do Nest CLI, `sourceRoot: src`) | package.json:6 (`apps/*`) | apps/bff/Dockerfile:2-16 (imagem própria com `npm run build`); docker-compose.yml:40-43 (serviço `bff`) | No | Servidor NestJS (BFF), não é frontend. |
| apps/mfe-dashboard | apps/mfe-dashboard/package.json;apps/mfe-dashboard/vite.config.ts | apps/mfe-dashboard/package.json:1-31 (manifesto próprio) | apps/mfe-dashboard/index.html:10-11 (entrada `/src/main.tsx`); apps/mfe-dashboard/src/main.tsx:17-26 (monta `DashboardApp` com React em modo standalone) | apps/mfe-dashboard/vite.config.ts:8-56 (configuração própria); apps/mfe-dashboard/package.json:8 (`tsc && vite build`) | package.json:6 (`apps/*`) | apps/mfe-dashboard/Dockerfile:12-33 (build só deste app e imagem nginx); docker-compose.yml:19-22 (serviço `mfe-dashboard`) | Yes | Aplicação React com entrada e build Vite próprios e imagem de deploy separada. |
| apps/shell | apps/shell/package.json;apps/shell/vite.config.ts | apps/shell/package.json:1-32 (manifesto próprio) | apps/shell/index.html:10-11 (entrada `/src/main.tsx`); apps/shell/src/main.tsx:8-16 (monta `App` com React) | apps/shell/vite.config.ts:25-76 (configuração própria); apps/shell/package.json:8 (`tsc && vite build`) | package.json:6 (`apps/*`) | apps/shell/Dockerfile:12-33 (build só deste app e imagem nginx); docker-compose.yml:5-8 (serviço `shell`) | Yes | Aplicação React com entrada e build Vite próprios e imagem de deploy separada. |
| packages/shared-types | packages/shared-types/package.json | packages/shared-types/package.json:1-25 (manifesto próprio) | — | packages/shared-types/package.json:17 (`tsup src/index.ts`, build de biblioteca) | package.json:7 (`packages/*`) | — | No | Pacote compartilhado de tipos, sem entrada de aplicação. |
| packages/ui-kit | packages/ui-kit/package.json | packages/ui-kit/package.json:1-35 (manifesto próprio) | — | packages/ui-kit/package.json:18 (`tsup src/index.ts`, build de biblioteca) | package.json:7 (`packages/*`) | — | No | Biblioteca de componentes compartilhada, sem entrada de aplicação. |

## Resumo

Aplicações frontend no snapshot: 2 (apps/mfe-dashboard, apps/shell).

## Notas

- N = 2 coincide com `frontend_units: 2` da classificação. Os remotes Chat, Tools e Admin só aparecem comentados (apps/shell/vite.config.ts:32-35; docker-compose.yml:29-37) e não têm diretório no snapshot.
- Os marcadores do `units.csv` não incluem os `index.html` de `apps/shell` e `apps/mfe-dashboard`, embora os arquivos existam e sejam a entrada do Vite.
- Os Dockerfiles de `apps/shell` e `apps/mfe-dashboard` também constroem `packages/shared-types` e `packages/ui-kit` (Dockerfile:18-19), mas a imagem final copia só o `dist` do próprio app (Dockerfile:26).
