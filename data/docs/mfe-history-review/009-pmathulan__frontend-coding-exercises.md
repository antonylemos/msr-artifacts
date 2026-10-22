---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
inputs:
  clone: data/samples/mfe-sample-001/repos/pmathulan__frontend-coding-exercises
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 009 — pmathulan/frontend-coding-exercises

## Leitura do repositório

O histórico até o snapshot tem um único commit, `89a3c27` (2025-05-07, "first commit"), que é o próprio snapshot. Os seis exercícios chegaram de uma vez, e o histórico não traz nenhuma informação além do snapshot.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | A rota `mfe2` do shell está comentada | 3.4.4 (microfrontend-workspace/projects/shell/src/app/app.routes.ts:17) | ativo ou abandonado | 89a3c27 2025-05-07 first commit | inconclusivo |
| 2 | O chart `spa-helm/` não se liga a nenhuma aplicação | 3.4.6 (Deploy `Undetermined`) | ativo ou abandonado | 89a3c27 2025-05-07 first commit | inconclusivo |
| 3 | O README do workspace cita um alias em `tsconfig.base.json`, arquivo que não existe | 3.4.7 #10 | estágios em conflito | 89a3c27 2025-05-07 first commit | inconclusivo |

## Observações

**1. A rota `mfe2` do shell está comentada.** O arquivo de rotas chega já com a rota comentada no único commit. Não dá para saber se ela chegou a funcionar antes do primeiro commit ou se foi só planejada.

**2. O chart `spa-helm/` não se liga a nenhuma aplicação.** O chart chega com os exercícios no único commit, e o histórico não diz para qual deles foi feito.

**3. O README do workspace cita um alias em `tsconfig.base.json`, arquivo que não existe.** O README e o `tsconfig.json` chegam juntos no único commit, e não há versão com `tsconfig.base.json` no histórico. Não dá para saber se o README descreve uma organização anterior ao primeiro commit.

## Comandos

```
docs/mfe-history-review/tools/hist.sh pmathulan__frontend-coding-exercises rev-list --count 89a3c271484ece4e37f719db9093c9157721a240
docs/mfe-history-review/tools/hist.sh pmathulan__frontend-coding-exercises rev-list --count --merges 89a3c271484ece4e37f719db9093c9157721a240
docs/mfe-history-review/tools/hist.sh pmathulan__frontend-coding-exercises log --reverse --format='%h %ad %s' --date=short 89a3c271484ece4e37f719db9093c9157721a240
docs/mfe-history-review/tools/hist.sh pmathulan__frontend-coding-exercises log --format='%h %ad' --date=short 89a3c271484ece4e37f719db9093c9157721a240 -- microfrontend-workspace/projects/shell/src/app/app.routes.ts
docs/mfe-history-review/tools/hist.sh pmathulan__frontend-coding-exercises log --format='%h %ad' --date=short 89a3c271484ece4e37f719db9093c9157721a240 -- spa-helm
docs/mfe-history-review/tools/hist.sh pmathulan__frontend-coding-exercises log --format='%h %ad' --date=short 89a3c271484ece4e37f719db9093c9157721a240 -- microfrontend-workspace/README.md
docs/mfe-history-review/tools/hist.sh pmathulan__frontend-coding-exercises log --format='%h %ad' --date=short 89a3c271484ece4e37f719db9093c9157721a240 -- microfrontend-workspace/tsconfig.json
```

## Resumo

Commits até o snapshot: 1 (2025-05-07 a 2025-05-07). Pontos: 3 (esclarecido: 0, inconclusivo: 3, resolvido pelo snapshot: 0).
