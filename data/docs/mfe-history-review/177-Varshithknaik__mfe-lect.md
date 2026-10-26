---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
inputs:
  clone: data/samples/mfe-sample-001/repos/Varshithknaik__mfe-lect
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 177 — Varshithknaik/mfe-lect

## Leitura do repositório

O histórico até o snapshot tem 40 commits, com um merge (`2710964`, 2025-11-03), de 2025-09-24 (`256e049`, "first commit", só o `README.md`) a 2026-07-26 (`deea335`, o commit do snapshot, que só altera `.gitignore` e `README.md`). O segundo commit, `9584f06` (2025-10-05, "feat(marketing): initialize marketing package with React and MUI components"), cria de uma vez a árvore `packages/` inteira (container, marketing, auth e dashboard, com configurações, `src` e `public`), o código e as configurações do `marketing/` da raiz e só o `package.json` e o `package-lock.json` de `auth/`, `container/` e `dashboard/` da raiz. Esses quatro `package.json` da raiz têm, em `9584f06`, os mesmos objetos que os de `packages/` (por exemplo `8e0ec21` em `dashboard/package.json` e em `packages/dashboard/package.json`), e continuam iguais no snapshot. Depois disso a árvore da raiz é construída aos poucos: o container em `fa98fd9` (2025-10-05), a federação com o marketing em `cf1d5ec` (2025-10-12), os workflows do container e do marketing em `2fb5c14` (2025-10-15) e `0d951f4` (2025-10-25), o código do auth em `dfd5a8c` (2025-11-03) e seu workflow em `6dfc014` (2025-11-03), as rotas com `lazy` em `2d3ac70` (2025-11-05) e o `onSignIn` em `b3e0b20` (2025-11-06). Nenhum commit depois de `9584f06` toca `packages/` ou `dashboard/`.

Para os dois pontos, `packages/` e o `dashboard/` da raiz têm primeira presença observável em `9584f06`; o histórico não mostra onde esse código foi escrito antes. O conteúdo das versões antigas quase não está disponível no clone parcial: das versões de `container/config/webpack.prod.js` e `container/src/App.js` consultadas, só a do `webpack.prod.js` em `522c5d7` (o mesmo objeto do snapshot) pôde ser lida; as demais falharam por objeto ausente. Os pontos se resolvem pelas mensagens e pelos identificadores de objeto (`ls-tree`).

Não viraram pontos: a revisão de dependências não tem linhas; as revisões estrutural, de composição e de build/deploy não deixaram nada `Undetermined` (o `dashboard/` da raiz é `No` na 3.4.3, e o deploy `não observado` de `packages/` na 3.4.6 não é `Undetermined`); e as 16 afirmações da 3.4.7 são `corroborada`. O `docs/README.md` a que o README remete (README.md:7), ausente do snapshot, é explicado pelo próprio snapshot: o `.gitignore` ignora `**/docs/**` (.gitignore:3), e os dois arquivos mudam juntos em `deea335`.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | No container da raiz, o remote `dashboard`, o `DashboardLazy` e a rota `/dashboard` estão comentados, e o `dashboard/` da raiz só tem `package.json`. | 3.4.4 (container/src/App.js:35); 3.4.5 (Leitura); 3.4.6 (Leitura); 3.4.7 #2 | ativo ou abandonado | 9584f06 2025-10-05 feat(marketing): initialize marketing package with React and MUI components; 0f9f1e8 2025-10-25 fix(workflows): adjust environment variable placement in container.yml and remove redundant env declaration in marketing.yml fix(webpack): comment out unused remote entries in webpack.prod.js; 522c5d7 2025-11-03 feat(auth): configure development server and update public paths in webpack configs; add Auth component for microfrontend integration; 2d3ac70 2025-11-05 feat(container): implement routing with lazy loading for Auth and Marketing components; add Progress component for loading indication | esclarecido |
| 2 | O snapshot tem duas árvores com os mesmos nomes de unidade, a da raiz (publicada por workflows) e a cópia completa de `packages/`, que a configuração sozinha não separa. | 3.4.4 (Notas); 3.4.5 #1, #3 | estágios em conflito | 9584f06 2025-10-05 feat(marketing): initialize marketing package with React and MUI components; fa98fd9 2025-10-05 feat(container): set up initial webpack configuration and application structure; dfd5a8c 2025-11-03 feat(MarketingApp): enhance navigation handling by adding initialPath support and defaultHistory option | esclarecido |

## Observações

