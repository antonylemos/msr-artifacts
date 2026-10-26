---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | — | — | — | vercel.json:2-3 (`npm run install:all && npm run build:all`, publica `dist`) | No | Só orquestra os outros diretórios: scripts que instalam, constroem e copiam os builds de cada projeto (package.json:7-12); sem entrada nem configuração de build próprias |
| angular-mfe | angular-mfe/angular.json;angular-mfe/package.json;angular-mfe/webpack.config.js | angular-mfe/package.json | angular-mfe/angular.json:19-20 (`index: src/index.html`, `main: src/main.ts`); angular-mfe/src/main.ts:7-9 (bootstrap de `AppModule`) | angular-mfe/angular.json:12-17 (target `build` com `@angular-builders/custom-webpack:browser` e `webpack.config.js`); angular-mfe/package.json:8 (`ng build`) | — | angular-mfe/vercel.json:2-3 (`outputDirectory: dist/angular-mfe`, `npm run build`) | Yes | Aplicação Angular com entrada e alvo de build próprios |
| host | host/package.json;host/webpack.config.js | host/package.json | host/webpack.config.js:49 (`entry: ./src/index.js`); host/src/index.js:7 (carrega `./bootstrap`) | host/webpack.config.js + host/package.json:8 (`webpack --mode production`) | — | host/vercel.json:2-3 (`outputDirectory: dist`, `npm run build`) | Yes | Aplicação React (host) com entrada e build webpack próprios |
| react-mfe-1 | react-mfe-1/package.json;react-mfe-1/webpack.config.js | react-mfe-1/package.json | react-mfe-1/webpack.config.js:12 (`entry: ./src/index.js`); react-mfe-1/src/index.js:3 (carrega `./bootstrap`) | react-mfe-1/webpack.config.js + react-mfe-1/package.json:8 (`webpack --mode production`) | — | react-mfe-1/vercel.json:2-3 (`outputDirectory: dist`, `npm run build`) | Yes | Aplicação React com entrada e build webpack próprios |
| react-mfe-2 | react-mfe-2/package.json;react-mfe-2/webpack.config.js | react-mfe-2/package.json | react-mfe-2/webpack.config.js:11 (`entry: ./src/index.js`); react-mfe-2/src/index.js:1 (carrega `./bootstrap`) | react-mfe-2/webpack.config.js + react-mfe-2/package.json:8 (`webpack --mode production`) | — | react-mfe-2/vercel.json:2-3 (`outputDirectory: dist`, `npm run build`) | Yes | Aplicação React com entrada e build webpack próprios |
| vue-mfe | vue-mfe/package.json;vue-mfe/webpack.config.js | vue-mfe/package.json | vue-mfe/webpack.config.js:13 (`entry: ./src/index.js`); vue-mfe/src/index.js:1 (carrega `./bootstrap`) | vue-mfe/webpack.config.js + vue-mfe/package.json:8 (`webpack --mode production`) | — | vue-mfe/vercel.json:2-3 (`outputDirectory: dist`, `npm run build`) | Yes | Aplicação Vue com entrada e build webpack próprios |

## Resumo

Aplicações frontend no snapshot: 5 (angular-mfe, host, react-mfe-1, react-mfe-2, vue-mfe).

## Notas

- A classificação registra `frontend_units: 7`: as cinco aplicações locais acima e duas aplicações externas carregadas em iframe pelo host, Route Map e Multibank (host/src/App.jsx:38-41). Estas estão fora do snapshot e não viram linha.
- Não há workspace: a raiz não declara `workspaces` (package.json:1-17), e o angular-mfe/angular.json:5-6 tem um só projeto. Cada diretório tem lockfile próprio e é instalado separadamente por `npm install --prefix` (package.json:7).
- O `matches.csv` não tem ocorrências `ws-*` nem `ci-*`; tem 35 ocorrências `ops-*` (6 `ops-deployment-file`, que são os seis `vercel.json`; 17 `ops-hosting`; 12 `ops-cors`). Os `vercel.json` também aparecem como `deployment` no `artifacts.csv` e foram abertos diretamente. Há dois caminhos de publicação: um `vercel.json` por diretório e o vercel.json da raiz, que constrói todos e copia os `dist` para um único diretório (package.json:11).
