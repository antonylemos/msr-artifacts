---
schema: 1
id: 994642993
full_name: ayushpandey241626/microfrontend-demo
commit: ec39a278ec6951feeb8d7ff7688cb4f056be589b
inputs:
  clone: data/samples/mfe-sample-001/repos/ayushpandey241626__microfrontend-demo
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 229 — ayushpandey241626/microfrontend-demo

## Leitura do repositório

O histórico até o snapshot tem 22 commits, de 2025-05-27 a 2025-06-10, sem merges. O primeiro, `bfddd76` (2025-05-27, "initial commit"), cria só o esqueleto do workspace Angular: `angular.json`, `package.json`, `package-lock.json`, `tsconfig.json`, `README.md`, `.gitignore`, `.editorconfig` e os arquivos de `.vscode/`. Os projetos `host-app`, `mfe1` e `mfe2`, com seus `webpack.config.js`, `webpack.prod.config.js`, `main.ts`, `bootstrap.ts` e `app.routes.ts`, são introduzidos em `2ff1fbc` (2025-06-02, "Initial Commit for Microfront-end Project POC"), que também altera `angular.json` e `package.json`. O quarto projeto, `login-mfe-app`, é introduzido em `f269b80` (2025-06-04, "Added A new mF login form to have login landing page for the application"), que no mesmo commit altera `angular.json`, `package.json`, `projects/host-app/webpack.config.js` e `projects/host-app/src/app/app.routes.ts`. O `AuthGuard` do host, `projects/host-app/src/app/auth.guard.ts`, é introduzido em `625b308` (2025-06-05), cuja mensagem anuncia a proteção das rotas e o registro do login no `localStorage`. Os demais commits mexem em telas, testes e dados de exemplo; o do snapshot, `ec39a27` (2025-06-10), altera um teste do host e os componentes de mfe1 e mfe2.

As revisões anteriores não deixaram ponto ambíguo que o histórico pudesse esclarecer: a única dependência declarada é `Yes` (3.4.2), não há unidade `Undetermined` (3.4.3), as construções são todas ativas e nenhuma está comentada ou `Undetermined` (3.4.4), as quatro relações são ativas (3.4.5), o deploy das quatro aplicações é `não observado` (3.4.6) e não há afirmação de documentação (3.4.7). Os `remotes` estáticos do host, citados nas notas da 3.4.4 e na leitura da 3.4.5, não estão comentados nem formam construção ou relação à parte: entram na Configuração das relações ativas. Por isso o histórico não foi consultado além deste contexto.

## Pontos

Nenhum ponto ambíguo nas revisões anteriores.

## Comandos

```
docs/mfe-history-review/tools/hist.sh ayushpandey241626__microfrontend-demo rev-list --count ec39a278ec6951feeb8d7ff7688cb4f056be589b
docs/mfe-history-review/tools/hist.sh ayushpandey241626__microfrontend-demo rev-list --count --merges ec39a278ec6951feeb8d7ff7688cb4f056be589b
docs/mfe-history-review/tools/hist.sh ayushpandey241626__microfrontend-demo log --format='%h %ad %s' --date=short --name-status --no-renames ec39a278ec6951feeb8d7ff7688cb4f056be589b
```

## Resumo

Commits até o snapshot: 22 (2025-05-27 a 2025-06-10). Pontos: 0.
