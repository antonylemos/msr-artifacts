---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 007 — Vishal-Kamra/Microfrontend-examples

## Leitura do repositório

Repositório de exemplos de estudo com dois conjuntos independentes de Module Federation: `simple-js` (Container, Products e Cart) e `react-js` (container e marketing, mais as pastas `auth` e `dashboard`, que só têm `package.json`). Não há workspace nem manifesto na raiz. Cada aplicação tem `package.json`, lockfile e configuração webpack próprios. A única forma de rodá-las é o servidor de desenvolvimento: o script `start` de todas é `webpack serve` (ou `webpack server`) (react-js/container/package.json:5; react-js/marketing/package.json:5; simple-js/Cart/package.json:7; simple-js/Container/package.json:7; simple-js/Products/package.json:8). As configurações usam `mode: "development"` com porta fixa (ex.: simple-js/Cart/webpack.config.js:4-8; react-js/marketing/config/webpack.dev.js:7-10).

O conjunto `react-js` tem a estrutura de um curso, com `webpack.common.js`, `webpack.dev.js` e `webpack.prod.js`. Os dois `webpack.prod.js` estão vazios (0 bytes), e nenhum script os usa: a preparação para produção ficou só no nome do arquivo. Não há Dockerfile, CI, configuração de hospedagem nem script de build de produção, e as ocorrências `ops-*`, `ci-*` e `cfg-public-path` da mineração estão vazias. Os remotes são resolvidos só por `localhost` com porta (ver a revisão de composição).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | react-js/container | separado | não observado | `http://localhost:8080` em desenvolvimento (react-js/container/config/webpack.dev.js:9-10) | No | react-js/container/config/webpack.dev.js:7-29 (configuração própria, modo desenvolvimento); react-js/container/package.json:5 (`webpack serve`) |
| 2 | react-js/marketing | separado | não observado | `http://localhost:8081` em desenvolvimento (react-js/marketing/config/webpack.dev.js:9-10) | No | react-js/marketing/config/webpack.dev.js:7-29 (configuração própria, gera `remoteEntry.js`); react-js/marketing/package.json:5 (`webpack serve`) |
| 3 | simple-js/Cart | separado | não observado | `http://localhost:8082` em desenvolvimento (simple-js/Cart/webpack.config.js:6-7) | No | simple-js/Cart/webpack.config.js:4-22 (configuração própria, gera `remoteEntry.js`); simple-js/Cart/package.json:7 (`webpack server`) |
| 4 | simple-js/Container | separado | não observado | `http://localhost:8080` em desenvolvimento (simple-js/Container/webpack.config.js:6-7) | No | simple-js/Container/webpack.config.js:4-21 (configuração própria); simple-js/Container/package.json:7 (`webpack server`) |
| 5 | simple-js/Products | separado | não observado | `http://localhost:8081` em desenvolvimento (simple-js/Products/webpack.config.js:6-7) | No | simple-js/Products/webpack.config.js:4-8 (configuração própria); simple-js/Products/package.json:8 (`webpack serve`) |

## Observações

**1. react-js/container.** O build é separado porque a configuração webpack e as dependências são só desta aplicação, mesmo que o único uso dela seja o servidor de desenvolvimento. O `webpack.prod.js` existe, mas está vazio. Sem deploy observado. A versão `1.0.0` do package.json não é usada em lugar nenhum.

**2. react-js/marketing.** Mesmo arranjo, com servidor próprio na porta 8081, onde expõe o `remoteEntry.js` consumido pelo container (react-js/marketing/config/webpack.dev.js:19-24). O `webpack.prod.js` também está vazio.

**3. simple-js/Cart.** Configuração e servidor próprios na porta 8082 (simple-js/Cart/webpack.config.js:6-7, 10-17). Sem deploy observado.

**4. simple-js/Container.** Configuração e servidor próprios na porta 8080, a mesma do container do conjunto `react-js` (react-js/container/config/webpack.dev.js:10). Os dois conjuntos não rodam ao mesmo tempo sem mudar uma porta, o que confirma que são exemplos separados.

**5. simple-js/Products.** Configuração e servidor próprios na porta 8081, a mesma do marketing (react-js/marketing/config/webpack.dev.js:10). Sem deploy observado.

## Resumo

Aplicações: 5. Build (separado: 5). Deploy (não observado: 5). Versionamento independente: 0.
