---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
inputs:
  clone: data/samples/mfe-sample-001/repos/samhoooo__module-federation-demo-mf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 327 — samhoooo/module-federation-demo-mf2

## Leitura do repositório

O histórico até o snapshot tem 3 commits, de 2026-08-10 a 2026-08-11, sem merges:

- `eeac072` (2026-08-10, "Add Module Federation 2 demo: header-app remote + home-app host"), o primeiro, cria de uma vez todo o repositório: as duas aplicações (`header-app/` e `home-app/`, com `package.json`, `package-lock.json`, `rspack.config.js`, `tsconfig.json`, `public/index.html` e fontes), as declarações geradas em `home-app/@mf-types/`, o `package-lock.json` e o `.gitignore` da raiz e o `README.md`;
- `0a010ce` (2026-08-10, "Update README.md") e `0a621b6` (2026-08-11, "Update README.md"), o commit do snapshot, só alteram o `README.md`.

Nenhum commit remove arquivo. Tudo o que as revisões anteriores citam, exceto o README, tem primeira presença observável em `eeac072` e não muda depois. Como o primeiro commit já traz o projeto inteiro, o histórico não mostra como nem onde o código foi feito antes.

Das revisões anteriores, só a 3.4.7 deixou ponto. A 3.4.2 não tem dependência sem uso (as duas declarações de `@module-federation/enhanced` são `Yes`), a 3.4.3 não tem unidade `Undetermined`, a 3.4.4 não tem construção inativa, comentada ou `Undetermined` (a linha de `home-app/@mf-types/HeaderApp/apis.d.ts:3` é declaração de tipo gerada, `none`), a 3.4.5 não tem relação `Undetermined` e o deploy da 3.4.6 é `não observado` nas duas aplicações, e não `Undetermined`. Na 3.4.7, a afirmação 10 (`parcial`) vira ponto, porque a parte sem artefato (o deploy separado) pode ser intenção ou resto de um estágio com deploy configurado. O snapshot não resolve o ponto: o `.gitignore` exclui `node_modules`, `dist`, `.rspack`, `*.log`, `.claude` e `ARTICLE.md` (.gitignore:1-6), nenhum deles arquivo de configuração de deploy.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O comentário do host fala em build e deploy separados do header-app, e o snapshot não tem artefato de deploy | 3.4.7 #10 | ativo ou abandonado | eeac072 2026-08-10 Add Module Federation 2 demo: header-app remote + home-app host | esclarecido |

## Observações

**1. Build e deploy separados sem artefato de deploy.** O `home-app/src/App.tsx`, que tem o comentário (home-app/src/App.tsx:8-10), e os `package.json` e `rspack.config.js` das duas aplicações são criados em `eeac072` e não mudam depois. Nenhum dos três commits cria ou remove Dockerfile, workflow, configuração de hospedagem ou outro arquivo de deploy, e nenhum commit remove arquivo. O histórico não registra, portanto, um estágio com deploy configurado que tenha sido abandonado: o comentário e a configuração só de desenvolvimento (`rspack serve` em `localhost`) coexistem desde a primeira presença observável. O histórico não mostra se as aplicações foram publicadas fora do repositório, nem se o comentário descreve um plano.

## Comandos

```
docs/mfe-history-review/tools/hist.sh samhoooo__module-federation-demo-mf2 rev-list --count 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
docs/mfe-history-review/tools/hist.sh samhoooo__module-federation-demo-mf2 rev-list --count --merges 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
docs/mfe-history-review/tools/hist.sh samhoooo__module-federation-demo-mf2 log --format='%h %ad %s' --date=short --name-status --no-renames 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
```

## Resumo

Commits até o snapshot: 3 (2026-08-10 a 2026-08-11). Pontos: 1 (esclarecido: 1, inconclusivo: 0, resolvido pelo snapshot: 0).
