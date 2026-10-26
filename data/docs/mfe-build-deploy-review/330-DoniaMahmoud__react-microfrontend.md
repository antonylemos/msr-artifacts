---
schema: 1
id: 1147094315
full_name: DoniaMahmoud/react-microfrontend
commit: adc0ef9de42ce63b3082f8297d0146b59ac0d612
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

# 330 — DoniaMahmoud/react-microfrontend

## Leitura do repositório

Exemplo didático de Module Federation em JavaScript puro, com três aplicações webpack independentes: `container` (host), `products` e `cart` (remotes). Não há `package.json` na raiz nem workspace; cada aplicação tem `package.json`, `package-lock.json` e `webpack.config.js` próprios. O único script de cada `package.json` é `start`, com `webpack serve` (cart/package.json:7; container/package.json:7; products/package.json:7); não há script `build`. As três configurações usam `mode: "development"` e fixam a porta do servidor de desenvolvimento: 8080 no container, 8081 no products e 8082 no cart (container/webpack.config.js:5-8; products/webpack.config.js:5-8; cart/webpack.config.js:5-8).

Tudo o que existe é configuração de desenvolvimento. O host busca os remotes em `http://localhost:8081/remoteEntry.js` e `http://localhost:8082/remoteEntry.js` (container/webpack.config.js:13-14), endereços dos servidores de desenvolvimento dos remotes. Não há Dockerfile, compose, workflow de CI, configuração de hospedagem nem proxy no snapshot, e o `matches.csv` não tem ocorrência `ops-*`, `ci-*` ou `cfg-public-path`. O `.gitignore` exclui `dist/` e `build/` (.gitignore:4-6).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | cart | separado | não observado | `http://localhost:8082` em desenvolvimento (cart/webpack.config.js:6-7; container/webpack.config.js:14) | No | cart/webpack.config.js:4-28 (configuração própria, gera `remoteEntry.js`); cart/package.json:7 (`webpack serve`) |
| 2 | container | separado | não observado | `http://localhost:8080` em desenvolvimento (container/webpack.config.js:6-7) | No | container/webpack.config.js:4-21 (configuração própria, host com dois remotes); container/package.json:7 (`webpack serve`) |
| 3 | products | separado | não observado | `http://localhost:8081` em desenvolvimento (products/webpack.config.js:6-7; container/webpack.config.js:13) | No | products/webpack.config.js:4-29 (configuração própria, gera `remoteEntry.js`); products/package.json:7 (`webpack serve`) |

## Observações

**1. cart.** O build é separado porque a configuração webpack e as dependências são só desta aplicação (cart/webpack.config.js:4-28; cart/package.json:12-19), mesmo que o único uso dela seja o servidor de desenvolvimento. Ela gera o `remoteEntry.js` com o módulo `./CartShow` (cart/webpack.config.js:10-15). Deploy não observado: só há `webpack serve` na porta 8082. A versão `1.0.0` (cart/package.json:3) não é usada em publicação.

**2. container.** Configuração e servidor próprios na porta 8080 (container/webpack.config.js:4-21). O código dos remotes não entra no seu build: chega em runtime pelos `remoteEntry.js` em `localhost` (container/webpack.config.js:12-15). Deploy não observado. A versão `1.0.0` (container/package.json:3) não é usada em publicação.

**3. products.** Mesmo arranjo do cart, com servidor na porta 8081 e o módulo `./ProductsIndex` exposto (products/webpack.config.js:6-15). Deploy não observado. A versão `1.0.0` (products/package.json:3) não é usada em publicação.

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
