---
schema: 1
id: 1080660279
full_name: pgarr/microfrontend-template
commit: 8869e1289ab5b8e758cb6a465425997296b6ca32
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 046 — pgarr/microfrontend-template

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| auth | auth/package.json | auth/package.json:1-7 (manifesto próprio) | auth/src/index.js:1 (entrada webpack); auth/src/bootstrap.js:20-21 (monta a UI) | auth/config/webpack.prod.js:1-10 (configuração própria); auth/package.json:6 (`webpack --config config/webpack.prod.js`) | — | .github/workflows/auth.yml:9-20 (build no diretório da aplicação); .github/workflows/auth.yml:23 (publica dist em prefixo próprio) | Yes | Aplicação com entrada, build webpack e workflow próprios. |
| auth/config | auth/config/webpack.common.js;auth/config/webpack.dev.js;auth/config/webpack.prod.js | — | — | — | — | — | No | Configurações do build de auth; não é aplicação separada. |
| container | container/package.json | container/package.json:1-7 (manifesto próprio) | container/src/index.js:1 (entrada webpack); container/src/bootstrap.js:5-6 (monta a UI) | container/config/webpack.prod.js:1-10 (configuração própria); container/package.json:6 (`webpack --config config/webpack.prod.js`) | — | .github/workflows/container.yml:9-20 (build no diretório da aplicação); .github/workflows/container.yml:25 (publica dist em prefixo próprio) | Yes | Aplicação com entrada, build webpack e workflow próprios. |
| container/config | container/config/webpack.common.js;container/config/webpack.dev.js;container/config/webpack.prod.js | — | — | — | — | — | No | Configurações do build de container; não é aplicação separada. |
| dashboard | dashboard/package.json | dashboard/package.json:1-7 (manifesto próprio) | dashboard/src/index.js:1 (entrada webpack); dashboard/src/bootstrap.js:5-8 (monta a UI) | dashboard/config/webpack.prod.js:1-10 (configuração própria); dashboard/package.json:6 (`webpack --config config/webpack.prod.js`) | — | .github/workflows/dashboard.yml:9-20 (build no diretório da aplicação); .github/workflows/dashboard.yml:23 (publica dist em prefixo próprio) | Yes | Aplicação com entrada, build webpack e workflow próprios. |
| dashboard/config | dashboard/config/webpack.common.js;dashboard/config/webpack.dev.js;dashboard/config/webpack.prod.js | — | — | — | — | — | No | Configurações do build de dashboard; não é aplicação separada. |
| marketing | marketing/package.json | marketing/package.json:1-7 (manifesto próprio) | marketing/src/index.js:1 (entrada webpack); marketing/src/bootstrap.js:20-21 (monta a UI) | marketing/config/webpack.prod.js:1-10 (configuração própria); marketing/package.json:6 (`webpack --config config/webpack.prod.js`) | — | .github/workflows/marketing.yml:9-20 (build no diretório da aplicação); .github/workflows/marketing.yml:23 (publica dist em prefixo próprio) | Yes | Aplicação com entrada, build webpack e workflow próprios. |
| marketing/config | marketing/config/webpack.common.js;marketing/config/webpack.dev.js;marketing/config/webpack.prod.js | — | — | — | — | — | No | Configurações do build de marketing; não é aplicação separada. |

## Resumo

Aplicações frontend no snapshot: 4 (auth, container, dashboard, marketing).

## Notas

- As quatro aplicações são diretórios irmãos, sem declaração de workspace de gerenciador de pacotes. Cada workflow define working-directory e publica em prefixo próprio.
- As linhas config são partes das aplicações e não recebem seus builds ou entradas como características próprias.
