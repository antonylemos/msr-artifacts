---
schema: 1
id: 1033705813
full_name: hscale/adx-core-k
commit: 683dec7ebc233c685f97166a135032d5668070c1
inputs:
  clone: data/samples/mfe-sample-001/repos/hscale__adx-core-k
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 060 — hscale/adx-core-k

## Leitura do repositório

O histórico até o snapshot tem 24 commits, sem merges, de 2025-08-07 a 2025-08-28. O primeiro é
`eca11df` (2025-08-07, "Initial commit: ADX CORE K platform with Temporal-first architecture"). Os
artefatos de frontend não estão nesse commit. Eles são introduzidos em três commits:

- `7fac338` (2025-08-13) cria `apps/shell`, `packages/design-system`, `packages/event-bus`,
  `packages/shared-context` e `package-workspace.json`;
- `1705eaf` (2025-08-13) cria `apps/auth` e `apps/tenant`;
- `1920432` (2025-08-16, "feat: Complete Task 33 - User and Workflow BFF Services (Rust/Axum)")
  cria `apps/file`, `apps/module`, `apps/user`, `apps/workflow` e os seis `bff-services/*`.

Logo depois, `d4d1897` (2025-08-16, "🎉 ADX Core Project Complete - Final GitHub Sync") cria
`packages/i18n`, os documentos de `docs/` e os workflows `deploy-microfrontends.yml`,
`deploy-production.yml` e `automated-rollback.yml`. Nesse estágio, as aplicações, os pacotes e os
BFFs ficavam na raiz.

O marco que importa para quase todos os pontos é o próprio commit do snapshot, `683dec7`
(2025-08-28, "feat: Complete Task 44 Production Deployment and Monitoring"). Ele apaga 227 arquivos
de `apps/` e cria 59 arquivos em `adx-core/apps/`. Também apaga `packages/`, `bff-services/` e
`docs/` e os recria sob `adx-core/`. Não foi uma simples mudança de pasta. Comparando os
identificadores de objeto do commit anterior (`31a57a1`) com os do snapshot, dos 227 arquivos de
aplicação antigos, 48 têm equivalente em `adx-core/apps/`, e só quatro têm o mesmo conteúdo: os
`tsconfig.node.json` de auth, module e shell e o `index.html` do module. Os outros 44 mudaram, e
179 não foram recriados. Os BFFs e os documentos, ao contrário, foram em grande parte copiados sem
mudança. `adx-core/` já existia antes, com os serviços Rust.

