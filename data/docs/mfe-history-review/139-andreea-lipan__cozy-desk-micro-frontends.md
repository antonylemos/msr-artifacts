---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
inputs:
  clone: data/samples/mfe-sample-001/repos/andreea-lipan__cozy-desk-micro-frontends
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Leitura do repositório

O histórico até o snapshot tem 3 commits, todos em 2026-01-14, sem merges. O primeiro, `6e2d0ab` (2026-01-14, "first commit"), cria de uma vez os 96 arquivos do repositório: o `README.md`, as imagens de `readme-images/` e os três projetos Angular (`test-base`, `tea-tracker`, `sticky-notes`), cada um com `package.json`, lockfile, `angular.json`, `federation.config.js` e os fontes de `src/`, além do manifesto de federação do host (`test-base/public/federation.manifest.json`). Host, remotes e configuração de Native Federation têm, portanto, primeira presença observável nesse commit; o histórico não mostra uma introdução nem onde o código foi feito antes. Os dois commits seguintes, `0a2cc14` e `7050669` (2026-01-14, ambos "update readme"), só alteram `README.md`. Pelos identificadores de objeto, os outros 95 arquivos do snapshot são os mesmos do primeiro commit.

O clone permite ver mensagens, datas, arquivos tocados por commit e os identificadores dos objetos de cada versão. Não foi preciso ler conteúdo de versões antigas.

Das revisões anteriores, só a de dependências deixou ponto ambíguo: `@softarc/native-federation-node` declarada sem uso nos três pacotes. Não há unidade, relação ou deploy `Undetermined` (o deploy das três aplicações é `não observado`), nem construção inativa ou comentada. Na revisão de documentação não há afirmação `contradita` nem `parcial`; as diferenças entre o passo a passo do README e o código (nome `digital-desktop`, `app.component.ts`, manifesto em `src/assets/`) ficaram fora da tabela de afirmações e não viraram ponto.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@softarc/native-federation-node` declarada e sem uso nos três pacotes | 3.4.2 (sticky-notes/package.json:34); 3.4.2 (tea-tracker/package.json:34); 3.4.2 (test-base/package.json:34) | uso de dependência | 6e2d0ab 2026-01-14 first commit; 0a2cc14 2026-01-14 update readme; 7050669 2026-01-14 update readme | esclarecido |

## Observações

**1. `@softarc/native-federation-node` declarada e sem uso nos três pacotes.** Os três `package.json` só aparecem no primeiro commit, `6e2d0ab`, e têm no snapshot os mesmos identificadores de objeto que nesse commit. O mesmo vale para todos os outros arquivos de código e de build: os dois commits seguintes só mudam o `README.md`. Não existe, no histórico observável, uma versão do código diferente da do snapshot, e nessa versão a dependência está só declarada (3.4.2). Portanto, desde a primeira presença observável, nenhum arquivo do repositório a usou. O histórico não diz por que ela está declarada, nem se foi usada antes do primeiro commit, fora deste repositório. A dependência continua `No` no snapshot.

## Comandos

```
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends rev-list --count 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends rev-list --count --merges 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends log --format='%h %ad %s' --date=short 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends log --format='%h %ad %s' --date=short --name-status --no-renames 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends log --format='%h %ad %s' --date=short 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc -- test-base/package.json tea-tracker/package.json sticky-notes/package.json
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends ls-tree -r 6e2d0ab
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends ls-tree -r 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends ls-tree 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc -- test-base/package.json tea-tracker/package.json sticky-notes/package.json
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends ls-tree 6e2d0ab -- test-base/package.json tea-tracker/package.json sticky-notes/package.json
```

## Resumo

Commits até o snapshot: 3 (2026-01-14 a 2026-01-14). Pontos: 1 (esclarecido: 1, inconclusivo: 0, resolvido pelo snapshot: 0).
