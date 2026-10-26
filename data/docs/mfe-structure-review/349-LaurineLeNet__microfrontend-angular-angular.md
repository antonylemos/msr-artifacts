---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 349 — LaurineLeNet/microfrontend-angular-angular

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| athletes | athletes/angular.json;athletes/federation.config.js;athletes/package.json | athletes/package.json:1-41 (pacote próprio `athletes`) | athletes/angular.json:46 (`browser: src/main.ts`); athletes/src/main.ts:3-5 (`initFederation()` e `import('./bootstrap')`); athletes/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | athletes/angular.json:16-29 (alvo `build`, builder `@angular-architects/native-federation:build` sobre o alvo `esbuild`, athletes/angular.json:43-44 `@angular/build:application`); athletes/package.json:7 (`ng build`) | — | athletes/wrangler.jsonc:3-15 (Cloudflare Worker `mf-angular-athletes` publicando `./dist/athletes/browser`); athletes/public/_headers:1-2 (CORS `*`) | Yes | Workspace Angular próprio com pacote, entrada, alvo de build e configuração de hospedagem próprios, servido na porta 4201 (athletes/angular.json:93). |
| ranking | ranking/angular.json;ranking/federation.config.js;ranking/package.json | ranking/package.json:1-41 (pacote próprio `ranking`) | ranking/angular.json:46 (`browser: src/main.ts`); ranking/src/main.ts:3-5 (`initFederation()` e `import('./bootstrap')`); ranking/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | ranking/angular.json:16-29 (alvo `build`, builder `@angular-architects/native-federation:build` sobre o alvo `esbuild`, ranking/angular.json:43-44 `@angular/build:application`); ranking/package.json:7 (`ng build`) | — | ranking/wrangler.jsonc:3-15 (Cloudflare Worker `mf-angular-ranking` publicando `./dist/ranking/browser`); ranking/public/_headers:1-2 (CORS `*`) | Yes | Workspace Angular próprio com pacote, entrada, alvo de build e configuração de hospedagem próprios, servido na porta 4202 (ranking/angular.json:93). |
| shell | shell/angular.json;shell/federation.config.js;shell/package.json | shell/package.json:1-41 (pacote próprio `shell`) | shell/angular.json:46 (`browser: src/main.ts`); shell/src/main.ts:3-5 (`initFederation('federation.manifest.json')` e `import('./bootstrap')`); shell/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | shell/angular.json:16-29 (alvo `build`, builder `@angular-architects/native-federation:build` sobre o alvo `esbuild`, shell/angular.json:43-44 `@angular/build:application`); shell/package.json:7 (`ng build`) | — | shell/wrangler.jsonc:3-15 (Cloudflare Worker `mf-angular-shell` publicando `./dist/shell/browser`) | Yes | Workspace Angular próprio com pacote, entrada, alvo de build e configuração de hospedagem próprios, servido na porta 4200 (shell/angular.json:93). |

## Resumo

Aplicações frontend no snapshot: 3 (athletes, ranking, shell).

## Notas

- Cada `angular.json` declara um único projeto (`athletes/angular.json:8-9`, `ranking/angular.json:8-9`, `shell/angular.json:8-9`), com `root` vazio; nenhum `package.json` tem `workspaces`, e não há `package.json` nem configuração de workspace na raiz do snapshot (só `.gitignore`, `athletes/`, `ranking/` e `shell/`).
- O `wrangler.jsonc` de cada diretório não está entre as ocorrências `ops-*` do `matches.csv` (que só traz os `_headers` dos dois remotes); foi registrado na coluna Deploy como configuração de hospedagem lida no snapshot. Não há Dockerfile nem CI.
- N = 3 coincide com `frontend_units: 3` da classificação.