O clone mostra mensagens, datas, arquivos tocados e identificadores de objeto. O conteúdo das
versões antigas que diferem do snapshot não está disponível (`31a57a1:package.json`, os `index.ts`
dos pacotes, os `App.tsx` e `vite.config.ts` antigos). Por isso o histórico diz quais arquivos
existiam e quando, mas não o que eles continham.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | Cinco remotes sem `index.html` ou com exposes e imports para arquivos ausentes | 3.4.3 (adx-core/apps/file, module, tenant, user, workflow `Undetermined`); 3.4.7 #3 | estágios em conflito | 1705eaf 2025-08-13 feat: comprehensive ADX Core task sync with GitHub integration; 1920432 2025-08-16 feat: Complete Task 33 - User and Workflow BFF Services (Rust/Axum); 683dec7 2025-08-28 feat: Complete Task 44 Production Deployment and Monitoring | esclarecido |
| 2 | O canal de eventos de DOM do event bus não é alcançado por nenhuma unidade | 3.4.4 (adx-core/packages/event-bus/src/EventBus.tsx:49); 3.4.7 #13 | ativo ou abandonado | 7fac338 2025-08-13 feat: comprehensive ADX Core task analysis and GitHub sync readiness; 683dec7 2025-08-28 feat: Complete Task 44 Production Deployment and Monitoring | inconclusivo |
| 3 | O `changeLanguage` do i18n, que avisaria as outras unidades, não é exportado nem usado | 3.4.4 (adx-core/packages/i18n/src/hooks.ts:19); 3.4.7 #25 | ativo ou abandonado | d4d1897 2025-08-16 🎉 ADX Core Project Complete - Final GitHub Sync; 683dec7 2025-08-28 feat: Complete Task 44 Production Deployment and Monitoring | inconclusivo |
| 4 | Os stores de tema e de tenant do shared-context, que sincronizariam por eventos de DOM, não são alcançados | 3.4.4 (adx-core/packages/shared-context/src/tenant-store.ts:77; theme-store.ts:33, :142, :162); 3.4.7 #22 | ativo ou abandonado | 7fac338 2025-08-13 feat: comprehensive ADX Core task analysis and GitHub sync readiness; 1920432 2025-08-16 feat: Complete Task 33 - User and Workflow BFF Services (Rust/Axum); 683dec7 2025-08-28 feat: Complete Task 44 Production Deployment and Monitoring | inconclusivo |
| 5 | Os workflows de deploy constroem e publicam `apps/<app>`, caminho que não existe no snapshot | 3.4.6 #1-#7 (Deploy `Undetermined`); 3.4.7 #9 | estágios em conflito | 1920432 2025-08-16 feat: Complete Task 33 - User and Workflow BFF Services (Rust/Axum); d4d1897 2025-08-16 🎉 ADX Core Project Complete - Final GitHub Sync; 683dec7 2025-08-28 feat: Complete Task 44 Production Deployment and Monitoring | esclarecido |
| 6 | Os READMEs dos BFFs descrevem a ligação com os micro-frontends, e os remotes não usam os BFFs | 3.4.7 #4, #16, #17, #18, #19 | estágios em conflito | 1705eaf 2025-08-13 feat: comprehensive ADX Core task sync with GitHub integration; 1920432 2025-08-16 feat: Complete Task 33 - User and Workflow BFF Services (Rust/Axum); 978acbf 2025-08-16 ADX DONE Tasks; 683dec7 2025-08-28 feat: Complete Task 44 Production Deployment and Monitoring | esclarecido |
| 7 | O guia promete isolamento de falhas por aplicação, e o shell tem um único `ErrorBoundary` | 3.4.7 #20 | estágios em conflito | 7fac338 2025-08-13 feat: comprehensive ADX Core task analysis and GitHub sync readiness; 1920432 2025-08-16 feat: Complete Task 33 - User and Workflow BFF Services (Rust/Axum); d4d1897 2025-08-16 🎉 ADX Core Project Complete - Final GitHub Sync; 683dec7 2025-08-28 feat: Complete Task 44 Production Deployment and Monitoring | inconclusivo |
| 8 | O guia de autonomia descreve um repositório por equipe (`team-workspace/`), e o snapshot é um monorepo por camada | 3.4.7 #23 | estágios em conflito | d4d1897 2025-08-16 🎉 ADX Core Project Complete - Final GitHub Sync | esclarecido |

## Observações

**1. Cinco remotes sem `index.html` ou com exposes e imports para arquivos ausentes.** Até o
commit anterior ao snapshot (`31a57a1`), cada aplicação ficava em `apps/<app>` e tinha seu próprio
`index.html`. Os de tenant e auth vieram em `1705eaf`; os de file, user, workflow e module, em
`1920432`. O commit do snapshot, `683dec7`, apaga essa árvore e cria `adx-core/apps/` sem
`index.html` em file, tenant, user e workflow. Parte dos arquivos que os exposes e imports do
snapshot pedem existia em `31a57a1`, nos caminhos equivalentes sob `apps/`: `FileUpload.tsx` e
`FileBrowser.tsx` (file), `TenantSwitcher.tsx` (tenant), `UserProfile.tsx` e `UserSettings.tsx`
(user), `WorkflowHistory.tsx` (workflow), `ModuleSettings.tsx`, `ModuleDeveloper.tsx` e
`src/index.css` (module). Todos são apagados em `683dec7` e não recriados. Outros cinco nomes não
aparecem em nenhum commit até o snapshot: `FileViewer`, `UserList`, `WorkflowList`, `WorkflowStatus`
e `ModuleInstaller`. A versão antiga dos `vite.config.ts` não está disponível, então não dá para
saber se os exposes antigos eram os mesmos. Conclusão, delimitada a esses arquivos: as lacunas não
são restos de abandono gradual. A maior parte vem da recriação das aplicações no commit do
snapshot, que deixou fora arquivos que existiam no estágio anterior. Cinco dos destinos nunca
existiram em nenhuma versão. Nada disso muda o `Undetermined` da 3.4.3.

