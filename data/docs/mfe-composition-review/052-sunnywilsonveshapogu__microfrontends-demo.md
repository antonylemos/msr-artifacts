---
schema: 1
id: 1065269096
full_name: sunnywilsonveshapogu/microfrontends-demo
commit: f56f903190312e938d0ad5a9a146ad4dbe333589
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 9441822a7a5f9766a0b955feeac5b7c0421a03c2dd7e07da4b4d476e26caebb0
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 052 — sunnywilsonveshapogu/microfrontends-demo

## Leitura do repositório

Demonstração com um `shell` React e dois remotes, `header-mf` e `products-mf`, ligados pelo Module Federation nativo do webpack 5. O shell monta a página com o cabeçalho de um remote e a lista de produtos do outro, cada um carregado por `import()` com tratamento de falha e renderizado em `Suspense` (shell/src/App.js:3-34). As três aplicações compartilham `react` e `react-dom` como singletons (ex.: header-mf/webpack.config.js:28-43).

Particularidade: as três unidades são Undetermined na revisão estrutural porque o `public/index.html` exigido pelo build não existe no snapshot (ex.: shell/webpack.config.js:40). O snapshot não compila como está, mas o código de composição está completo e ligado aos pontos de entrada.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | header-mf | host → remote | origem → destino | module-federation | Yes | Yes | shell/webpack.config.js:23-25 (remote `headerMf@http://localhost:3001/remoteEntry.js`); header-mf/webpack.config.js:23-26 (`name: 'headerMf'`, `filename: 'remoteEntry.js'`, expõe `./Header`); header-mf/webpack.config.js:7 (porta 3001) | shell/src/App.js:5; shell/src/App.js:25 |
| 2 | shell | products-mf | host → remote | origem → destino | module-federation | Yes | Yes | shell/webpack.config.js:23-24, 26 (remote `productsMf@http://localhost:3002/remoteEntry.js`); products-mf/webpack.config.js:23-26 (`name: 'productsMf'`, `filename: 'remoteEntry.js'`, expõe `./Products`); products-mf/webpack.config.js:7 (porta 3002) | shell/src/App.js:13; shell/src/App.js:33 |

## Observações

**1. shell → header-mf.** O shell importa `headerMf/Header` (shell/src/App.js:3-9) e o renderiza em `Suspense` (shell/src/App.js:24-26). O nome `headerMf` e o módulo `./Header` correspondem a header-mf/webpack.config.js:23-26; a porta 3001 só corrobora.

**2. shell → products-mf.** Mesmo padrão com `productsMf/Products` (shell/src/App.js:11-17, 32-34). O nome e o módulo correspondem a products-mf/webpack.config.js:23-26; a porta 3002 só corrobora.

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
