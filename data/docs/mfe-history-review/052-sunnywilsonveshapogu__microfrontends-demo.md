---
schema: 1
id: 1065269096
full_name: sunnywilsonveshapogu/microfrontends-demo
commit: f56f903190312e938d0ad5a9a146ad4dbe333589
inputs:
  clone: data/samples/mfe-sample-001/repos/sunnywilsonveshapogu__microfrontends-demo
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 052 — sunnywilsonveshapogu/microfrontends-demo

## Leitura do repositório

O histórico até o snapshot tem 3 commits, todos de 2025-09-27, com um merge.
- **`31e1ab9` ("Initial commit"):** cria só o `.gitignore`, o README e o `package.json` da raiz, o que corresponde ao estado que o README dá como "already exists".
- **`5e5227d` ("Add complete microfrontend architecture with Module Federation"):** cria as três aplicações.
- **`f56f903`:** é o merge dessa branch e o commit do snapshot.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | As três aplicações exigem um `public/index.html` que não está no snapshot | 3.4.3 (header-mf, products-mf e shell `Undetermined`); 3.4.7 #1, #3, #8 | ativo ou abandonado | 31e1ab9 2025-09-27 Initial commit; 5e5227d 2025-09-27 Add complete microfrontend architecture with Module Federation | resolvido pelo snapshot |

## Observações

**1. As três aplicações exigem um `public/index.html` que não está no snapshot.** O próprio snapshot delimita o ponto: o `.gitignore` da raiz ignora `public` (.gitignore:79), uma regra compatível com a ausência dos templates. O histórico confere: o `.gitignore` vem do primeiro commit, e nenhuma árvore do histórico observado contém um caminho com `public/`. Os templates nunca foram versionados, e não foram apagados. Não é possível confirmar se chegaram a ser criados localmente. Isso cobre a parte das afirmações "complete" e "production-ready" que depende dos templates. A falta de deploy e os remotes em `localhost`, também citados contra o "production-ready", não têm relação com essa regra.

## Comandos

```
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo rev-list --count f56f903190312e938d0ad5a9a146ad4dbe333589
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo rev-list --count --merges f56f903190312e938d0ad5a9a146ad4dbe333589
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo log --format='%h %ad %s' --date=short f56f903190312e938d0ad5a9a146ad4dbe333589
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo show --name-status --no-renames --format='== %h' 31e1ab9
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo show --name-status --no-renames --format='== %h' 5e5227d
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo log --format='%h %ad' --date=short f56f903190312e938d0ad5a9a146ad4dbe333589 -- .gitignore
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo ls-tree -r --name-only 31e1ab9
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo ls-tree -r --name-only 5e5227d
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo ls-tree -r --name-only f56f903190312e938d0ad5a9a146ad4dbe333589
```

## Resumo

Commits até o snapshot: 3 (2025-09-27 a 2025-09-27). Pontos: 1 (esclarecido: 0, inconclusivo: 0, resolvido pelo snapshot: 1).
