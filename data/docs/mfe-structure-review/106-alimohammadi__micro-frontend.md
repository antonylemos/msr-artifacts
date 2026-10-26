---
schema: 1
id: 971885751
full_name: alimohammadi/micro-frontend
commit: 7a05f74105f816f60621d9ba9171b269aa8e5cab
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 106 — alimohammadi/micro-frontend

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| ecomm/cart | ecomm/cart/package.json;ecomm/cart/webpack.config.js | ecomm/cart/package.json:1-24 (pacote próprio `cart`) | ecomm/cart/src/index.js:1 (entrada convencional webpack, `import("./mount")`); ecomm/cart/src/mount.js:14-19 (monta a UI em `#dev-cart`); ecomm/cart/webpack.config.js:22-24 (template `./public/index.html`) | ecomm/cart/webpack.config.js:4-26 (configuração própria, porta 8082); ecomm/cart/package.json:6 (`webpack serve`) | — | — | Yes | Aplicação JavaScript com entrada e configuração webpack próprias, servida isoladamente. |
| ecomm/container | ecomm/container/package.json;ecomm/container/webpack.config.js | ecomm/container/package.json:1-22 (pacote próprio `container`) | ecomm/container/src/index.js:1 (entrada convencional webpack, `import('./bootstrap')`); ecomm/container/src/bootstrap.js:5-6 (monta os remotes nos elementos da página); ecomm/container/webpack.config.js:25-27 (template `./public/index.html`) | ecomm/container/webpack.config.js:4-29 (configuração própria, porta 8080); ecomm/container/package.json:6 (`webpack serve`) | — | — | Yes | Aplicação JavaScript com entrada e configuração webpack próprias. |
| ecomm/products | ecomm/products/package.json;ecomm/products/webpack.config.js | ecomm/products/package.json:1-24 (pacote próprio, `name` `container`) | ecomm/products/src/index.js:1 (entrada convencional webpack, `import("./mount")`); ecomm/products/src/mount.js:19-24 (monta a UI em `#dev-products`); ecomm/products/webpack.config.js:18-20 (template `./public/index.html`) | ecomm/products/webpack.config.js:4-22 (configuração própria, porta 8081); ecomm/products/package.json:6 (`webpack serve`) | — | — | Yes | Aplicação JavaScript com entrada e configuração webpack próprias, servida isoladamente. |
| packages/auth | packages/auth/package.json | packages/auth/package.json:1-29 (somente manifesto e script de teste) | — | — | — | — | No | Somente manifesto e lockfile; não há código de UI, entrada ou build de aplicação no snapshot. |
| packages/container | packages/container/package.json | packages/container/package.json:1-30 (pacote próprio `container`) | packages/container/src/index.js:1 (entrada convencional webpack, `import('./bootstrap')`); packages/container/src/bootstrap.js:5 (monta React em `#root`); packages/container/config/webpack.common.js:19-23 (template `./public/index.html`) | packages/container/config/webpack.dev.js:6-26 (configuração de desenvolvimento); packages/container/config/webpack.prod.js:8-25 (configuração de produção); packages/container/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | — | Yes | Aplicação React com entrada própria e builds webpack referenciados pelos scripts. |
| packages/container/config | packages/container/config/webpack.common.js;packages/container/config/webpack.dev.js;packages/container/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/container; não é aplicação separada. |
| packages/dashboard | packages/dashboard/package.json | packages/dashboard/package.json:1-33 (somente manifesto e script de teste) | — | — | — | — | No | Somente manifesto e lockfile; não há código de UI, entrada ou build de aplicação no snapshot. |
| packages/marketing | packages/marketing/package.json | packages/marketing/package.json:1-30 (pacote próprio `marketing`) | packages/marketing/src/index.js:1 (entrada convencional webpack, `import("./bootstrap")`); packages/marketing/src/bootstrap.js:10-14 (monta React em `#_marketing-dev-root`); packages/marketing/config/webpack.dev.js:25-27 (template `./public/index.html`) | packages/marketing/config/webpack.dev.js:7-31 (configuração de desenvolvimento); packages/marketing/config/webpack.prod.js:6-23 (configuração de produção); packages/marketing/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | — | Yes | Aplicação React com entrada própria e builds webpack referenciados pelos scripts. |
| packages/marketing/config | packages/marketing/config/webpack.common.js;packages/marketing/config/webpack.dev.js;packages/marketing/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/marketing; não é aplicação separada. |

## Resumo

Aplicações frontend no snapshot: 5 (ecomm/cart, ecomm/container, ecomm/products, packages/container, packages/marketing).

## Notas

- O `artifacts.csv` marca os `package.json` como `workspace-config`, mas nenhum deles declara `workspaces`, o `matches.csv` não tem ocorrências `ws-*`, e não há outro arquivo de workspace no snapshot.
- Nenhuma configuração webpack declara `entry`; as entradas citadas são a convenção `src/index.*` do webpack.
- packages/auth e packages/dashboard só contêm package.json e package-lock.json; as dependências React/Vue não demonstram aplicação implementada.
- Os diretórios config pertencem às aplicações imediatamente acima; não herdam suas entradas ou builds como características próprias.
- A contagem 5 coincide com `frontend_units` da classificação. O `ecomm/products/dist/` citado na classificação foi removido do snapshot pela normalização (`preset:build-output`) e não aparece no `units.csv`.
- Não há Dockerfile, CI ou configuração de hospedagem no snapshot. O `publicPath` `/container/latest/` e o `PRODUCTION_DOMAIN` de packages/container/config/webpack.prod.js:6-12 não constituem artefato de deploy separado.
