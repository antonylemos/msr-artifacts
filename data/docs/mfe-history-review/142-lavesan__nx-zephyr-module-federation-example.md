---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
inputs:
  clone: data/samples/mfe-sample-001/repos/lavesan__nx-zephyr-module-federation-example
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 142 — lavesan/nx-zephyr-module-federation-example

## Leitura do repositório

O histórico até o snapshot tem 13 commits, sem merges, de 2025-06-09 a 2025-06-10. O primeiro,
`5a52004` (2025-06-09, "feat: initial commit"), já cria o workspace pnpm/Nx com `apps/shell`,
`apps/profile`, uma terceira aplicação `apps/settings`, o pacote `packages/zephyr-rsbuild-plugin`
e um `packages/.gitkeep`; as três aplicações já têm `module-federation.config.ts`. Essa é a primeira
presença observável da federação e do plugin Zephyr, não a sua introdução: o primeiro commit não diz
onde o código foi feito antes. `78c42b1` (2025-06-10, "feat: divides microfrontends between two
page, building an simples inactive courses application") remove todos os arquivos de `apps/settings`
e cria `apps/courses`, além de criar `apps/shell/src/components/Header.tsx` e alterar as
configurações do shell e do profile. Os commits seguintes passam as URLs dos remotes para variáveis
de ambiente (`9b23a4f`), criam os `project.json` e os `vercel.json` das aplicações (`0cc1e14`),
trocam o `rspack.config.ts` do profile por `rsbuild.config.ts` (`b56fe2e`), alteram o README
(`f9593dc`) e, no snapshot `766b6a2` (2025-06-10, "feat: adds configuration to save and deploy the
aplications on zephyr"), alteram os três `rsbuild.config.ts` e o plugin Zephyr. Só `b56fe2e` e
`78c42b1` removem arquivos.

O clone não tem o conteúdo das versões antigas consultadas: o `show` do README e dos arquivos de
`apps/settings` em `5a52004` falha por objeto ausente. O que se vê são mensagens, datas, caminhos
criados, alterados e removidos e as árvores de cada versão.

Das revisões anteriores, a 3.4.2 não tem dependência sem uso (`nx` e `@nx/js` são `Yes`), a 3.4.3
não tem unidade `Undetermined`, a 3.4.4 não tem construção inativa, comentada ou `Undetermined`, a
3.4.5 não tem relação `Undetermined` e a 3.4.6 não tem deploy `Undetermined`. Na 3.4.7, a afirmação
`contradita` #7 virou o ponto 1. A afirmação `parcial` #8 (Zephyr) não virou ponto: o que fica sem
corroboração é o efeito de `withZephyr`, que depende do pacote externo `zephyr-rspack-plugin`, e não
uma diferença que possa ser resto de estágio anterior. O histórico só acrescenta que o plugin está
em `packages/` desde `5a52004` e que o único outro commit que toca `packages/` é o próprio snapshot,
`766b6a2`.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O README lista "Shared component library", e o snapshot não tem biblioteca de componentes | 3.4.7 #7 | estágios em conflito | 5a52004 2025-06-09 feat: initial commit; 78c42b1 2025-06-10 feat: divides microfrontends between two page, building an simples inactive courses application; f9593dc 2025-06-10 feat: updates README with project info.; 766b6a2 2025-06-10 feat: adds configuration to save and deploy the aplications on zephyr | esclarecido |

## Observações

**1. "Shared component library" sem biblioteca no snapshot.** Delimitado aos caminhos criados e
removidos: nenhum dos 13 commits cria um pacote ou diretório de componentes compartilhados. Em
`packages/` só houve, desde `5a52004`, o `.gitkeep` e o plugin Zephyr, e só `5a52004` e `766b6a2`
tocam a pasta; a árvore de `f9593dc` em `packages/` é a mesma. O único conjunto de código removido é
`apps/settings`, com o mesmo arranjo das outras aplicações (`rsbuild.config.ts`,
`module-federation.config.ts`, `src/index.tsx`, `src/bootstrap.tsx`), apagado em `78c42b1`, cuja
mensagem anuncia a divisão em duas páginas e a criação do courses. O README do snapshot é a versão
de `f9593dc`, o último commit que o altera, posterior a essa remoção; nessa versão do repositório
também não havia biblioteca. O histórico não mostra se a linha já estava no README de `5a52004`, nem
o que `apps/settings` expunha, porque esses objetos não estão disponíveis. Conclusão: nenhum estágio
observável do repositório teve uma biblioteca de componentes que a afirmação pudesse descrever; a
afirmação continua `contradita`.

## Comandos

```sh
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example rev-list --count 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example log --merges --format=%h 766b6a2c04c1ef39201ad05ed1b5970d4cb10436   # saída vazia: nenhum merge
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example log --format='%h %ad %s' --date=short 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example log --name-status --no-renames --format='@@ %h %ad %s' --date=short 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example log --name-status --no-renames --diff-filter=D --format='@@ %h' 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example log --format='%h %ad %s' --date=short 766b6a2c04c1ef39201ad05ed1b5970d4cb10436 -- README.md
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example ls-tree 5a52004 -- README.md packages/ apps/settings/module-federation.config.ts apps/settings/src/App.tsx
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example show 5a52004:README.md   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example show 5a52004:apps/settings/module-federation.config.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example show 5a52004:apps/settings/src/App.tsx   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example ls-tree -r --name-only f9593dc -- packages
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example ls-tree 766b6a2c04c1ef39201ad05ed1b5970d4cb10436 -- README.md
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example log --format='%h %ad %s' --date=short 766b6a2c04c1ef39201ad05ed1b5970d4cb10436 -- packages
```

## Resumo

Commits até o snapshot: 13 (2025-06-09 a 2025-06-10). Pontos: 1 (esclarecido: 1, inconclusivo: 0, resolvido pelo snapshot: 0).
