---
schema: 1
id: 994642993
full_name: ayushpandey241626/microfrontend-demo
commit: ec39a278ec6951feeb8d7ff7688cb4f056be589b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 229 — ayushpandey241626/microfrontend-demo

## Workspace

angular.json:5 (`projects` com quatro projetos): angular.json:6 (host-app), angular.json:107 (mfe1), angular.json:208 (mfe2), angular.json:309 (login-mfe-app).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | angular.json;package.json | package.json:1-45 (manifesto único do workspace) | — | — | — | — | No | Raiz de coordenação do workspace Angular; os targets pertencem aos quatro projetos em projects/, sem UI própria na raiz. |
| projects/host-app | projects/host-app/webpack.config.js;projects/host-app/webpack.prod.config.js | — | angular.json:34 (`main: projects/host-app/src/main.ts`); angular.json:17 (`index`); projects/host-app/src/main.ts:1 (carrega bootstrap); projects/host-app/src/bootstrap.ts:5 (inicia a UI) | angular.json:13-14 (target `build` com `ngx-build-plus:browser`); angular.json:35 (`extraWebpackConfig: projects/host-app/webpack.config.js`) | angular.json:6 (projeto host-app) | — | Yes | Projeto Angular com entrada e target de build próprios. |
| projects/login-mfe-app | projects/login-mfe-app/webpack.config.js;projects/login-mfe-app/webpack.prod.config.js | — | angular.json:341 (`main: projects/login-mfe-app/src/main.ts`); angular.json:324 (`index`); projects/login-mfe-app/src/main.ts:1 (carrega bootstrap); projects/login-mfe-app/src/bootstrap.ts:5 (inicia a UI) | angular.json:320-321 (target `build` com `ngx-build-plus:browser`); angular.json:342 (`extraWebpackConfig: projects/login-mfe-app/webpack.config.js`) | angular.json:309 (projeto login-mfe-app) | — | Yes | Projeto Angular com entrada e target de build próprios. |
| projects/mfe1 | projects/mfe1/webpack.config.js;projects/mfe1/webpack.prod.config.js | — | angular.json:135 (`main: projects/mfe1/src/main.ts`); angular.json:118 (`index`); projects/mfe1/src/main.ts:1 (carrega bootstrap); projects/mfe1/src/bootstrap.ts:5 (inicia a UI) | angular.json:114-115 (target `build` com `ngx-build-plus:browser`); angular.json:136 (`extraWebpackConfig: projects/mfe1/webpack.config.js`) | angular.json:107 (projeto mfe1) | — | Yes | Projeto Angular com entrada e target de build próprios. |
| projects/mfe2 | projects/mfe2/webpack.config.js;projects/mfe2/webpack.prod.config.js | — | angular.json:236 (`main: projects/mfe2/src/main.ts`); angular.json:219 (`index`); projects/mfe2/src/main.ts:1 (carrega bootstrap); projects/mfe2/src/bootstrap.ts:5 (inicia a UI) | angular.json:215-216 (target `build` com `ngx-build-plus:browser`); angular.json:237 (`extraWebpackConfig: projects/mfe2/webpack.config.js`) | angular.json:208 (projeto mfe2) | — | Yes | Projeto Angular com entrada e target de build próprios. |

## Resumo

Aplicações frontend no snapshot: 4 (projects/host-app, projects/login-mfe-app, projects/mfe1, projects/mfe2).

## Notas

- N = 4 coincide com `frontend_units: 4` da classificação; não há unidades externas.
- Nenhuma ocorrência `ws-*`, `ops-*` ou `ci-*` no `matches.csv`, e nenhum Dockerfile, workflow ou configuração de hospedagem no snapshot. Os `tsconfig*.json` marcados como `workspace-config` no `artifacts.csv` não declaram workspace.
- Cada projeto também tem alvo `serve` próprio com porta fixa: angular.json:76 (4200), :177 (4201), :278 (4202), :383 (4203).
