---
schema: 1
id: 1033705813
full_name: hscale/adx-core-k
commit: 683dec7ebc233c685f97166a135032d5668070c1
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 060 — hscale/adx-core-k

## Workspace

`package.json:5-10` com `workspaces` (`apps/*`, `packages/*`, `bff-services/*`, `tools/*`), relativos à raiz; na raiz só existe `tools/`, e os diretórios `adx-core/apps/*`, `adx-core/packages/*` e `adx-core/bff-services/*` não são cobertos por esses padrões.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-26 (manifesto da raiz `adx-core-monorepo`) | — | — (package.json:14 `yarn workspaces run build` só delega aos membros) | package.json:5-10 (raiz que declara o workspace) | — | No | Raiz do workspace, sem entrada nem build de aplicação. |
| adx-core/apps/auth | adx-core/apps/auth/package.json;adx-core/apps/auth/vite.config.ts | adx-core/apps/auth/package.json:1-9 (manifesto próprio) | adx-core/apps/auth/index.html:10-11 (entrada `/src/main.tsx`); adx-core/apps/auth/src/main.tsx:6-10 (monta React) | adx-core/apps/auth/vite.config.ts:5-48 (configuração própria); adx-core/apps/auth/package.json:8 (`tsc && vite build`) | — | .github/workflows/deploy-microfrontends.yml:105-111,151-159 (build e envio ao S3 por app da matriz, com caminho `apps/<app>`, sem o prefixo `adx-core/`) | Yes | Aplicação React com entrada e build Vite próprios; módulos expostos presentes. |
| adx-core/apps/file | adx-core/apps/file/package.json;adx-core/apps/file/vite.config.ts | adx-core/apps/file/package.json:1-9 (manifesto próprio) | — (sem `index.html` no diretório) | adx-core/apps/file/vite.config.ts:5-30 (configuração própria; exposes em :13-15 apontam para `src/components/*` ausentes); adx-core/apps/file/package.json:8 (`tsc && vite build`) | — | .github/workflows/deploy-microfrontends.yml:105-111,151-159 (caminho `apps/<app>`, sem o prefixo `adx-core/`) | Undetermined | Build próprio, mas sem entrada e com exposes para arquivos ausentes. |
| adx-core/apps/module | adx-core/apps/module/package.json;adx-core/apps/module/vite.config.ts | adx-core/apps/module/package.json:1-9 (manifesto próprio) | adx-core/apps/module/index.html:10-11 (entrada `/src/main.tsx`); adx-core/apps/module/src/main.tsx:4,6-10 (monta React; importa `./index.css`, ausente) | adx-core/apps/module/vite.config.ts:5-48 (configuração própria; exposes em :15-17 apontam para arquivos ausentes); adx-core/apps/module/package.json:8 (`tsc && vite build`) | — | .github/workflows/deploy-microfrontends.yml:105-111,151-159 (caminho `apps/<app>`, sem o prefixo `adx-core/`) | Undetermined | Entrada e build próprios, mas o build referencia arquivos ausentes do snapshot. |
| adx-core/apps/shell | adx-core/apps/shell/package.json;adx-core/apps/shell/vite.config.ts | adx-core/apps/shell/package.json:1-9 (manifesto próprio) | adx-core/apps/shell/index.html:10-11 (entrada `/src/main.tsx`); adx-core/apps/shell/src/main.tsx:6-10 (monta React) | adx-core/apps/shell/vite.config.ts:6-69 (configuração própria); adx-core/apps/shell/package.json:8 (`tsc && vite build`) | — | .github/workflows/deploy-microfrontends.yml:105-111,151-159 (caminho `apps/shell`, sem o prefixo `adx-core/`) | Yes | Aplicação React com entrada e build Vite próprios. |
| adx-core/apps/tenant | adx-core/apps/tenant/package.json;adx-core/apps/tenant/vite.config.ts | adx-core/apps/tenant/package.json:1-9 (manifesto próprio) | — (sem `index.html` no diretório) | adx-core/apps/tenant/vite.config.ts:5-47 (configuração própria; expose em :13 aponta para `src/components/TenantSwitcher.tsx`, ausente); adx-core/apps/tenant/package.json:8 (`tsc && vite build`) | — | .github/workflows/deploy-microfrontends.yml:105-111,151-159 (caminho `apps/<app>`, sem o prefixo `adx-core/`) | Undetermined | Build próprio, mas sem entrada e com expose para arquivo ausente. |
| adx-core/apps/user | adx-core/apps/user/package.json;adx-core/apps/user/vite.config.ts | adx-core/apps/user/package.json:1-9 (manifesto próprio) | — (sem `index.html` no diretório) | adx-core/apps/user/vite.config.ts:5-30 (configuração própria; exposes em :13-15 apontam para `src/components/*` ausentes); adx-core/apps/user/package.json:8 (`tsc && vite build`) | — | .github/workflows/deploy-microfrontends.yml:105-111,151-159 (caminho `apps/<app>`, sem o prefixo `adx-core/`) | Undetermined | Build próprio, mas sem entrada e com exposes para arquivos ausentes. |
| adx-core/apps/workflow | adx-core/apps/workflow/package.json;adx-core/apps/workflow/vite.config.ts | adx-core/apps/workflow/package.json:1-9 (manifesto próprio) | — (sem `index.html` no diretório) | adx-core/apps/workflow/vite.config.ts:5-30 (configuração própria; exposes em :13-15 apontam para `src/components/*` ausentes); adx-core/apps/workflow/package.json:8 (`tsc && vite build`) | — | .github/workflows/deploy-microfrontends.yml:105-111,151-159 (caminho `apps/<app>`, sem o prefixo `adx-core/`) | Undetermined | Build próprio, mas sem entrada e com exposes para arquivos ausentes. |
| adx-core/bff-services/auth-bff | adx-core/bff-services/auth-bff/package.json | adx-core/bff-services/auth-bff/package.json (manifesto próprio) | — | — (adx-core/bff-services/auth-bff/package.json:7-9 `tsx watch src/server.ts`, `tsc`, servidor Node) | — | — | No | Serviço BFF em Express, não é frontend. |
| adx-core/bff-services/file-bff | adx-core/bff-services/file-bff/package.json | adx-core/bff-services/file-bff/package.json (manifesto próprio) | — | — (adx-core/bff-services/file-bff/package.json:8-10 `tsx watch src/server.ts`, `tsc`, servidor Node) | — | — | No | Serviço BFF em Express, não é frontend. |
| adx-core/bff-services/module-bff | adx-core/bff-services/module-bff/package.json | adx-core/bff-services/module-bff/package.json (manifesto próprio) | — | — (adx-core/bff-services/module-bff/package.json:7-9 `tsx watch src/server.ts`, `tsc`, servidor Node) | — | — | No | Serviço BFF em Express, não é frontend. |
| adx-core/bff-services/tenant-bff | adx-core/bff-services/tenant-bff/package.json | adx-core/bff-services/tenant-bff/package.json (manifesto próprio) | — | — (adx-core/bff-services/tenant-bff/package.json:7-9 `tsx watch src/server.ts`, `tsc`, servidor Node) | — | — | No | Serviço BFF em Express, não é frontend. |
| adx-core/packages/bff-client | adx-core/packages/bff-client/package.json | adx-core/packages/bff-client/package.json (manifesto próprio) | — (adx-core/packages/bff-client/package.json:5 `main: dist/index.js`, biblioteca) | — (adx-core/packages/bff-client/package.json:8 `tsc`) | — | — | No | Biblioteca compartilhada sem entrada de aplicação. |
| adx-core/packages/design-system | adx-core/packages/design-system/package.json | adx-core/packages/design-system/package.json (manifesto próprio) | — (adx-core/packages/design-system/package.json:5 `main: dist/index.js`, biblioteca) | — (adx-core/packages/design-system/package.json:8 `tsc && vite build`, sem `vite.config.*` no diretório) | — | — | No | Biblioteca de componentes sem entrada de aplicação. |
| adx-core/packages/event-bus | adx-core/packages/event-bus/package.json | adx-core/packages/event-bus/package.json (manifesto próprio) | — (adx-core/packages/event-bus/package.json:5 `main: dist/index.js`, biblioteca) | — (adx-core/packages/event-bus/package.json:8 `tsc`) | — | — | No | Biblioteca compartilhada sem entrada de aplicação. |
| adx-core/packages/i18n | adx-core/packages/i18n/package.json | adx-core/packages/i18n/package.json (manifesto próprio) | — (adx-core/packages/i18n/package.json:5 `main: dist/index.js`, biblioteca) | — (adx-core/packages/i18n/package.json:8 `tsc`) | — | — | No | Biblioteca compartilhada sem entrada de aplicação. |
| adx-core/packages/shared-context | adx-core/packages/shared-context/package.json | adx-core/packages/shared-context/package.json (manifesto próprio) | — (adx-core/packages/shared-context/package.json:5 `main: dist/index.js`, biblioteca) | — (adx-core/packages/shared-context/package.json:8 `tsc`) | — | — | No | Biblioteca compartilhada sem entrada de aplicação. |
| tools/kiro-github-task-sync | tools/kiro-github-task-sync/package.json | tools/kiro-github-task-sync/package.json (manifesto próprio) | — | — (tools/kiro-github-task-sync/package.json:7-9 `tsc`, `tsx watch src/index.ts`; sem `src/` no diretório) | package.json:9 (`tools/*`) | — | No | Ferramenta de linha de comando, não é frontend; só o `package.json`. |

