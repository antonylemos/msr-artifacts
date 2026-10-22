---
schema: 1
id: 1007785611
full_name: a-kelen/mfe
commit: 80e4481f9b927142d2c57f4c2787da93ad01b54e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 017 — a-kelen/mfe

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| packages/auth | packages/auth/package.json | packages/auth/package.json:1-7 (manifesto próprio) | packages/auth/src/index.js:1 (entrada webpack); packages/auth/src/bootstrap.js:7-16 (monta a UI); packages/auth/config/webpack.common.js:25-26 (entrada ou template do build) | packages/auth/package.json:6 (`webpack --config` de produção); packages/auth/config/webpack.prod.js:1-10 (configuração própria) | — | .github/workflows/auth.yml:10-23 (job no diretório da aplicação); .github/workflows/auth.yml:26 (publica dist em prefixo próprio) | Yes | Aplicação com entrada, build webpack e workflow próprios. |
| packages/auth/config | packages/auth/config/webpack.common.js;packages/auth/config/webpack.dev.js;packages/auth/config/webpack.prod.js | — | — | — | — | — | No | Configurações do build de packages/auth; não constitui aplicação separada. |
| packages/container | packages/container/package.json | packages/container/package.json:1-7 (manifesto próprio) | packages/container/src/index.js:1 (entrada webpack); packages/container/src/bootstrap.js:1-5 (monta a UI); packages/container/config/webpack.common.js:25-26 (entrada ou template do build) | packages/container/package.json:6 (`webpack --config` de produção); packages/container/config/webpack.prod.js:1-10 (configuração própria) | — | .github/workflows/container.yml:10-23 (job no diretório da aplicação); .github/workflows/container.yml:28 (publica dist em prefixo próprio) | Yes | Aplicação com entrada, build webpack e workflow próprios. |
| packages/container/config | packages/container/config/webpack.common.js;packages/container/config/webpack.dev.js;packages/container/config/webpack.prod.js | — | — | — | — | — | No | Configurações do build de packages/container; não constitui aplicação separada. |
| packages/dashboard | packages/dashboard/package.json | packages/dashboard/package.json:1-7 (manifesto próprio) | packages/dashboard/src/index.js:1 (entrada webpack); packages/dashboard/src/bootstrap.js:4-12 (monta a UI); packages/dashboard/config/webpack.common.js:5 (entrada ou template do build) | packages/dashboard/package.json:6 (`webpack --config` de produção); packages/dashboard/config/webpack.prod.js:1-10 (configuração própria) | — | .github/workflows/dashboard.yml:10-23 (job no diretório da aplicação); .github/workflows/dashboard.yml:26 (publica dist em prefixo próprio) | Yes | Aplicação com entrada, build webpack e workflow próprios. |
| packages/dashboard/config | packages/dashboard/config/webpack.common.js;packages/dashboard/config/webpack.dev.js;packages/dashboard/config/webpack.prod.js | — | — | — | — | — | No | Configurações do build de packages/dashboard; não constitui aplicação separada. |
| packages/marketing | packages/marketing/package.json | packages/marketing/package.json:1-7 (manifesto próprio) | packages/marketing/src/index.js:1 (entrada webpack); packages/marketing/src/bootstrap.js:6-15 (monta a UI); packages/marketing/config/webpack.common.js:25-26 (entrada ou template do build) | packages/marketing/package.json:6 (`webpack --config` de produção); packages/marketing/config/webpack.prod.js:1-10 (configuração própria) | — | .github/workflows/marketing.yml:10-23 (job no diretório da aplicação); .github/workflows/marketing.yml:26 (publica dist em prefixo próprio) | Yes | Aplicação com entrada, build webpack e workflow próprios. |
| packages/marketing/config | packages/marketing/config/webpack.common.js;packages/marketing/config/webpack.dev.js;packages/marketing/config/webpack.prod.js | — | — | — | — | — | No | Configurações do build de packages/marketing; não constitui aplicação separada. |

## Resumo

Aplicações frontend no snapshot: 4 (packages/auth, packages/container, packages/dashboard, packages/marketing).

## Notas

- O agrupamento em packages/ não declara workspace de gerenciador de pacotes. Os workflows usam cada aplicação como working-directory.
- As linhas packages/<app>/config pertencem às aplicações acima e não recebem suas características como se fossem novas unidades.
