---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Workspace

`frontend/pnpm-workspace.yaml:1-5` declara `packages` com `shared`, `shell`, `customer-app` e `merchant-app` (pnpm); `frontend/package.json:5-10` repete a lista em `workspaces`.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| frontend | frontend/package.json | frontend/package.json:1-88 (manifesto da raiz do workspace, com as dependências comuns) | — | frontend/package.json:14 (`pnpm --filter ... build`, só delega aos pacotes) | — | frontend/Dockerfile.dev:3-52 (imagem de desenvolvimento com pnpm, sem build, `CMD ["sh"]`); docker-compose.dev.yml:149-171 (serviço `bnpl-frontend` monta `./frontend` e expõe 3000-3002) | No | Raiz do workspace pnpm, sem entrada nem configuração de build próprias. |
| frontend/customer-app | frontend/customer-app/package.json;frontend/customer-app/webpack.config.js | frontend/customer-app/package.json:1-17 (manifesto próprio, `@bnpl/customer-app`) | frontend/customer-app/webpack.config.js:14-22 (`entry` standalone `src/infrastructure/standalone/standalone-app.bootstrap.tsx` ou remota `src/infrastructure/federation/remote-entry.module.ts`); frontend/customer-app/src/infrastructure/standalone/standalone-app.bootstrap.tsx:4-8 (`renderStandaloneApp(document.getElementById('root')!, ...)`); frontend/customer-app/webpack.config.js:74-79 (`HtmlWebpackPlugin` com `public/index.html` no modo standalone) | frontend/customer-app/webpack.config.js:6-137 (configuração webpack própria, `ModuleFederationPlugin` `customer_app` em :81-116, porta 3001 em :121); frontend/customer-app/package.json:7 (`webpack --env standalone=false`) e :9 (`build:standalone`) | frontend/pnpm-workspace.yaml:4 (`customer-app`) | — | Yes | Remoto React com entrada standalone que monta a UI e build webpack próprios. |
| frontend/merchant-app | frontend/merchant-app/package.json;frontend/merchant-app/webpack.config.js | frontend/merchant-app/package.json:1-18 (manifesto próprio, `@bnpl/merchant-app`) | frontend/merchant-app/webpack.config.js:14-22 (`entry` standalone `src/infrastructure/standalone/standalone-app.bootstrap.tsx` ou remota `src/infrastructure/federation/remote-entry.module.ts`); frontend/merchant-app/src/infrastructure/standalone/standalone-app.bootstrap.tsx:4-8 (`renderStandaloneApp(document.getElementById('root')!, ...)`); frontend/merchant-app/webpack.config.js:74-79 (`HtmlWebpackPlugin` com `public/index.html` no modo standalone) | frontend/merchant-app/webpack.config.js:6-137 (configuração webpack própria, `ModuleFederationPlugin` `merchant_app` em :81-116, porta 3002 em :121); frontend/merchant-app/package.json:7 (`webpack --env standalone=false`) e :9 (`build:standalone`) | frontend/pnpm-workspace.yaml:5 (`merchant-app`) | — | Yes | Remoto React com entrada standalone que monta a UI e build webpack próprios. |
| frontend/shared | frontend/shared/package.json | frontend/shared/package.json:1-15 (manifesto próprio, `@bnpl/shared`, `main: src/index.ts`) | — | frontend/shared/package.json:8 (`tsc -p tsconfig.build.json`, compilação de biblioteca) | frontend/pnpm-workspace.yaml:2 (`shared`) | — | No | Biblioteca compartilhada do workspace (exporta de `src/index.ts`), sem entrada de aplicação. |
| frontend/shell | frontend/shell/package.json;frontend/shell/webpack.config.js | frontend/shell/package.json:1-15 (manifesto próprio, `shell`) | frontend/shell/webpack.config.js:7 (`entry: "./src/infrastructure/shell/shell-app.bootstrap.tsx"`); frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:81 (`ReactDOM.createRoot(document.getElementById('root')!)`); frontend/shell/webpack.config.js:95-98 (`HtmlWebpackPlugin` com `public/index.html`) | frontend/shell/webpack.config.js:6-115 (configuração webpack própria, `ModuleFederationPlugin` `shell` com dois remotes em :59-94, porta 3000 em :16); frontend/shell/package.json:7 (`webpack --config webpack.config.js`) | frontend/pnpm-workspace.yaml:3 (`shell`) | — | Yes | Host React com entrada que monta a UI e build webpack próprios. |

## Resumo

Aplicações frontend no snapshot: 3 (frontend/customer-app, frontend/merchant-app, frontend/shell).

## Notas

- N = 3 coincide com `frontend_units: 3` da classificação (shell e dois remotos; a biblioteca `shared` não conta).
- Nos remotos, a entrada do modo remoto (`src/infrastructure/federation/remote-entry.module.ts`) é um arquivo vazio (0 bytes); o conteúdo federado vem de `exposes` (`webpack.config.js:85-88`). A entrada que inicia a UI própria é a do modo standalone, por isso foi citada.
- O único artefato de deploy do frontend é a imagem de desenvolvimento em `frontend/Dockerfile.dev`, comum aos quatro pacotes; os dois workflows de CI (`.github/workflows/backend-*.yml`) só tratam do backend.
