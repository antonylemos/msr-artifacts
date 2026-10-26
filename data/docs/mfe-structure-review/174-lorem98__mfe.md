---
schema: 1
id: 1150753074
full_name: lorem98/mfe
commit: 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 174 — lorem98/mfe

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| packages/auth | packages/auth/package.json | packages/auth/package.json:1-30 (pacote próprio `auth`) | packages/auth/src/index.js:4 (entrada convencional webpack, `import("./bootstrap")`); packages/auth/src/bootstrap.js:48-53 (em desenvolvimento, monta React em `#_auth-dev-root`); packages/auth/config/webpack.common.js:19-23 (template `./public/index.html`) | packages/auth/config/webpack.dev.js:6-25 (configuração de desenvolvimento, porta 8082); packages/auth/config/webpack.prod.js:8-24 (configuração de produção); packages/auth/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/auth.yml:7-26 (disparado por `packages/auth/**`, `npm run build` em `./packages/auth` e `aws s3 sync dist …/auth/latest`) | Yes | Aplicação React com entrada própria, builds webpack referenciados pelos scripts e deploy próprio. |
| packages/auth/config | packages/auth/config/webpack.common.js;packages/auth/config/webpack.dev.js;packages/auth/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/auth; não é aplicação separada. |
| packages/container | packages/container/package.json | packages/container/package.json:1-31 (pacote próprio `container`) | packages/container/src/index.js:1 (entrada convencional webpack, `import("./bootstrap")`); packages/container/src/bootstrap.js:5 (monta React em `#root`); packages/container/config/webpack.common.js:19-23 (template `./public/index.html`) | packages/container/config/webpack.dev.js:6-25 (configuração de desenvolvimento, porta 8080); packages/container/config/webpack.prod.js:8-25 (configuração de produção); packages/container/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/container.yml:7-26 (disparado por `packages/container/**`, `npm run build` em `./packages/container` e `aws s3 sync dist …/container/latest`) | Yes | Aplicação React com entrada própria, builds webpack referenciados pelos scripts e deploy próprio. |
| packages/container/config | packages/container/config/webpack.common.js;packages/container/config/webpack.dev.js;packages/container/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/container; não é aplicação separada. |
| packages/dashboard | packages/dashboard/package.json | packages/dashboard/package.json:1-34 (pacote próprio `dashboard`) | packages/dashboard/src/index.js:3 (entrada convencional webpack, `import("./bootstrap")`); packages/dashboard/src/bootstrap.js:26-32 (em desenvolvimento, monta Vue em `#_dashboard-dev-root`); packages/dashboard/config/webpack.dev.js:31-33 (template `./public/index.html`) | packages/dashboard/config/webpack.dev.js:7-35 (configuração de desenvolvimento, porta 8083); packages/dashboard/config/webpack.prod.js:8-29 (configuração de produção); packages/dashboard/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/dashboard.yml:7-26 (disparado por `packages/dashboard/**`, `npm run build` em `./packages/dashboard` e `aws s3 sync dist …/dashboard/latest`) | Yes | Aplicação Vue com entrada própria, builds webpack referenciados pelos scripts e deploy próprio. |
| packages/dashboard/config | packages/dashboard/config/webpack.common.js;packages/dashboard/config/webpack.dev.js;packages/dashboard/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/dashboard; não é aplicação separada. |
| packages/marketing | packages/marketing/package.json | packages/marketing/package.json:1-30 (pacote próprio `marketing`) | packages/marketing/src/index.js:1 (entrada convencional webpack, `import("./bootstrap")`); packages/marketing/src/bootstrap.js:34-41 (em desenvolvimento, monta React em `#_marketing-dev-root`); packages/marketing/config/webpack.dev.js:24-26 (template `./public/index.html`) | packages/marketing/config/webpack.dev.js:7-28 (configuração de desenvolvimento, porta 8081); packages/marketing/config/webpack.prod.js:6-22 (configuração de produção); packages/marketing/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/marketing.yml:7-24 (disparado por `packages/marketing/**`, `npm run build` em `./packages/marketing` e `aws s3 sync dist …/marketing/latest`) | Yes | Aplicação React com entrada própria, builds webpack referenciados pelos scripts e deploy próprio. |
| packages/marketing/config | packages/marketing/config/webpack.common.js;packages/marketing/config/webpack.dev.js;packages/marketing/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/marketing; não é aplicação separada. |

## Resumo

Aplicações frontend no snapshot: 4 (packages/auth, packages/container, packages/dashboard, packages/marketing).

## Notas

- Não há `package.json` na raiz. O `artifacts.csv` marca os quatro `package.json` como `workspace-config`, mas nenhum declara `workspaces`, o `matches.csv` não tem ocorrências `ws-*` e não há outro arquivo de workspace no snapshot.
- Nenhuma configuração webpack declara `entry`; as entradas citadas são a convenção `src/index.*` do webpack.
- O `matches.csv` tem 13 `ops-hosting` (8 nos quatro workflows de .github/workflows/ e 5 no README.md) e 8 `ci-*` (4 `ci-workflow-file` e 4 `ci-path-trigger`, nesses mesmos workflows); os quatro workflows de deploy foram achados pelo `artifacts.csv` (`ci-workflow`) e abertos no snapshot.
- Os diretórios `config` pertencem aos pacotes imediatamente acima; não herdam suas entradas ou builds como características próprias.
- A contagem 4 coincide com `frontend_units` da classificação.
