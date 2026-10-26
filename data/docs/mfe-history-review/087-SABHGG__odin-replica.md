---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
inputs:
  clone: data/samples/mfe-sample-001/repos/SABHGG__odin-replica
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 087 — SABHGG/odin-replica

## Leitura do repositório

O histórico até o snapshot tem 2 commits, sem merges, de 2026-03-11 a 2026-03-16. O primeiro,
`80616f7` (2026-03-11, "Initialize project using Create React App"), cria os 18 arquivos do
scaffold do CRA: `.gitignore`, `README.md`, `package.json`, `package-lock.json`, `public/` e os
arquivos de `src/` (`App.js`, `App.css`, `App.test.js`, `index.js`, `index.css`, `logo.svg`,
`reportWebVitals.js`, `setupTests.js`). O segundo é o próprio snapshot, `06ce2bd` (2026-03-16,
"feat: update dependencies and implement single-spa for microfrontend architecture"): altera
`package.json`, `package-lock.json`, `src/App.js`, `src/App.css` e `src/index.js` e cria
`src/root.app.js`. Nenhum commit remove arquivo. A introdução observável do root single-spa é,
portanto, `06ce2bd`; a mensagem anuncia a implementação do single-spa nesse commit.

O clone tem as árvores dos dois commits (`ls-tree -r` funcionou para ambos), mas não o conteúdo
antigo dos arquivos que `06ce2bd` alterou: `show` de `80616f7` falhou por objeto ausente para
`src/index.js`, `package.json` e `src/App.js`. O que se sabe de `80616f7` é a lista de arquivos e a
mensagem. Os arquivos que não mudaram (`README.md`, `.gitignore`, `public/*`, `src/App.test.js`,
`src/index.css`, `src/logo.svg`, `src/reportWebVitals.js`, `src/setupTests.js`) têm nos dois
commits o mesmo identificador de objeto.

Das revisões anteriores, a 3.4.2 não tem dependência sem uso (as duas linhas são `Yes`), a 3.4.3
não tem unidade `Undetermined`, a 3.4.4 não tem construção inativa, comentada ou `Undetermined`, a
3.4.5 não tem relação `Undetermined` e a 3.4.6 não tem deploy `Undetermined` (é `não observado`).
Das quatro afirmações `parcial` ou `contradita` da 3.4.7, as duas que ficam parciais porque o
remoto não está no snapshot (#5, #7) viraram um ponto; #8 e #9 são pontos próprios. A afirmação
`sem corroboração` (#1) não está entre as que o passo 2 levanta e não virou ponto.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O remoto "Angular" `leadocs-angular`, que deve publicar o global `leapdocs`, não tem código, `angular.json` nem dependência no snapshot | 3.4.7 #5, #7 | extração | 80616f7 2026-03-11 Initialize project using Create React App; 06ce2bd 2026-03-16 feat: update dependencies and implement single-spa for microfrontend architecture | esclarecido |
| 2 | A mensagem de console pede `libraryName` `leadocs` no `angular.json`, e o código lê o global `leapdocs` | 3.4.7 #8 | estágios em conflito | 80616f7 2026-03-11 Initialize project using Create React App; 06ce2bd 2026-03-16 feat: update dependencies and implement single-spa for microfrontend architecture | esclarecido |
| 3 | O comentário de `src/root.app.js` fala de import dinâmico, e o único consumidor importa o arquivo estaticamente | 3.4.7 #9 | estágios em conflito | 06ce2bd 2026-03-16 feat: update dependencies and implement single-spa for microfrontend architecture | esclarecido |

## Observações

**1. O remoto Angular fora do snapshot.** As árvores completas dos dois commits só têm os arquivos
do scaffold do CRA e, a partir de `06ce2bd`, `src/root.app.js`. Nenhum dos dois tem `angular.json`,
pasta de projeto Angular, `main.ts` ou outro arquivo do remoto, e nenhum commit remove arquivos.
Conclusão, delimitada a este repositório: o remoto nunca esteve aqui, então a sua ausência não é
efeito de uma extração nem de uma remoção versionada; o host foi escrito, desde `06ce2bd`, para
carregar um bundle de fora (src/index.js:7-9). O histórico não mostra onde o remoto existe, se ele é
Angular nem se publica `leapdocs`. As afirmações continuam `parcial`.

**2. `leadocs` na mensagem e `leapdocs` no código.** `src/index.js` tem só duas versões: a de
`80616f7`, cuja mensagem anuncia a inicialização do CRA, e a do snapshot, `06ce2bd`, que tem ao
mesmo tempo a mensagem com `leadocs` (src/index.js:83) e a leitura de `globalThis.leapdocs`
(src/index.js:69, 78). A versão de `80616f7` não está disponível, então a ausência de código
single-spa nela vem das mensagens dos dois commits e de `src/root.app.js`, que o snapshot importa
(src/index.js:4), só aparecer em `06ce2bd`. Não há commit posterior. Conclusão, delimitada a esse
arquivo: a mensagem e o global lido entram juntos no commit que introduz o root single-spa, e a
divergência não é de uma mensagem que ficou para trás de uma mudança versionada depois. O histórico
não mostra se algum bundle do remoto foi construído com `leadocs`. A afirmação continua `contradita`.

**3. O "import dinâmico" de `src/root.app.js`.** `src/root.app.js` não existe em `80616f7` e é
criado em `06ce2bd`, que também é a única versão de `src/index.js` com o `import RootApp from
'./root.app'` estático (src/index.js:4) e a função de carga que devolve esse objeto (src/index.js:58):
antes de `06ce2bd` não havia o arquivo para importar, e depois não há outro commit. Conclusão: o
comentário e o import estático nasceram no mesmo commit; o comentário não é resto de um estágio
versionado em que o arquivo fosse importado dinamicamente. A afirmação continua `contradita`.

## Comandos

```sh
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica rev-list --count 06ce2bd578663f88243854f6eef292686660dfce
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica log --merges --format='%h' 06ce2bd578663f88243854f6eef292686660dfce
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica log --name-status --format='@@ %h %ad %s' --date=short 06ce2bd578663f88243854f6eef292686660dfce
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica show 80616f7:src/index.js      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica show 80616f7:package.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica show 80616f7:src/App.js      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica ls-tree -r 80616f7
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica ls-tree -r 06ce2bd578663f88243854f6eef292686660dfce
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica log --format='%h %ad %s' --date=short 06ce2bd578663f88243854f6eef292686660dfce -- src/index.js src/root.app.js package.json
```

## Resumo

Commits até o snapshot: 2 (2026-03-11 a 2026-03-16). Pontos: 3 (esclarecido: 3, inconclusivo: 0, resolvido pelo snapshot: 0).
