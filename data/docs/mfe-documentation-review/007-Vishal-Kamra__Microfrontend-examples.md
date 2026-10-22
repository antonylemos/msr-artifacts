---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
inputs:
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

## Leitura do repositório

O repositório não tem nenhum arquivo `.md`, e os `package.json` têm `description` vazia. A única documentação são os comentários dos `bootstrap.js` do conjunto `react-js`. Os do marketing explicam o padrão do curso: a aplicação monta a si mesma quando roda isolada em desenvolvimento e exporta `mount` para o container usar. O `bootstrap.js` do container é uma cópia literal do marketing (react-js/container/src/bootstrap.js:1-22): procura o mesmo elemento `#_marketing-dev-root`, que o `index.html` do container também usa (react-js/container/public/index.html:5), e repete os comentários, que nele não se aplicam ao papel de host.

Foram lidos os artefatos que as revisões anteriores citam:
- as configurações webpack (`webpack.common.js`, `webpack.dev.js` e os `webpack.prod.js` vazios do conjunto `react-js`, e os `webpack.config.js` do `simple-js`);
- os `package.json`;
- os `index.js` e `bootstrap.js` das cinco aplicações;
- react-js/container/src/App.js e react-js/container/src/components/MarketingApp.js.

O conjunto `simple-js` não tem comentários sobre a arquitetura.

Nenhuma ocorrência `doc-*` na mineração.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | react-js/container/src/bootstrap.js:10-11 | "If we are in development and in isolation, call mount immediately" (em desenvolvimento e isolado, o container monta a si mesmo) | independência | corroborada | react-js/container/src/bootstrap.js:12-17; react-js/container/public/index.html:5 |
| 2 | react-js/container/src/bootstrap.js:20-21 | "We are running through container and we should export the mount function" (o container seria carregado por outro container) | composição | contradita | 3.4.5 (nenhuma relação com o container como destino); react-js/container/config/webpack.dev.js:19-25 (sem `exposes`) |
| 3 | react-js/marketing/src/bootstrap.js:10-11 | "If we are in development and in isolation, call mount immediately" (em desenvolvimento e isolado, o marketing monta a si mesmo) | independência | corroborada | 3.4.3 (marketing `Yes`); react-js/marketing/src/bootstrap.js:12-17; react-js/marketing/public/index.html:5 |
| 4 | react-js/marketing/src/bootstrap.js:20-21 | "We are running through container and we should export the mount function" (o marketing é carregado pelo container por meio de `mount`) | composição | corroborada | 3.4.5 #1; react-js/marketing/config/webpack.dev.js:19-24; react-js/container/src/components/MarketingApp.js:3, 9 |

## Observações

**1. react-js/container/src/bootstrap.js:10-11.** Em desenvolvimento, o container monta a própria `App` no elemento `#_marketing-dev-root` do seu `index.html`. O comentário confere com o comportamento, mas o nome do elemento e o "in isolation" vêm da cópia do arquivo do marketing. Como só existe configuração de desenvolvimento, esse é o único caminho de inicialização do container no snapshot.

**2. react-js/container/src/bootstrap.js:20-21.** O comentário diz que a aplicação roda "through container" e por isso exporta `mount`. O container é o host: sua configuração de Module Federation não expõe nada (react-js/container/config/webpack.dev.js:19-25), e a revisão de composição não registrou nenhuma unidade que o carregue. O `export { mount }` não tem consumidor, e o comentário foi copiado do remote sem corresponder ao papel desta unidade.

**3. react-js/marketing/src/bootstrap.js:10-11.** O marketing monta a si mesmo quando encontra `#_marketing-dev-root`, que existe no seu próprio `index.html`. Isso sustenta a execução isolada da revisão estrutural.

**4. react-js/marketing/src/bootstrap.js:20-21.** O marketing expõe `./MarketingApp`, que aponta para o `bootstrap.js`, e o container importa `mount` de `marketing/MarketingApp` e o chama num elemento próprio. A relação está na revisão de composição.

## Resumo

Afirmações: 4 (corroborada: 3, parcial: 0, contradita: 1, sem corroboração: 0). Temas: (composição: 2, independência: 2).