**2. O canal de eventos de DOM do event bus não é alcançado por nenhuma unidade.**
`packages/event-bus/src/EventBus.tsx` e `hooks.ts` são criados em `7fac338` e chegam ao snapshot
com o mesmo identificador de objeto. Só mudaram de pasta em `683dec7`. No mesmo commit, a entrada
do pacote, `src/index.ts`, foi reescrita, e o `providers/EventBusProvider.tsx` que as unidades
recebem foi criado. A versão antiga de `index.ts` não está disponível (`show` falha). Por isso não
dá para saber se a entrada exportava `EventBus.tsx` entre `7fac338` e `683dec7`. Também não dá para
saber se aplicações da árvore antiga o importavam, porque o conteúdo delas não está disponível. O
histórico mostra que o arquivo nunca mudou e que a camada que o deixa de fora é do commit do
snapshot. Não mostra se ele chegou a ser usado.

**3. O `changeLanguage` do i18n, que avisaria as outras unidades, não é exportado nem usado.**
`packages/i18n/src/hooks.ts` é criado em `d4d1897` e chega ao snapshot sem mudança. Já
`src/index.ts` foi alterado em `683dec7`, e sua versão anterior não está disponível. Até
`31a57a1`, o shell também tinha um i18n próprio (`apps/shell/src/i18n/index.ts`, com quatro
`locales`), apagado em `683dec7`. Não dá para saber se a entrada antiga do pacote exportava o hook
nem se alguma aplicação o usava. Inconclusivo.

**4. Os stores de tema e de tenant do shared-context, que sincronizariam por eventos de DOM, não
são alcançados.** `tenant-store.ts` é criado em `7fac338` e não muda até o snapshot. `theme-store.ts`
é criado no mesmo commit e alterado em `1920432`, cuja mensagem anuncia os BFFs de usuário e de
workflow. Depois disso, ele também chega ao snapshot sem mudança. O `index.ts` do pacote foi
reescrito em `683dec7`, que também criou os quatro providers (`SharedContextProvider`,
`AuthProvider`, `UserProvider`, `TenantProvider`) que as unidades montam. A versão antiga de
`index.ts` não está disponível. Assim como no ponto 2, a camada que deixa os stores de fora é do
commit do snapshot. Não dá para saber se antes os stores eram exportados ou usados.

**5. Os workflows de deploy constroem e publicam `apps/<app>`, caminho que não existe no
snapshot.** `deploy-microfrontends.yml` e `deploy-production.yml` são criados em `d4d1897` e não
mudam até o snapshot. Nessa data, as sete aplicações estavam em `apps/<app>`, na raiz (criadas em
`7fac338`, `1705eaf` e `1920432`). Foi o commit do snapshot, `683dec7`, que as tirou dali e as
recriou em `adx-core/apps/`, sem tocar nos workflows. O mesmo vale para o workspace da raiz.
`package.json` foi alterado em `683dec7`, mas a versão anterior não está disponível. Então não dá
para saber se os padrões `apps/*` e `packages/*` já estavam lá antes. O conflito de caminhos fica
esclarecido: os workflows pertencem ao estágio em que as aplicações ficavam na raiz, e a mudança
de pasta veio depois deles. O histórico não mostra se esses workflows chegaram a rodar com sucesso.
Também não explica o `npm run build:<app>` do `deploy-production.yml`, nem os endereços de
`localhost` do shell. O Deploy continua `Undetermined`.

