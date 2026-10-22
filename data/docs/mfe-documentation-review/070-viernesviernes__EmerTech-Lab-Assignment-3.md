---
schema: 1
id: 1183615585
full_name: viernesviernes/EmerTech-Lab-Assignment-3
commit: 98845d1a3f9c1b41df04512b4472ee2d21085b6b
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

# 070 — viernesviernes/EmerTech-Lab-Assignment-3

## Leitura do repositório

Os três `.md` são o README padrão do template Vite, um por aplicação (ex.: client/shell-app/README.md:1-3), e os `package.json` de `client/` e `server/` têm `description` vazia. A arquitetura só aparece num comentário do gateway GraphQL do backend, que lista as três aplicações e as suas portas para liberar CORS (server/gateway.js:12).

Foram lidos os artefatos que as revisões anteriores citam:
- os `package.json`, as configurações Vite e os `index.html`;
- os `main.jsx` e `App.jsx` das três aplicações;
- os componentes de login do auth-app;
- server/gateway.js.

Ficaram fora da tabela:
- os comentários sobre o tratamento de cookies e subgrafos no gateway (server/gateway.js:46-74), uma relação entre backends;
- o comentário do componente de redirecionamento do shell (client/shell-app/src/App.jsx:52), um detalhe interno.

A única afirmação confere com as revisões anteriores.

Nenhuma ocorrência `doc-*` na mineração.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | server/gateway.js:12 | "Microfrontends: shell 3000, auth-app 3001, community-app 3002" (três micro-frontends, que o gateway aceita como origens) | estrutura | corroborada | 3.4.3 (três aplicações `Yes`); 3.4.5 #1-#2; server/gateway.js:13-17 |

## Observações

**1. server/gateway.js:12.** O comentário nomeia as três aplicações de `client/` como micro-frontends, e o gateway as aceita como origens de desenvolvimento (server/gateway.js:13-17). As portas são as dos scripts de cada aplicação (ver a revisão de build e deploy). É uma relação entre as unidades frontend e o backend de que elas dependem, e confirma de fora da pasta `client/` os papéis registrados nas revisões estrutural e de composição.

## Resumo

Afirmações: 1 (corroborada: 1, parcial: 0, contradita: 0, sem corroboração: 0). Temas: (estrutura: 1).
