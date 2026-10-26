---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
inputs:
  clone: data/samples/mfe-sample-001/repos/Lnx117__single_spa_main
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 176 — Lnx117/single_spa_main

## Leitura do repositório

O histórico até o snapshot tem um único commit, `112c73b` (2026-03-14, "init commit"), que é o próprio snapshot, sem merges. Ele adiciona os seis arquivos do repositório (`.envtest`, `index.html`, `package-lock.json`, `package.json`, `src/main.ts`, `vite.config.ts`), que têm nele a sua primeira presença observável; não há commit que os introduza nem versão anterior. O histórico não traz informação além do snapshot: não mostra estágios anteriores, abandonos nem onde o código foi feito antes do primeiro commit. Os commits posteriores ao snapshot, em outros branches, não entram.

Das revisões anteriores, só a 3.4.7 deixou ponto, retomando uma nota da 3.4.4. A 3.4.2 não tem dependência sem uso, a 3.4.3 não tem unidade `Undetermined`, a 3.4.4 não tem construção inativa, comentada ou `Undetermined`, a 3.4.5 não tem relação `Undetermined` e o deploy da 3.4.6 é `não observado`, e não `Undetermined`. Na 3.4.7, as afirmações 1 e 13 (`parcial`) não viram ponto: a parte não confirmada depende dos microfrontends `menu` e `base`, que estão em outros repositórios (o servidor Vite de cada um, o efeito da isolação de CSS), e não há estágio, intenção ou cópia a esclarecer neste histórico. A afirmação 3, `sem corroboração`, não está entre as que o passo 2 levanta e não virou ponto. O snapshot não resolve o ponto que resta: não há `.gitignore` nem outro arquivo que explique a ausência de `.env`/`.env.local`.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O comentário de `src/main.ts` manda definir as URLs em `.env`/`.env.local`, mas o único arquivo versionado com elas é `.envtest`, que o Vite não carrega por padrão | 3.4.4 (Notas); 3.4.7 #7 | estágios em conflito | 112c73b 2026-03-14 init commit | inconclusivo |

## Observações

**1. `.env`/`.env.local` no comentário e `.envtest` no repositório.** O `src/main.ts`, com o comentário das linhas 5 e 6, e o `.envtest`, com os valores de `VITE_MENU` e `VITE_BASE`, chegam juntos no único commit e não têm outra versão até o snapshot. Nenhum `.env` ou `.env.local` aparece no histórico até o snapshot, nem como arquivo removido. O histórico não diz se o arquivo já se chamava `.env` antes do primeiro commit e foi renomeado para ser versionado, nem se `.envtest` é uma cópia de exemplo de um `.env` mantido fora do repositório. A ressalva da 3.4.4 e a corroboração `parcial` da 3.4.7 ficam como estavam.

## Comandos

```
docs/mfe-history-review/tools/hist.sh Lnx117__single_spa_main rev-list --count 112c73b7d0bc4739bcab53de03b404ce2fbde05a
docs/mfe-history-review/tools/hist.sh Lnx117__single_spa_main rev-list --count --merges 112c73b7d0bc4739bcab53de03b404ce2fbde05a
docs/mfe-history-review/tools/hist.sh Lnx117__single_spa_main log --reverse --format='%h %ad %s' --date=short 112c73b7d0bc4739bcab53de03b404ce2fbde05a
docs/mfe-history-review/tools/hist.sh Lnx117__single_spa_main log --format='%h %ad' --date=short --name-status 112c73b7d0bc4739bcab53de03b404ce2fbde05a
docs/mfe-history-review/tools/hist.sh Lnx117__single_spa_main log --format='%h %ad' --date=short 112c73b7d0bc4739bcab53de03b404ce2fbde05a -- .envtest
docs/mfe-history-review/tools/hist.sh Lnx117__single_spa_main log --format='%h %ad' --date=short 112c73b7d0bc4739bcab53de03b404ce2fbde05a -- src/main.ts
docs/mfe-history-review/tools/hist.sh Lnx117__single_spa_main log --format='%h %ad' --date=short --full-history 112c73b7d0bc4739bcab53de03b404ce2fbde05a -- .env .env.local   # saída vazia
```

## Resumo

Commits até o snapshot: 1 (2026-03-14 a 2026-03-14). Pontos: 1 (esclarecido: 0, inconclusivo: 1, resolvido pelo snapshot: 0).
