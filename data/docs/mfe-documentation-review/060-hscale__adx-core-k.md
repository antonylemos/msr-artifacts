---
schema: 1
id: 1033705813
full_name: hscale/adx-core-k
commit: 683dec7ebc233c685f97166a135032d5668070c1
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 060 — hscale/adx-core-k

## Leitura do repositório

A documentação é toda em inglês e muito extensa: 80 arquivos `documentation` no `artifacts.csv` e
447 ocorrências `doc-*`. Ela descreve a "ADX CORE" como uma plataforma SaaS multi-tenant,
"Temporal-first", com microsserviços Rust no backend e, no frontend, um shell React/Vite que compõe
micro-frontends de domínio por Module Federation (`README.md:3-35`; `adx-core/README.md:1-11`;
`adx-core/docs/README.md:93-107`). O núcleo da parte de frontend está em dois guias:
`adx-core/docs/developer-guide/module-federation.md` (1661 linhas) e
`adx-core/docs/developer-guide/team-autonomy.md` (753 linhas). As revisões anteriores confirmam o
desenho básico: shell com seis remotes, um por domínio, carregados por `React.lazy` sob prefixos de
rota (3.4.5 #1-#6) e configurados com `@originjs/vite-plugin-federation` (3.4.2). Já as promessas
de execução não se confirmam. A comunicação por event bus, o contexto global compartilhado, o
isolamento de falhas, o deploy independente e os BFFs por micro-frontend aparecem nos textos, mas
os artefatos os desmentem ou só os confirmam em parte (linhas 4, 9, 13, 16-20 e 22). Boa parte dos documentos fala de uma versão
"completa" do projeto que o snapshot não tem: quatro remotes sem `index.html`, exposes apontando
para arquivos ausentes, workflows e scripts que usam `apps/<app>` na raiz quando as aplicações
estão em `adx-core/apps/` (3.4.3 Notas; 3.4.6 Leitura).

Quarenta dos 80 documentos são relatórios gerados pelo assistente Kiro e pela ferramenta de
sincronização de tarefas com o GitHub (raiz: `adx-core-*.md`, `final-*.md`, `github-*.md`,
`manager-*.md`, `source-control-sync-report.md`, `task-*.md`, `validation-report-20250816-125812.md`,
além de `GITHUB_SYNC_README.md`, `HOOK_INTEGRATION_SUMMARY.md`, `KIRO_HOOK_DOCUMENTATION.md` e
`PROJECT_SETUP_SUMMARY.md`, que documentam a própria ferramenta). Os relatórios de status falam
deste projeto e, quando trazem afirmação arquitetural, ela repete uma linha da tabela. São listas
de tarefas concluídas ou pendentes, contagens por fase e componente, rótulos e planos, e um mesmo
fato aparece como "planned" num relatório e "✅" em outro (ex.: `adx-core-sync-status-report.md:142-143`
e `adx-core-final-sync-manager-summary.md:44-51`). `PROJECT_REPORT.md` é um relatório inicial
(7/8/2025) em que todo o frontend está "Planned" (`:101-109`). Mesmo assim, suas frases de decisão
arquitetural (`:149-156`) estão na tabela. Os relatórios de teste (`FINAL_TESTING_REPORT.md`,
`TESTING_INFRASTRUCTURE_COMPLETE.md`, `TEST_EXECUTION_SUMMARY.md`, `tests/README.md`) descrevem o
que os scripts de teste cobrem, não como as unidades se compõem. Só as frases de
`FINAL_TESTING_REPORT.md:121-125` afirmam algo sobre o frontend (linhas 5 e 6). Os documentos de
backend (`adx-core/docs/api/api-gateway.md`, `adx-core/docs/temporal-*.md`, os runbooks
`monitoring.md`, `security-incident-response.md` e `disaster-recovery.md`,
`adx-core/infrastructure/production/README.md`, `adx-core/scripts/README.md`,
`adx-core/services/*/README.md`, `adx-core/services/shared/migrations/README.md`) foram lidos e
não falam das unidades frontend. Os READMEs dos BFFs descrevem endpoints, cache e limites internos
de cada serviço. Deles só entra a relação com o micro-frontend (linhas 16-19). Fora do inventário
da mineração ficaram `.kiro/specs/**`, `.kiro/steering/*.md` (entre eles um
`frontend-microservices.md`) e `.github/**/*.md`, que não estão no `artifacts.csv` e não foram
tratados.

Blocos de código que reproduzem arquivos ou comandos não viraram linha. Vários não batem com o
snapshot. Em `adx-core/docs/developer-guide/module-federation.md:43-138`, o shell se chama `shell_app` e lê o endereço de cada
remote de `window.<app>AppUrl`, mas o snapshot tem `name: 'shell'` e endereços fixos em
`localhost` (`adx-core/apps/shell/vite.config.ts:10-18`). Em `:142-259`, cada rota tem o próprio
`ErrorBoundary` com `MicroFrontendError`, mas o shell real tem um único `ErrorBoundary` em volta de
tudo (`adx-core/apps/shell/src/App.tsx:35,45-55`; linha 20). Em `:377-443`, o auth expõe
`./LoginForm`, `./AuthProvider` e `./routes`, e o real expõe `./LoginForm`, `./RegisterForm`,
`./MFASetup`, `./PasswordReset` e `./SSOLogin` (`adx-core/apps/auth/vite.config.ts:11-18`). Em
`:495-560`, um `main.tsx` detecta o modo standalone, enquanto o real só monta `<App />`
(`adx-core/apps/auth/src/main.tsx:6-10`). Há ainda `:965-1035` (`apps/shell/src/config/remotes.ts`,
ausente), `:1291-1395` (um workflow com bucket S3 e CloudFront próprios por aplicação, diferente do
`deploy-microfrontends.yml` real, com um bucket e caminhos `apps/<app>/`, 3.4.6) e `:1399-1468` (o
script `deploy-microfrontend-blue-green.sh`, ausente). O mesmo vale para
`adx-core/docs/deployment/README.md:184-212` (`apps/shell/src/config/production.js`, ausente, com
remotes em subdomínios), para os comandos `aws s3 sync apps/<app>/dist/ s3://adx-core-frontend/<app>/`
de `adx-core/docs/operations/production-deployment-guide.md:165-179` e
`adx-core/docs/operations/runbooks/service-deployment.md:70-86` (seis aplicações, sem `module`) e
para o pipeline por equipe de `adx-core/docs/developer-guide/team-autonomy.md:420-476` (`auth-service/`, `auth-frontend/` e
`auth-bff/`, inexistentes). Os comandos `npm run dev:all`, `dev:shell`, `dev:auth`, `build:all` e
`build:desktop` (`README.md:179-199`; `DEV-SETUP.md:124-128`) não existem no `package.json` da raiz
(`package.json:11-17`). Eles existem no `package-workspace.json`, onde cada `dev:<remote>` só
imprime "not yet implemented" (`package-workspace.json:12-18`), e esse arquivo não é usado (3.4.6).
`README.md:247-251` aponta para `./docs/adr/`, `./docs/frontend/` e outras pastas inexistentes.
Também não existem várias páginas para as quais `adx-core/docs/README.md` aponta, como
`user-guide/micro-frontends.md` (`:36`) e `developer-guide/first-microfrontend.md` (`:77`).

Particularidades do ambiente de desenvolvimento, fora da tabela por serem portas e caminhos: as
listas de portas (`DEV-SETUP.md:58-64`; `README.md:92-98`; `adx-core/INFRASTRUCTURE_SETUP.md:98-104`;
`PROJECT_REPORT.md:101-109`) dão 3000 ao shell e 3001-3006 aos remotes, como os `vite.config.ts`,
mas as três últimas omitem o `module`. A mesma documentação põe o Grafana em `http://localhost:3001`
(`DEV-SETUP.md:85`; `adx-core/INFRASTRUCTURE_SETUP.md:26,85`), e o compose de desenvolvimento de
fato publica `3001:3000` para ele (`adx-core/infrastructure/docker/docker-compose.dev.yml:118-122`).
Isso colide com a porta do remote `auth_app` (`adx-core/apps/shell/vite.config.ts:12`). Os scripts
`scripts/dev-start-all.sh:191-196,306-317` e `scripts/dev-start-frontend-only.sh:134-163` procuram
`apps/<app>` a partir da raiz, onde essas pastas não existem, e por isso pulariam todas as
aplicações. As instruções de `DEV-SETUP.md:211-219` e `adx-core/INFRASTRUCTURE_SETUP.md:50-62,142-153`
usam o mesmo caminho. O `VITE_SHELL_URL` sugerido em `:151-152` não é lido por nenhum
`vite.config.ts`.

Ocorrências `doc-*` que não viraram linha, além das citadas nos parágrafos das linhas.
Títulos, sumários e links: `README.md:30`; `PROJECT_REPORT.md:149`; `adx-core/docs/README.md:36,46,47,77,130`;
`adx-core/docs/developer-guide/module-federation.md:1,9,835,1039,1148,1289,1397,1531,1659`;
`adx-core/docs/developer-guide/team-autonomy.md:1,111,416,655,703,749`; `adx-core/docs/user-guide/README.md:12,108`;
`adx-core/docs/operations/runbooks/service-deployment.md:72`; `adx-core/services/module-service/docs/developer-portal.md:517`.
Comentários dentro de blocos de código ou comandos: `README.md:181,184,186,187,190`;
`adx-core/INFRASTRUCTURE_SETUP.md:53,56,151`; `adx-core/docs/operations/production-deployment-guide.md:167`;
`adx-core/docs/operations/runbooks/service-deployment.md:74`;
`adx-core/docs/developer-guide/module-federation.md:153,157,194,200,208,216,224,232,240,289,293,315,350,351,352,359,465,519,557,637,736,817,819,824,826,839,844,847,857,860,901,913,917,935,945,956,967,1151,1154,1155,1159,1168,1179,1194,1203,1204,1210,1213,1226,1227,1239,1245,1250,1270,1292,1293,1375,1383,1390,1401,1415,1533,1534,1559,1606,1607,1608,1612,1616`;
`adx-core/docs/developer-guide/team-autonomy.md:180,620,631`. Instruções e itens de checklist:
`DEV-SETUP.md:219`; `adx-core/INFRASTRUCTURE_SETUP.md:144`;
`adx-core/docs/launch/go-live-checklist.md:42,69,96,103,134,269`;
`adx-core/docs/operations/production-readiness-checklist.md:110,111`;
`adx-core/services/module-service/docs/developer-portal.md:878`. Boas práticas prescritivas, que
recomendam e não afirmam: `adx-core/docs/developer-guide/module-federation.md:1480,1481,1485,1488,1491,1492,1496,1497,1504,1510,1511,1512,1522`;
`adx-core/docs/developer-guide/team-autonomy.md:686`. Organização de equipes (papéis e composição):
`adx-core/docs/developer-guide/team-autonomy.md:72,73`. Backend, serviços e infraestrutura que não
são frontend: `README.md:12`; `FINAL_TESTING_REPORT.md:116`; `adx-core/docs/README.md:5`;
`adx-core/docs/operations/production-deployment-guide.md:11`; `adx-core/infrastructure/production/README.md:333`;
`adx-core/docs/user-guide/README.md:287` (gestão de usuários por tenant). Descrições de teste:
`FINAL_TESTING_REPORT.md:48`; `TESTING_INFRASTRUCTURE_COMPLETE.md:45,52,132,133,146`;
`TEST_EXECUTION_SUMMARY.md:33,36,37,93,96,193,198,199`; `tests/README.md:3,23,152`. Ferramenta de
sincronização (rótulos e exemplo de formato): `GITHUB_SYNC_README.md:71`; `HOOK_INTEGRATION_SUMMARY.md:103,120`;
`KIRO_HOOK_DOCUMENTATION.md:193,195`. Planejamento e risco: `PROJECT_REPORT.md:182,183,202`.

Ocorrências dos relatórios de status. São status, planos, contagens, rótulos ou repetições das
afirmações 1, 2, 3, 7, 8, 9, 10, 11, 12, 13, 14, 20 e 22, com as principais citadas nos
parágrafos: `adx-core-final-sync-manager-summary.md:44,47,48,49,50,51,95,111,123,134,136,141,142,167,188,193`;
`adx-core-parallelization-sync-summary.md:33,73,127,128,129,172`;
`adx-core-sync-status-report.md:34,59,107,108,109,142,143,167,176`;
`adx-core-task-sync-analysis-report.md:63,85,86,87,97,126,137`; `adx-core-task-sync-analysis.md:118,119,152`;
`adx-core-task-sync-execution-summary.md:32,70,71,74,75,76,77,78,79,80,119,161,170,174,188,218`;
`adx-core-task-sync-final-report.md:165,166`; `adx-core-task-sync-final-summary.md:68,71,134`;
`adx-core-task-sync-manager-report.md:53,59,60,61,62,63,64,135,142,143,175,197,223`;
`adx-core-task-sync-manager-summary.md:39,56,121,135,159,187,194`;
`final-github-sync-execution-summary.md:45,46,78,93,94,106,166,173,186,195`; `final-sync-status.md:149`;
`github-sync-action-summary.md:44,112`; `github-sync-execution-summary.md:14,88,89,95,96,97,108,145`;
`github-sync-final-report.md:37,202`; `github-sync-instructions.md:119`; `github-sync-summary.md:34,52,73,82`;
`github-task-sync-analysis.md:33,51,74,92`; `manager-summary-task-sync.md:43,44,94,124,145,154`;
`manager-sync-summary.md:85`; `manager-task-33-completion-summary.md:36,65,96,101,115,134,168`;
`manager-task-9-completion-summary.md:123`; `source-control-sync-report.md:50,66,112`;
`task-1-completion-report.md:18,98,101`; `task-10-status-change-summary.md:73,93,133`;
`task-15-completion-analysis.md:49`; `task-15-completion-sync-summary.md:27,69,105,107`;
`task-22-completion-sync-report.md:6,10,15,46,67,69,75,86,88,89,94,95,96,100,120`;
`task-33-completion-sync-summary.md:40,41,83,136`; `task-5-completion-sync-summary.md:97`;
`task-sync-analysis-report.md:22,24,44,51,81,148`. As que falam de microsserviços de backend
(independência de serviço, deploy de serviço, escala de workers) não tratam das unidades frontend.

Comentários e campos lidos: `description` dos `package.json` das sete aplicações
(`adx-core/apps/<app>/package.json:4`, "… Micro-Frontend" e, no shell, "Shell Application - Module
Federation Host") e dos pacotes `design-system`, `shared-context`, `event-bus`, `i18n` e
`bff-client` (`adx-core/packages/<pacote>/package.json:4`); os comentários de
`adx-core/apps/shell/src/App.tsx:15`, `adx-core/packages/event-bus/src/EventBus.tsx:47`,
`adx-core/packages/event-bus/src/index.ts:1`, `adx-core/packages/shared-context/src/index.ts:1`,
`adx-core/packages/design-system/src/index.ts:1` e `adx-core/packages/bff-client/src/index.ts:1`;
os sete `vite.config.ts`, sem comentários; os comentários do `.github/workflows/deploy-microfrontends.yml`
(`:50,59,117,134,138,161-180,188-229`), que descrevem a detecção de mudança por aplicação e a
publicação e invalidação por caminho, coerentes com a 3.4.6; e os de `scripts/dev-start-all.sh:191,306`.
Eles repetem as linhas 1, 4, 5, 7, 9, 11 e 13, exceto o comentário de `adx-core/apps/shell/src/App.tsx:15` (linha 15)
e a `description` do `i18n` (linha 25).

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | DEV-SETUP.md:43 | "**Frontend Micro-Apps**: Shell, Auth, Tenant, File, User, Workflow, Module apps" | estrutura | corroborada | 3.4.3 (linhas adx-core/apps/shell, auth, file, module, tenant, user, workflow); 3.4.5 #1-#6 |
| 2 | DEV-SETUP.md:244 | "**Frontend Microservices**: Module Federation for …" | composição | corroborada | 3.4.2 (sete linhas `@originjs/vite-plugin-federation`, Configurada `Yes`); 3.4.5 #1-#6 |
| 3 | DEV-SETUP.md:244 | "… for independent micro-apps" | independência | parcial | 3.4.6 #1-#7 (build `separado`); adx-core/apps/auth/package.json:7; adx-core/apps/auth/index.html:10-11; 3.4.3 (linhas adx-core/apps/file, tenant, user, workflow: sem `index.html`, `Undetermined`) |
| 4 | DEV-SETUP.md:246 | "**BFF Pattern**: Optional optimization layer for frontend data aggregation" | composição | parcial | 3.4.3 (linhas adx-core/bff-services/*; Notas: user-bff e workflow-bff); adx-core/apps/module/src/components/ModuleMarketplace.tsx:4,48; adx-core/packages/bff-client/src/index.ts:2-3 |
| 5 | FINAL_TESTING_REPORT.md:124 | "Shared context and event bus architecture" | composição | corroborada | adx-core/apps/shell/src/App.tsx:5-6; adx-core/apps/auth/src/App.tsx:5-6; adx-core/apps/tenant/src/App.tsx:5-6; adx-core/apps/file/src/App.tsx:5-6; adx-core/apps/user/src/App.tsx:5-6; adx-core/apps/workflow/src/App.tsx:5-6; adx-core/apps/module/src/App.tsx:5-6 |
| 6 | FINAL_TESTING_REPORT.md:125 | "Cross-platform compatibility framework" | build-deploy | sem corroboração | — |
| 7 | PROJECT_REPORT.md:77 | "**Styling**: TailwindCSS with shared design system" | composição | corroborada | adx-core/apps/shell/src/App.tsx:4; adx-core/apps/auth/src/App.tsx:4; adx-core/apps/tenant/src/App.tsx:4; adx-core/apps/file/src/App.tsx:4,7; adx-core/apps/user/src/App.tsx:4,7; adx-core/apps/workflow/src/App.tsx:4,7; adx-core/apps/module/src/App.tsx:4 |
| 8 | PROJECT_REPORT.md:153 | "Team autonomy …" | independência | sem corroboração | — |
| 9 | PROJECT_REPORT.md:153 | "… and independent deployments" | build-deploy | parcial | 3.4.6 #1-#7 (build `separado`, Deploy `Undetermined`); .github/workflows/deploy-microfrontends.yml:45,151-184 |
| 10 | PROJECT_REPORT.md:154 | "Technology flexibility per domain" | independência | sem corroboração | — |
| 11 | adx-core-final-sync-manager-summary.md:45 | "**✅ Shell Application:** Module Federation host (port 3000)" | estrutura | corroborada | 3.4.5 #1-#6; adx-core/apps/shell/vite.config.ts:10-18; adx-core/apps/shell/package.json:4 |
| 12 | adx-core-final-sync-manager-summary.md:71 | "**✅ Team Autonomy:** Vertical slice ownership (backend + frontend + BFF)" | estrutura | corroborada | adx-core/Cargo.toml:4-8,11 (serviços auth, user, file, tenant, workflow, module); 3.4.3 (linhas adx-core/bff-services/auth-bff, file-bff, module-bff, tenant-bff; Notas: user-bff, workflow-bff); 3.4.5 #1-#6 |
| 13 | adx-core-final-sync-manager-summary.md:73 | "**✅ Event Bus Communication:** Cross-micro-frontend coordination" | composição | contradita | 3.4.4 (linha src-cross-unit-communication de adx-core/packages/event-bus/src/EventBus.tsx:49, Composição `No`); 3.4.5 (Leitura: nenhuma relação `communication`); adx-core/packages/event-bus/src/providers/EventBusProvider.tsx:26-55; adx-core/apps/auth/src/App.tsx:31; adx-core/apps/shell/src/App.tsx:40 |
| 14 | adx-core-final-sync-manager-summary.md:110 | "**✅ Scalable Architecture:** Independent scaling of all services and micro-frontends" | build-deploy | sem corroboração | — |
| 15 | adx-core/apps/shell/src/App.tsx:15 | "// Dynamic imports for micro-frontends" | composição | corroborada | 3.4.4 (seis linhas src-remote-import de adx-core/apps/shell/src/App.tsx:16-21); 3.4.5 #1-#6 |
| 16 | adx-core/bff-services/auth-bff/README.md:3 | "This service acts as a Temporal workflow client and provides optimized APIs for the Auth micro-frontend." | composição | parcial | 3.4.3 (linha adx-core/bff-services/auth-bff); adx-core/apps/auth/src/App.tsx:1-13; adx-core/apps/auth/vite.config.ts:26 |
| 17 | adx-core/bff-services/file-bff/README.md:3 | "This service acts as a Temporal workflow client and provides optimized APIs for file management micro-frontends." | composição | parcial | 3.4.3 (linha adx-core/bff-services/file-bff); adx-core/apps/file/src/App.tsx:1-8; adx-core/apps/file/vite.config.ts:24 |
| 18 | adx-core/bff-services/module-bff/README.md:3 | "This service acts as a Temporal workflow client and provides optimized APIs for the Module micro-frontend." | composição | parcial | 3.4.3 (linha adx-core/bff-services/module-bff); adx-core/apps/module/src/components/ModuleMarketplace.tsx:4,48,63,69,76; adx-core/packages/bff-client/src/index.ts:2-3 |
| 19 | adx-core/bff-services/tenant-bff/README.md:17-23 | diagrama "Tenant Micro- Frontend (Port 3002) ◄──► Tenant BFF Service (Port 4002) ◄──► Backend Services" | composição | parcial | 3.4.3 (linha adx-core/bff-services/tenant-bff); adx-core/apps/tenant/src/App.tsx:1-12; adx-core/apps/tenant/vite.config.ts:25 |
| 20 | adx-core/docs/README.md:107 | "**Fault isolation** between applications" | composição | contradita | adx-core/apps/shell/src/App.tsx:35,45-55,65; adx-core/apps/shell/src/components/ErrorBoundary.tsx:39-74; adx-core/apps/file/src/App.tsx:22-41; adx-core/apps/auth/src/App.tsx:27 |
| 21 | adx-core/docs/developer-guide/module-federation.md:26-27 | diagrama "Shared Dependencies │ React, React-DOM, Design System, Event Bus, Context" | composição | corroborada | adx-core/apps/shell/vite.config.ts:19-52; adx-core/apps/auth/vite.config.ts:19-27; adx-core/apps/file/vite.config.ts:17-23; 3.4.4 (Notas: `singleton` nos `shared`) |
| 22 | adx-core/docs/developer-guide/module-federation.md:37 | "**Shared Context**: Global state management for authentication, tenant, and theme" | composição | contradita | adx-core/packages/shared-context/src/providers/SharedContextProvider.tsx:10-19; adx-core/packages/shared-context/src/providers/TenantProvider.tsx:33-34; adx-core/apps/shell/src/App.tsx:39; adx-core/apps/auth/src/App.tsx:30; adx-core/packages/shared-context/src/index.ts:2-5; 3.4.4 (linhas de theme-store.ts e tenant-store.ts, Composição `No`) |
| 23 | adx-core/docs/developer-guide/team-autonomy.md:342-373 | "Each team maintains their own development environment" e a árvore `team-workspace/` (`backend-service/`, `frontend-app/ # React micro-frontend`, `bff-service/`, …) | independência | contradita | 3.4.3 (unidades em adx-core/apps/*, BFFs em adx-core/bff-services/*); adx-core/Cargo.toml:2-15; package.json:5-10 |
| 24 | adx-core/docs/user-guide/README.md:44 | "**Shell Application**: Main navigation and shared components" | composição | corroborada | adx-core/apps/shell/src/App.tsx:43; adx-core/apps/shell/src/components/Navigation.tsx:25-30,74; adx-core/apps/shell/src/components/UserMenu.tsx:23 |
| 25 | adx-core/packages/i18n/package.json:4 | "Internationalization for ADX Core micro-frontends" | composição | contradita | adx-core/apps/shell/src/App.tsx:8; adx-core/apps/auth/vite.config.ts:19-27; 3.4.4 (Notas: `@adx-core/i18n` fora dos `shared` dos remotes; adx-core/packages/i18n/src/hooks.ts:19, Composição `No`) |
| 26 | adx-core/services/module-service/docs/developer-portal.md:44 | "**Frontend Components**: React components with Module Federation" | composição | sem corroboração | — |

## Observações

**1. DEV-SETUP.md:43.** A lista dá os sete nomes do snapshot: o shell e os seis remotes de
`adx-core/apps/`, cada um com manifesto e `vite.config.ts` próprios (3.4.3). Os seis são destinos de
relações `host → remote` (3.4.5). A revisão estrutural só marca `Yes` para shell e auth. Os outros
cinco são `Undetermined` por falta de `index.html` ou por exposes ausentes, o que não desmente a
existência das unidades. A frase está numa lista do que `./scripts/dev-start-all.sh` "vai subir".
O script procura `apps/<app>` a partir da raiz (`scripts/dev-start-all.sh:307-317`) e não acharia
nenhuma delas. Repetem a afirmação, às vezes com contagens diferentes: `PROJECT_REPORT.md:16,40,75,150`;
`README.md:17,32` (cinco remotes, sem `module`); `adx-core-final-sync-manager-summary.md:46-51`;
`final-github-sync-execution-summary.md:45` ("7 Micro-Frontends", contando o shell);
`adx-core/apps/<app>/package.json:4`; `adx-core/README.md:3`; `adx-core/docs/deployment/README.md:11`
e `adx-core/docs/operations/production-deployment-guide.md:9` ("6 … micro-frontends", sem o shell);
`adx-core/docs/developer-guide/module-federation.md:5,13-24,34`; `adx-core/docs/user-guide/README.md:42,46-52`.

**2. DEV-SETUP.md:244.** Module Federation é a tecnologia de composição registrada nas sete
aplicações (`@originjs/vite-plugin-federation`, configurado em cada `vite.config.ts`, 3.4.2), e as
seis relações são `module-federation` (3.4.5). A variante "Vite Module Federation" de
`PROJECT_REPORT.md:74` e `README.md:31` é o mesmo plugin. Repetem: `FINAL_TESTING_REPORT.md:122`;
`PROJECT_REPORT.md:40,150`; `README.md:17`; `adx-core/README.md:3`; `adx-core/docs/README.md:103,194`;
`adx-core/docs/api/README.md:18`; `adx-core/docs/launch/go-live-checklist.md:5,466`;
`adx-core/docs/developer-guide/team-autonomy.md:17,180`.

**3. DEV-SETUP.md:244.** "Independent micro-apps": cada aplicação tem manifesto, configuração Vite,
script de build e servidor de desenvolvimento próprios (ex.: `vite --port 3001 --host`,
`adx-core/apps/auth/package.json:7`). A 3.4.6 registra build `separado` para as sete. Rodar sozinha
só tem artefato para shell, auth e module, que têm `index.html` (ex.: `adx-core/apps/auth/index.html:10-11`),
e o module ainda importa arquivos ausentes (3.4.3). File, tenant, user e workflow não têm entrada
para rodar isoladamente. Também nenhuma aplicação monta um modo standalone distinto do modo
remote: o `main.tsx` real só renderiza `<App />` (`adx-core/apps/auth/src/main.tsx:6-10`), enquanto
o guia descreve uma detecção de standalone (`adx-core/docs/developer-guide/module-federation.md:495-560`). Repetem:
`FINAL_TESTING_REPORT.md:123` ("Micro-frontend independence validated", sem teste que o faça no
snapshot); `adx-core-final-sync-manager-summary.md:70`; `adx-core/docs/developer-guide/module-federation.md:5,34,1649,1652`;
`adx-core/docs/developer-guide/team-autonomy.md:5,113`; `task-22-completion-sync-report.md:95,100`.

**4. DEV-SETUP.md:246.** Os seis BFFs existem (`adx-core/bff-services/`: quatro em Node e
`user-bff` e `workflow-bff` em Rust, 3.4.3). O uso pelas unidades não tem artefato que funcione.
Só o module importa o cliente (`useBFFClient`, `adx-core/apps/module/src/components/ModuleMarketplace.tsx:4,48`).
Esse nome não é exportado pelo pacote, que só exporta a classe `BFFClient` e tipos
(`adx-core/packages/bff-client/src/index.ts:2-3`). Os outros remotes só declaram `@adx-core/bff-client`
nos `shared` (ex.: `adx-core/apps/auth/vite.config.ts:26`) e não o importam. Repetem: `README.md:19`;
`adx-core/docs/api/README.md:17`; a `description` de `adx-core/packages/bff-client/package.json:4`;
`task-33-completion-sync-summary.md:133` ("All micro-frontends have dedicated BFF services");
`manager-task-33-completion-summary.md:96`.

**5. FINAL_TESTING_REPORT.md:124.** Contexto e event bus compartilhados no sentido de pacote: as
sete aplicações importam `SharedContextProvider` de `@adx-core/shared-context` e `EventBusProvider`
de `@adx-core/event-bus` (linhas citadas), e os dois são `singleton` nos `shared` do shell e dos
remotes (linha 21). A afirmação não diz como o estado ou os eventos circulam entre as unidades.
Isso está nas linhas 13 e 22, ambas `contradita`. Repetem: `TEST_EXECUTION_SUMMARY.md:200`; as
`description` de `adx-core/packages/shared-context/package.json:4` e `adx-core/packages/event-bus/package.json:4`.

**6. FINAL_TESTING_REPORT.md:125.** A compatibilidade multiplataforma é atribuída ao Tauri 2.0 em
`PROJECT_REPORT.md:41,76,156`, `README.md:33`, `adx-core-final-sync-manager-summary.md:74` e
`adx-core/docs/README.md:134`. O snapshot não tem `src-tauri/`, e os scripts `build:desktop` e
`build:mobile:*` chamados pelos workflows de teste não existem no `package.json` da raiz (3.4.6
Leitura). Os testes de `tests/desktop/` e `tests/mobile/` simulam eventos de plataforma (3.4.4
Notas), sem empacotar as aplicações. Nada confirma nem desmente que o frontend tenha um build
multiplataforma.

**7. PROJECT_REPORT.md:77.** O design system compartilhado é usado pelas sete aplicações:
todas importam `@adx-core/design-system` (linhas citadas), e ele é `singleton` nos `shared` do shell
(`adx-core/apps/shell/vite.config.ts:43-45`) e dos remotes (ex.: `adx-core/apps/auth/vite.config.ts:23`).
A parte "TailwindCSS" é aparência e não foi verificada. Repetem: `README.md:34`;
`adx-core-final-sync-manager-summary.md:72`; `final-github-sync-execution-summary.md:47`;
`adx-core/docs/README.md:132`; `adx-core/docs/developer-guide/team-autonomy.md:21,181`; a `description` de
`adx-core/packages/design-system/package.json:4`.

**8. PROJECT_REPORT.md:153.** Autonomia de equipe e posse por fatia vertical é afirmação
organizacional. O snapshot mostra uma fatia por domínio (linha 12), mas nada sobre quem desenvolve
cada uma. A estrutura de repositório por equipe que o guia descreve é desmentida (linha 23).
Repetem: `adx-core/README.md:9,11`; `adx-core/docs/README.md:105,137,198`;
`adx-core-final-sync-manager-summary.md:111`; `adx-core-task-sync-analysis-report.md:87,137`;
`adx-core/docs/developer-guide/module-federation.md:1652`; `adx-core/docs/developer-guide/team-autonomy.md:5,96,739`; e os relatórios de status (Leitura).

**9. PROJECT_REPORT.md:153.** O build é separado nas sete aplicações, e o `deploy-microfrontends.yml`
tem um job em matriz por aplicação, com caminho próprio no bucket e invalidação própria no
CloudFront (`.github/workflows/deploy-microfrontends.yml:45,151-184`). Mas a 3.4.6 deixa o Deploy
`Undetermined` nas sete: os workflows constroem `apps/<app>`, caminho ausente no snapshot, e o shell
carrega os remotes de `localhost` (`adx-core/apps/shell/vite.config.ts:11-18`), sem configuração
que o ligue aos endereços publicados. O pipeline mostrado no guia (um bucket e uma distribuição por
aplicação, URLs injetadas no build do shell, `adx-core/docs/developer-guide/module-federation.md:1291-1395`) e os subdomínios por
remote de `adx-core/docs/deployment/README.md:184-212` não correspondem ao workflow real. Repetem:
`adx-core-final-sync-manager-summary.md:46-51,123`; `final-github-sync-execution-summary.md:45,106`;
`adx-core/docs/README.md:104,131,138`; `adx-core/docs/developer-guide/module-federation.md:5,1504,1649,1654`; `adx-core/docs/developer-guide/team-autonomy.md:5,96,140,418,661`;
`adx-core-sync-status-report.md:108`.

**10. PROJECT_REPORT.md:154.** Flexibilidade de tecnologia é uma possibilidade, não um fato
verificável. No snapshot, as sete aplicações usam React, Vite e o mesmo plugin de federação, com
`react` e `react-dom` `singleton` (3.4.2; `adx-core/apps/shell/vite.config.ts:20-27`), o que nem
confirma nem desmente que uma equipe pudesse escolher outra. Repetem: `adx-core/docs/README.md:106`;
`adx-core-final-sync-manager-summary.md:112`; `adx-core/docs/developer-guide/module-federation.md:1653`; `adx-core/docs/developer-guide/team-autonomy.md:157`.

**11. adx-core-final-sync-manager-summary.md:45.** O shell é o host: declara os seis remotes
(`adx-core/apps/shell/vite.config.ts:10-18`), os carrega e não expõe nada (3.4.5). A `description`
do manifesto diz o mesmo (`adx-core/apps/shell/package.json:4`). Repetem:
`task-22-completion-sync-report.md:6,15,53`; `adx-core/docs/developer-guide/module-federation.md:13-14,33`; e os comentários em
blocos de comando de `adx-core/INFRASTRUCTURE_SETUP.md:53`.

**12. adx-core-final-sync-manager-summary.md:71.** A parte verificável da "fatia vertical" é
estrutural: para cada remote há um serviço de backend com o mesmo domínio no workspace Rust
(`auth-service`, `user-service`, `file-service`, `tenant-service`, `workflow-service`,
`module-service`, `adx-core/Cargo.toml:4-8,11`) e um BFF (`adx-core/bff-services/`, 3.4.3). A
correspondência de nomes se confirma. Que os BFFs atendam o micro-frontend da fatia é o que as
linhas 16-19 avaliam, e a posse por equipe é a linha 8. Repetem: `adx-core-task-sync-analysis-report.md:86`
("Micro-frontend architecture mirrors backend service boundaries"); `adx-core-task-sync-final-report.md:166`;
`adx-core/README.md:9,11`; `adx-core/docs/developer-guide/team-autonomy.md:5,11-35,40-49`; `adx-core-task-sync-execution-summary.md:189`.

**13. adx-core-final-sync-manager-summary.md:73.** A coordenação entre micro-frontends por event
bus não acontece no snapshot. O `EventBusProvider` que as unidades montam guarda os ouvintes num
`useRef` e só chama os da própria árvore React
(`adx-core/packages/event-bus/src/providers/EventBusProvider.tsx:26-55`). Cada remote monta o seu
(ex.: `adx-core/apps/auth/src/App.tsx:31`), separado do do shell (`adx-core/apps/shell/src/App.tsx:40`).
O disparo de `CustomEvent` no DOM, comentado "for cross-micro-frontend communication"
(`adx-core/packages/event-bus/src/EventBus.tsx:47`), está num arquivo que nenhuma unidade alcança
(3.4.4), e a 3.4.5 não registra relação `communication`. Repetem: `adx-core/docs/developer-guide/module-federation.md:36,1491`;
`adx-core/docs/developer-guide/team-autonomy.md:20,248`; `adx-core/docs/README.md:133`; a `description` de
`adx-core/packages/event-bus/package.json:4`; `TEST_EXECUTION_SUMMARY.md:199`.

**14. adx-core-final-sync-manager-summary.md:110.** Escala independente dos micro-frontends não
tem artefato. São arquivos estáticos publicados no S3 (3.4.6), e nenhuma configuração do snapshot
trata de escala por aplicação. Repetem: `final-github-sync-execution-summary.md:93`;
`task-sync-analysis-report.md:24,52`; `adx-core/docs/developer-guide/module-federation.md:1649`.

**15. adx-core/apps/shell/src/App.tsx:15.** O comentário antecede os seis `React.lazy(() => import('<app>_app/App'))`
(`:16-21`), que a 3.4.4 registra como `dynamic-loading` com composição `Yes`. Os remotes são
baixados só quando a rota é visitada, dentro de um `Suspense` (`:45-56`). Repete:
`adx-core/docs/developer-guide/module-federation.md:1656` ("Load only what's needed when it's needed"). O item `:1485` é a mesma
ideia como recomendação.

**16. adx-core/bff-services/auth-bff/README.md:3.** O serviço existe (3.4.3) e o README desenha a
ligação com o "Auth Micro-Frontend (Port 3001)" (`:17-23`). O remote auth não importa
`@adx-core/bff-client` nem chama a porta 4001: só monta providers e rotas
(`adx-core/apps/auth/src/App.tsx:1-13`) e declara o pacote nos `shared`
(`adx-core/apps/auth/vite.config.ts:26`). O lado do micro-frontend não tem artefato.

**17. adx-core/bff-services/file-bff/README.md:3.** O `file-bff` existe, com `Cargo.toml` e
`package.json` (3.4.3). O remote file só tem um `App.tsx` de "coming soon", sem chamada a BFF
(`adx-core/apps/file/src/App.tsx:1-8,12-20`), e declara o cliente apenas nos `shared`
(`adx-core/apps/file/vite.config.ts:24`).

**18. adx-core/bff-services/module-bff/README.md:3.** É o único caso em que o micro-frontend tenta
usar um BFF: `ModuleMarketplace` chama `useBFFClient()` e faz `get` e `post` em `/modules/*`
(`adx-core/apps/module/src/components/ModuleMarketplace.tsx:4,48,63,69,76`). O hook não existe no
pacote (`adx-core/packages/bff-client/src/index.ts:2-3`), e nenhum ponto do snapshot define a URL
do `module-bff`. A ligação está esboçada no código, mas não se resolve.

**19. adx-core/bff-services/tenant-bff/README.md:17-23.** O diagrama liga o "Tenant Micro-Frontend
(Port 3002)" ao "Tenant BFF Service (Port 4002)". O BFF existe. O remote tenant não importa o
cliente (`adx-core/apps/tenant/src/App.tsx:1-12`) e só o declara nos `shared`
(`adx-core/apps/tenant/vite.config.ts:25`). O `CORS_ORIGIN` do README (`:87-88`) é detalhe de
infraestrutura.

**20. adx-core/docs/README.md:107.** O shell tem um único `ErrorBoundary`, em volta de todo o app
(`adx-core/apps/shell/src/App.tsx:35,65`). As rotas dos remotes ficam sem fronteira própria
(`:45-55`), e o fallback ocupa a tela inteira (`adx-core/apps/shell/src/components/ErrorBoundary.tsx:39-74`).
Uma falha ao baixar qualquer remote, ou um erro de renderização em file, user ou workflow, que não
têm `ErrorBoundary` próprio (ex.: `adx-core/apps/file/src/App.tsx:22-41`), derruba o shell e todas
as aplicações. Só auth, tenant e module isolam os próprios erros de renderização (ex.:
`adx-core/apps/auth/src/App.tsx:27`). O guia mostra um `ErrorBoundary` por rota
(`adx-core/docs/developer-guide/module-federation.md:197-244`), mas o código não faz isso. Repetem: `adx-core/docs/developer-guide/module-federation.md:1655`;
`task-22-completion-sync-report.md:19,56,102`.

**21. adx-core/docs/developer-guide/module-federation.md:26-27.** O diagrama põe React, React-DOM,
design system, event bus e contexto como dependências compartilhadas. Os sete `vite.config.ts`
declaram `react`, `react-dom`, `@adx-core/design-system`, `@adx-core/event-bus` e
`@adx-core/shared-context` como `singleton` (shell `:19-52`; ex.: auth `:19-27`, file `:17-23`).
Há diferenças que não mudam a afirmação. O shell acrescenta `react-router-dom`, `zustand` e
`@adx-core/i18n`. Os remotes acrescentam `@adx-core/bff-client` e não declaram `@adx-core/i18n`
(3.4.4 Notas). Repete: `adx-core/docs/developer-guide/module-federation.md:35`.

**22. adx-core/docs/developer-guide/module-federation.md:37.** O contexto não é estado global entre
as aplicações. O `SharedContextProvider` só aninha `AuthProvider`, `UserProvider` e `TenantProvider`
(`adx-core/packages/shared-context/src/providers/SharedContextProvider.tsx:10-19`), e cada um guarda
o estado em `useState` (ex.: `adx-core/packages/shared-context/src/providers/TenantProvider.tsx:33-34`). O shell monta o seu
(`adx-core/apps/shell/src/App.tsx:39`) e cada remote monta outro (ex.: `adx-core/apps/auth/src/App.tsx:30`).
Mesmo com o pacote `singleton`, cada árvore tem estado próprio, e uma troca de tenant no shell não
chega ao remote. Também não há contexto de tema na entrada do pacote
(`adx-core/packages/shared-context/src/index.ts:2-5`). O `theme-store.ts` e o `tenant-store.ts`, que
sincronizariam por eventos de DOM, não são alcançados (3.4.4). Repetem: `task-22-completion-sync-report.md:17,54,97`;
`adx-core/docs/user-guide/README.md:301` ("All micro-frontends update automatically" na troca de
tenant); `adx-core/docs/README.md:114`.

**23. adx-core/docs/developer-guide/team-autonomy.md:342-373.** A árvore descreve um repositório
por equipe (`team-workspace/` com `backend-service/`, `frontend-app/ # React micro-frontend`,
`bff-service/`, `docs/`, `scripts/`), e o passo seguinte clona `https://github.com/adxcore/auth-team.git`
(`:377-399`). O snapshot organiza todas as equipes num repositório só, por camada: aplicações em
`adx-core/apps/`, serviços no workspace Rust (`adx-core/Cargo.toml:2-15`) e BFFs em
`adx-core/bff-services/` (3.4.3). Nada lá corresponde à pasta por equipe. A classificação registra
`unit_organization: monorepo`.

**24. adx-core/docs/user-guide/README.md:44.** O shell envolve as rotas dos remotes com a própria
barra de navegação (`adx-core/apps/shell/src/App.tsx:43`). Ela tem links para dashboard, users,
files, workflows, modules e tenant (`adx-core/apps/shell/src/components/Navigation.tsx:25-30`) e o
`UserMenu` (`:74`), cujo botão "Sign In" leva a `/auth/login`
(`adx-core/apps/shell/src/components/UserMenu.tsx:23`). Repetem: `adx-core/docs/user-guide/README.md:57`
("provides access to all micro-frontend applications"), o que inclui os seis remotes; e
`task-22-completion-sync-report.md:16,55` (roteamento e navegação globais do shell para os micro-frontends,
que são as rotas por prefixo de `adx-core/apps/shell/src/App.tsx:46-55`).

**25. adx-core/packages/i18n/package.json:4.** A `description` apresenta o pacote como a
internacionalização dos micro-frontends. Só o shell o usa (`import i18n from '@adx-core/i18n'`,
`adx-core/apps/shell/src/App.tsx:8`). Nenhum remote o importa, e nenhum o declara nos `shared` (ex.:
`adx-core/apps/auth/vite.config.ts:19-27`; 3.4.4 Notas). O `changeLanguage` que avisaria as outras
unidades por evento de DOM não é exportado nem usado (3.4.4, `adx-core/packages/i18n/src/hooks.ts:19`).
Como biblioteca compartilhada, ela tem uma unidade só.

**26. adx-core/services/module-service/docs/developer-portal.md:44.** O portal diz que os módulos
de terceiros trazem componentes React integrados por Module Federation, "automatically …
The build process handles the configuration" (`adx-core/services/module-service/docs/developer-portal.md:517-519`). No snapshot, o shell só carrega a lista
fixa de seis remotes (`adx-core/apps/shell/vite.config.ts:11-18`; 3.4.4: o único `import()` é o do
shell), e não há SDK, CLI (`@adx-core/cli`) nem build de módulo com configuração de federação. O
mecanismo não tem artefato nem contra-artefato.

## Resumo

Afirmações: 26 (corroborada: 9, parcial: 7, contradita: 5, sem corroboração: 5). Temas: (estrutura: 3, composição: 16, build-deploy: 3, independência: 4).
