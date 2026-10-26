---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| sticky-notes | sticky-notes/angular.json;sticky-notes/federation.config.js;sticky-notes/package.json | sticky-notes/package.json:1-48 (pacote próprio `sticky-notes`) | sticky-notes/angular.json:46 (`browser: src/main.ts`); sticky-notes/src/main.ts:3-5 (`initFederation()` e `import('./bootstrap')`); sticky-notes/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | sticky-notes/angular.json:16-29 (alvo `build`, builder `@angular-architects/native-federation:build` sobre o alvo `esbuild`, angular.json:43-44 `@angular/build:application`); sticky-notes/package.json:7 (`ng build`) | — | — | Yes | Projeto Angular com pacote, entrada e alvo de build próprios, servido na porta 4333. |
| tea-tracker | tea-tracker/angular.json;tea-tracker/federation.config.js;tea-tracker/package.json | tea-tracker/package.json:1-48 (pacote próprio `tea-tracker`) | tea-tracker/angular.json:46 (`browser: src/main.ts`); tea-tracker/src/main.ts:3-5 (`initFederation()` e `import('./bootstrap')`); tea-tracker/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | tea-tracker/angular.json:16-29 (alvo `build`, builder `@angular-architects/native-federation:build` sobre o alvo `esbuild`, angular.json:43-44 `@angular/build:application`); tea-tracker/package.json:7 (`ng build`) | — | — | Yes | Projeto Angular com pacote, entrada e alvo de build próprios, servido na porta 4222. |
| test-base | test-base/angular.json;test-base/federation.config.js;test-base/package.json | test-base/package.json:1-48 (pacote próprio `test-base`) | test-base/angular.json:46 (`browser: src/main.ts`); test-base/src/main.ts:3-5 (`initFederation('federation.manifest.json')` e `import('./bootstrap')`); test-base/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | test-base/angular.json:16-29 (alvo `build`, builder `@angular-architects/native-federation:build` sobre o alvo `esbuild`, angular.json:43-44 `@angular/build:application`); test-base/package.json:7 (`ng build`) | — | — | Yes | Projeto Angular com pacote, entrada e alvo de build próprios, servido na porta 4200. |

## Resumo

Aplicações frontend no snapshot: 3 (sticky-notes, tea-tracker, test-base).

## Notas

- Não há manifesto na raiz do snapshot; cada `angular.json` declara um único projeto (`sticky-notes/angular.json:8-9`, `tea-tracker/angular.json:8-9`, `test-base/angular.json:8-9`), e nenhum `package.json` tem `workspaces`. O `artifacts.csv` marca `package.json` e `tsconfig*.json` como `workspace-config`, mas o `matches.csv` não tem ocorrência `ws-*`.
- As portas vêm do alvo `serve-original` (`sticky-notes/angular.json:96-98`, `tea-tracker/angular.json:96-98`, `test-base/angular.json:96-98`).
- Não há Dockerfile, CI ou configuração de hospedagem no snapshot, e o `matches.csv` não tem ocorrências `ops-*` ou `ci-*`.
- A contagem 3 coincide com `frontend_units: 3` da classificação.
