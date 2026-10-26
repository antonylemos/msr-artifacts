---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
inputs:
  clone: data/samples/mfe-sample-001/repos/horoshopodumaj__micro-frontends
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 164 — horoshopodumaj/micro-frontends

## Leitura do repositório

O histórico até o snapshot tem dois commits, sem merge, no mesmo dia. O primeiro, `5501ade` (2026-09-23, "demo micro frontends"), cria de uma vez os três projetos, `host/`, `remote/` e `vue-remote/`, com configurações, código e tipos gerados; é a primeira presença observável de toda a composição, e o histórico não diz onde ela foi feita antes. O segundo, `e1e0a52` (2026-09-23, "Create README.md"), é o snapshot e só cria o `README.md`.

As revisões anteriores não deixaram dependência sem uso, unidade ou relação `Undetermined`, construção desativada nem deploy `Undetermined`. O único ponto é a afirmação `contradita` da 3.4.7, a árvore de pastas do README que chama o diretório da aplicação Vue de `vue_remote/`.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | A árvore de pastas do README põe a aplicação Vue em `vue_remote/`, e o diretório é `vue-remote/` | 3.4.7 #10 | estágios em conflito | 5501ade 2026-09-23 demo micro frontends; e1e0a52 2026-09-23 Create README.md | esclarecido |

## Observações

**1. A árvore de pastas do README põe a aplicação Vue em `vue_remote/`, e o diretório é `vue-remote/`.** Todos os arquivos da aplicação Vue são criados já em `vue-remote/` no primeiro commit, `5501ade`, e nenhum commit até o snapshot cria, renomeia ou remove um caminho `vue_remote`. O README só aparece depois, em `e1e0a52`, que não toca em mais nada. No histórico observável, portanto, nunca houve uma pasta `vue_remote/` com que o README tivesse concordado: a árvore não é resto de um estágio anterior do repositório, e o README já nasceu divergente do diretório. O histórico não mostra de onde veio o nome; `vue_remote` é o `name` do container federado (3.4.7 #5), mas isso o snapshot já dizia. A afirmação continua `contradita`.

## Comandos

```
docs/mfe-history-review/tools/hist.sh horoshopodumaj__micro-frontends rev-list --count e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
docs/mfe-history-review/tools/hist.sh horoshopodumaj__micro-frontends rev-list --count --merges e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
docs/mfe-history-review/tools/hist.sh horoshopodumaj__micro-frontends log --reverse --format='%h %ad %s' --date=short e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
docs/mfe-history-review/tools/hist.sh horoshopodumaj__micro-frontends log --name-status --format='%h %ad %s' --date=short e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05 -- README.md
docs/mfe-history-review/tools/hist.sh horoshopodumaj__micro-frontends log --name-status --format='%h %ad %s' --date=short e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05 -- vue_remote
docs/mfe-history-review/tools/hist.sh horoshopodumaj__micro-frontends log --format='%h %ad %s' --date=short e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05 -- vue-remote
docs/mfe-history-review/tools/hist.sh horoshopodumaj__micro-frontends log --name-status --no-renames --format='%h %ad %s' --date=short e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
```

A consulta por `vue_remote` não retornou nenhum commit. Nenhuma consulta falhou por objeto ausente.

## Resumo

Commits até o snapshot: 2 (2026-09-23 a 2026-09-23). Pontos: 1 (esclarecido: 1, inconclusivo: 0, resolvido pelo snapshot: 0).
