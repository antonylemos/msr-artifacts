---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 007 — Vishal-Kamra/Microfrontend-examples

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| react-js/auth | react-js/auth/package.json | react-js/auth/package.json:1-6 (somente manifesto e script de teste) | — | — | — | — | No | Somente manifesto e lockfile; não há código de UI, entrada ou build de aplicação no snapshot. |
| react-js/container | react-js/container/package.json | react-js/container/package.json:1-6 (pacote próprio) | react-js/container/src/index.js:1 (entrada convencional webpack); react-js/container/src/bootstrap.js:6-17 (monta React); react-js/container/config/webpack.dev.js:16-17 (template HTML) | react-js/container/config/webpack.dev.js:7-29 (configuração de desenvolvimento); react-js/container/package.json:5 (`webpack serve --config config/webpack.dev.js`) | — | — | Yes | Aplicação React com entrada própria e compilação webpack de desenvolvimento. |
| react-js/container/config | react-js/container/config/webpack.common.js;react-js/container/config/webpack.dev.js;react-js/container/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de react-js/container; não é aplicação separada. |
| react-js/dashboard | react-js/dashboard/package.json | react-js/dashboard/package.json:1-6 (somente manifesto e script de teste) | — | — | — | — | No | Somente manifesto e lockfile; não há código de UI, entrada ou build de aplicação no snapshot. |
| react-js/marketing | react-js/marketing/package.json | react-js/marketing/package.json:1-6 (pacote próprio) | react-js/marketing/src/index.js:1 (entrada convencional webpack); react-js/marketing/src/bootstrap.js:6-17 (monta React); react-js/marketing/config/webpack.dev.js:16-17 (template HTML) | react-js/marketing/config/webpack.dev.js:7-29 (configuração de desenvolvimento); react-js/marketing/package.json:5 (`webpack serve --config config/webpack.dev.js`) | — | — | Yes | Aplicação React com entrada própria e compilação webpack de desenvolvimento. |
| react-js/marketing/config | react-js/marketing/config/webpack.common.js;react-js/marketing/config/webpack.dev.js;react-js/marketing/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de react-js/marketing; não é aplicação separada. |
| simple-js/Cart | simple-js/Cart/package.json;simple-js/Cart/webpack.config.js | simple-js/Cart/package.json:1-9 (pacote próprio) | simple-js/Cart/src/index.js:1 (entrada convencional webpack); simple-js/Cart/src/bootstrap.js:1-7 (inicia a UI) | simple-js/Cart/webpack.config.js:4-8 (configuração própria); simple-js/Cart/package.json:7 (script do servidor webpack) | — | — | Yes | Aplicação JavaScript com entrada e configuração de compilação próprias. |
| simple-js/Container | simple-js/Container/package.json;simple-js/Container/webpack.config.js | simple-js/Container/package.json:1-9 (pacote próprio) | simple-js/Container/src/index.js:1 (entrada convencional webpack); simple-js/Container/src/bootstrap.js:1-5 (inicia a UI) | simple-js/Container/webpack.config.js:4-8 (configuração própria); simple-js/Container/package.json:7 (script do servidor webpack) | — | — | Yes | Aplicação JavaScript com entrada e configuração de compilação próprias. |
| simple-js/Products | simple-js/Products/package.json;simple-js/Products/webpack.config.js | simple-js/Products/package.json:1-9 (pacote próprio) | simple-js/Products/src/index.js:1 (entrada convencional webpack); simple-js/Products/src/bootstrap.js:1-7 (inicia a UI) | simple-js/Products/webpack.config.js:4-8 (configuração própria); simple-js/Products/package.json:8 (script do servidor webpack) | — | — | Yes | Aplicação JavaScript com entrada e configuração de compilação próprias. |

## Resumo

Aplicações frontend no snapshot: 5 (react-js/container, react-js/marketing, simple-js/Cart, simple-js/Container, simple-js/Products).

## Notas

- react-js/auth e react-js/dashboard só contêm package.json e package-lock.json; dependências de UI não demonstram uma aplicação implementada.
- As configurações webpack.prod.js de container e marketing estão vazias. Os Yes dessas unidades são sustentados pelos builds de desenvolvimento referenciados em seus scripts start, sem afirmar executabilidade de produção.
- Os diretórios config pertencem às aplicações imediatamente acima; não herdam suas entradas ou builds como características próprias.
