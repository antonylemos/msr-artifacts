---
schema: 1
id: 1253620135
full_name: victorlmneves/_nuxt-monorepo-mfe-platform
commit: 84ffc2429b311b3c7565ffd35de4de48dafd5929
inputs:
  clone: data/samples/mfe-sample-001/repos/victorlmneves___nuxt-monorepo-mfe-platform
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 096 — victorlmneves/_nuxt-monorepo-mfe-platform

## Leitura do repositório

O histórico até o snapshot tem 4 commits, sem merges, todos de 2026-05-29. O primeiro, `da1cfb0`
("first commit"), cria só um `README.md`, cuja versão não está disponível no clone. O segundo,
`74f5247` ("Initial commit"), cria a raiz do monorepo (`package.json`, `pnpm-workspace.yaml`,
`turbo.json`, `pnpm-lock.yaml`, `.gitignore`, `.npmrc`, `tsconfig.json`), `packages/shared` inteiro
(auth, registro e tipos) e os quatro arquivos de `scripts/`, e substitui o README pela versão do
snapshot (o identificador do objeto `0dd924b` é o mesmo em `74f5247` e no snapshot). O terceiro,
`8606169` ("Add apps folder and its contents"), acrescenta `apps` como gitlink para o commit
`cb1c03a`, de outro repositório, que não está no clone. O snapshot, `84ffc24` ("Fix: add apps/ and
all subfolders as regular files (remove submodule)"), remove o gitlink, altera o `.gitignore` e cria
os 41 arquivos de `apps/` (o shell e os quatro remotes).

Assim, todo o código das cinco unidades tem a sua primeira presença observável no próprio commit
do snapshot: nenhum arquivo de `apps/` tem versão anterior legível, e o conteúdo que o gitlink
apontava não pode ser lido. Já o README, os arquivos da raiz, `packages/shared` e `scripts/` não
mudam de `74f5247` até o snapshot (os identificadores dos objetos e das árvores `packages` e
`scripts` são os mesmos nos dois commits). O `log --name-status` do repositório inteiro foi até o
primeiro commit sem falha, e nenhum commit cria ou remove arquivo fora dos listados acima.

Das revisões anteriores, a 3.4.2 tem uma dependência `Undetermined` (`turbo`), que é um ponto. A
3.4.3 não tem unidade `Undetermined`, a 3.4.4 não tem construção inativa ou `Undetermined`, a
3.4.5 não tem relação `Undetermined` e a 3.4.6 não tem deploy `Undetermined`. Das quatro afirmações
`contradita` da 3.4.7, #13 e #15, sobre o escopo `singleton`, viraram um ponto; #6 (o cabeçalho
compartilhado) e #16 (o cabeçalho como única coisa compartilhada) são pontos próprios, porque a 3.4.7
as separa (Observação 16) e a dúvida histórica de cada uma está em artefatos diferentes: o uso do
`ShellHeader.vue` pelas unidades, numa, e o pacote `@mfe/shared`, na outra.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `turbo` tem `turbo.json`, mas só é chamado pelos scripts do `package.json`, sem workflow de CI ou script que o invoque | 3.4.2 (package.json:34) | uso de dependência | 74f5247 2026-05-29 Initial commit; 84ffc24 2026-05-29 Fix: add apps/ and all subfolders as regular files (remove submodule) | esclarecido |
| 2 | O README chama o `ShellHeader.vue` de "Shared header", e só o shell o usa | 3.4.7 #6 | estágios em conflito | 74f5247 2026-05-29 Initial commit; 8606169 2026-05-29 Add apps folder and its contents; 84ffc24 2026-05-29 Fix: add apps/ and all subfolders as regular files (remove submodule) | inconclusivo |
| 3 | O README atribui o isolamento dos remotes Vue 2 e o compartilhamento do Vue 3 com o shell ao escopo `singleton`, e o shell não tem `ModuleFederationPlugin` e inicia os containers com escopo vazio | 3.4.7 #13, #15 | estágios em conflito | 74f5247 2026-05-29 Initial commit; 8606169 2026-05-29 Add apps folder and its contents; 84ffc24 2026-05-29 Fix: add apps/ and all subfolders as regular files (remove submodule) | inconclusivo |
| 4 | O README diz que o cabeçalho é a única coisa compartilhada, e o pacote `@mfe/shared` e o barramento de eventos são usados pelas cinco unidades | 3.4.7 #16 | estágios em conflito | 74f5247 2026-05-29 Initial commit | esclarecido |

## Observações

