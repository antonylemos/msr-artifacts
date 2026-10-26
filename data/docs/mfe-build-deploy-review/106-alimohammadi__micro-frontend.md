---
schema: 1
id: 971885751
full_name: alimohammadi/micro-frontend
commit: 7a05f74105f816f60621d9ba9171b269aa8e5cab
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

# 106 — alimohammadi/micro-frontend

## Leitura do repositório

Código-fonte de um curso, com dois exemplos independentes de Module Federation: `ecomm/` (container, products e cart, em JavaScript puro) e `packages/` (container e marketing, em React, mais `auth` e `dashboard`, que só têm `package.json` e lockfile). Não há workspace nem manifesto na raiz; o README só tem o título (README.md:1). Cada aplicação tem `package.json`, lockfile e configuração webpack próprios, e é construída e servida por conta própria.

No exemplo `ecomm` só existe o servidor de desenvolvimento: o único script é `start` com `webpack serve` (ecomm/cart/package.json:6; ecomm/container/package.json:6; ecomm/products/package.json:6), e as três configurações usam `mode: "development"` com porta fixa (ecomm/cart/webpack.config.js:5-8; ecomm/container/webpack.config.js:5-8; ecomm/products/webpack.config.js:5-8). O exemplo `packages` vai um passo além: container e marketing têm, além do `start`, um script `build` que roda `webpack --config config/webpack.prod.js` (packages/container/package.json:6; packages/marketing/package.json:6), e esses arquivos de produção estão preenchidos. O build de produção do container fixa `publicPath: "/container/latest/"` e aponta o remote para `marketing@${domain}/marketing/remoteEntry.js`, com `domain` lido de `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6,10-13,18); o do marketing gera `remoteEntry.js` com nomes de arquivo com hash (packages/marketing/config/webpack.prod.js:8-14). Esses caminhos indicam uma publicação em pastas separadas sob um mesmo domínio, mas quem faz essa publicação não está no snapshot: não há Dockerfile, compose, CI, configuração de hospedagem nem script de envio. A única ocorrência `cfg-public-path` da mineração é o `publicPath` acima, e não há ocorrências `ops-*` nem `ci-*`.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | ecomm/cart | separado | não observado | `http://localhost:8082` em desenvolvimento (ecomm/cart/webpack.config.js:6-7) | No | ecomm/cart/webpack.config.js:4-26 (configuração própria, modo desenvolvimento, gera `remoteEntry.js`); ecomm/cart/package.json:6 (`webpack serve`) |
| 2 | ecomm/container | separado | não observado | `http://localhost:8080` em desenvolvimento (ecomm/container/webpack.config.js:6-7) | No | ecomm/container/webpack.config.js:4-29 (configuração própria, modo desenvolvimento); ecomm/container/package.json:6 (`webpack serve`) |
| 3 | ecomm/products | separado | não observado | `http://localhost:8081` em desenvolvimento (ecomm/products/webpack.config.js:6-7) | No | ecomm/products/webpack.config.js:4-22 (configuração própria, modo desenvolvimento, gera `remoteEntry.js`); ecomm/products/package.json:6 (`webpack serve`) |
| 4 | packages/container | separado | não observado | `http://localhost:8080` em desenvolvimento (packages/container/config/webpack.dev.js:8-9); `/container/latest/` no build de produção (packages/container/config/webpack.prod.js:12) | No | packages/container/config/webpack.prod.js:8-25 (build de produção, `publicPath` `/container/latest/`); packages/container/package.json:6 (`webpack --config config/webpack.prod.js`); packages/container/config/webpack.dev.js:6-26 (desenvolvimento); packages/container/package.json:5 (`webpack serve`) |
| 5 | packages/marketing | separado | não observado | `http://localhost:8081` em desenvolvimento (packages/marketing/config/webpack.dev.js:9-10); `${PRODUCTION_DOMAIN}/marketing/remoteEntry.js`, esperado pelo container em produção (packages/container/config/webpack.prod.js:18) | No | packages/marketing/config/webpack.prod.js:6-23 (build de produção, gera `remoteEntry.js`); packages/marketing/package.json:6 (`webpack --config config/webpack.prod.js`); packages/marketing/config/webpack.dev.js:7-31 (desenvolvimento); packages/marketing/package.json:5 (`webpack serve`) |

## Observações

**1. ecomm/cart.** Build separado: configuração webpack e dependências só desta aplicação, mesmo que o único uso seja o servidor de desenvolvimento. Ela gera o `remoteEntry.js` consumido pelo container do mesmo exemplo (ecomm/cart/webpack.config.js:10-15). Não há script de build de produção nem deploy observado. A versão `1.0.0` (ecomm/cart/package.json:3) não é usada em publicação.

**2. ecomm/container.** Mesmo arranjo, porta 8080, com os remotes apontados para `localhost:8081` e `localhost:8082` (ecomm/container/webpack.config.js:20-23). Sem deploy observado.

**3. ecomm/products.** Mesmo arranjo, porta 8081 (ecomm/products/webpack.config.js:6-7), a mesma do packages/marketing (packages/marketing/config/webpack.dev.js:10): os dois exemplos não rodam ao mesmo tempo sem mudar uma porta. O `package.json` declara `name` `container` (ecomm/products/package.json:2), sem efeito no build.

**4. packages/container.** Build separado, com configuração de produção própria acionada pelo script `build` (packages/container/package.json:6). O `publicPath` `/container/latest/` (packages/container/config/webpack.prod.js:12) diz em que caminho o host espera ser servido, mas é configuração de build, não artefato que empacota ou publica a aplicação; por isso Deploy fica `não observado`. A versão `1.0.0` (packages/container/package.json:3) não aparece em publicação, e o `latest` do caminho é fixo, não derivado dela.

**5. packages/marketing.** Build separado, com configuração de produção própria (packages/marketing/config/webpack.prod.js:6-23) e script `build` (packages/marketing/package.json:6). O endereço de produção só aparece do lado do container, como `${domain}/marketing/remoteEntry.js` (packages/container/config/webpack.prod.js:18), com o domínio vindo de variável de ambiente sem valor no snapshot (packages/container/config/webpack.prod.js:6). Nenhum artefato do snapshot coloca o build nesse caminho, então Deploy fica `não observado`. Versão `1.0.0` (packages/marketing/package.json:3) sem uso na publicação.

## Resumo

Aplicações: 5. Build (separado: 5). Deploy (não observado: 5). Versionamento independente: 0.
