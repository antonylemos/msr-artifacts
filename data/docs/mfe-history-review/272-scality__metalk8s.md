---
schema: 1
id: 124905930
full_name: scality/metalk8s
commit: f19004e899c78360d3a43d5f60047b140f29c909
inputs:
  clone: data/samples/mfe-sample-001/repos/scality__metalk8s
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 272 — scality/metalk8s

## Leitura do repositório

O histórico até o snapshot tem 12526 commits, de 2019-02-05 a 2026-10-08. O primeiro é `d77803a49`
(2019-02-05, "docs: import `README.md`"). O snapshot é o merge `f19004e89` (2026-10-08, "Merge
branch 'improvement/MK8S-447-kube-proxy-init-on-alpine' into q/134.0"). O frontend é uma parte
pequena desse histórico, e os pontos dependem só destes marcos:

- `shell-ui` nasce de uma renomeação: `f28782afa` (2021-02-24, "solutions-navbar: Rename to
  shell-ui") cria `shell-ui/README.md`, `shell-ui/src/index.js` e `shell-ui/src/index.mdx`. No
  mesmo dia, `2d6df3d31` ("salt: Build and deploy shell-ui as part of metalk8s-ui container") cria
  `buildchain/buildchain/shell_ui.py` e altera `images/metalk8s-ui/Dockerfile` e o nginx dessa
  imagem.
- A passagem do shell a Module Federation começa em `938cc576e` (2021-05-26, "shell-ui: Module
  federation wip"), que cria `shell-ui/webpack.common.js`, e segue em `eeeca883a` (2021-06-04,
  "shell-ui: Refactor shell-ui to module federation. This allow runtime integration with others UIs
  and sharing of the authentication context as well as the theme").
- A migração para TypeScript (`50c231439`, 2023-02-27, "ui: run the script to migrate to
  typescript"; `30709cb48`, 2023-02-27, "shell-ui: Fix the test") apaga os `.js` e cria os `.ts`/
  `.tsx` correspondentes; com `--no-renames`, esses arquivos aparecem como criados nesse dia, o que
  é primeira presença com o nome atual, não introdução.
- A troca de webpack por rspack vai de `ced34bf07` (2024-06-20, "install and build with rspack") a
  `b71e654ee` (2024-06-28, "rm webpack from shell-ui") e `e83045616` (2024-07-03, "remove webpack
  from metalk8s-ui").
- O deploy por operador de UI entra em `70dbd925d` e `65ea4b164` (2025-08-13).
- Os recursos inativos ou sem destino no snapshot são recentes: MCP desde `baba81932`
  (2026-03-27), Guardian desde `ddf833ad6` (2026-04-08), a aba de máquinas virtuais em `556f0c84f`
  (2026-09-17).

O clone mostra mensagens, datas, arquivos tocados e identificadores de objeto. O conteúdo das
versões antigas não está disponível: `show` das versões antigas de `ui/src/index.ts`,
`ui/src/entry.tsx`, `ui/src/index.html` e `shell-ui/README.md` falha com "bad object", e
`cat-file -e` confirma a ausência do objeto antigo de `ui/src/index.ts`. Por isso vários
resultados se apoiam só nas mensagens e nas datas. Uma exceção útil: o objeto de
`shell-ui/README.md` em `e109eb9ef` é o mesmo do snapshot (`c87f897…`), e o novo objeto de
`ui/src/index.ts` em `ae1de7bcc` é `e69de29…`, de tamanho 0 (`cat-file -s`).

Não viraram ponto: as quatro dependências da 3.4.2, todas `Yes`; a relação 4 da 3.4.5 (`ui` →
`shell-ui`), que é `No` por valer só fora de produção, não `Undetermined`; e as afirmações
`corroborada` da 3.4.7.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | A entrada do build da `ui` (`ui/src/index.ts`) é um arquivo vazio, e nada em `ui/` a inicia sozinha | 3.4.3 (ui) | ativo ou abandonado | 50c231439 2023-02-27 ui: run the script to migrate to typescript; ae1de7bcc 2024-06-28 shell-ui: Introduce window API level to shell-ui | esclarecido |
| 2 | O iframe e os `postMessage` do Guardian estão desligados por `canUseGuardian: false` | 3.4.4 (shell-ui/src/guardian/GuardianDrawer.tsx:37; shell-ui/src/guardian/guardianPostMessageHooks.ts:38, :63) | ativo ou abandonado | ddf833ad6 2026-04-08 POC mcp guardian integration; 8522c6c98 2026-04-27 Guardian drawer mode; 8b8e67415 2026-05-05 Added can use guardian feature flag; 462b577fe 2026-06-10 feat(shell-ui): source Guardian origin from config and add source suffix; 98052bf1b 2026-08-17 add new version to handle MCP tasks | esclarecido |
| 3 | Os eventos, métodos e o elemento `solutions-navbar` descritos no README do shell não estão ativos: o evento de idioma nunca é disparado e a biblioteca da plataforma está fora da cadeia de entrada | 3.4.4 (shell-ui/src/navbar/lang.tsx:49; Notas); 3.4.7 #9, #11, #12 | estágios em conflito | f28782afa 2021-02-24 solutions-navbar: Rename to shell-ui; 59da5f6ff 2021-04-07 shell-ui: Move bundles to sub folders; a33ef1c93 2021-04-14 shell-ui: Add k8s service; 938cc576e 2021-05-26 shell-ui: Module federation wip; eeeca883a 2021-06-04 shell-ui: Refactor shell-ui to module federation. This allow runtime integration with others UIs and sharing of the authentication context as well as the theme; 30709cb48 2023-02-27 shell-ui: Fix the test; e109eb9ef 2023-06-13 ARTESCA-8593 - alert-configuration v1 | esclarecido |
| 4 | O adaptador de nome de instância não é carregado sem `canChangeInstanceName`, que é `false` nas configurações do snapshot | 3.4.4 (shell-ui/src/navbar/InstanceName.tsx:161) | ativo ou abandonado | 26151e240 2024-02-15 shell-ui: Introduce the instanceName feature to help distinguishing instances; 1372479a8 2024-09-16 Fix oidc config; 85bcf59be 2026-05-06 improvement(ARTESCA-17495): hide deployment-name pill on 403 from adapter; 4684c2a43 2026-08-11 fix(shell-ui): stop headless federated components rendering "Loading..." | esclarecido |
| 5 | O `MCPRegistrar` importa o módulo `mcpTools` de cada UI, e nenhuma configuração de UI do snapshot o declara | 3.4.4 (shell-ui/src/mcp/MCPRegistrar.tsx:201); 3.4.5 #2 | ativo ou abandonado | 627a3559f 2025-09-09 fix e2e tests; baba81932 2026-03-27 feat(MK8S-196): add WebMCP protocol support to shell-ui; 07b8b7053 2026-10-06 ARTESCA-18316: make WebMCP tool invocations visible in DevTools | esclarecido |
| 6 | A `ui` carrega uma UI de kind `vm-management-ui` que nenhum artefato do snapshot declara | 3.4.4 (ui/src/containers/Layout.tsx:251); 3.4.5 #3 | ativo ou abandonado | 556f0c84f 2026-09-17 feat(ui): add a Virtual Machines tab to the Platform navigation | esclarecido |
| 7 | O shell tem duas formas de deploy no snapshot: imagem `shell-ui` própria e cópia em `/shell` da imagem `metalk8s-ui` | 3.4.6 #1 | estágios em conflito | 2d6df3d31 2021-02-24 salt: Build and deploy shell-ui as part of metalk8s-ui container; 70dbd925d 2025-08-13 add shell-ui standlalone deployment; 65ea4b164 2025-08-13 update metalk8s-ui deployment; 009ff435b 2025-10-13 remove legacy resources after install; 410823fd7 2025-12-16 remove legacy comments in nginx.conf; da28d2908 2026-07-16 chore(deps): update nginx docker tag to v1.31.3 | esclarecido |
| 8 | O README do shell diz que `@scality/core-ui` é `singleton` no Module Federation, e nenhuma configuração o declara assim | 3.4.7 #7 | estágios em conflito | e109eb9ef 2023-06-13 ARTESCA-8593 - alert-configuration v1; 5640809b6 2025-12-18 put back core-ui singleton in rspack configs; 3d610e75a 2026-01-14 remove singleton for core-ui in rspack config | esclarecido |
| 9 | O README da `ui` descreve um `npm run start` que sobe o shell em Docker e um `webpack.dev.js` ausente | 3.4.7 #15, #16 | estágios em conflito | e2fae4bcf 2023-06-28 add comments; e83045616 2024-07-03 remove webpack from metalk8s-ui; 136cf7844 2026-01-29 rework dev environment for shell-ui and metalk8s-ui | esclarecido |

## Observações

**1. A entrada do build da `ui` é um arquivo vazio.** `ui/src/index.ts` aparece em `50c231439`
(2023-02-27), a migração para TypeScript, que no mesmo commit apaga `ui/src/index.js` e cria
`ui/src/FederableApp.tsx`. Ele só muda mais uma vez, em `ae1de7bcc` (2024-06-28, "shell-ui:
Introduce window API level to shell-ui"): o objeto passa de `6fb29c5…` para `e69de29…`, que tem 0
bytes. O mesmo commit apaga `ui/src/entry.tsx` e `ui/src/index.html` (presentes desde `50c231439` e
`6e4a246fb`, 2021-03-17, "ui: Switch bundling from create react app to webpack 5"), cria os tipos
gerados `ui/@mf-types/shell/` e altera `ui/rspack.config.ts`, `ui/src/FederableApp.tsx` e os
providers da `ui`. As versões antigas desses três arquivos não estão disponíveis, então o histórico
não mostra se eles iniciavam a `ui` sozinha. Conclusão, delimitada a esses arquivos: a entrada vazia
não é um arquivo que nasceu vazio, e sim o resto de uma entrada que tinha conteúdo e foi esvaziada
junto com a remoção do HTML e do `entry.tsx` da `ui`. O `Undetermined` da 3.4.3 continua: o
histórico explica a entrada vazia, mas não muda o que o snapshot permite construir.

**2. O Guardian está desligado.** A pasta `shell-ui/src/guardian/` aparece em `ddf833ad6`
(2026-04-08, "POC mcp guardian integration"), com `GuardianBubble.tsx` e `mockMcpTools.ts`. O
`GuardianDrawer.tsx` e o `GuardianContext.tsx` vêm de `8522c6c98` (2026-04-27, "Guardian drawer
mode"), e `guardianPostMessageHooks.ts` de `20dbc9918` (2026-04-20). A chave aparece em `8b8e67415`
(2026-05-05, "Added can use guardian feature flag"), que altera `shell-ui/public/config.json`,
`shell-ui/src/FederatedApp.tsx` e `ShellConfigProvider.tsx`; `462b577fe` (2026-06-10) passa a ler
a origem do Guardian da configuração. Os arquivos do Guardian mudam até `98052bf1b` (2026-08-17,
"add new version to handle MCP tasks"). O conteúdo das versões antigas de `config.json` não está
disponível, então o histórico não mostra se a chave já esteve ligada nesse arquivo. Conclusão,
delimitada a esses arquivos: o Guardian é uma funcionalidade recente, posta atrás de uma chave um
mês depois da prova de conceito e alterada até agosto de 2026; está desligada no snapshot, mas não é
código abandonado.

**3. Navbar legada `solutions-navbar`.** O `shell-ui/README.md` é criado na renomeação
`f28782afa` (2021-02-24, "solutions-navbar: Rename to shell-ui") e muda depois em `c78254986`
(2021-04-07) e `e109eb9ef` (2023-06-13), cujo objeto é o do snapshot. Os arquivos dos eventos e da
biblioteca da navbar (`shell-ui/src/navbar/events.js`, `library.js`) vêm de `59da5f6ff`
(2021-04-07, "shell-ui: Move bundles to sub folders"), e a biblioteca da plataforma com o serviço
k8s (`shell-ui/src/platform/library.js`) de `a33ef1c93` (2021-04-14, "shell-ui: Add k8s service").
Tudo isso é anterior à passagem do shell a Module Federation, que começa em `938cc576e` (2021-05-26)
e cuja mensagem em `eeeca883a` (2021-06-04) anuncia a integração em runtime com outras UIs e o
compartilhamento de autenticação e tema. Em `30709cb48` (2023-02-27) esses arquivos passam a `.ts`;
depois disso, `events.ts`, `navbar/library.ts`, `platform/library.ts` e `platform/service/k8s.ts`
só mudam em commits gerais (`6a9bdcdb6`, 2024-02-07, regra de nomes de variáveis; `2d9eed306`,
2026-03-03, formatação com biome; `b4f2b86db`, 2023-02-27, remoção do flow). `lang.tsx` muda em mais
dois commits (`e109eb9ef`; `62c890a52`, 2024-11-20, migração para React 18), cujo conteúdo não está
disponível. O histórico não mostra se `onLanguageChanged` chegou a ser passado. Conclusão: a seção
"Legacy" do README e os arquivos de eventos e biblioteca pertencem ao estágio em que o shell era uma
navbar embutida nas UIs (fevereiro a abril de 2021), anterior ao shell como host de Module
Federation; desde a migração para TypeScript eles só recebem mudanças gerais.

**4. Adaptador de nome de instância.** `InstanceName.tsx` é criado em `26151e240` (2024-02-15,
"shell-ui: Introduce the instanceName feature to help distinguishing instances"), que no mesmo
commit altera as duas configurações Salt do shell onde hoje `canChangeInstanceName` é `false`
(`metalk8s-shell-ui-config.yaml.j2` e `workloadplane-shell-ui-config.yaml.j2`). A de workload plane
não muda depois; a de control plane muda só em `1372479a8` (2024-09-16, "Fix oidc config"). O
componente continua sendo alterado até `4684c2a43` (2026-08-11), com mensagens como "hide
deployment-name pill on 403 from adapter" (`85bcf59be`, 2026-05-06). O conteúdo das versões antigas
das configurações não está disponível, então o histórico não mostra se a chave já foi `true` em
alguma delas. Conclusão, delimitada a esses arquivos: o componente é mantido desde 2024 até agosto
de 2026 e não é resto abandonado; as configurações do repositório que o deixam desligado são do
mesmo commit que o introduziu ou de uma correção de OIDC, e o histórico não diz onde ele é ligado.

**5. Módulo `mcpTools`.** `MCPRegistrar.tsx` é criado em `baba81932` (2026-03-27, "feat(MK8S-196):
add WebMCP protocol support to shell-ui"). A mensagem anuncia que as micro-apps passam a poder
declarar o módulo de ferramentas na sua configuração WebFinger (`mcpTools`) e que o shell cuida do
registro. O arquivo muda até `07b8b7053` (2026-10-06), dois dias antes do snapshot. A configuração da
única UI do repositório, `ui/public/.well-known/micro-app-configuration`, mudou por último em
`627a3559f` (2025-09-09, "fix e2e tests"), antes de o `MCPRegistrar` existir. Conclusão, delimitada
a esse arquivo: desde que o mecanismo foi introduzido, a configuração da `ui` nunca mudou, então
nunca declarou `mcpTools`; o mecanismo é recente e mantido, e o histórico não diz qual UI, fora do
repositório, o declara.

**6. UI `vm-management-ui`.** A carga vem de `556f0c84f` (2026-09-17, "feat(ui): add a Virtual
Machines tab to the Platform navigation"), que altera `ui/src/containers/Layout.tsx` e as traduções.
A mensagem anuncia que a `ui` procura a micro-app VM Management entre as views fornecidas pelo shell,
que ela roda num contêiner de Module Federation próprio, e que "The micro-app is only deployed on
ARTESCA+, so its presence is the gate: elsewhere no tab is shown and the route falls through to the
404 page." Conclusão, pela mensagem: o destino é uma micro-app de outro produto, implantada fora do
MetalK8s, e a relação é recente e intencional, não resto. O histórico não mostra o código da
micro-app nem onde ela está, então o `Undetermined` da 3.4.5 #3 segue.

**7. Duas formas de deploy do shell.** A cópia do shell na imagem `metalk8s-ui` vem de `2d6df3d31`
(2021-02-24, "salt: Build and deploy shell-ui as part of metalk8s-ui container"), que altera
`images/metalk8s-ui/Dockerfile` e o nginx da imagem e cria `buildchain/buildchain/shell_ui.py`.
Depois disso, a Dockerfile da imagem só muda em `da28d2908` (2026-07-16, versão do nginx). O deploy
à parte entra em `70dbd925d` (2025-08-13, "add shell-ui standlalone deployment"), que cria
`salt/metalk8s/addons/shell-ui/deployed/`, e `65ea4b164` (2025-08-13, "update metalk8s-ui
deployment") cria o `ui-operator-cr.sls` da `ui` e apaga `ui.sls.in`, `ui-configuration.sls` e
`deployed-ui-apps.yaml.j2.in`. Seguem `009ff435b` (2025-10-13, "remove legacy resources after
install") e `410823fd7` (2025-12-16, "remove legacy comments in nginx.conf"), que mexe no nginx da
imagem `metalk8s-ui` sem tirar o `/shell`. Conclusão, delimitada a esses arquivos: as duas formas
são de estágios diferentes, a cópia em `metalk8s-ui` de 2021 e a imagem própria com `ScalityUI` de
agosto de 2025, e a primeira não foi retirada. O histórico não mostra se o `/shell` da imagem
`metalk8s-ui` ainda é acessado, então o `Undetermined` da 3.4.6 segue.

**8. `@scality/core-ui` singleton.** O `shell-ui/README.md` não muda desde `e109eb9ef` (2023-06-13;
mesmo objeto do snapshot). Nas configurações, a mensagem de `5640809b6` (2025-12-18, "put back
core-ui singleton in rspack configs") anuncia a volta do `singleton` nos dois `rspack.config.ts`, e a
de `3d610e75a` (2026-01-14, "remove singleton for core-ui in rspack config") anuncia a retirada,
também nos dois. Só há as mensagens: o conteúdo das versões antigas não foi inspecionado.
Conclusão: o README descreve uma configuração que, segundo as mensagens, existiu e foi retirada em
janeiro de 2026, depois da última mudança do README; a contradição é de estágios diferentes.

**9. Fluxo de desenvolvimento no README da `ui`.** `ui/README.md` muda por último em `e2fae4bcf`
(2023-06-28, "add comments"). Depois disso, `e83045616` (2024-07-03, "remove webpack from
metalk8s-ui") apaga `ui/webpack.dev.js`, `webpack.common.js` e `webpack.prod.js` e altera
`ui/package.json`, e `136cf7844` (2026-01-29, "rework dev environment for shell-ui and metalk8s-ui")
altera os dois `rspack.config.ts` e cria `shell-ui/public/config.json` e `deployed-ui-apps.json`. O
conteúdo das versões antigas de `ui/package.json` não está disponível, então o histórico não mostra
se o `start` já subiu o shell em Docker. Conclusão, delimitada a esses arquivos: o README é anterior
à remoção do `webpack.dev.js` que ele cita e às duas reorganizações do ambiente de desenvolvimento;
as partes contraditas são de um estágio anterior.

## Comandos

```
docs/mfe-history-review/tools/hist.sh scality__metalk8s rev-list --count f19004e899c78360d3a43d5f60047b140f29c909
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status f19004e899c78360d3a43d5f60047b140f29c909 -- ui/src/index.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s ls-tree ae1de7bcc -- ui/src/index.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s ls-tree 50c231439 -- ui/src/index.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s show 50c231439:ui/src/index.ts   # falhou: bad object
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --format='%h %ad %s%n%b' --date=short ae1de7bcc   # falhou: objeto ausente (could not fetch e553108…)
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short ae1de7bcc
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s' --date=short ae1de7bcc
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- ui/rspack.config.ts ui/webpack.config.js ui/webpack.common.js ui/webpack.dev.js ui/webpack.prod.js ui/public/index.html ui/src/FederableApp.tsx ui/src/index.js
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %p %ad %s' --date=short ae1de7bcc
docs/mfe-history-review/tools/hist.sh scality__metalk8s cat-file -s e69de29bb2d1d6434b8b29ae775ad8c2e48c5391
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- ui/README.md
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- ui/package.json
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/README.md
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/rspack.config.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/platform/library.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/platform/service/k8s.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/navbar/library.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/navbar/events.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/navbar/lang.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/platform/library.js
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/navbar/library.js
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/navbar/events.js
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/FederatedApp.js
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/FederatedApp.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s' --date=short 30709cb48
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/webpack.common.js
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- 'shell-ui/src/FederatedApp.*' 'shell-ui/src/index.*'
docs/mfe-history-review/tools/hist.sh scality__metalk8s ls-tree f28782afa -- shell-ui/README.md
docs/mfe-history-review/tools/hist.sh scality__metalk8s ls-tree c78254986 -- shell-ui/README.md
docs/mfe-history-review/tools/hist.sh scality__metalk8s ls-tree e109eb9ef -- shell-ui/README.md
docs/mfe-history-review/tools/hist.sh scality__metalk8s ls-tree f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/README.md ui/README.md
docs/mfe-history-review/tools/hist.sh scality__metalk8s show f28782afa:shell-ui/README.md   # falhou: bad object
docs/mfe-history-review/tools/hist.sh scality__metalk8s show c78254986:shell-ui/README.md   # falhou: bad object
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/guardian
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/public/config.json
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/navbar/InstanceName.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/mcp/MCPRegistrar.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/guardian
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/mcp
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- ui/src/containers/Layout.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- ui/public/.well-known/micro-app-configuration
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- salt/metalk8s/addons/ui/config/metalk8s-shell-ui-config.yaml.j2
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- salt/metalk8s/addons/ui/config/workloadplane-shell-ui-config.yaml.j2
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --diff-filter=A --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/mcp/MCPRegistrar.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --diff-filter=A --format='%h %ad %s' --date=short --name-only f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/guardian   # falhou: objeto ausente (could not fetch 98c3c68…)
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 556f0c84f
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/mcp/MCPRegistrar.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --diff-filter=A --no-renames --format='%h %ad %s' --date=short --name-only f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/guardian
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/FederatedApp.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 8b8e67415
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short ddf833ad6
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 26151e240
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short baba81932
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- images/metalk8s-ui/Dockerfile
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- images/metalk8s-ui/conf/nginx.conf
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/Dockerfile
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- .github/workflows/publish.yaml
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 70dbd925d
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 65ea4b164
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 2d6df3d31
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- salt/metalk8s/addons/ui/deployed/files/metalk8s-ui-deployment.yaml.j2 salt/metalk8s/addons/ui/deployed/ui-operator-post-install.sls
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 3d610e75a
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 5640809b6
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 9af1226d6
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short e83045616
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 136cf7844
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short e2fae4bcf
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short e109eb9ef
docs/mfe-history-review/tools/hist.sh scality__metalk8s ls-tree fce32f987 -- ui/src/entry.tsx ui/src/index.html ui/src/index.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s cat-file -e 6fb29c5cc7d43a2319922dbb32758f6d64d8be59   # objeto ausente (saída não zero)
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --diff-filter=A --no-renames --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- ui/src/entry.tsx ui/src/index.html
docs/mfe-history-review/tools/hist.sh scality__metalk8s show fce32f987:ui/src/entry.tsx   # falhou: bad object
docs/mfe-history-review/tools/hist.sh scality__metalk8s show fce32f987:ui/src/index.html   # falhou: bad object
docs/mfe-history-review/tools/hist.sh scality__metalk8s show fce32f987:ui/src/index.ts   # falhou: bad object
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909
```

Duas chamadas foram recusadas pelo próprio script antes de rodar o git e não estão no
`commands.log`: um `show` com `-1` e um `cat-file -p` (opções fora da lista). `fce32f987` é o pai
de `ae1de7bcc` (saída de `log --format='%h %p %ad %s'`).

## Resumo

Commits até o snapshot: 12526 (2019-02-05 a 2026-10-08). Pontos: 9 (esclarecido: 9, inconclusivo: 0, resolvido pelo snapshot: 0).