**1. O `turbo` sem invocação fora dos scripts.** O `package.json` e o `turbo.json` são criados em
`74f5247` e não mudam até o snapshot (mesmos identificadores de objeto, `229d4e3` e `e44e060`).
Nenhum dos quatro commits cria ou remove um workflow de CI, um Dockerfile ou outro script que chame
`turbo`: o único caminho removido em todo o histórico é o gitlink `apps`, e os
arquivos de `scripts/` são os mesmos desde `74f5247`. O conteúdo de `apps/` antes do snapshot, no
gitlink `cb1c03a`, não está disponível, mas as invocações que a 3.4.2 procura estariam na raiz ou em
`scripts/`. Conclusão, delimitada a esses arquivos: no repositório nunca houve uma invocação do
`turbo` fora dos scripts do `package.json` que depois tenha sido removida; o `Undetermined` não é
resto de uma automação abandonada. Isso não muda o `Undetermined` da 3.4.2.

**2. O cabeçalho "compartilhado".** O README com a frase é a versão de `74f5247` e não muda até o
snapshot. O `ShellHeader.vue` e os `App.vue` dos remotes têm a sua primeira presença observável no
commit do snapshot, `84ffc24`, que os cria como arquivos comuns; antes disso, `apps` era o gitlink
`cb1c03a` (`8606169`), e o commit apontado não está no clone (`cat-file` falhou). O histórico mostra
que o README foi gravado antes de o código das aplicações entrar no repositório como arquivos, no
mesmo dia, mas não mostra se alguma versão anterior das aplicações usava o cabeçalho em mais de uma
unidade. A mensagem de `84ffc24` anuncia só a troca do submódulo por arquivos comuns. O README
também diz que foi construído sobre outro repositório (README.md:5), que não foi consultado.
Inconclusivo; a afirmação continua `contradita`.

**3. O escopo `singleton`.** As duas frases estão no README de `74f5247`, sem mudança até o
snapshot. Os artefatos que as desmentem, os `webpack.config.js` dos remotes (o Vuetify 2 fora do
`shared`), o `nuxt.config.ts` do shell sem o plugin e o `container.init({})` de `useMfeLoader.ts`,
têm todos a sua primeira presença observável em `84ffc24`, e um único commit no `log` de cada um. O
histórico não mostra se o shell teve, numa versão anterior no gitlink `cb1c03a` ou no repositório
de origem citado em README.md:5, um `ModuleFederationPlugin` com o Vue 3 no escopo compartilhado,
porque esse conteúdo não está disponível. Inconclusivo; as afirmações continuam `contradita`.

**4. A "única coisa compartilhada".** O README e o pacote `packages/shared`, com
`src/auth/index.ts`, `src/registry.ts`, `src/types/index.ts` e `src/index.ts`, entram juntos em
`74f5247`, e nenhum dos dois muda até o snapshot (o README é o objeto `0dd924b`, e a árvore
`packages` é `a195189` nos dois commits). A versão de `74f5247` do README, legível, já traz, logo
abaixo do título "The only shared thing: the header", a seção "Auth state sharing" com o barramento
de `packages/shared/src/auth` e o contrato `RemoteMount` "defined in `@mfe/shared`". Conclusão,
delimitada a esses arquivos: no repositório, o título nunca conviveu com uma versão sem o pacote
compartilhado; a divergência é interna ao README desde a sua primeira presença observável, e não
resto de um estágio anterior ao pacote. O uso do pacote pelas cinco unidades só é observável no
snapshot. A afirmação continua `contradita`.

## Comandos

```sh
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform rev-list --count 84ffc2429b311b3c7565ffd35de4de48dafd5929
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform log --format='%h %ad %s' --date=short 84ffc2429b311b3c7565ffd35de4de48dafd5929
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform log --merges --format='%h' 84ffc2429b311b3c7565ffd35de4de48dafd5929
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform log --name-status --format='@@ %h %ad %s' --date=short 84ffc2429b311b3c7565ffd35de4de48dafd5929
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform ls-tree da1cfb0
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform ls-tree 74f5247
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform ls-tree 8606169
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform ls-tree 84ffc2429b311b3c7565ffd35de4de48dafd5929
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform ls-tree 74f5247:packages/shared/src
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform ls-tree 84ffc2429b311b3c7565ffd35de4de48dafd5929:packages/shared/src
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform show da1cfb0:README.md      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform log --format='%h %ad %s' --date=short 84ffc2429b311b3c7565ffd35de4de48dafd5929 -- README.md package.json turbo.json packages scripts
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform log --format='%h %ad %s' --date=short 84ffc2429b311b3c7565ffd35de4de48dafd5929 -- apps/shell/components/ShellHeader.vue apps/shell/composables/useMfeLoader.ts apps/shell/nuxt.config.ts apps/mfe-vue2-checkout/webpack.config.js apps/mfe-vue2-admin/webpack.config.js apps/mfe-vue3-profile/webpack.config.js apps/mfe-vue3-dashboard/webpack.config.js
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform cat-file -t cb1c03abe02b536d52cdc5aa31d29c616a8558ce      # falhou: objeto ausente (commit do gitlink)
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform show 74f5247:README.md
```

## Resumo

Commits até o snapshot: 4 (2026-05-29 a 2026-05-29). Pontos: 4 (esclarecido: 2, inconclusivo: 2, resolvido pelo snapshot: 0).
