---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
inputs:
  clone: data/samples/mfe-sample-001/repos/mrmechazilla__host-app
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 008 — mrmechazilla/host-app

## Leitura do repositório

O histórico até o snapshot tem 5 commits, de 2025-08-23 a 2026-01-21, sem merges. O primeiro é `486bd68` ("Initial commit"). O segundo, `2227f83` (2025-08-24, "feat: add and configure module federation"), cria `webpack.config.js`, `webpack.prod.config.js` e `public/mf.manifest.json`: a configuração da composição é introduzida aí. Os commits seguintes alteram as rotas e o manifesto (`292d70d`, `4885b01`). O último, `38ab4eb` (2026-01-21), cuja mensagem anuncia a internacionalização, também cria `remote-config.ts` e `remote-loader.ts` e altera de novo as rotas e o manifesto.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `src/app/shared/utils/remote-loader.ts` está inteiramente comentado | 3.4.4 (src/app/shared/utils/remote-loader.ts:1, 14) | ativo ou abandonado | 38ab4eb 2026-01-21 feat: add and configure i18n with @jsverse/transloco | esclarecido |

## Observações

**1. `src/app/shared/utils/remote-loader.ts` está inteiramente comentado.** O arquivo é criado em `38ab4eb`, o commit do snapshot, e não existe em nenhuma versão anterior. A única versão dele no histórico é a do snapshot, toda comentada. Não houve uma versão ativa que depois tenha sido desativada. O histórico não diz por que um carregador já comentado foi adicionado.

## Comandos

```
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app rev-list --count 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app rev-list --count --merges 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app log --reverse --format='%h %ad %s' --date=short 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app show --name-status --no-renames --format='== %h' 2227f83
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app log --format='%h %ad' --date=short 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8 -- src/app/shared/utils/remote-loader.ts
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app log --format='%h %ad' --date=short 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8 -- public/mf.manifest.json
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app log --format='%h %ad' --date=short 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8 -- src/app/app.routes.ts
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app show --name-status --no-renames --format='== %h %ad %s' --date=short 38ab4eb
```

## Resumo

Commits até o snapshot: 5 (2025-08-23 a 2026-01-21). Pontos: 1 (esclarecido: 1, inconclusivo: 0, resolvido pelo snapshot: 0).
