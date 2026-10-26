---
schema: 1
id: 1065269096
full_name: sunnywilsonveshapogu/microfrontends-demo
commit: f56f903190312e938d0ad5a9a146ad4dbe333589
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

# 052 — sunnywilsonveshapogu/microfrontends-demo

## Leitura do repositório

O README, em inglês, tem 566 linhas e é uma receita: manda criar a estrutura do projeto e traz, em blocos de código, o conteúdo de cada arquivo das três aplicações (README.md:13-45, 47-531). No começo, só a raiz é dada como existente, e as três pastas aparecem como "← Create this" (README.md:37-45). O snapshot traz as três pastas, mas sem os `public/index.html` que o README manda criar (ex.: README.md:123). É por isso que as aplicações ficaram `Undetermined` na revisão estrutural. O repositório é, portanto, uma materialização parcial da receita.

A prosa se concentra em três trechos:
- as promessas do início (README.md:3-11);
- a explicação do "Bootstrap Pattern" e do compartilhamento de React (README.md:542-554);
- o fecho promocional (README.md:556-565).

Os blocos de código não viraram linha, por serem cópias dos arquivos e não afirmações. Isso inclui os textos de interface, como "the shell application that orchestrates multiple microfrontends" (README.md:184) e "displays our product catalog independently" (README.md:503).

Foram lidos os artefatos que as revisões anteriores citam:
- os `package.json` da raiz e das três aplicações;
- os `webpack.config.js`;
- os `index.js` e `bootstrap.js`;
- `shell/src/App.js`, `header-mf/src/Header.js` e `products-mf/src/Products.js`.

Nenhum tem comentário sobre a arquitetura.

A descrição da composição confere com as revisões anteriores: Module Federation, React compartilhado e "Bootstrap Pattern". Destoam três promessas:
- **Projeto completo:** o README chama o projeto de "complete", mas o snapshot não tem os arquivos que o build exige.
- **Execução isolada:** depende de arquivos que não estão no snapshot.
- **"production-ready":** não há artefato de deploy, e os remotes estão fixados em `localhost`.

Ocorrências `doc-*` que não viraram linha:
- **Título e passos da receita:** README.md:1, 18, 38.
- **Blocos de código:** README.md:130, 158, 161, 166, 169, 183, 184, 284, 335, 436, 503.
- **Títulos de seção:** README.md:197, 349.

As demais estão nas afirmações 1, 2, 3, 6, 7 e 8, como afirmação ou repetição.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "A complete microfrontends project" (o projeto está completo) | estrutura | contradita | 3.4.3 (três aplicações `Undetermined`); shell/webpack.config.js:40; header-mf/webpack.config.js:46; products-mf/webpack.config.js:46 |
| 2 | README.md:3 | "microfrontends project with React and Module Federation" | estrutura | corroborada | 3.4.2 (module-federation configurado); 3.4.5 #1-#2 |
| 3 | README.md:3 | "supports both independent and integrated development" (cada aplicação também roda sozinha) | independência | parcial | 3.4.3 (três aplicações `Undetermined`); header-mf/src/bootstrap.js:5-6; header-mf/webpack.config.js:46 |
| 4 | README.md:9 | "**Shared Dependencies** - optimized React sharing" | composição | corroborada | header-mf/webpack.config.js:28-41; shell/webpack.config.js:28-37 |
| 5 | README.md:10 | "**Bootstrap Pattern**" (cada aplicação entra por `import('./bootstrap')`) | composição | corroborada | shell/src/index.js:1; header-mf/src/index.js:1; products-mf/src/index.js:1 |
| 6 | README.md:10 | "prevents eager consumption errors" (o padrão evita erros de consumo antecipado) | composição | sem corroboração | — |
| 7 | README.md:11 | "**Real-World Architecture** - used by Netflix, Spotify, etc." | outro | sem corroboração | — |
| 8 | README.md:558 | "You now have a production-ready microfrontend architecture" | build-deploy | contradita | 3.4.6 (Deploy `não observado`); shell/webpack.config.js:24-27, 39-41 |

## Observações

**1. README.md:3.** O README apresenta o repositório como um projeto completo, mas as três configurações exigem um `public/index.html` que não está no snapshot (shell/webpack.config.js:40; header-mf/webpack.config.js:46; products-mf/webpack.config.js:46). O próprio README manda criar esses arquivos (README.md:20, 123), e a revisão estrutural deixou as três aplicações `Undetermined` por isso. Repetição: "3 Working Applications" (README.md:7).

**2. README.md:3.** As três aplicações usam o `ModuleFederationPlugin` do webpack: o shell consome `headerMf` e `productsMf`, que expõem `./Header` e `./Products`. Repetições: README.md:561 e README.md:7, na parte "together".

**3. README.md:3.** Cada remote tem um `bootstrap.js` que monta o componente num `#root` próprio (ex.: header-mf/src/bootstrap.js:5-6), e o README dá as portas para abrir cada um sozinho (README.md:29-30). O `index.html` que fornece esse `#root` e que o build exige (header-mf/webpack.config.js:46) não está no snapshot. O código para rodar sozinho existe, mas o restante depende de arquivos ausentes. Repetições: README.md:7 ("can run standalone"), 8, 551-554 e 562.

**4. README.md:9.** React e React DOM são declarados como singletons compartilhados nas configurações. Repetições: README.md:552-553, que explicam que cada aplicação usa seu React sozinha e o do shell quando integrada, e README.md:563.

**5. README.md:10.** As três aplicações entram por um `index.js` que só importa o `bootstrap.js` de forma dinâmica. Repetições: README.md:544-547 e README.md:564.

**6. README.md:10.** O efeito anunciado, evitar erros de "eager consumption", é comportamento do Module Federation em execução e não tem artefato no snapshot que o confirme ou desminta. Repetição: README.md:549.

**7. README.md:11.** O uso da arquitetura por outras empresas não é verificável no snapshot. Repetição: README.md:565.

**8. README.md:558.** Os scripts de build passam `--mode production` (ex.: shell/package.json:6), mas nada além disso sustenta uma arquitetura pronta para produção: as configurações exigem templates ausentes (shell/webpack.config.js:39-41), o shell busca os remotes em `localhost` (shell/webpack.config.js:24-27), e não há artefato de deploy.

## Resumo

Afirmações: 8 (corroborada: 3, parcial: 1, contradita: 2, sem corroboração: 2). Temas: (estrutura: 2, composição: 3, build-deploy: 1, independência: 1, outro: 1).
