---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| host | host/angular.json;host/federation.config.js;host/package.json | host/package.json:1-55 (pacote próprio `host`) | host/angular.json:60 (`browser: src/main.ts`); host/src/main.ts:3-7 (`initFederation` com o remote e `import('./bootstrap')`); host/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | host/angular.json:16-29 (alvo `build`, builder `@angular-architects/native-federation:build` sobre o alvo `esbuild`, host/angular.json:57-58 `@angular/build:application`); host/package.json:7 (`ng build`) | — | — | Yes | Workspace Angular próprio com pacote, entrada e alvo de build próprios, servido na porta 4200 (host/angular.json:111). |
| remote | remote/angular.json;remote/federation.config.js;remote/package.json | remote/package.json:1-55 (pacote próprio `remote`) | remote/angular.json:61 (`browser: src/main.ts`); remote/src/main.ts:3-6 (`initFederation()` e `import('./bootstrap')`); remote/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | remote/angular.json:16-31 (alvo `build`, builder `@angular-architects/native-federation:build` sobre o alvo `esbuild`, remote/angular.json:58-59 `@angular/build:application`); remote/package.json:7 (`ng build`) | — | — | Yes | Workspace Angular próprio com pacote, entrada e alvo de build próprios, servido na porta 4201 (remote/angular.json:108). |

## Resumo

Aplicações frontend no snapshot: 2 (host, remote).

## Notas

- Cada `angular.json` declara um único projeto (host/angular.json:8-9 `host`; remote/angular.json:8-9 `remote`), com `root` vazio; não há workspace que agrupe os dois diretórios. A raiz do snapshot tem só `.gitignore`, `README.md`, `host/` e `remote/`.
- Não há Dockerfile, CI nem configuração de hospedagem no snapshot.
- N = 2 coincide com `frontend_units: 2` da classificação.
- `host/src/styles.css:4` faz o Tailwind do host varrer `../../remote/src/**`; isso é geração de CSS no build do host, não entrada nem build do remote, e não muda as linhas acima. O efeito sobre a classificação é o ponto aberto da classificação, não desta etapa.
