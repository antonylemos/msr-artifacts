---
schema: 1
id: 1133729895
full_name: fi-x64/mfe
commit: fa4088ae3313734c98a027db5fccfee4db34a46d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 216 — fi-x64/mfe

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| packages/auth | packages/auth/package.json | packages/auth/package.json:1-29 (pacote próprio `auth`) | — | — (packages/auth/package.json:4-6 só tem o script `test` padrão; sem configuração de build no diretório) | — | — | No | Só `package.json` e lockfile, sem entrada nem build. |
| packages/container | packages/container/package.json | packages/container/package.json:1-30 (pacote próprio `container`) | packages/container/src/index.js:1 (entrada convencional webpack, `import('./bootstrap')`); packages/container/src/bootstrap.js:5 (monta React em `#root`); packages/container/config/webpack.common.js:20-22 (template `./public/index.html`) | packages/container/config/webpack.dev.js:7-29 (configuração de desenvolvimento, porta 8080); packages/container/config/webpack.prod.js:8-25 (configuração de produção); packages/container/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/container.yml:7-26 (disparado por `packages/container/**`, `npm run build` em `packages/container` e `aws s3 sync dist …/container/latest`) | Yes | Aplicação React com entrada própria, builds webpack referenciados pelos scripts e deploy próprio. |
| packages/container/config | packages/container/config/webpack.common.js;packages/container/config/webpack.dev.js;packages/container/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/container; não é aplicação separada. |
| packages/dashboard | packages/dashboard/package.json | packages/dashboard/package.json:1-33 (pacote próprio `dashboard`) | — | — (packages/dashboard/package.json:4-6 só tem o script `test` padrão; sem configuração de build no diretório) | — | — | No | Só `package.json` e lockfile, sem entrada nem build. |
| packages/marketing | packages/marketing/package.json | packages/marketing/package.json:1-30 (pacote próprio `marketing`) | packages/marketing/src/index.js:1 (entrada convencional webpack, `import('./bootstrap')`); packages/marketing/src/bootstrap.js:12-17 (em desenvolvimento, monta React em `#_marketing-dev-root`); packages/marketing/config/webpack.dev.js:24-26 (template `./public/index.html`) | packages/marketing/config/webpack.dev.js:7-30 (configuração de desenvolvimento, porta 8081); packages/marketing/config/webpack.prod.js:6-24 (configuração de produção); packages/marketing/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/marketing.yml:7-24 (disparado por `packages/marketing/**`, `npm run build` em `packages/marketing` e `aws s3 sync dist …/marketing/latest`) | Yes | Aplicação React com entrada própria, builds webpack referenciados pelos scripts e deploy próprio. |
| packages/marketing/config | packages/marketing/config/webpack.common.js;packages/marketing/config/webpack.dev.js;packages/marketing/config/webpack.prod.js | — | — | — | — | — | No | Diretório de configuração usado pelo build de packages/marketing; não é aplicação separada. |

## Resumo

Aplicações frontend no snapshot: 2 (packages/container, packages/marketing).

## Notas

- Não há `package.json` na raiz. O `artifacts.csv` marca os quatro `package.json` como `workspace-config`, mas nenhum declara `workspaces`, o `matches.csv` não tem ocorrências `ws-*` e não há outro arquivo de workspace no snapshot.
- Nenhuma configuração webpack declara `entry`; as entradas citadas são a convenção `src/index.*` do webpack.
- `packages/auth` e `packages/dashboard` só têm `package.json` e `package-lock.json`; as dependências de React/webpack (auth) e Vue/webpack (dashboard) estão só declaradas.
- O deploy foi conferido pelas ocorrências `ops-hosting` e `ci-path-trigger` do `matches.csv` e pelos workflows abertos no snapshot.
- A contagem 2 coincide com `frontend_units` da classificação.
