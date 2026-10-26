---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
inputs:
  clone: data/samples/mfe-sample-001/repos/RafaM-dev__hostRepo
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 284 — RafaM-dev/hostRepo

## Leitura do repositório

7 commits até o snapshot, todos em 2025-11-19. `8a62219` (2025-11-19, "first commit") já traz a
aplicação Vite com o Module Federation: `vite.config.ts`, `src/declare.d.ts`, `package.json`,
`index.html`, `src/App.tsx`, `src/main.tsx` e o `README.md`, entre outros. É a primeira presença
observável da configuração do host, não a sua introdução: o primeiro commit não diz onde o código
foi feito antes. `500d5dd` (2025-11-19, "feat: Implement character list and filtering
functionality") cria `src/features/episodes_list/ListEpisodes.tsx`, os componentes da lista, a
store, a home e o arquivo vazio `remote-root@0.0.0`, e altera `src/App.tsx`, `src/main.tsx` e o
`package.json`. Os quatro commits seguintes (`cf861ef`, `c775ef4`, `7a88edd`, `3f9d0c8`) tratam de
Tailwind, layout, contagem de personagens e CSS. O commit do snapshot, `e68ba94` (2025-11-19,
"docs: Update README.md to reflect project details, installation instructions, and architecture
overview"), só altera o `README.md`. Nenhum commit até o snapshot remove arquivo.

O `vite.config.ts` não muda depois de `8a62219`: o objeto é o mesmo nesse commit e no snapshot
(`06a796a`). O `README.md` muda uma única vez, no commit do snapshot: o objeto de `8a62219`
(`d2e7761`) difere do do snapshot (`82587b0`).

O clone permite ver mensagens, datas, os arquivos criados ou alterados por commit e os
identificadores dos objetos. O conteúdo das versões antigas dos arquivos alterados não está no
clone: `show 8a62219:README.md` falhou por objeto ausente, e `cat-file -e` confirma que o objeto
`d2e7761` não está disponível. Só se leem versões antigas cujo objeto é o mesmo do snapshot, como
o `vite.config.ts`.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | README diz que o host consome o remote `remote_root` na porta 5174, mas o `vite.config.ts` declara `mf-remoteDetails` na porta 5001 | 3.4.7 #7 (README.md:334-342, 346-347) | estágios em conflito | 8a62219 2025-11-19 first commit; e68ba94 2025-11-19 docs: Update README.md to reflect project details, installation instructions, and architecture overview | esclarecido |

## Observações

**1. `remote_root` na porta 5174 no README.** O `vite.config.ts` tem o mesmo objeto (`06a796a`)
desde `8a62219` até o snapshot, e só esse commit o toca. Em toda a história observável deste
repositório, portanto, a configuração do host é a do snapshot, com o remote `mf-remoteDetails` em
`http://localhost:5001/assets/remoteEntry.js`. Nenhuma versão do `vite.config.ts` aqui declarou
`remote_root` ou a porta 5174. O README é reescrito no commit do snapshot, `e68ba94`, cuja mensagem
anuncia a atualização de detalhes, instalação e arquitetura. Esse commit vem depois de toda a
configuração e do código de composição (`ListEpisodes.tsx`, de `500d5dd`). O histórico esclarece,
delimitado a estes artefatos, que o bloco e a prosa do README não são resto de um estágio anterior
da configuração deste repositório: a divergência foi gravada, ou mantida, na última versão do
README, quando o `vite.config.ts` já declarava `mf-remoteDetails`. O histórico não mostra se o
texto já estava no README do primeiro commit, porque o objeto `d2e7761` não está no clone. Também
não mostra de onde vem o nome `remote_root`, se de outro repositório ou de uma configuração feita
fora deste. O arquivo vazio `remote-root@0.0.0`, cujo nome a revisão de documentação comparou ao
`remote_root`, entra em `500d5dd` e não muda até o snapshot; o histórico não explica a origem dele.

## Comandos

```
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo rev-list --count e68ba940850001cc7231849cb8a44097f0e12853
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo log --format='%h %ad %s' --date=short --name-status e68ba940850001cc7231849cb8a44097f0e12853
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo log --format='%h %ad %s' --date=short e68ba940850001cc7231849cb8a44097f0e12853 -- vite.config.ts
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo log --format='%h %ad %s' --date=short e68ba940850001cc7231849cb8a44097f0e12853 -- README.md
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo ls-tree 8a62219 -- vite.config.ts README.md
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo ls-tree e68ba940850001cc7231849cb8a44097f0e12853 -- vite.config.ts README.md
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo show 8a62219:README.md
  # falhou: fatal: bad object 8a62219:README.md (objeto ausente no clone --filter=blob:none)
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo cat-file -e d2e77611fd3d959fee0487c41bd27b318be32b04
  # falhou: saída 1, objeto ausente no clone
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo cat-file -t 82587b074c29067df68bb686affb319cb07bac66
```

## Resumo

Commits até o snapshot: 7 (2025-11-19 a 2025-11-19). Pontos: 1 (esclarecido: 1, inconclusivo: 0, resolvido pelo snapshot: 0).
