---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 253 — jangrohit/micro-front-end

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| packages/auth | packages/auth/package.json | packages/auth/package.json:1-6 (somente manifesto e script de teste) | — | — | — | — | No | Somente manifesto e lockfile; não há código de UI, entrada ou build de aplicação no snapshot. |
| packages/container | packages/container/package.json | packages/container/package.json:1-7 (manifesto próprio) | packages/container/src/index.js:1 (entrada convencional webpack, sem `entry` na configuração); packages/container/src/bootstrap.js:5 (monta React em `#_container-dev-root`); packages/container/config/webpack.common.js:19-21 (template `./public/index.html`) | packages/container/package.json:6 (`webpack --config config/webpack.prod.js`); packages/container/config/webpack.prod.js:1-29 (configuração própria) | — | .github/workflows/container.yml:8-13 (gatilho e working-directory em `packages/container`); .github/workflows/container.yml:30-31 (`npm run build`); .github/workflows/container.yml:36 (publica dist em `/container/latest`) | Yes | Aplicação com entrada, build webpack e workflow próprios. |
| packages/container/config | packages/container/config/webpack.common.js;packages/container/config/webpack.dev.js;packages/container/config/webpack.prod.js | — | — | — | — | — | No | Configurações do build de packages/container; não constitui aplicação separada. |
| packages/dashboard | packages/dashboard/package.json | packages/dashboard/package.json:1-7 (manifesto próprio) | — (sem `src/` no diretório) | — (packages/dashboard/package.json:6 `webpack --config config/webpack.prod.js`, mas `config/` não existe no snapshot) | — | — | No | Somente manifesto e lockfile; o script de build aponta para configuração ausente e não há código de UI nem entrada. |
| packages/marketing | packages/marketing/package.json | packages/marketing/package.json:1-7 (manifesto próprio) | packages/marketing/src/index.js:1 (entrada convencional webpack, sem `entry` na configuração); packages/marketing/src/bootstrap.js:5-14 (`mount` e montagem isolada em desenvolvimento); packages/marketing/config/webpack.common.js:19-21 (template `./public/index.html`) | packages/marketing/package.json:6 (`webpack --config config/webpack.prod.js`); packages/marketing/config/webpack.prod.js:1-29 (configuração própria) | — | .github/workflows/marketing.yml:8-13 (gatilho e working-directory em `packages/marketing`); .github/workflows/marketing.yml:30-31 (`npm run build`); .github/workflows/marketing.yml:34 (publica dist em `/marketing/latest`) | Yes | Aplicação com entrada, build webpack e workflow próprios. |
| packages/marketing/config | packages/marketing/config/webpack.common.js;packages/marketing/config/webpack.dev.js;packages/marketing/config/webpack.prod.js | — | — | — | — | — | No | Configurações do build de packages/marketing; não constitui aplicação separada. |

## Resumo

Aplicações frontend no snapshot: 2 (packages/container, packages/marketing).

## Notas

- O agrupamento em `packages/` não declara workspace: não há `package.json` na raiz e nenhum dos quatro manifestos tem `workspaces`. Os workflows usam cada aplicação como working-directory.
- `packages/dashboard/package.json:5-6` declara `start` e `build` com `config/webpack.dev.js` e `config/webpack.prod.js`, ausentes do snapshot; sem entrada nem configuração de build, a linha fica `No` (só manifesto e lockfile). `Undetermined` também não mudaria a contagem do resumo.
- A contagem (2) coincide com `frontend_units: 2` da classificação.
