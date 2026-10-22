---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
inputs:
  clone: data/samples/mfe-sample-001/repos/Vishal-Kamra__Microfrontend-examples
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 007 — Vishal-Kamra/Microfrontend-examples

## Leitura do repositório

O histórico até o snapshot tem um único commit, `eeb8488` (2025-11-17, "Initial Commit"), que é o próprio snapshot. Tudo o que o repositório contém chegou de uma vez. O histórico não tem nenhuma informação além do snapshot: não mostra estágios anteriores, abandonos nem a ordem em que os arquivos foram feitos.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `react-js/auth` e `react-js/dashboard` só têm `package.json` e lockfile | 3.4.3 (Notas) | ativo ou abandonado | eeb8488 2025-11-17 Initial Commit | inconclusivo |
| 2 | Os `webpack.prod.js` do conjunto `react-js` estão vazios | 3.4.6 (Leitura) | ativo ou abandonado | eeb8488 2025-11-17 Initial Commit | inconclusivo |
| 3 | O `bootstrap.js` do container é uma cópia do marketing e diz que a aplicação roda "through container" | 3.4.7 #2 | estágios em conflito | eeb8488 2025-11-17 Initial Commit | inconclusivo |

## Observações

**1. `react-js/auth` e `react-js/dashboard` só têm `package.json` e lockfile.** As duas pastas chegam no único commit, e não há versão anterior nem posterior. Não dá para saber se são aplicações planejadas e não feitas ou restos de aplicações removidas antes do primeiro commit.

**2. Os `webpack.prod.js` do conjunto `react-js` estão vazios.** Os dois arquivos chegam vazios no único commit. O histórico não diz se tiveram conteúdo antes.

**3. O `bootstrap.js` do container é uma cópia do marketing e diz que a aplicação roda "through container".** Os dois arquivos chegam juntos no único commit. Não há estágio anterior que explique a cópia.

## Comandos

```
docs/mfe-history-review/tools/hist.sh Vishal-Kamra__Microfrontend-examples rev-list --count eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
docs/mfe-history-review/tools/hist.sh Vishal-Kamra__Microfrontend-examples rev-list --count --merges eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
docs/mfe-history-review/tools/hist.sh Vishal-Kamra__Microfrontend-examples log --reverse --format='%h %ad %s' --date=short eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
docs/mfe-history-review/tools/hist.sh Vishal-Kamra__Microfrontend-examples log --format='%h %ad' --date=short eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8 -- react-js/auth
docs/mfe-history-review/tools/hist.sh Vishal-Kamra__Microfrontend-examples log --format='%h %ad' --date=short eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8 -- react-js/dashboard
docs/mfe-history-review/tools/hist.sh Vishal-Kamra__Microfrontend-examples log --format='%h %ad' --date=short eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8 -- react-js/container/config/webpack.prod.js
docs/mfe-history-review/tools/hist.sh Vishal-Kamra__Microfrontend-examples log --format='%h %ad' --date=short eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8 -- react-js/marketing/config/webpack.prod.js
docs/mfe-history-review/tools/hist.sh Vishal-Kamra__Microfrontend-examples log --format='%h %ad' --date=short eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8 -- react-js/container/src/bootstrap.js
docs/mfe-history-review/tools/hist.sh Vishal-Kamra__Microfrontend-examples log --format='%h %ad' --date=short eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8 -- react-js/marketing/src/bootstrap.js
```

## Resumo

Commits até o snapshot: 1 (2025-11-17 a 2025-11-17). Pontos: 3 (esclarecido: 0, inconclusivo: 3, resolvido pelo snapshot: 0).
