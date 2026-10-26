---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
inputs:
  clone: data/samples/mfe-sample-001/repos/jonatasmirand__ReiBurguer-MicroFrontends
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Leitura do repositório

O histórico até o snapshot tem 5 commits, de 2025-12-14 a 2026-01-04. `8e7f1d9` (2025-12-14, "Subindo projeto") cria o README, `container`, `pedido` e o `package-lock.json` da raiz, e registra `cardapio` como gitlink (`160000`, apontando para `907edba`). `670f5e2` (2025-12-14, "Alteração do readme.md") muda o README. `682204a` (2025-12-16, "Adiciona micro frontend Cardapio") só move o gitlink para `54865bb`. `b7c02c3` (2025-12-16, "Converte cardapio de sub-repo para pasta normal") remove o gitlink e adiciona os arquivos regulares de `cardapio/`. O snapshot `268d79a` (2026-01-04, "Atualização do arquivo README com detalhes e avisos do projeto.") só muda o README.

Para `cardapio`, `b7c02c3` é a primeira presença observável dos arquivos, não a introdução deles: antes eles estavam num sub-repositório, e os commits para os quais o gitlink aponta (`907edba`, `54865bb`) não estão no clone. O histórico de `cardapio` anterior a `b7c02c3` não pode ser visto. O clone também não tem as versões antigas do README (`8e7f1d9` e `b7c02c3`). As listas de arquivos por commit e os identificadores dos objetos estão disponíveis e bastam para os pontos abaixo. O fato de `cardapio` ter sido um repositório à parte é compatível com o "Em cada repositório" do README (README.md:20, :24), que a revisão de documentação leu como uso solto da palavra.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `cardapio` tem `next.config.js` e `next.config.mjs`, e o `.mjs` expõe `./src/_components/Cardapio.jsx`, ausente do snapshot | 3.4.2 (Notas; cardapio/next.config.mjs:13); 3.4.3 (Notas); 3.4.5 (Leitura) | estágios em conflito | 8e7f1d9 2025-12-14 Subindo projeto; 682204a 2025-12-16 Adiciona micro frontend Cardapio; b7c02c3 2025-12-16 Converte cardapio de sub-repo para pasta normal | inconclusivo |
| 2 | A função `adicionarPedido` do cardápio dispara um evento, nunca é chamada e não tem ouvinte | 3.4.4 (cardapio/src/components/Cardapio.jsx:6, :7) | ativo ou abandonado | b7c02c3 2025-12-16 Converte cardapio de sub-repo para pasta normal | inconclusivo |
| 3 | O README diz que cada microfrontend pode ser "deployado separadamente", e o snapshot não tem artefato de deploy | 3.4.7 #10 | ativo ou abandonado | 8e7f1d9 2025-12-14 Subindo projeto; 670f5e2 2025-12-14 Alteração do readme.md; 682204a 2025-12-16 Adiciona micro frontend Cardapio; b7c02c3 2025-12-16 Converte cardapio de sub-repo para pasta normal; 268d79a 2026-01-04 Atualização do arquivo README com detalhes e avisos do projeto. | esclarecido |

## Observações

**1. `cardapio` tem `next.config.js` e `next.config.mjs`, e o `.mjs` expõe `./src/_components/Cardapio.jsx`, ausente do snapshot.** Os dois arquivos entram juntos em `b7c02c3`, com os mesmos objetos do snapshot (`d43c89b` e `5b96066`), e nenhum commit posterior os toca. Nenhum commit até o snapshot cria `cardapio/src/_components`, e o `Cardapio.jsx` só existe em `src/components`. No repositório, portanto, não há um estágio em que o `.mjs` fosse o arquivo válido e outro em que o `.js` o substituísse: os dois chegam juntos, já em conflito. A ordem em que foram criados ficaria no histórico do sub-repositório (`907edba`, `54865bb`), que não está no clone. No snapshot, o `.mjs` do cardápio é igual ao `pedido/next.config.mjs` a menos do `name` e da chave exposta, e ambos usam `src/_components`. Isso é compatível com uma cópia, mas o histórico não mostra de onde o arquivo veio nem se ele é anterior ao `.js`. O histórico não responde se os dois arquivos pertencem a estágios diferentes.

**2. A função `adicionarPedido` do cardápio dispara um evento, nunca é chamada e não tem ouvinte.** `cardapio/src/components/Cardapio.jsx` entra em `b7c02c3` com o mesmo objeto do snapshot (`bb70618`) e não muda depois. Em nenhuma versão vista no repositório a função foi chamada, e nenhuma chamada foi removida. Se ela foi usada antes, isso aconteceu no sub-repositório, cujo histórico não está no clone. O histórico não responde se a função foi abandonada ou nunca foi conectada.

**3. O README diz que cada microfrontend pode ser "deployado separadamente", e o snapshot não tem artefato de deploy.** A lista de arquivos dos cinco commits mostra tudo o que o repositório já teve até o snapshot. Nenhum commit cria ou remove Dockerfile, compose, `vercel.json`, `netlify.toml`, workflow de CI ou outra configuração de hospedagem, nem na raiz nem nas três aplicações. Os arquivos que `b7c02c3` traz do sub-repositório do cardápio também não incluem nenhum desses artefatos. A falta de artefato de deploy, portanto, não é resto de um estágio abandonado: o repositório nunca teve um. O histórico não mostra quando a frase de README.md:89 foi escrita, porque as versões antigas do README não estão no clone. Ele também não mostra se houve um deploy feito fora do repositório, como sugere a homepage na Vercel dos metadados.

## Comandos

```
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends rev-list --count 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends log --format='%h %ad %s' --date=short --name-status 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends ls-tree 8e7f1d9 -- cardapio
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends ls-tree 682204a -- cardapio
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends ls-tree -r b7c02c3 -- cardapio/next.config.js cardapio/next.config.mjs cardapio/src/components/Cardapio.jsx
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends ls-tree -r 268d79ae1ff2579a9c9877adba0e1b87cfac1dff -- cardapio/next.config.js cardapio/next.config.mjs cardapio/src/components/Cardapio.jsx pedido/next.config.mjs
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends log --format='%h %ad %s' --date=short 268d79ae1ff2579a9c9877adba0e1b87cfac1dff -- cardapio/next.config.js cardapio/next.config.mjs cardapio/src/components/Cardapio.jsx
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends log --format='%h %ad %s' --date=short 268d79ae1ff2579a9c9877adba0e1b87cfac1dff -- cardapio/src/_components   # sem saída: nenhum commit
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends cat-file -t 907edba27958d34caf13b1aeb3735cc2cfac8823   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends cat-file -t 54865bba56d30542be618bc371c7ba3527d3d50a   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends show 8e7f1d9:README.md   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends show b7c02c3:README.md   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends log --format='%h %ad %s' --date=short 268d79ae1ff2579a9c9877adba0e1b87cfac1dff -- README.md
```

## Resumo

Commits até o snapshot: 5 (2025-12-14 a 2026-01-04). Pontos: 3 (esclarecido: 1, inconclusivo: 2, resolvido pelo snapshot: 0).
