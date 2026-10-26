---
schema: 1
id: 1136702019
full_name: santhoshreddy500939/webpackconfig
commit: e1f97e37c21a6893a8dbf8cd6ea7a7f8c4a9058a
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

# 271 — santhoshreddy500939/webpackconfig

## Leitura do repositório

Projeto de estudo de configuração do webpack com React, com uma só aplicação no snapshot, na raiz: o host Module Federation `hostApp`. O remote que ele carrega, `RemoteApp`, não está no repositório e aparece só como endereço de desenvolvimento, `http://localhost:9001/remoteappbuild.js` (webpack.common.config.js:33-35; ver a revisão de composição). O build e o deploy do remote, se existem, estão fora do repositório.

Não há workspace: um único `package.json` com dois scripts, `build`, que roda `webpack --config webpack.prod.config.js`, e `build:dev`, que roda `webpack serve --config webpack.dev.config.js --hot` (package.json:6-10). A configuração de desenvolvimento faz `merge` com a comum (webpack.dev.config.js:4-5), que declara entrada `./index.js`, saída `dist/bundle.js` e o `ModuleFederationPlugin` (webpack.common.config.js:7-11, 31-36), e sobe o `webpack-dev-server` na porta 9000, gravando em disco (webpack.dev.config.js:21-28). A configuração de produção é independente: não faz `merge`, não declara `entry`, `output` nem o plugin de federação, só os loaders de CSS/Sass, a extração de CSS e o `HtmlWebpackPlugin` (webpack.prod.config.js:4-34). Assim, o build de produção dependeria do `entry` padrão do webpack (`./src`), ausente do snapshot, e não montaria a federação.

Não há Dockerfile, workflow de CI, compose, configuração de hospedagem nem script de publicação, e o `matches.csv` não tem nenhuma ocorrência `ops-*`, `ci-*` ou `cfg-public-path`. O `.gitignore` exclui `dist/` (.gitignore:2). O README só lista passos de conversão para React e pacotes a instalar, sem instruções de build ou deploy (README.md:1-12). Tudo o que existe é configuração de desenvolvimento.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | . | separado | não observado | `localhost:9000` em desenvolvimento (webpack.dev.config.js:25) | No | webpack.common.config.js:7-11 (entrada `./index.js`, saída `dist/bundle.js`); webpack.dev.config.js:5 (`merge` com a comum); package.json:8 (`build`: `webpack --config webpack.prod.config.js`); package.json:9 (`build:dev`: `webpack serve`) |

## Observações

**1. ..** Aplicação da raiz, única do snapshot. Build separado: tem configuração webpack e saída próprias (webpack.common.config.js:7-11), e o código do remote não está neste repositório. O build de produção (package.json:8) usa uma configuração sem `entry` (webpack.prod.config.js:4-34), o que não muda o valor: o artefato, se gerado, seria só desta aplicação. Sem deploy observado: o único servidor é o `webpack serve` de desenvolvimento na porta 9000 (package.json:9; webpack.dev.config.js:21-28), e nada no snapshot empacota ou publica a aplicação. Sem versionamento: package.json:3 declara `1.0.0`, sem uso em publicação.

## Resumo

Aplicações: 1. Build (separado: 1). Deploy (não observado: 1). Versionamento independente: 0.
