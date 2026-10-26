---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
inputs:
  clone: data/samples/mfe-sample-001/repos/varshinir07__mfe-onehub-shell-app
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 211 — varshinir07/mfe-onehub-shell-app

## Leitura do repositório

O histórico até o snapshot tem 2 commits, ambos de 2025-06-05, sem merges. O primeiro, `74cbf87` ("Initial commit"), cria só o `README.md`. O segundo é o próprio snapshot, `1ddddc4` ("Created OneHub Shell App"): altera o `README.md` e cria todos os outros 18 arquivos, entre eles `package.json`, `src/webpack.config.js`, com o `ModuleFederationPlugin` do host `onehub`, e `src/pages/Dashboard.jsx`, que consome os remotes. A configuração e o código da composição não têm, portanto, primeira presença anterior ao snapshot: são introduzidos nele. Nenhum commit remove arquivo.

O clone não tem o conteúdo da versão do `README.md` de `74cbf87` (objeto `3c7947b` ausente); a do snapshot é outro objeto (`0c364be`). O que se sabe do primeiro commit é a lista de arquivos e a mensagem.

Das revisões anteriores, a 3.4.2 não tem dependência (o plugin vem do próprio `webpack`), a 3.4.3 não tem unidade `Undetermined`, a 3.4.4 não tem construção inativa, comentada ou `Undetermined`, a 3.4.5 não tem relação `Undetermined` e a 3.4.6 não tem deploy `Undetermined` (é `não observado`). Da 3.4.7 vêm a afirmação `contradita` (#1) e a `parcial` (#5), uma por ponto.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O README chama o projeto de "MFE Remote App for OnehubShell", e o snapshot só tem o host `onehub` | 3.4.7 #1 | estágios em conflito | 74cbf87 2025-06-05 Initial commit; 1ddddc4 2025-06-05 Created OneHub Shell App | esclarecido |
| 2 | O host compartilha `react` e `react-dom` como singleton com remotes que não estão no snapshot | 3.4.7 #5 | extração | 74cbf87 2025-06-05 Initial commit; 1ddddc4 2025-06-05 Created OneHub Shell App | esclarecido |

## Observações

**1. O README chama o projeto de "MFE Remote App for OnehubShell", e o snapshot só tem o host `onehub`.** O repositório só teve duas versões. A primeira, `74cbf87`, tem apenas o `README.md`, sem código. A segunda, `1ddddc4`, cria todo o código, já como host (`src/webpack.config.js` e `src/pages/Dashboard.jsx`), e altera o README no mesmo commit. Nunca houve, no repositório, uma versão em que o projeto fosse um remote, e o rótulo não é resto de um estágio anterior dele. O histórico não mostra se a linha README.md:2 já estava no README de `74cbf87` ou foi escrita em `1ddddc4`, porque o conteúdo da primeira versão não está no clone. Também não mostra se o rótulo foi copiado de outro repositório. A conclusão é que o rótulo e o código de host estão juntos desde a única versão com código.

**2. O host compartilha `react` e `react-dom` como singleton com remotes que não estão no snapshot.** As listas de arquivos dos dois commits mostram tudo o que o repositório já teve: o `README.md` e os 18 arquivos do host criados em `1ddddc4`. Nenhum commit cria ou remove código, configuração ou pasta dos remotes `subscription` e `ownership`. Eles não foram extraídos deste repositório nem removidos dele: nunca estiveram aqui. O histórico não mostra onde ficam os remotes nem se eles declaram o mesmo `shared`, e a afirmação continua `parcial`.

## Comandos

```
docs/mfe-history-review/tools/hist.sh varshinir07__mfe-onehub-shell-app rev-list --count 1ddddc4241157e335c1b6e39372f050aa1705c1d
docs/mfe-history-review/tools/hist.sh varshinir07__mfe-onehub-shell-app rev-list --count --merges 1ddddc4241157e335c1b6e39372f050aa1705c1d
docs/mfe-history-review/tools/hist.sh varshinir07__mfe-onehub-shell-app log --reverse --format='%h %ad %s' --date=short --name-status --no-renames 1ddddc4241157e335c1b6e39372f050aa1705c1d
docs/mfe-history-review/tools/hist.sh varshinir07__mfe-onehub-shell-app ls-tree 74cbf87 -- README.md
docs/mfe-history-review/tools/hist.sh varshinir07__mfe-onehub-shell-app ls-tree 1ddddc4241157e335c1b6e39372f050aa1705c1d -- README.md
docs/mfe-history-review/tools/hist.sh varshinir07__mfe-onehub-shell-app show 74cbf87:README.md   # falhou: objeto ausente (bad object)
```

## Resumo

Commits até o snapshot: 2 (2025-06-05 a 2025-06-05). Pontos: 2 (esclarecido: 2, inconclusivo: 0, resolvido pelo snapshot: 0).
