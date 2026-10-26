---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 316 — Tutul33/mf-workspace

## Workspace

angular.json:5 (`projects`) com três projetos: angular.json:6 e angular.json:13 (host-app, `root: projects/host-app`); angular.json:119 e angular.json:126 (customer-app, `root: projects/customer-app`); angular.json:232 e angular.json:239 (orders-app, `root: projects/orders-app`).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | angular.json;package.json | package.json:1-10 (manifesto do workspace, script `build` = `ng build`) | — | — | — | — | No | Raiz de coordenação Angular; os targets pertencem às três aplicações em projects/, sem UI própria na raiz. |
| projects/customer-app | projects/customer-app/federation.config.js | — | angular.json:175 (`browser` customer-app); projects/customer-app/src/main.ts:1-6 (carrega bootstrap); projects/customer-app/src/bootstrap.ts:1-6 (inicia a UI) | angular.json:130-142 (target `build` customer-app, native-federation); angular.json:172-175 (alvo `esbuild`, `@angular/build:application`) | angular.json:119 e angular.json:126 (projeto customer-app) | — | Yes | Projeto Angular com entrada e target de build próprios, sem necessidade de manifesto local. |
| projects/host-app | projects/host-app/federation.config.js | — | angular.json:62 (`browser` host-app); projects/host-app/src/main.ts:1-8 (carrega bootstrap); projects/host-app/src/bootstrap.ts:1-6 (inicia a UI) | angular.json:17-29 (target `build` host-app, native-federation); angular.json:59-62 (alvo `esbuild`, `@angular/build:application`) | angular.json:6 e angular.json:13 (projeto host-app) | — | Yes | Projeto Angular com entrada e target de build próprios, sem necessidade de manifesto local. |
| projects/orders-app | projects/orders-app/federation.config.js | — | angular.json:288 (`browser` orders-app); projects/orders-app/src/main.ts:1-6 (carrega bootstrap); projects/orders-app/src/bootstrap.ts:1-6 (inicia a UI) | angular.json:243-255 (target `build` orders-app, native-federation); angular.json:285-288 (alvo `esbuild`, `@angular/build:application`) | angular.json:232 e angular.json:239 (projeto orders-app) | — | Yes | Projeto Angular com entrada e target de build próprios, sem necessidade de manifesto local. |

## Resumo

Aplicações frontend no snapshot: 3 (projects/customer-app, projects/host-app, projects/orders-app).

## Notas

- O N coincide com `frontend_units: 3` da classificação.
- Sem `Dockerfile`, CI ou configuração de hospedagem no snapshot, e sem ocorrências `ws-*`, `ops-*` ou `ci-*` no matches.csv; as aplicações se separam só pelos targets e portas do angular.json.
- Os `assets` de cada alvo `esbuild` apontam para `projects/<app>/public` (ex.: angular.json:67-68), diretório ausente do snapshot; não afeta entrada nem build.
