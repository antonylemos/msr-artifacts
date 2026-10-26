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
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 271 — santhoshreddy500939/webpackconfig

## Leitura do repositório

É um projeto de estudo de configuração do webpack com React, com uma única aplicação no snapshot, na raiz. Essa aplicação se declara host Module Federation `hostApp` e aponta um único remote, `RemoteApp`, servido em `http://localhost:9001/remoteappbuild.js` (webpack.common.config.js:31-36). O remote não está no repositório. O host mostra o componente remoto dentro de `Application1`, que carrega `RemoteApp/microfrontend1` com `React.lazy` e o monta dentro de `Suspense` (Components/Application1/Application1.js:3; Components/Application1/Application1.js:10-12). `App` renderiza `Application1` ao lado de componentes locais (index.js:8-17).

`Application2` não carrega outra unidade: é só um texto de lugar reservado (Components/Application2/Application2.js:5), o que sugere um segundo remote planejado e não feito. O host não declara `exposes` (webpack.common.config.js:31-36). O `ModuleFederationPlugin` está só na configuração comum, usada pelo build de desenvolvimento via `merge` (webpack.dev.config.js:4-5; package.json:9). A configuração de produção não faz esse `merge` nem declara o plugin (webpack.prod.config.js:4-34; package.json:8), então só o build de desenvolvimento monta a federação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | RemoteApp | host → remote | origem → destino | module-federation | No | Yes | webpack.common.config.js:32 (`name: "hostApp"`); webpack.common.config.js:33-35 (`remotes` com `RemoteApp: "RemoteApp@http://localhost:9001/remoteappbuild.js"`) | Components/Application1/Application1.js:3; Components/Application1/Application1.js:11 |

## Observações

**1. . → RemoteApp.** O host importa `RemoteApp/microfrontend1` (Components/Application1/Application1.js:3), cujo prefixo casa com a chave `RemoteApp` de `remotes` (webpack.common.config.js:34), e monta o componente em Components/Application1/Application1.js:11. Nenhum diretório do snapshot declara `name: "RemoteApp"` nem o arquivo `remoteappbuild.js`, então o destino fica com o nome do artefato e No snapshot = No. Ativa = Yes porque as duas linhas da revisão de código-fonte são `Yes`. A relação existe só no build de desenvolvimento (webpack.dev.config.js:5); a configuração de produção não tem o plugin (webpack.prod.config.js:21-31).

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 1.
Unidades sem relação: nenhuma.
