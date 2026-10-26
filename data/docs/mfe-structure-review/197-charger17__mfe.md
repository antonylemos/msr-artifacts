---
schema: 1
id: 997062622
full_name: charger17/mfe
commit: c04d19eb237bd77ce574657d732efe265c0de531
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 197 — charger17/mfe

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| packages/auth | packages/auth/package.json | packages/auth/package.json:1-30 (pacote próprio `auth`) | packages/auth/src/index.js:1 (entrada convencional webpack, `import ('./bootstrap.js')`); packages/auth/src/bootstrap.js:27-33 (em desenvolvimento, monta React em `#_auth-dev-root`); packages/auth/config/webpack.dev.js:27-29 (template `./public/index.html`) | packages/auth/config/webpack.dev.js:7-31 (configuração de desenvolvimento, porta 8082); packages/auth/config/webpack.prod.js:6-22 (configuração de produção); packages/auth/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/auth.yml:7-8 (disparado por `packages/auth/**`); .github/workflows/auth.yml:13 (`working-directory: packages/auth`); .github/workflows/auth.yml:29-30 (`npm run build`); .github/workflows/auth.yml:49-52 (`aws s3 sync dist …/auth/latest` e invalidação do CloudFront) | Yes | Aplicação React com entrada própria, builds webpack referenciados pelos scripts e deploy próprio. |
| packages/auth/config | packages/auth/config/webpack.common.js;packages/auth/config/webpack.dev.js;packages/auth/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/auth; não é aplicação separada. |
| packages/container | packages/container/package.json | packages/container/package.json:1-30 (pacote próprio `container`) | packages/container/src/index.js:1 (entrada convencional webpack, `import ('./bootstrap')`); packages/container/src/bootstrap.js:5-8 (monta React em `#root`); packages/container/config/webpack.common.js:19-23 (template `./public/index.html`) | packages/container/config/webpack.dev.js:6-28 (configuração de desenvolvimento, porta 8080); packages/container/config/webpack.prod.js:8-25 (configuração de produção); packages/container/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/container.yml:7-8 (disparado por `packages/container/**`); .github/workflows/container.yml:13 (`working-directory: packages/container`); .github/workflows/container.yml:29-32 (`npm run build` com `PRODUCTION_DOMAIN`); .github/workflows/container.yml:50-54 (`aws s3 sync dist …/container/latest` e invalidação do CloudFront) | Yes | Aplicação React com entrada própria, builds webpack referenciados pelos scripts e deploy próprio. |
| packages/container/config | packages/container/config/webpack.common.js;packages/container/config/webpack.dev.js;packages/container/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/container; não é aplicação separada. |
| packages/dashboard | packages/dashboard/package.json | packages/dashboard/package.json:1-34 (pacote próprio `dashboard`) | packages/dashboard/config/webpack.common.js:4 (`entry: "./src/index.js"`); packages/dashboard/src/index.js:1 (`import ('./bootstrap.js')`); packages/dashboard/src/bootstrap.js:9-15 (em desenvolvimento, monta Vue em `#_dashboard-dev-root`); packages/dashboard/config/webpack.dev.js:30-32 (template `./public/index.html`) | packages/dashboard/config/webpack.dev.js:7-34 (configuração de desenvolvimento, porta 8083); packages/dashboard/config/webpack.prod.js:6-22 (configuração de produção); packages/dashboard/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/dashboard.yml:7-8 (disparado por `packages/dashboard/**`); .github/workflows/dashboard.yml:13 (`working-directory: packages/dashboard`); .github/workflows/dashboard.yml:30 (`npm run build`); .github/workflows/dashboard.yml:49-52 (`aws s3 sync dist …/dashboard/latest` e invalidação do CloudFront) | Yes | Aplicação Vue com entrada própria, builds webpack referenciados pelos scripts e deploy próprio. |
| packages/dashboard/config | packages/dashboard/config/webpack.common.js;packages/dashboard/config/webpack.dev.js;packages/dashboard/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/dashboard; não é aplicação separada. |
| packages/marketing | packages/marketing/package.json | packages/marketing/package.json:1-30 (pacote próprio `marketing`) | packages/marketing/src/index.js:1 (entrada convencional webpack, `import ('./bootstrap.js')`); packages/marketing/src/bootstrap.js:28-34 (em desenvolvimento, monta React em `#_marketing-feed-dev-root`); packages/marketing/config/webpack.dev.js:27-29 (template `./public/index.html`) | packages/marketing/config/webpack.dev.js:7-31 (configuração de desenvolvimento, porta 8081); packages/marketing/config/webpack.prod.js:6-22 (configuração de produção); packages/marketing/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/marketing.yml:7-8 (disparado por `packages/marketing/**`); .github/workflows/marketing.yml:13 (`working-directory: packages/marketing`); .github/workflows/marketing.yml:30 (`npm run build`); .github/workflows/marketing.yml:49-52 (`aws s3 sync dist …/marketing/latest` e invalidação do CloudFront) | Yes | Aplicação React com entrada própria, builds webpack referenciados pelos scripts e deploy próprio. |
| packages/marketing/config | packages/marketing/config/webpack.common.js;packages/marketing/config/webpack.dev.js;packages/marketing/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/marketing; não é aplicação separada. |

## Resumo

Aplicações frontend no snapshot: 4 (packages/auth, packages/container, packages/dashboard, packages/marketing).

## Notas

- Não há `package.json` na raiz. O `artifacts.csv` marca os quatro `package.json` como `workspace-config`, mas nenhum declara `workspaces` (grep no snapshot), o `matches.csv` não tem ocorrências `ws-*` e não há outro arquivo de workspace.
- Só `packages/dashboard/config/webpack.common.js:4` declara `entry`; nas outras três linhas `Yes` a entrada citada é a convenção `src/index.*` do webpack.
- Em `auth`, `dashboard` e `marketing`, o `HtmlWebpackPlugin` só está no `webpack.dev.js`; o `webpack.prod.js` gera o `remoteEntry.js` sem página própria. A UI isolada desses remotos sobe pelo `mount` de desenvolvimento em `bootstrap.js`.
- A contagem 4 coincide com `frontend_units` da classificação.
