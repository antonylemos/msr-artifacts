---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 211 — varshinir07/mfe-onehub-shell-app

## Leitura do repositório

Repositório com uma só aplicação React, o host `onehub` de Module Federation. Os dois remotes que ele consome (`subscription` e `ownership`) não estão no snapshot: aparecem só como `http://localhost:3001/remoteEntry.js` e `http://localhost:3002/remoteEntry.js` (src/webpack.config.js:76-77). O build e o deploy deles, se existem, estão fora do repositório.

O projeto nasceu do Create React App, mas os scripts `start` e `build` chamam uma configuração Webpack 5 própria: `webpack serve --config src/webpack.config.js --mode development` e `webpack --config src/webpack.config.js --mode development` (package.json:19-20). Até o build fica em modo de desenvolvimento (src/webpack.config.js:7), grava um único `bundle.js` em `dist/` (src/webpack.config.js:25-29) e fixa o `publicPath` em `http://localhost:3000/` (src/webpack.config.js:26), a mesma porta do servidor de desenvolvimento (src/webpack.config.js:19). Essa é a única ocorrência `cfg-public-path` da mineração. É configuração de desenvolvimento.

Não há Dockerfile, workflow de CI, configuração de hospedagem nem script de publicação, e o `matches.csv` não tem ocorrências `ops-*` nem `ci-*`. O README é o padrão do CRA: fala de `npm run build` gerar a pasta `build` "ready to be deployed" (README.md:25-31), o que não confere com o script real, que grava em `dist/` em modo de desenvolvimento.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | . | separado | não observado | `http://localhost:3000` em desenvolvimento (src/webpack.config.js:19, 26) | No | package.json:20 (`webpack --config src/webpack.config.js --mode development`); src/webpack.config.js:5-102 (config webpack com `ModuleFederationPlugin` `onehub`); src/webpack.config.js:25-29 (saída `dist/bundle.js`, `publicPath` `http://localhost:3000/`) |

## Observações

**1. Raiz (`.`).** Aplicação da raiz, o host. Build separado: tem configuração e saída próprias (src/webpack.config.js:10, 25-29), e o código dos remotes não está neste repositório; eles são carregados em tempo de execução pelas URLs de src/webpack.config.js:76-77. Sem deploy observado: só o servidor de desenvolvimento na porta 3000 (package.json:19; src/webpack.config.js:13-22), e nada no snapshot publica a aplicação. Sem versionamento: package.json:3-4 declara `0.1.0` com `private: true`, sem uso em publicação.

## Resumo

Aplicações: 1. Build (separado: 1). Deploy (não observado: 1). Versionamento independente: 0.
