---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 177 — Varshithknaik/mfe-lect

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| auth | auth/package.json | auth/package.json:1-33 (pacote próprio `auth`) | auth/src/index.js:1 (entrada convencional webpack, `import('./bootstrap')`); auth/src/bootstrap.js:36-41 (em desenvolvimento, monta React em `#_auth-dev-root`); auth/config/webpack.common.js:20-22 (template `./public/index.html`) | auth/config/webpack.dev.js:6-29 (configuração de desenvolvimento, porta 8082); auth/config/webpack.prod.js:6-24 (configuração de produção); auth/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/auth.yml:7-28 (disparado por `auth/**`, `npm run build` em `auth`, `aws s3 sync dist …/auth/latest` e invalidação do CloudFront) | Yes | Aplicação React com entrada própria, builds webpack referenciados pelos scripts e deploy próprio. |
| auth/config | auth/config/webpack.common.js;auth/config/webpack.dev.js;auth/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de auth; não é aplicação separada. |
| container | container/package.json | container/package.json:1-32 (pacote próprio `container`) | container/src/index.js:1 (entrada convencional webpack, `import("./bootstrap")`); container/src/bootstrap.js:5-6 (monta React em `#root`); container/config/webpack.common.js:20-22 (template `./public/index.html`) | container/config/webpack.dev.js:6-29 (configuração de desenvolvimento, porta 8080); container/config/webpack.prod.js:8-27 (configuração de produção); container/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/container.yml:7-30 (disparado por `container/**`, `npm run build` em `container`, `aws s3 sync dist …/container/latest` e invalidação do CloudFront) | Yes | Aplicação React com entrada própria, builds webpack referenciados pelos scripts e deploy próprio. |
| container/config | container/config/webpack.common.js;container/config/webpack.dev.js;container/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de container; não é aplicação separada. |
| dashboard | dashboard/package.json | dashboard/package.json:1-34 (pacote próprio `dashboard`) | — | — (dashboard/package.json:5-6 chama `config/webpack.dev.js` e `config/webpack.prod.js`, ausentes do snapshot) | — | — | No | Só `package.json` e `package-lock.json`, sem entrada nem configuração de build no diretório. |
| marketing | marketing/package.json | marketing/package.json:1-33 (pacote próprio `marketing`) | marketing/src/index.js:1 (entrada convencional webpack, `import('./bootstrap')`); marketing/src/bootstrap.js:33-38 (em desenvolvimento, monta React em `#_marketing-dev-root`); marketing/config/webpack.common.js:20-22 (template `./public/index.html`) | marketing/config/webpack.dev.js:6-29 (configuração de desenvolvimento, porta 8081); marketing/config/webpack.prod.js:6-24 (configuração de produção); marketing/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/marketing.yml:7-28 (disparado por `marketing/**`, `npm run build` em `marketing`, `aws s3 sync dist …/marketing/latest` e invalidação do CloudFront) | Yes | Aplicação React com entrada própria, builds webpack referenciados pelos scripts e deploy próprio. |
| marketing/config | marketing/config/webpack.common.js;marketing/config/webpack.dev.js;marketing/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de marketing; não é aplicação separada. |
| packages/auth | packages/auth/package.json | packages/auth/package.json:1-33 (pacote próprio `auth`) | packages/auth/src/index.js:1 (entrada convencional webpack, `import('./bootstrap')`); packages/auth/src/bootstrap.js:36-41 (em desenvolvimento, monta React em `#_auth-dev-root`); packages/auth/config/webpack.dev.js:41-43 (template `./public/index.html`) | packages/auth/config/webpack.dev.js:7-47 (configuração de desenvolvimento, porta 8082); packages/auth/config/webpack.prod.js:6-38 (configuração de produção); packages/auth/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | — | Yes | Aplicação React com entrada própria e builds webpack referenciados pelos scripts. |
| packages/auth/config | packages/auth/config/webpack.common.js;packages/auth/config/webpack.dev.js;packages/auth/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/auth; não é aplicação separada. |
| packages/container | packages/container/package.json | packages/container/package.json:1-32 (pacote próprio `container`) | packages/container/src/index.js:1 (entrada convencional webpack, `import('./bootstrap')`); packages/container/src/bootstrap.js:5-6 (monta React em `#root`); packages/container/config/webpack.common.js:20-22 (template `./public/index.html`) | packages/container/config/webpack.dev.js:6-44 (configuração de desenvolvimento, porta 8080); packages/container/config/webpack.prod.js:8-41 (configuração de produção); packages/container/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | — | Yes | Aplicação React com entrada própria e builds webpack referenciados pelos scripts. |
| packages/container/config | packages/container/config/webpack.common.js;packages/container/config/webpack.dev.js;packages/container/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/container; não é aplicação separada. |
| packages/dashboard | packages/dashboard/package.json | packages/dashboard/package.json:1-34 (pacote próprio `dashboard`) | packages/dashboard/config/webpack.common.js:4 (`entry: './src/index.js'`); packages/dashboard/src/index.js:1 (`import('./bootstrap')`); packages/dashboard/src/bootstrap.js:12-17 (em desenvolvimento, monta Vue em `#_dashboard-dev-root`); packages/dashboard/config/webpack.dev.js:30-32 (template `./public/index.html`) | packages/dashboard/config/webpack.dev.js:7-36 (configuração de desenvolvimento, porta 8083); packages/dashboard/config/webpack.prod.js:6-24 (configuração de produção); packages/dashboard/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | — | Yes | Aplicação Vue com entrada própria e builds webpack referenciados pelos scripts. |
| packages/dashboard/config | packages/dashboard/config/webpack.common.js;packages/dashboard/config/webpack.dev.js;packages/dashboard/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/dashboard; não é aplicação separada. |
| packages/marketing | packages/marketing/package.json | packages/marketing/package.json:1-33 (pacote próprio `marketing`) | packages/marketing/src/index.js:1 (entrada convencional webpack, `import('./bootstrap')`); packages/marketing/src/bootstrap.js:36-41 (em desenvolvimento, monta React em `#_marketing-dev-root`); packages/marketing/config/webpack.dev.js:41-43 (template `./public/index.html`) | packages/marketing/config/webpack.dev.js:7-47 (configuração de desenvolvimento, porta 8081); packages/marketing/config/webpack.prod.js:6-38 (configuração de produção); packages/marketing/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | — | Yes | Aplicação React com entrada própria e builds webpack referenciados pelos scripts. |
| packages/marketing/config | packages/marketing/config/webpack.common.js;packages/marketing/config/webpack.dev.js;packages/marketing/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/marketing; não é aplicação separada. |