## Resumo

Aplicações frontend no snapshot: 2 (adx-core/apps/auth, adx-core/apps/shell).

## Notas

- A classificação registra `frontend_units: 7` (shell e seis remotes). Os sete diretórios de
  `adx-core/apps/` estão no snapshot; a diferença vem dos cinco `Undetermined`: `file`, `tenant`,
  `user` e `workflow` não têm `index.html`, e os `vite.config.ts` de `file`, `tenant`, `user`,
  `workflow` e `module` expõem arquivos que não existem no snapshot. Em `module`, também faltam
  `src/components/ModuleInstaller`, `ModuleSettings` e `ModuleDeveloper`, importados em
  `adx-core/apps/module/src/App.tsx:10-12`, e `src/index.css` (`src/main.tsx:4`). Isso coincide
  com a ressalva de completude da classificação.
- Os workflows de CI (`.github/workflows/deploy-microfrontends.yml:7-8,105-111`) e o workspace da
  raiz (`package.json:5-10`) usam `apps/*` e `packages/*` na raiz, mas os diretórios estão em
  `adx-core/`; não há `package.json` em `adx-core/`. Por isso a coluna Workspace é `—` nas linhas de
  `adx-core/`, e o Deploy citado aponta para um caminho que não corresponde ao snapshot.
- `package-workspace.json` na raiz (`:5-8`, `workspaces` `apps/*`, `packages/*`) não é um
  `package.json`, então não foi tomado como declaração de workspace.
- `adx-core/bff-services/user-bff` e `adx-core/bff-services/workflow-bff` são crates Rust
  (`Cargo.toml`), sem `package.json`, e não estão no `units.csv`; não são frontend.