**6. Os READMEs dos BFFs descrevem a ligação com os micro-frontends, e os remotes não usam os
BFFs.** Os READMEs de `auth-bff`, `file-bff`, `module-bff` e `tenant-bff` são criados em `1920432`.
O de auth é alterado em `978acbf`, cuja mensagem só diz "ADX DONE Tasks". Os quatro chegam a
`adx-core/bff-services/` em `683dec7` com o mesmo identificador de objeto. No estágio em que eles
foram escritos, cada aplicação tinha um cliente próprio do seu BFF:
`apps/<app>/src/services/<app>BFFClient.ts` (auth e tenant em `1705eaf`; file, module, user e
workflow em `1920432`; auth com teste próprio). O commit do snapshot apaga os seis clientes e cria
o pacote compartilhado `packages/bff-client`, que não aparece em nenhum commit anterior. O
`useBFFClient` que o module importa e o pacote não exporta é desse mesmo commit. Conclusão,
delimitada a esses arquivos: os READMEs são do estágio com um cliente de BFF por aplicação, e o
snapshot trocou esses clientes por um pacote que os remotes não importam. O conteúdo dos clientes
antigos não está disponível. Por isso o histórico não mostra que eles eram chamados pelas
aplicações.

**7. O guia promete isolamento de falhas por aplicação, e o shell tem um único `ErrorBoundary`.**
`docs/README.md` e `docs/developer-guide/module-federation.md` são criados em `d4d1897` e chegam a
`adx-core/docs/` em `683dec7` com o mesmo identificador de objeto. O `App.tsx` do shell é criado em
`7fac338`, alterado em `1920432` e em `d4d1897` e reescrito em `683dec7`. O `ErrorBoundary.tsx` e o
`MicroFrontendLoader.tsx` do shell vêm de `7fac338` e mudam só em `683dec7`. As versões anteriores
desses três arquivos não estão disponíveis. Não dá para saber se, no estágio do guia, o shell tinha
um `ErrorBoundary` por rota. Inconclusivo.

**8. O guia de autonomia descreve um repositório por equipe (`team-workspace/`), e o snapshot é
um monorepo por camada.** `docs/developer-guide/team-autonomy.md` é criado em `d4d1897` e chega ao
snapshot sem mudança de conteúdo. Nenhum commit até o snapshot tem caminho com `team-workspace`,
`frontend-app` ou `auth-frontend`. Conclusão, delimitada a esses nomes: a estrutura por equipe não
pertence a um estágio anterior deste repositório. O histórico não diz se ela descreve outros
repositórios, como o `auth-team.git` que o guia manda clonar, ou só uma intenção.

## Comandos

