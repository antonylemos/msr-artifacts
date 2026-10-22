---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
inputs:
  clone: data/samples/mfe-sample-001/repos/Pandian-it__eager-workspace1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 006 — Pandian-it/eager-workspace1

## Leitura do repositório

O histórico até o snapshot tem 94 commits, de 2025-08-12 a 2025-10-23, com 13 merges. Muitos commits são do fluxo de release automatizado (changesets, "Release …", "Version Packages").

Dois marcos explicam pontos das revisões anteriores:
- **`69e232b` (2025-08-12, "added nx build"):** remove o `angular.json` e cria o `nx.json` e os `project.json`. O workspace passa de Angular CLI a Nx.
- **`3a75f71` (2025-09-02, "Reverting back to webpack"):** troca a configuração de composição. O primeiro commit, `85d75fe`, já tinha um `federation.config.js` e um `tsconfig.federation.json` em cada uma das quatro aplicações, além de `projects/shell/public/federation.manifest.json`, cujas entradas apontam para `remoteEntry.json`. São artefatos compatíveis com Native Federation. O `3a75f71` remove os quatro `federation.config.js`, cria um `webpack.config.js` em cada aplicação e altera os `project.json`, os `main.ts`, o `package.json`, o serviço de manifesto do shell e o workflow de release. Na mesma mudança entram o guia `cloudfront-spa-config.md` e um changeset. Os `federation.config.js` antigos não estão disponíveis no clone, e não dá para ver como estavam configurados. A mensagem diz "reverting back", mas um estágio anterior com webpack não aparece no histórico.

Os `tsconfig.federation.json` continuam no snapshot (ex.: projects/cart/tsconfig.federation.json), como resíduo desse primeiro estágio.

A disponibilidade do conteúdo antigo varia por arquivo. `69e232b:package.json`, `85d75fe:projects/shell/src/app/manifest.service.ts` e `85d75fe:projects/cart/federation.config.js` falham por objeto ausente. Já `3a75f71:package.json`, `85d75fe:projects/shell/public/federation.manifest.json` e quase todos os arquivos do checkout em `3a75f71` estão disponíveis.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@nx/workspace` declarada e sem uso | 3.4.2 (package.json:47) | uso de dependência | 69e232b 2025-08-12 added nx build; 3a75f71 2025-09-02 Reverting back to webpack | inconclusivo |
| 2 | O bootstrap do cart usa um módulo que não define como iniciar a UI | 3.4.3 (projects/cart `Undetermined`) | ativo ou abandonado | 85d75fe 2025-08-12 first commit | esclarecido |
| 3 | O shell tem um `federation.manifest.json` que o código não lê | 3.4.5 (Leitura) | estágios em conflito | 85d75fe 2025-08-12 first commit; 3a75f71 2025-09-02 Reverting back to webpack | esclarecido |
| 4 | O guia do CloudFront põe o shell e o manifesto na raiz do bucket, e o workflow os publica em outro lugar | 3.4.7 #4 | estágios em conflito | 3a75f71 2025-09-02 Reverting back to webpack | esclarecido |
| 5 | A configuração do checkout compartilha `@shared-ui` "since checkout uses it", e o checkout não a importa | 3.4.7 #6 | estágios em conflito | 3a75f71 2025-09-02 Reverting back to webpack | esclarecido |

## Observações

**1. `@nx/workspace` declarada e sem uso.** O Nx entra no workspace em `69e232b`, que altera o `package.json`, e o `package.json` muda de novo em `3a75f71`. A versão de `3a75f71`, a mesma do snapshot, declara `"@nx/workspace": "21.3.11"`. A de `69e232b` não está disponível. Não dá para saber quando a dependência foi declarada pela primeira vez nem se algum comando a usou antes. Ela continua `No` no snapshot.

**2. O bootstrap do cart usa um módulo que não define como iniciar a UI.** `projects/cart/src/app/mfe.module.ts` e `projects/cart/src/bootstrap.ts` não mudam desde o primeiro commit. O `main.ts` do cart só mudou em `3a75f71`, na troca de mecanismo. O arranjo que deixa o cart `Undetermined` na revisão estrutural existe desde o primeiro commit observado, e nenhum commit o alterou.

**3. O shell tem um `federation.manifest.json` que o código não lê.** O arquivo está no primeiro commit, junto com os `federation.config.js` das quatro aplicações, e não muda depois. A revisão de composição o descreveu como "resíduo de um template". O histórico permite delimitar melhor: ele pertence ao conjunto de artefatos compatíveis com Native Federation do primeiro commit e permaneceu quando `3a75f71` substituiu os `federation.config.js` por `webpack.config.js`. As versões antigas do serviço de manifesto do shell e dos `federation.config.js` não estão disponíveis. Não dá para saber se o manifesto chegou a ser lido nem como o primeiro estágio estava configurado.

**4. O guia do CloudFront põe o shell e o manifesto na raiz do bucket, e o workflow os publica em outro lugar.** O workflow existe desde `5cf7880` (2025-08-31). `cloudfront-spa-config.md` é criado em `3a75f71`, o mesmo commit que faz a última alteração no workflow até o snapshot. O guia e a versão do workflow que está no snapshot coexistem desde `3a75f71`, e por isso não são de estágios diferentes. O histórico não diz qual dos dois corresponde ao deploy real.

**5. A configuração do checkout compartilha `@shared-ui` "since checkout uses it", e o checkout não a importa.** O `webpack.config.js` do checkout, com o comentário, é criado em `3a75f71`. Nesse commit, todos os arquivos de `projects/checkout/src` estão disponíveis, exceto o `index.html`, e nenhum referencia `shared-ui`. O comentário já não correspondia ao checkout quando foi escrito. O histórico não diz se uma versão anterior a `3a75f71` usou a biblioteca.

## Comandos

```
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 rev-list --count 9ad83c2d39d410bab0e82efdebca145ebb04adbc
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 rev-list --count --merges 9ad83c2d39d410bab0e82efdebca145ebb04adbc
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format=%ad --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad %s' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- package.json
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show --name-status --no-renames --format='== %h %s' 69e232b
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 69e232b:package.json   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show --name-status --no-renames --format='== %h %ad %s' --date=short 3a75f71
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 ls-tree -r --name-only 85d75fe
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- projects/cart/src/app/mfe.module.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- projects/cart/src/bootstrap.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- projects/cart/src/main.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad %s' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- projects/shell/public/federation.manifest.json
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad %s' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- cloudfront-spa-config.md
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad %s' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- .github/workflows/Push-Event-To-Release.yml
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad %s' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- projects/checkout/webpack.config.js
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad %s' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- projects/checkout/src
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:package.json
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 85d75fe:projects/shell/public/federation.manifest.json
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 85d75fe:projects/shell/src/app/manifest.service.ts   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 85d75fe:projects/cart/federation.config.js   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 ls-tree -r --name-only 3a75f71 -- projects/checkout/src
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/app-routing.module.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/app.component.html
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/app.component.scss
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/app.component.spec.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/app.component.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/app.module.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/mfe.module.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/shared-components.module.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/bootstrap.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/index.html   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/main.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/styles.scss
```

## Resumo

Commits até o snapshot: 94 (2025-08-12 a 2025-10-23). Pontos: 5 (esclarecido: 4, inconclusivo: 1, resolvido pelo snapshot: 0).