## Resumo

Aplicações frontend no snapshot: 7 (auth, container, marketing, packages/auth, packages/container, packages/dashboard, packages/marketing).

## Notas

- Não há `package.json` na raiz. O `artifacts.csv` marca os oito `package.json` como `workspace-config`, mas nenhum declara `workspaces`, o `matches.csv` não tem ocorrências `ws-*` e não há outro arquivo de workspace no snapshot.
- Só `packages/dashboard/config/webpack.common.js:4` declara `entry`; nas demais linhas `Yes` a entrada citada é a convenção `src/index.*` do webpack.
- Os três workflows (`ops-hosting` e `ci-path-trigger` do `matches.csv`) filtram e constroem só `auth/`, `container/` e `marketing/` da raiz. Nenhum workflow cobre `packages/`; `packages/container/config/webpack.prod.js:18-20` aponta para `…/<pacote>/latest/remoteEntry.js`, mas não há job que publique esses caminhos a partir de `packages/`.
- `dashboard/` da raiz tem scripts que chamam configurações webpack ausentes do diretório; sem entrada nem configuração de build, fica `No`. A classificação também não o conta.
- Os diretórios `config` pertencem aos pacotes imediatamente acima; não herdam suas entradas ou builds como características próprias.
- A contagem 7 coincide com `frontend_units` da classificação.