```
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k rev-list --count 683dec7ebc233c685f97166a135032d5668070c1
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --merges --format=%h 683dec7ebc233c685f97166a135032d5668070c1
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- adx-core/apps
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- apps
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- .github/workflows/deploy-microfrontends.yml .github/workflows/deploy-production.yml
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show --name-status --format='%h %ad %s' --date=short 683dec7   # falha: objeto ausente (25bfbf5), pedido pela detecção de renomeação
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show --name-status --no-renames --format='%h %ad %s' --date=short 683dec7
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%H %P' 683dec7ebc233c685f97166a135032d5668070c1 --
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k ls-tree -r 31a57a1 -- apps packages bff-services
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k ls-tree -r 683dec7ebc233c685f97166a135032d5668070c1 -- adx-core/apps adx-core/packages adx-core/bff-services
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:packages/event-bus/src/index.ts   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:packages/shared-context/src/index.ts   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:packages/i18n/src/index.ts   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:apps/shell/src/App.tsx   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:apps/shell/vite.config.ts   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:apps/file/vite.config.ts   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:apps/auth/src/App.tsx   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --name-status --no-renames --format='@@ %h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- apps packages bff-services .github/workflows package.json package-workspace.json docs
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k ls-tree 31a57a1 -- apps/file/index.html apps/tenant/index.html apps/user/index.html apps/workflow/index.html apps/file/src/components/FileUpload.tsx apps/file/src/components/FileBrowser.tsx apps/file/src/components/FileViewer.tsx apps/tenant/src/components/TenantSwitcher.tsx apps/user/src/components/UserProfile.tsx apps/user/src/components/UserList.tsx apps/user/src/components/UserSettings.tsx apps/workflow/src/components/WorkflowList.tsx apps/workflow/src/components/WorkflowStatus.tsx apps/workflow/src/components/WorkflowHistory.tsx apps/module/src/components/ModuleInstaller.tsx apps/module/src/components/ModuleSettings.tsx apps/module/src/components/ModuleDeveloper.tsx apps/module/src/index.css
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --full-history --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- '*FileViewer*' '*UserList*' '*WorkflowList*' '*WorkflowStatus*' '*ModuleInstaller*'   # sem saída
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --full-history --format=%h 683dec7ebc233c685f97166a135032d5668070c1 -- '*FileUpload*'   # controle do padrão
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- packages/event-bus/src/EventBus.tsx adx-core/packages/event-bus/src/EventBus.tsx
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- packages/event-bus/src/index.ts adx-core/packages/event-bus/src/index.ts
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- packages/i18n/src/hooks.ts adx-core/packages/i18n/src/hooks.ts
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- packages/i18n/src/index.ts adx-core/packages/i18n/src/index.ts
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- packages/shared-context/src/theme-store.ts adx-core/packages/shared-context/src/theme-store.ts
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- packages/shared-context/src/tenant-store.ts adx-core/packages/shared-context/src/tenant-store.ts
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- packages/shared-context/src/index.ts adx-core/packages/shared-context/src/index.ts
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show --name-status --no-renames --format=%h 1920432 -- packages/shared-context
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k ls-tree -r --name-only 31a57a1 -- apps
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --full-history --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- '*bff-client*'
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- docs/developer-guide/module-federation.md adx-core/docs/developer-guide/module-federation.md
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- docs/developer-guide/team-autonomy.md adx-core/docs/developer-guide/team-autonomy.md
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- docs/README.md adx-core/docs/README.md
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k ls-tree -r 31a57a1 -- docs
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k ls-tree -r 683dec7ebc233c685f97166a135032d5668070c1 -- adx-core/docs/developer-guide adx-core/docs/README.md
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- bff-services/auth-bff/README.md bff-services/file-bff/README.md bff-services/module-bff/README.md bff-services/tenant-bff/README.md
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- '*BFFClient.ts'
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- apps/shell/src/App.tsx adx-core/apps/shell/src/App.tsx apps/shell/src/components/ErrorBoundary.tsx adx-core/apps/shell/src/components/ErrorBoundary.tsx apps/shell/src/components/MicroFrontendLoader.tsx
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --full-history --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- '*team-workspace*' '*auth-frontend*' '*frontend-app*'   # sem saída
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- apps/shell/src/App.tsx
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- apps/shell/src/components/ErrorBoundary.tsx
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- apps/shell/src/components/MicroFrontendLoader.tsx
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:apps/shell/src/components/ErrorBoundary.tsx   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:apps/shell/src/components/MicroFrontendLoader.tsx   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show --name-status --no-renames --format='%h %ad %s' --date=short 978acbf -- bff-services
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:packages/shared-context/src/index.ts   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:package.json   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- package.json
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- .github/workflows/deploy-microfrontends.yml
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- .github/workflows/deploy-production.yml
```

## Resumo

Commits até o snapshot: 24 (2025-08-07 a 2025-08-28). Pontos: 8 (esclarecido: 4, inconclusivo: 4, resolvido pelo snapshot: 0).
