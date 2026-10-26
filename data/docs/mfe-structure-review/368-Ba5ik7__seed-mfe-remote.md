---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 368 — Ba5ik7/seed-mfe-remote

## Workspace

angular.json:5 (`projects`) com dois projetos: angular.json:6 e angular.json:13 (seed-mfe-remote, `root: projects/seed-mfe-remote`); angular.json:111 e angular.json:118 (demo, `root: projects/demo`).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | angular.json;package.json | package.json:1-41 (manifesto único do workspace, script `build` = `ng build` em package.json:7) | — | — | — | — | No | Raiz de coordenação do workspace Angular; os targets pertencem aos dois projetos em projects/, sem UI própria na raiz. |
| projects/demo | projects/demo/webpack.config.js;projects/demo/webpack.prod.config.js | — | angular.json:143 (`main: projects/demo/src/main.ts`); angular.json:126 (`index: projects/demo/src/index.html`); projects/demo/src/main.ts:1-2 (carrega bootstrap); projects/demo/src/bootstrap.ts:5-6 (`bootstrapApplication(AppComponent, appConfig)`) | angular.json:122-125 (target `build` com `ngx-build-plus:browser`, `outputPath: dist/demo`); angular.json:144 (`extraWebpackConfig: projects/demo/webpack.config.js`); angular.json:162 (`webpack.prod.config.js` em production); angular.json:172-173 e :185 (target `serve`, porta 4201) | angular.json:111 e angular.json:118 (projeto demo) | — | Yes | Projeto Angular (host) com entrada e target de build próprios, sem necessidade de manifesto local. |
| projects/seed-mfe-remote | projects/seed-mfe-remote/webpack.config.js;projects/seed-mfe-remote/webpack.prod.config.js | — | angular.json:38 (`main: projects/seed-mfe-remote/src/main.ts`); angular.json:21 (`index: projects/seed-mfe-remote/src/index.html`); projects/seed-mfe-remote/src/main.ts:1-2 (carrega bootstrap); projects/seed-mfe-remote/src/bootstrap.ts:5-6 (`bootstrapApplication(AppRemoteComponent, appConfig)`) | angular.json:17-20 (target `build` com `ngx-build-plus:browser`, `outputPath: dist/seed-mfe-remote`); angular.json:39 (`extraWebpackConfig: projects/seed-mfe-remote/webpack.config.js`); angular.json:57 (`webpack.prod.config.js` em production); angular.json:67-68 e :80 (target `serve`, porta 4202) | angular.json:6 e angular.json:13 (projeto seed-mfe-remote) | — | Yes | Projeto Angular (remote) com entrada e target de build próprios, sem necessidade de manifesto local. |

## Resumo

Aplicações frontend no snapshot: 2 (projects/demo, projects/seed-mfe-remote).

## Notas

- O N coincide com `frontend_units: 2` da classificação.
- Sem `Dockerfile`, CI ou configuração de hospedagem no snapshot, e sem ocorrências `ws-*`, `ops-*` ou `ci-*` no matches.csv; os dois projetos se separam só pelos targets, `outputPath` e portas do angular.json.
- Os `assets` de cada target `build` apontam para `projects/<app>/public` (angular.json:30 e angular.json:135), diretório ausente do snapshot; não afeta entrada nem build.