**1. Dashboard comentado na raiz.** O `dashboard/` da raiz entra em `9584f06` só com `package.json` e `package-lock.json`, com os mesmos objetos dos de `packages/dashboard/`, e não muda até o snapshot (`log -- dashboard packages` só lista `9584f06`). Nenhum commit cria `container/src/components/DashboardApp.js` na raiz (`log` vazio para esse caminho), e o `ls-tree` de `container/src/components` em `7e61019`, `0d951f4`, `0ab8363`, `0f9f1e8`, `522c5d7`, `de2d707`, `2d3ac70` e no snapshot nunca o mostra. A mensagem de `0f9f1e8` (2025-10-25) anuncia "comment out unused remote entries in webpack.prod.js"; o objeto atual do `webpack.prod.js` (`2802909`) é o de `522c5d7` (2025-11-03), cuja versão, legível, já tem a linha do dashboard comentada. As versões anteriores não puderam ser lidas, então o histórico não mostra se a linha do remote chegou a estar descomentada. O `App.js` do snapshot tem o objeto de `2d3ac70` (2025-11-05), cuja mensagem anuncia as rotas com `lazy` para Auth e Marketing; as versões anteriores do `App.js` também não puderam ser lidas. Conclusão, delimitada a esses arquivos: na árvore da raiz, o dashboard nunca passou de manifesto e o container nunca teve o wrapper `DashboardApp`; as linhas comentadas são planejadas e nunca conectadas nesta árvore, e não resto de um dashboard que funcionou e foi abandonado.

**2. Duas árvores com os mesmos nomes.** A árvore `packages/` aparece inteira em `9584f06` (2025-10-05), o segundo commit, e não é alterada depois. A árvore da raiz começa no mesmo commit só com os manifestos, iguais aos de `packages/` (mesmos objetos nos quatro `package.json`), e o código é criado depois, aplicação por aplicação: marketing em `9584f06`, container em `fa98fd9`, auth em `dfd5a8c`. No snapshot, `auth/src/bootstrap.js` tem o mesmo objeto (`50c1d9e`) que `packages/auth/src/bootstrap.js`, criado em `dfd5a8c`, cuja mensagem só fala do MarketingApp. O histórico, portanto, não mostra `packages/` como uma extração da raiz nem como um estágio anterior dela que tenha sido substituído: as duas coexistem desde o início, `packages/` como versão completa e estática e a raiz como reconstrução incremental que reaproveita os manifestos e, ao menos no `bootstrap.js` do auth, o mesmo conteúdo. O histórico não mostra de onde veio o conteúdo de `packages/`. Conclusão: os artefatos conflitantes não pertencem a estágios sucessivos do repositório; são uma referência fixa e uma reconstrução paralela, e só a da raiz evoluiu e ganhou workflows.

## Comandos

```
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect rev-list --count deea3350c74ee5de8427c190378733b644ae4b53
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect rev-list --count --merges deea3350c74ee5de8427c190378733b644ae4b53
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect log --format='%h %ad %s' --date=short --reverse --name-status deea3350c74ee5de8427c190378733b644ae4b53
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect log --format='%h %ad %s' --date=short deea3350c74ee5de8427c190378733b644ae4b53 -- dashboard packages
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show -s --format='%h %ad%n%B' --date=short 0f9f1e8
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show 0d951f4:container/config/webpack.prod.js   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show 0ab8363:container/config/webpack.prod.js   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show 0f9f1e8:container/config/webpack.prod.js   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show 522c5d7:container/config/webpack.prod.js
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r 7e61019 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r 0d951f4 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r 0ab8363 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r 0f9f1e8 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r 522c5d7 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r de2d707 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r 2d3ac70 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r deea3350c74ee5de8427c190378733b644ae4b53 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect log --format='%h %ad %s' --date=short deea3350c74ee5de8427c190378733b644ae4b53 -- container/src/App.js container/config/webpack.prod.js
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect log --format='%h %ad %s' --date=short deea3350c74ee5de8427c190378733b644ae4b53 -- container/src/components/DashboardApp.js
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r 9584f06 -- dashboard packages/dashboard/package.json packages/dashboard/package-lock.json auth/package.json container/package.json marketing/package.json packages/auth/package.json packages/container/package.json packages/marketing/package.json
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show 2673630:container/src/App.js   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show 522c5d7:container/src/App.js   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show de2d707:container/src/App.js   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r deea3350c74ee5de8427c190378733b644ae4b53 -- auth/package.json container/package.json marketing/package.json dashboard/package.json auth/src/bootstrap.js packages/auth/package.json packages/container/package.json packages/marketing/package.json packages/dashboard/package.json packages/auth/src/bootstrap.js
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect log --format='%h %ad %s' --date=short deea3350c74ee5de8427c190378733b644ae4b53 -- auth/package.json container/package.json marketing/package.json auth/src/bootstrap.js
```

## Resumo

Commits até o snapshot: 40 (2025-09-24 a 2026-07-26). Pontos: 2 (esclarecido: 2, inconclusivo: 0, resolvido pelo snapshot: 0).
