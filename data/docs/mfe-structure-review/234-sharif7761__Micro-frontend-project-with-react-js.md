---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-22 (manifesto de scripts, sem dependências) | — | — | — | — | No | Raiz sem entrada nem build próprios; os scripts só entram nos subdiretórios (`package.json:7-14`). |
| common_simple | common_simple/package.json;common_simple/rsbuild.config.ts | common_simple/package.json:1-23 (manifesto próprio) | common_simple/src/index.tsx:1-10 (entrada convencional Rsbuild; monta React) | common_simple/rsbuild.config.ts:5-31 (configuração própria); common_simple/package.json:8 (`rsbuild build`) | — | — | Yes | Aplicação React de demonstração com entrada e build Rsbuild próprios. |
| core_simple | core_simple/package.json;core_simple/rsbuild.config.ts | core_simple/package.json:1-24 (manifesto próprio) | core_simple/src/index.tsx:1 (entrada convencional Rsbuild, `import('./bootstrap')`); core_simple/src/bootstrap.tsx:5-10 (monta React) | core_simple/rsbuild.config.ts:5-34 (configuração própria); core_simple/package.json:8 (`rsbuild build`) | — | — | Yes | Aplicação React com entrada e build Rsbuild próprios. |
| users_simple | users_simple/package.json;users_simple/rsbuild.config.ts | users_simple/package.json:1-24 (manifesto próprio) | users_simple/src/index.tsx:1 (entrada convencional Rsbuild, `import('./bootstrap')`); users_simple/src/bootstrap.tsx:5-10 (monta React) | users_simple/rsbuild.config.ts:5-36 (configuração própria); users_simple/package.json:8 (`rsbuild build`) | — | — | Yes | Aplicação React com entrada e build Rsbuild próprios. |

## Resumo

Aplicações frontend no snapshot: 3 (common_simple, core_simple, users_simple).

## Notas

- Os `package.json` e `tsconfig.json` aparecem como `workspace-config` no `artifacts.csv`, mas nenhum `package.json` declara `workspaces` e não há `pnpm-workspace.yaml`, `lerna.json`, `turbo.json` nem `nx.json`. O `matches.csv` não tem ocorrências `ws-*`, `ops-*` nem `ci-*`, e o snapshot não tem Dockerfile, workflow nem configuração de hospedagem.
- Cada projeto tem `public/index.html`, mas nenhuma `rsbuild.config.ts` define `html.template`; a entrada citada é a convenção `src/index.tsx`.
- N = 3 coincide com `frontend_units: 3` da classificação. `common_simple` é a biblioteca de componentes federada, mas tem app de demonstração próprio, por isso conta como fronteira de aplicação aqui.
