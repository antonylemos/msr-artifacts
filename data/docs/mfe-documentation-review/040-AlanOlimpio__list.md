---
schema: 1
id: 1009749841
full_name: AlanOlimpio/list
commit: 6ff9bfa3a94bb5920f60aabacc8f56298cbf4326
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

# 040 — AlanOlimpio/list

## Leitura do repositório

A documentação está em português e se resume ao README e à `description` do `package.json`. O README é o de um projeto de curso ("Webpack do básico ao avançado", README.md:1-3). Diz que o aplicativo é uma SPA, lista as bibliotecas usadas e explica como rodar o micro front end `list` na porta 9004. A `description` diz que o app foi criado "para ser usado no Module Federation" (package.json:4).

Foram lidos os artefatos que as revisões anteriores citam: package.json, webpack.config.js, vercel.json, public/index.html, src/index.js, src/bootstrap.js e os componentes `List` e `ListRoutes`. Nenhum tem comentário.

O README foi escrito para um curso com vários micro-frontends: manda navegar "para pasta de cada micro front end" e entrar em `list` (README.md:29-35). O snapshot, porém, só tem essa aplicação, na raiz do repositório, sem pasta `list`. O outro micro-frontend do curso, o `RegisterApp`, só aparece como remote externo (webpack.config.js:52-55). Essas instruções não viraram linha.

Ocorrências `doc-*` que não viraram linha: README.md:1 (título do curso, repetição da afirmação 2) e README.md:29 (instrução de execução). As demais estão nas afirmações 2 e 3.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:11 | "Esse aplicativo é uma SPA." | estrutura | corroborada | 3.4.3 (uma aplicação, `.`); vercel.json:2-4 |
| 2 | README.md:15 | "aplicação webpack module federation" | composição | corroborada | 3.4.2 (module-federation configurado); webpack.config.js:46-55 |
| 3 | README.md:31 | "Micro front end `list`" (a aplicação é um micro-frontend) | estrutura | corroborada | 3.4.5 #1; webpack.config.js:47-51 |
| 4 | package.json:4 | "Criando o app List para ser usado no Module Federation" (o app foi feito para ser consumido via Module Federation) | composição | corroborada | webpack.config.js:47-51 (`name: 'ListApp'`, expõe `./ListRoutes`) |

## Observações

**1. README.md:11.** O repositório tem uma única aplicação, e a Vercel reescreve todas as rotas para `/`, como numa SPA.

**2. README.md:15.** A aplicação usa o `ModuleFederationPlugin` do webpack, como remote e como consumidora. Repetição: o título (README.md:1).

**3. README.md:31.** A aplicação expõe `./ListRoutes` com o nome `ListApp` e consome o remote `RegisterApp`. É uma unidade de um conjunto maior, cujo restante está fora do snapshot.

**4. package.json:4.** A exposição de `./ListRoutes` confirma que a aplicação foi preparada para ser consumida por outro host. Nenhum consumidor está no snapshot, mas a afirmação é sobre o propósito da aplicação, e a configuração o sustenta.

## Resumo

Afirmações: 4 (corroborada: 4, parcial: 0, contradita: 0, sem corroboração: 0). Temas: (estrutura: 2, composição: 2).
