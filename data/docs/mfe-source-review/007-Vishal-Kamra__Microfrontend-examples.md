---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 007 — Vishal-Kamra/Microfrontend-examples

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | react-js/container/src/index.js:1 | react-js/container | dynamic-loading | No | react-js/container/src/index.js:1 importa o bootstrap da própria aplicação. |
| src-async-bootstrap | react-js/marketing/src/index.js:1 | react-js/marketing | dynamic-loading | No | react-js/marketing/src/index.js:1 importa o bootstrap local. |
| src-async-bootstrap | simple-js/Cart/src/index.js:1 | simple-js/Cart | dynamic-loading | No | simple-js/Cart/src/index.js:1 importa o bootstrap local. |
| src-async-bootstrap | simple-js/Container/src/index.js:1 | simple-js/Container | dynamic-loading | No | simple-js/Container/src/index.js:1 importa o bootstrap local. |
| src-async-bootstrap | simple-js/Products/src/index.js:1 | simple-js/Products | dynamic-loading | No | simple-js/Products/src/index.js:1 importa o bootstrap local. |
| src-mount-export | react-js/container/src/bootstrap.js:22 | react-js/container | runtime-composition | No | Exporta mount do próprio container em react-js/container/src/bootstrap.js:22, mas não há consumidor de outro frontend nem exposição desse bootstrap; seu uso em react-js/container/src/bootstrap.js:12-17 é standalone interno. |
| src-mount-export | react-js/marketing/src/bootstrap.js:22 | react-js/marketing | runtime-composition | Yes | Exporta mount em react-js/marketing/src/bootstrap.js:22, exposto por react-js/marketing/config/webpack.dev.js:22-23 e consumido pelo wrapper do container em react-js/container/src/components/MarketingApp.js:3-9. |
| src-mount-export | simple-js/Cart/src/bootstrap.js:3 | simple-js/Cart | runtime-composition | Yes | Exporta mount em simple-js/Cart/src/bootstrap.js:3-8, exposto em simple-js/Cart/webpack.config.js:13-14 e consumido pelo container em simple-js/Container/src/bootstrap.js:2-5. |
| src-mount-export | simple-js/Products/src/bootstrap.js:3 | simple-js/Products | runtime-composition | Yes | Exporta mount em simple-js/Products/src/bootstrap.js:3-12, exposto em simple-js/Products/webpack.config.js:13-14 e consumido pelo container em simple-js/Container/src/bootstrap.js:1-4. |
| src-mount-call | react-js/container/src/components/MarketingApp.js:9 | react-js/container | runtime-composition | Yes | Monta o remote marketing no ref do wrapper em react-js/container/src/components/MarketingApp.js:8-10; wrapper renderizado em react-js/container/src/App.js:8, usado pelo bootstrap em react-js/container/src/bootstrap.js:3-7. |
| src-mount-call | simple-js/Cart/src/bootstrap.js:13 | simple-js/Cart | runtime-composition | No | simple-js/Cart/src/bootstrap.js:10-14 chama mount no próprio elemento de desenvolvimento; montagem interna à unidade Cart. |
| src-mount-call | simple-js/Products/src/bootstrap.js:17 | simple-js/Products | runtime-composition | No | simple-js/Products/src/bootstrap.js:14-18 chama mount no próprio elemento de desenvolvimento; montagem interna à unidade Products. |
| src-mount-import | react-js/container/src/components/MarketingApp.js:3 | react-js/container | runtime-composition | Yes | Importa mount de marketing/MarketingApp, invocado em react-js/container/src/components/MarketingApp.js:9; o wrapper está no App ativo em react-js/container/src/App.js:8. |
| src-mount-import | simple-js/Container/src/bootstrap.js:1 | simple-js/Container | runtime-composition | Yes | Importa mount de products/ProductsIndex sob alias mountProducts, chamado em simple-js/Container/src/bootstrap.js:4; bootstrap carregado por simple-js/Container/src/index.js:1. |
| src-mount-import | simple-js/Container/src/bootstrap.js:2 | simple-js/Container | runtime-composition | Yes | Importa mount de cart/CartShow sob alias mountCart, chamado em simple-js/Container/src/bootstrap.js:5; bootstrap carregado por simple-js/Container/src/index.js:1. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | simple-js/Container/src/bootstrap.js:4 | simple-js/Container | runtime-composition | Yes | mountProducts monta a UI da unidade Products no container; import remoto em simple-js/Container/src/bootstrap.js:1 e entrada em simple-js/Container/src/index.js:1. |
| manual | simple-js/Container/src/bootstrap.js:5 | simple-js/Container | runtime-composition | Yes | mountCart monta a UI da unidade Cart no container; import remoto em simple-js/Container/src/bootstrap.js:2 e entrada em simple-js/Container/src/index.js:1. |

## Resumo

Construções com composição: 9 (runtime-composition: 9).

## Notas

- As chamadas com aliases mountProducts e mountCart não casaram com o padrão src-mount-call e foram registradas manualmente.
- O export mount do container React é resíduo de um contrato de montagem: há uso local para standalone, mas nenhuma outra unidade observável o importa. Já o mount de marketing é exposto e consumido pelo container.
- As configurações de desenvolvimento ligam o exemplo React aos pontos de entrada convencionais; esta revisão descreve o código ativo nesse fluxo, sem afirmar build de produção (webpack.prod.js está vazio, conforme a revisão estrutural).
