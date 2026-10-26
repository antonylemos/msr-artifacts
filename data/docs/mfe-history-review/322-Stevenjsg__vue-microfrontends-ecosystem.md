---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
inputs:
  clone: data/samples/mfe-sample-001/repos/Stevenjsg__vue-microfrontends-ecosystem
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Leitura do repositório

São 11 commits até o snapshot, em dois dias (2025-11-28 a 2025-11-29). O primeiro, `e3cc334`
(2025-11-28, "first commit"), já traz as quatro aplicações em `apps/`, `packages/ui-kit` (só com
`package.json` e um `index.ts` na raiz do pacote), `turbo.json`, `pnpm-workspace.yaml` e um
diretório `.turbo/` (cookies e um log do daemon com data 2025-11-27). É a primeira presença
observável dessas peças: o commit não diz onde foram feitas antes. Nele, as quatro
`vite.config.ts` são o mesmo objeto (`bbcf80c`), assim como os `App.vue` de cms, dashboard e
kanban (`58b0f21`), os `main.ts` das quatro apps (`2425c0f`) e os `HelloWorld.vue` (`b58e52b`);
o `App.vue` do shell é um objeto à parte (`9ea8fb4`).

O README (`README.mkd`) entra logo depois, em `5244640` (2025-11-28, "Agregar README inicial para
el ecosistema de microfrontends en Vue 3"), e muda uma única vez, em `94399d2` (2025-11-28,
"corregir codigo mermaid"). Tudo o que o código tem de composição vem depois, em 2025-11-29:
`13859fe` ("fix: update pnpm workspace configuration…") altera as quatro `vite.config.ts` e cria
`apps/shell/src/vite-env.d.ts`; `280cc20` ("feat: agregar soporte para Tailwind CSS y mejorar
scripts en los paquetes") altera os manifestos; `ea611b1` ("feat: actualizar componentes de la
aplicación y agregar WidgetDinero") cria `WidgetDinero.vue` e `MyButton.vue` e altera os quatro
`App.vue`; `4e0237f` cria `packages/ui-kit/src/index.ts`. Ou seja, o README descreve o
ecossistema antes de o código existir e não foi revisto depois. O `.turbo/` sai em `816fe78`
(um cookie) e `80a16ce` ("Delete .turbo directory"); o `packages/ui-kit/index.ts` da raiz sai em
`816fe78`, o que explica o `"main": "index.ts"` sem arquivo da nota da 3.4.3 como resto do
primeiro arranjo do pacote.

O clone não tem o conteúdo de nenhuma versão antiga consultada: `show` e `cat-file` falharam por
objeto ausente para todos os objetos do primeiro commit tentados. O que se vê são mensagens,
datas, a lista de arquivos de cada commit e os identificadores dos objetos (`ls-tree`). Em nenhum
commit houve workflow de CI, Dockerfile, arquivo de store, de roteador ou de autenticação, nem
pacote em `packages/` além de `ui-kit`.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `turbo` declarado e configurado, sem uso fora dos scripts da raiz. | 3.4.2 (package.json:18) | uso de dependência | e3cc334 2025-11-28 first commit; 816fe78 2025-11-29 Eliminar componentes HelloWorld y archivo de configuración de cookies; 80a16ce 2025-11-29 Delete .turbo directory | esclarecido |
| 2 | Remotes `cms` e `kanban` declarados no shell, sem código que os carregue, e o README que anuncia carga remota dos três e integração completa. | 3.4.5 #2, #3; 3.4.7 #8, #9, #20 | ativo ou abandonado | e3cc334 2025-11-28 first commit; 5244640 2025-11-28 Agregar README inicial para el ecosistema de microfrontends en Vue 3; 13859fe 2025-11-29 fix: update pnpm workspace configuration to simplify package paths and ignore esbuild; ea611b1 2025-11-29 feat: actualizar componentes de la aplicación y agregar WidgetDinero | esclarecido |
| 3 | Estado e lógica compartilhados com Pinia, autenticação JWT e roteamento raiz descritos no README, sem código. | 3.4.7 #3, #18, #21, #22 | estágios em conflito | e3cc334 2025-11-28 first commit; 5244640 2025-11-28 Agregar README inicial para el ecosistema de microfrontends en Vue 3; 280cc20 2025-11-29 feat: agregar soporte para Tailwind CSS y mejorar scripts en los paquetes | esclarecido |
| 4 | Consumo do UI Kit pelos três remotos e HMR do kit nas quatro apps, anunciados no README; só o shell consome o kit. | 3.4.7 #11, #12, #13, #24 | estágios em conflito | e3cc334 2025-11-28 first commit; ea611b1 2025-11-29 feat: actualizar componentes de la aplicación y agregar WidgetDinero; 29967bf 2025-11-29 feat: simplificar estilos en aplicaciones y agregar archivo de estilos para ui-kit; 280cc20 2025-11-29 feat: agregar soporte para Tailwind CSS y mejorar scripts en los paquetes | esclarecido |
| 5 | Bibliotecas `@repo/utils` e de configuração TS listadas no README, ausentes do snapshot. | 3.4.7 #16 | ativo ou abandonado | 5244640 2025-11-28 Agregar README inicial para el ecosistema de microfrontends en Vue 3 | esclarecido |
| 6 | README diz Vite 6; os manifestos declaram `vite ^7.2.4`. | 3.4.7 #17 | estágios em conflito | e3cc334 2025-11-28 first commit; 5244640 2025-11-28 Agregar README inicial para el ecosistema de microfrontends en Vue 3; 280cc20 2025-11-29 feat: agregar soporte para Tailwind CSS y mejorar scripts en los paquetes | inconclusivo |

## Observações

**1. `turbo` sem uso fora dos scripts.** O `turbo.json` é o mesmo objeto (`d730b72`) do primeiro
commit ao snapshot. O primeiro commit, `e3cc334`, inclui `.turbo/cookies/1.cookie`,
`.turbo/cookies/2.cookie` e `.turbo/daemon/ed873b9e6803e60c-turbo.log.2025-11-27`, todos com o
identificador `e69de29`, o do conteúdo vazio no git. Esse diretório é gerado pelo próprio Turbo
quando roda; o nome do log indica execução do daemon em 2025-11-27, antes do primeiro commit. Ele
sai em `816fe78` (um cookie) e `80a16ce` ("Delete .turbo directory"). Nenhum commit criou
workflow de CI, Dockerfile ou outro arquivo de automação. Conclusão, delimitada a esses
artefatos: o Turbo foi executado no ambiente local do projeto, e nenhum estágio do histórico teve
automação que o chamasse além dos scripts. O histórico não mostra qual script foi rodado, e o
`Undetermined` da 3.4.2 fica como está.

**2. Remotes `cms` e `kanban` sem consumidor.** No primeiro commit as quatro `vite.config.ts` são o
mesmo objeto (`bbcf80c`), então a configuração diferenciada do snapshot (o shell com `remotes`, cada
remote com o seu `exposes`) ainda não existia. Ela aparece em `13859fe`, que altera as quatro
configurações e cria `apps/shell/src/vite-env.d.ts`; nenhuma delas muda depois, e o
`vite-env.d.ts` desse commit, igual ao do snapshot, declara só o módulo `dashboard/Widget`
(apps/shell/src/vite-env.d.ts:3-7). O `App.vue` do shell tem só duas versões: a do primeiro
commit (`9ea8fb4`, conteúdo ausente no clone, anterior à declaração dos remotes) e a de `ea611b1`,
que é a do snapshot e carrega só o widget do dashboard. O `main.ts` do shell não mudou desde o
primeiro commit (`2425c0f`), e o único arquivo removido do shell foi o `HelloWorld.vue`, o mesmo
objeto (`b58e52b`) nas quatro apps. As setas "Carga Remota" para CMS e Kanban e a "integração
completa" são do README de `5244640`/`94399d2`, escrito antes da configuração e do código.
Conclusão: depois que os remotes foram declarados, nenhum commit acrescentou nem removeu código de
carga de `cms` ou `kanban`; não há conexão abandonada no histórico observável. As relações 2 e 3
ficam declaradas e nunca conectadas até o snapshot.

**3. Estado compartilhado, Pinia, JWT e roteamento raiz.** Nenhum commit criou arquivo de store,
de roteador ou de autenticação: além das configurações, os únicos arquivos de código que
existiram em `apps/*/src` foram `App.vue`, `main.ts`, `HelloWorld.vue`, `WidgetDinero.vue` e o
`vite-env.d.ts` do shell. Os quatro `main.ts`, onde as apps
são criadas, são o mesmo objeto (`2425c0f`) do primeiro commit ao snapshot, que só faz
`createApp(App).mount('#app')` (apps/shell/src/main.ts:1-5). O README que descreve essas
funções é de `5244640`, antes de qualquer componente além do template. O histórico não mostra o
conteúdo dos manifestos antes de `280cc20`, então não diz se Pinia ou um roteador chegaram a ser
declarados como dependência. Conclusão, delimitada a esses arquivos: nenhum estágio observável teve
implementação de estado compartilhado, autenticação ou roteamento; as afirmações descrevem um
plano anterior ao código, não um resto de estágio removido.

**4. UI Kit nos remotos.** Os componentes do kit só passam a existir em `ea611b1` (`MyButton.vue`)
e `4e0237f` (`src/index.ts`); antes, o pacote tinha só o `index.ts` da raiz, removido em
`816fe78`, com conteúdo ausente no clone. Os `App.vue` de cms, dashboard e kanban têm duas versões:
a do primeiro commit, o mesmo objeto nas três (`58b0f21`), e a de `ea611b1`, que é a do snapshot,
sem import do kit; o `WidgetDinero.vue` tem uma versão só, a do snapshot. As folhas de estilo dos
remotos mudaram por último em `29967bf`, cuja mensagem anuncia "agregar archivo de estilos para
ui-kit", e são, no snapshot, o mesmo objeto da do shell (`35edbd2`). Os manifestos dos remotos
mudaram só em `280cc20`, e o conteúdo anterior não está disponível. Conclusão, delimitada aos
componentes: nenhuma versão de código dos remotos posterior à criação dos componentes do kit difere
da do snapshot, então os remotos nunca consumiram esses componentes; a ligação dos remotos ao kit
no histórico se limita às folhas de estilo.

**5. `@repo/utils` e configuração TS.** A lista de todos os caminhos que aparecem em algum commit
até o snapshot só tem, sob `packages/`, os arquivos de `packages/ui-kit`. O diagrama que cita as
outras duas bibliotecas vem do README de `5244640`. Conclusão: essas bibliotecas não existiram em
nenhum commit; não foram removidas, só anunciadas.

**6. Vite 6.** O README que diz "Vite 6" é de `5244640` e não muda a versão em `94399d2` (a
mensagem anuncia só a correção do mermaid). Os manifestos das apps têm duas versões, a do primeiro
commit e a de `280cc20`, e o conteúdo da primeira não está disponível (o objeto de
`apps/dashboard/package.json`, `642e960`, falhou por ausência). O histórico não diz se a versão do
Vite era 6 quando o README foi escrito e mudou depois. Inconclusivo.

## Comandos

```sh
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem rev-list --count 8501b8bd6e1d2491eb7838ae38b264a826f4c453
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --reverse --format='%h %ad %s' --date=short --name-status 8501b8bd6e1d2491eb7838ae38b264a826f4c453
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem show e3cc334:.turbo/daemon/ed873b9e6803e60c-turbo.log.2025-11-27   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem show e3cc334:apps/shell/src/App.vue   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem show e3cc334:apps/shell/vite.config.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem show e3cc334:packages/ui-kit/index.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem show e3cc334:apps/shell/package.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem show e3cc334:apps/dashboard/package.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem show e3cc334:package.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%H %h' 8501b8bd6e1d2491eb7838ae38b264a826f4c453
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem ls-tree -r e3cc334
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem cat-file -t e69de29bb2d1d6434b8b29ae775ad8c2e48c5391   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem cat-file -t 9ea8fb4074ae333e68c456b72a126125a9f75ad7   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem cat-file -t 58b0f21b1647b34ed23f23fc6488eb4f811c405e   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem cat-file -t bbcf80cca93e72ac5583c66d220957216a001f94   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem cat-file -t d3d1eec1c5855c1e5537d153c7e1f779b4121af4   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem cat-file -t 642e960fe13458a5b295bea34e98f9c6caf91667   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem cat-file -t 64dc1bd42892c5cf45a1b34d7c6358ad0f71529a   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/shell/src/App.vue
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/shell/vite.config.ts
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/shell/src/vite-env.d.ts
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/cms/package.json
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/dashboard/package.json
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/kanban/package.json
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/shell/package.json
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- package.json
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- packages/ui-kit/package.json
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- turbo.json
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- .github   # sem saída
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format= --name-only 8501b8bd6e1d2491eb7838ae38b264a826f4c453
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem ls-tree -r 8501b8bd6e1d2491eb7838ae38b264a826f4c453
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/cms/src/style.css apps/dashboard/src/style.css apps/kanban/src/style.css README.mkd apps/cms/src/App.vue apps/kanban/src/App.vue apps/dashboard/src/App.vue
```

## Resumo

Commits até o snapshot: 11 (2025-11-28 a 2025-11-29). Pontos: 6 (esclarecido: 5, inconclusivo: 1, resolvido pelo snapshot: 0).
