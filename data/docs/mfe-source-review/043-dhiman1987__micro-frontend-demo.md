---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 043 — dhiman1987/micro-frontend-demo

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-bundle-url | app-shell/index.html:26 | app-shell | script-loading | Yes | app-shell/index.html:26 carrega o bundle IIFE da unidade app3; o elemento correspondente é consumido em app-shell/index.html:27 e a entrada do bundle é app3/vite.config.js:11. |
| src-custom-element | app1/app.js:1 | app1 | custom-element | Yes | app1/app.js:1 define o elemento hello-app para consumo; script carregado pelo shell em app-shell/index.html:14 e tag usada em app-shell/index.html:15. |
| src-custom-element | app1/app.js:6 | app1 | custom-element | Yes | app1/app.js:6 define o elemento hello-app para consumo; script carregado pelo shell em app-shell/index.html:14 e tag usada em app-shell/index.html:15. |
| src-custom-element | app2/app.js:1 | app2 | custom-element | Yes | app2/app.js:1 define o elemento world-app para consumo; script carregado pelo shell em app-shell/index.html:20 e tag usada em app-shell/index.html:21. |
| src-custom-element | app2/app.js:6 | app2 | custom-element | Yes | app2/app.js:6 define o elemento world-app para consumo; script carregado pelo shell em app-shell/index.html:20 e tag usada em app-shell/index.html:21. |
| src-custom-element | app3/src/MyCounterElement.jsx:6 | app3 | custom-element | Yes | app3/src/MyCounterElement.jsx:6 participa do encapsulamento/registro de my-counter-app; entrada ativa em app3/vite.config.js:11, script consumido pelo shell em app-shell/index.html:26 e tag em app-shell/index.html:27. |
| src-custom-element | app3/src/MyCounterElement.jsx:8 | app3 | custom-element | Yes | app3/src/MyCounterElement.jsx:8 participa do encapsulamento/registro de my-counter-app; entrada ativa em app3/vite.config.js:11, script consumido pelo shell em app-shell/index.html:26 e tag em app-shell/index.html:27. |
| src-custom-element | app3/src/MyCounterElement.jsx:28 | app3 | custom-element | Yes | app3/src/MyCounterElement.jsx:28 participa do encapsulamento/registro de my-counter-app; entrada ativa em app3/vite.config.js:11, script consumido pelo shell em app-shell/index.html:26 e tag em app-shell/index.html:27. |
| src-html-external-script | app-shell/index.html:14 | app-shell | script-loading | Yes | app-shell/index.html:14 carrega script da outra unidade app1; elemento consumido na linha 15 de app-shell/index.html. |
| src-html-external-script | app-shell/index.html:20 | app-shell | script-loading | Yes | app-shell/index.html:20 carrega script da outra unidade app2; elemento consumido na linha 21 de app-shell/index.html. |
| src-html-external-script | app-shell/index.html:26 | app-shell | script-loading | Yes | app-shell/index.html:26 carrega script da outra unidade app3; elemento consumido na linha 27 de app-shell/index.html. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | app-shell/index.html:15 | app-shell | custom-element | Yes | Consome a tag hello-app da outra unidade, definida em app1/app.js:6; script carregado em app-shell/index.html:14. |
| manual | app-shell/index.html:21 | app-shell | custom-element | Yes | Consome a tag world-app da outra unidade, definida em app2/app.js:6; script carregado em app-shell/index.html:20. |
| manual | app-shell/index.html:27 | app-shell | custom-element | Yes | Consome a tag my-counter-app da outra unidade, definida em app3/src/MyCounterElement.jsx:28; script carregado em app-shell/index.html:26. |
| manual | app3/src/MyCounterLitElement.jsx:7 | app3 | custom-element | No | O decorator registra a variante my-counter-lit-app, mas nenhum entry/build a importa e não há consumo de sua tag; entradas ativas usam MyCounterElement em app3/src/main.jsx:1 e app3/vite.config.js:11. |

## Resumo

Construções com composição: 14 (script-loading: 4, custom-element: 10).

## Notas

- A URL IIFE em app-shell/index.html:26 aparece duas vezes na mineração por padrões diferentes; ambas as linhas foram preservadas e contadas.
- Os usos de tags no shell são composição entre unidades; os mesmos elementos nos HTMLs standalone são internos e ficam fora da tabela (passo 4 do método).
- A variante Lit não é alcançada pelos pontos de entrada do snapshot. A resposta No segue a regra de construção inativa desta etapa; não altera a revisão de dependências.
- O consumo via atributos theme e maxcount é um contrato entre shell e app3. Não há evento ou outro canal de comunicação entre unidades encontrado nas buscas.
- Pelo critério de construções fora da mineração (passo 4 do método), ficam fora da tabela o uso de cada tag na página standalone da própria unidade (app1/index.html:4, app2/index.html:4, app3/index.html:11) e a leitura dos atributos `theme` e `maxCount` em app3/src/MyCounterElement.jsx:10-11, fornecidos pelo shell em app-shell/index.html:27.
