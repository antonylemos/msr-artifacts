---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
inputs:
  clone: data/samples/mfe-sample-001/repos/coolsamson7__novx
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 039 — coolsamson7/novx

## Leitura do repositório

O histórico até o snapshot tem 251 commits, de 2026-02-19 a 2026-03-16. O primeiro é `b606d83`
(2026-02-19, "Initial commit"); o código das libs entra em `d1267d3` (2026-02-24, "initial code"),
que cria `package.json`, `nx.json`, `eslint.config.mjs`, o CI e `libs/core`. Os marcos que importam
aos pontos são de 2026-02-26 e 2026-02-27: `d668c15` ("added new libs") traz o lado cliente do
modo `service` do portal; `073c63f` ("added new libs") cria `apps/app` e a ferramenta de scan
`tools/metadata`; a série "added sample app" cria `apps/microfrontend` (`45b448f`, `ed4e20e`,
`3086f67`); no dia seguinte, dois commits "fix" mexem no webpack do remote (`c46ce96`) e criam
`bootstrap.ts` (`dd4543f`). O snapshot é `128ba9a` (2026-03-16, "fixed test").

O clone não guarda o conteúdo antigo dos arquivos que mudaram depois: `show <commit>:<caminho>`
falhou por objeto ausente para todas as versões antigas de `package.json`, `nx.json`,
`eslint.config.mjs`, dos `project.json` dos apps e do `webpack.config.js` do remote. Só se leem as
versões que são iguais às do snapshot (ex.: `bootstrap.ts` em `dd4543f`, `main.tsx` em `45b448f`).
As árvores estão disponíveis em geral, o que permite ver quais arquivos cada commit criou, mudou,
moveu ou removeu; o `log --name-status` do repositório inteiro e o `log` restrito a `libs`
falharam por uma árvore ausente (`da9b173`), mas os restritos a `apps`, `tools`, `ui` e a caminhos
específicos foram até o primeiro commit.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@nrwl/eslint-plugin-nx` declarado em devDependencies sem import, plugin ou invocação no snapshot | 3.4.2 (package.json:14) | uso de dependência | d1267d3 2026-02-24 initial code; 8e0388e 2026-03-16 added scss loader | inconclusivo |
| 2 | `apps/microfrontend`: o `main`/`index` do `project.json` (`src/main.tsx`, `src/index.html`) e o `entry` do webpack (`src/bootstrap.ts`) divergem, e o `HtmlWebpackPlugin` está comentado | 3.4.3 (apps/microfrontend) | estágios em conflito | 45b448f 2026-02-26 added sample app; ed4e20e 2026-02-26 added sample app; 3086f67 2026-02-26 added sample app; c46ce96 2026-02-27 fix; dd4543f 2026-02-27 fix; 5d8c3af 2026-03-06 run extractor | esclarecido |
| 3 | Configuração "client and server side": o lado cliente (modo `service`) existe, o servidor que responde a `/portal/deployment` não | 3.4.7 #4 | ativo ou abandonado | d668c15 2026-02-26 added new libs | esclarecido |
| 4 | O parser que gera o `manifest.json` "as part of the build": o target `scan-metadata` existe, mas nenhum `build` depende dele | 3.4.7 #5 | ativo ou abandonado | 073c63f 2026-02-26 added new libs; 3086f67 2026-02-26 added sample app; 144cc29 2026-02-27 started login / logout; 9c90397 2026-03-06 fix(tools): expose./Module; 5d8c3af 2026-03-06 run extractor | inconclusivo |

## Observações

**1. `@nrwl/eslint-plugin-nx` sem uso.** `package.json` aparece em `d1267d3` (2026-02-24, "initial
code") e muda em 32 commits até o snapshot, o último `8e0388e` (2026-03-16, "added scss loader"),
cuja versão é a do snapshot e já traz a dependência na linha 14. Todas as versões anteriores
consultadas (`d1267d3`, `62bc297`, `797a21a`, `ba724bb`, `d668c15`, `710012d`, `181e3d1`,
`a7e7050`, `844828f`, `757085b`) falharam por objeto ausente, e o mesmo aconteceu com a primeira
versão de `eslint.config.mjs` (`d1267d3`; o arquivo muda ainda em `d87e969`, "lint", e `41f6541`,
"fixed tests"). O histórico não mostra quando o pacote entrou nem se algum dia foi usado pela
configuração do ESLint. Inconclusivo; a dependência continua `No` no snapshot.

**2. Entrada de `apps/microfrontend`.** O histórico separa os artefatos em dois momentos. Em
2026-02-26, `45b448f` ("added sample app") cria `src/main.tsx` (sem mudança até o snapshot),
`src/Module.ts`, `src/feature.tsx`, `src/index.html` e `src/manifest.json`, e `ed4e20e` cria
`project.json` e `webpack.config.js`; pouco depois, `3086f67` move `src/index.html` para
`apps/microfrontend/index.html` (renomeação sem mudança de conteúdo) e muda `project.json`. Nenhum
commit posterior recria `src/index.html`, então o `index` que o `project.json` do snapshot declara
(`apps/microfrontend/src/index.html`) aponta para um caminho que só existiu entre `45b448f` e
`3086f67`. Em 2026-02-27, `c46ce96` ("fix") muda o `webpack.config.js` e, 23 segundos depois,
`dd4543f` ("fix") cria `src/bootstrap.ts` com `export {};`, o mesmo conteúdo do snapshot; o webpack
muda depois só em `5d8c3af` (2026-03-06, "run extractor"). Assim, o `main` e o `index` do
`project.json` remetem ao primeiro estágio do app, e o `entry` do webpack aponta para um arquivo do
estágio seguinte. O histórico não mostra o conteúdo das versões antigas do webpack (`ed4e20e` e
`c46ce96` falharam por objeto ausente) nem do `project.json` (`3086f67` e `8b15f6f` falharam), então
não diz se o `entry` já foi `main.tsx`, nem quando o `HtmlWebpackPlugin` foi comentado, nem se o
remote chegou a rodar sozinho. Esclarecido quanto aos estágios dos arquivos; a unidade continua
`Undetermined`.

**3. Lado servidor da configuração.** `libs/portal/src/lib/loader/service-loader.ts` e
`libs/portal/src/lib/service/` entram em `d668c15` (2026-02-26, "added new libs") e não mudam até o
snapshot. O `log` dos arquivos criados em `apps/` e `tools/`, que cobre todo o histórico até o
snapshot, só mostra `apps/app`, `apps/microfrontend` e `tools/metadata`; as raízes de `d1267d3`,
`d668c15`, `710012d`, `1e68673`, `4c70ac5`, `b9a6463` e do snapshot não têm diretório de servidor, e
`apps/`, `tools/` e `libs/` nas versões consultadas (`710012d`, `1e68673`, `4c70ac5`, `b9a6463`,
`5d8c3af`, snapshot) só têm os projetos já conhecidos. Delimitado a esses artefatos, o servidor não
foi criado e removido: o repositório teve só o cliente desde que o modo `service` entrou. O
histórico não mostra se o servidor existe em outro repositório. O `log` de `libs` falhou por árvore
ausente, então a parte de `libs/` só foi vista nas versões listadas. Esclarecido; a afirmação
continua `parcial`.

**4. Scan de metadata no build.** `tools/metadata` entra em `073c63f` (2026-02-26, "added new
libs"), junto com `apps/app/project.json`, e muda só em `9c90397` (2026-03-06, "fix(tools):
expose./Module", em `feature-parser.ts`). O manifesto do remote foi criado em
`apps/microfrontend/src/manifest.json` (`45b448f`) e movido para `public/manifest.json` em
`3086f67`, sem mudança de conteúdo; depois só `144cc29` (2026-02-27, "started login / logout") o
altera. O `outFile` do `scan-metadata` do remote no snapshot ainda é `src/manifest.json`, caminho que
não existe desde `3086f67`. `apps/app/src/manifest.json` muda em 16 commits, de `f59d5b1`
(2026-02-26, "added sample app") a `ed15c1d` (2026-03-16, "i18n showcase"); as mensagens não dizem
se cada mudança veio do scan. A mensagem de `5d8c3af` ("run extractor") anuncia rodar o extrator, mas
o commit só muda o `webpack.config.js` do remote, cujo conteúdo antigo não está disponível. As
versões antigas dos `project.json` e do `nx.json` falharam por objeto ausente (`073c63f`, `3086f67`,
`8b15f6f`, `a580eb6`), então o histórico não mostra se o `build` já dependeu do `scan-metadata`.
Inconclusivo; a afirmação continua `parcial`.

## Comandos

```
docs/mfe-history-review/tools/hist.sh coolsamson7__novx rev-list --count 128ba9a0f9f373210c09948a19bd1b59d9c7673f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --reverse --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- package.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%h %ad %s' --date=short d1267d3
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show d1267d3:package.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 62bc297:package.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 797a21a:package.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show ba724bb:package.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show d668c15:package.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 710012d:package.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 181e3d1:package.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show a7e7050:package.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 844828f:package.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 757085b:package.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 8e0388e:package.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --diff-filter=D --name-status --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f      # falhou depois de 948f1ea: objeto ausente da9b173
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps/microfrontend/webpack.config.js
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps/microfrontend/src/bootstrap.ts
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps/microfrontend/src/main.tsx
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps/microfrontend/project.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps/app/project.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- nx.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- tools/metadata
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- libs/portal/src/lib/loader/service-loader.ts
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- libs/portal/src/lib/service
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- ui
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short ed4e20e
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short 45b448f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short 3086f67
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short c46ce96
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short dd4543f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short 5d8c3af
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short 9c90397
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short b0bc255
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short 8b15f6f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show ed4e20e:apps/microfrontend/webpack.config.js      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show c46ce96:apps/microfrontend/webpack.config.js      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show dd4543f:apps/microfrontend/src/bootstrap.ts
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 45b448f:apps/microfrontend/src/main.tsx
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 3086f67:apps/microfrontend/project.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 8b15f6f:apps/microfrontend/project.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 073c63f:apps/app/project.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 3086f67:apps/app/project.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show b2269d5:apps/app/project.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 5a51d51:nx.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show a580eb6:nx.json      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --name-status --format='@@ %h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f      # falhou em b9a6463: objeto ausente da9b173
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only d1267d3
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only d668c15
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only 710012d
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only 1e68673
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only 4c70ac5
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only b9a6463
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only 128ba9a0f9f373210c09948a19bd1b59d9c7673f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only <c>:apps      # <c> = 710012d, 1e68673, 4c70ac5, b9a6463, 5d8c3af, 128ba9a0f9f373210c09948a19bd1b59d9c7673f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only <c>:tools     # idem
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only <c>:libs      # idem
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=iso 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps/microfrontend/src/index.html apps/microfrontend/index.html apps/microfrontend/src/bootstrap.ts apps/microfrontend/src/main.tsx apps/microfrontend/webpack.config.js apps/microfrontend/project.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%h %ad %s' --date=short 8b90051
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- tools/metadata apps/microfrontend/src/manifest.json apps/microfrontend/public/manifest.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%h %ad %s' --date=short 073c63f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%h %ad %s' --date=short 144cc29
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps/app/src/manifest.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- eslint.config.mjs
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show d1267d3:eslint.config.mjs      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --diff-filter=A --name-only --format='@@ %h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --diff-filter=A --name-only --format='@@ %h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- tools
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --diff-filter=A --name-only --format='@@ %h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- libs      # falhou depois de b0bc255: objeto ausente da9b173
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --diff-filter=A --name-only --format='@@ %h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- ui
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --diff-filter=A --name-only --format= 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps tools
```

## Resumo

Commits até o snapshot: 251 (2026-02-19 a 2026-03-16). Pontos: 4 (esclarecido: 2, inconclusivo: 2, resolvido pelo snapshot: 0).
