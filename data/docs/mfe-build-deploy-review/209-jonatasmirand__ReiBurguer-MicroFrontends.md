---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
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

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Leitura do repositório

Três aplicações Next.js em pastas irmãs (`cardapio`, `container`, `pedido`), cada uma com o próprio `package.json` e o próprio `package-lock.json`, sem workspace. A raiz não tem `package.json`, e o `package-lock.json` da raiz não tem pacotes (package-lock.json:1-6). Cada aplicação é construída à parte com `next build` (cardapio/package.json:7; container/package.json:7; pedido/package.json:7), usando a própria configuração com `NextFederationPlugin` (cardapio/next.config.js:5-20; container/next.config.mjs:7-29; pedido/next.config.mjs:7-29). Não há script que construa as três juntas.

Não há nenhum artefato de deploy: nem Dockerfile, compose, configuração de hospedagem ou workflow de CI. Os scripts de cada app são de desenvolvimento ou de execução local: `next dev` (o cardápio na porta 3001 e o pedido na 3002, cardapio/package.json:6 e pedido/package.json:6; o container sem porta declarada, container/package.json:6) e `next start` (cardapio/package.json:8; container/package.json:8; pedido/package.json:8), rodado à mão. O host aponta os remotes para `localhost` fixo (container/next.config.mjs:13-14), sem variável de ambiente para outro endereço.

As cinco ocorrências `ops-hosting` do `matches.csv` são texto de README, não artefato de deploy. `README.md:94` diz que o container consome os remotes via localhost e que o projeto "pode ser hospedado em Vercel da vida ou semelhantes"; `README.md:89` afirma que cada microfrontend "pode ser desenvolvido e deployado separadamente". `cardapio/README.md:25`, `:34`, `:36` e `:38` são o texto padrão do create-next-app, com a seção "Deploy on Vercel". Essas afirmações ficam para a revisão de documentação e não decidem a coluna Deploy.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | cardapio | separado | não observado | `http://localhost:3001/_next/static/chunks/remoteEntry.js`, como o host espera (container/next.config.mjs:14); porta 3001 em desenvolvimento (cardapio/package.json:6) | No | cardapio/package.json:7 (`next build`); cardapio/next.config.js:5-20 (configuração própria, gera `static/chunks/remoteEntry.js`) |
| 2 | container | separado | não observado | — | No | container/package.json:7 (`next build`); container/next.config.mjs:7-29 (configuração própria, remotes em `localhost`) |
| 3 | pedido | separado | não observado | `http://localhost:3002/_next/static/chunks/remoteEntry.js`, como o host espera (container/next.config.mjs:13); porta 3002 em desenvolvimento (pedido/package.json:6) | No | pedido/package.json:7 (`next build`); pedido/next.config.mjs:7-29 (configuração própria, gera `static/chunks/remoteEntry.js`) |

## Observações

**1. cardapio.** O build é próprio: `next build` (cardapio/package.json:7) na pasta do app, com dependências instaladas pelo lockfile dele (cardapio/package-lock.json). A configuração usada é a do `next.config.js` (cardapio/next.config.js:7-17), conforme a revisão estrutural; o `next.config.mjs`, com o caminho exposto inexistente (cardapio/next.config.mjs:13), não altera o build separado. Nenhum artefato publica o app; o único endereço é o de desenvolvimento que o host espera. A versão `0.1.0` (cardapio/package.json:3) não é usada para publicar, e o pacote é `private` (cardapio/package.json:4).

**2. container.** Build próprio com `next build` (container/package.json:7) e a configuração de host (container/next.config.mjs:9-26). O `dev` não declara porta (container/package.json:6), então nenhum endereço do snapshot indica onde o container é servido. Os endereços dos remotes ficam embutidos no build (container/next.config.mjs:13-14). Sem artefato de deploy e sem versionamento usado na publicação (container/package.json:3-4).

**3. pedido.** Build próprio com `next build` (pedido/package.json:7) e a configuração do remote (pedido/next.config.mjs:9-25). Sem artefato de deploy; o endereço é o de desenvolvimento esperado pelo host (container/next.config.mjs:13; pedido/package.json:6). Sem versionamento usado na publicação (pedido/package.json:3-4).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
