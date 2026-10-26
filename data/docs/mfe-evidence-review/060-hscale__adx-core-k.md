---
schema: 1
id: 1033705813
full_name: hscale/adx-core-k
commit: 683dec7ebc233c685f97166a135032d5668070c1
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 060 — hscale/adx-core-k

## Leitura do repositório

A arquitetura se sustenta por uma cadeia completa de Module Federation entre um shell React/Vite e seis remotes de domínio em `adx-core/apps/`:
- **Dependência:** `@originjs/vite-plugin-federation`, declarada nas sete aplicações (#1 a #7).
- **Configuração:** o shell declara os seis remotes (#11). Cada remote se declara como `<app>_app`, gera `remoteEntry.js`, expõe `./App` e compartilha as mesmas bibliotecas (#8 a #10, #12 a #14).
- **Código:** o shell carrega o `./App` de cada remote pelo nome (#15 a #20) e o monta sob um prefixo de rota numa tabela de rotas (#40).
- **Relações:** isso resulta em seis relações host → remote ativas (#59 a #64).

As unidades são mais fracas que a composição. Só o shell e o auth têm o limite de unidade confirmado (#42, #45). Os outros cinco remotes ficam ambíguos (#43, #44, #46 a #48): file, tenant, user e workflow não têm `index.html`, e os `exposes` de file, tenant, user, workflow e module apontam para arquivos ausentes. O module também importa componentes ausentes no próprio `./App`. As relações continuam ativas, porque o `./App` carregado existe nos seis. O histórico explica as lacunas: a maior parte vem do commit do snapshot, que recriou as aplicações em `adx-core/apps/` sem parte dos arquivos que existiam antes (#98).

Build e deploy mostram build separado nas sete aplicações, com deploy indeterminado (#65 a #71). Os workflows constroem e publicam `apps/<app>`, caminho que não existe no snapshot, e o shell aponta os remotes para `localhost` (#11). O histórico esclarece que os workflows são do estágio em que as aplicações ficavam na raiz (#102).

Três sinais enganam se lidos sozinhos:
- **Canais de eventos sem ligação:** o event bus, o i18n e o shared-context têm disparos e ouvintes de `CustomEvent` entre unidades (#21 a #26), mas em arquivos que nenhuma unidade alcança. A documentação afirma a coordenação por event bus e o estado global compartilhado, e os artefatos a desmentem (#84, #93). O histórico não diz se esses canais chegaram a ser usados (#99 a #101).
- **Eventos de teste:** treze construções de evento estão em testes Playwright de desktop e mobile e só simulam eventos de plataforma (#27 a #39).
- **Diretórios que não são frontend:** a raiz do workspace (#41), quatro BFFs em Node (#49 a #52), cinco bibliotecas compartilhadas (#53 a #57) e uma ferramenta de linha de comando (#58).

A documentação tem 26 afirmações, todas fracas pelo critério do protocolo: 9 corroboradas, 7 parciais, 5 contraditas e 5 sem corroboração. As corroboradas repetem a cadeia acima (#72, #73, #82, #86, #92). As contraditas tratam da comunicação entre unidades (#84, #93), do isolamento de falhas (#91), da estrutura por equipe (#94) e do i18n compartilhado (#96). Ficam como contexto, e não como evidência de MFE, a compatibilidade multiplataforma (#77) e as afirmações sobre os BFFs (#75, #87 a #90), cujo uso pelos remotes não tem artefato que funcione (#103).

## Observações

### 1. adx-core/apps/auth/package.json:41

**Observação:** `@originjs/vite-plugin-federation` (`^1.3.5`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do auth.

### 2. adx-core/apps/file/package.json:26

**Observação:** `@originjs/vite-plugin-federation` (`^1.3.5`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do file.

### 3. adx-core/apps/module/package.json:39

**Observação:** `@originjs/vite-plugin-federation` (`^1.3.5`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do module.

### 4. adx-core/apps/shell/package.json:40

**Observação:** `@originjs/vite-plugin-federation` (`^1.3.5`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do shell. A configuração e o código a usam.

### 5. adx-core/apps/tenant/package.json:36

**Observação:** `@originjs/vite-plugin-federation` (`^1.3.5`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do tenant.

### 6. adx-core/apps/user/package.json:26

**Observação:** `@originjs/vite-plugin-federation` (`^1.3.5`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do user.

### 7. adx-core/apps/workflow/package.json:26

**Observação:** `@originjs/vite-plugin-federation` (`^1.3.5`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do workflow.

### 8. adx-core/apps/auth/vite.config.ts:1-48

**Observação:** `federation` declara `name: 'auth_app'` e `filename: 'remoteEntry.js'`, expõe `./App` e cinco componentes (`./LoginForm`, `./RegisterForm`, `./MFASetup`, `./PasswordReset`, `./SSOLogin`) e compartilha como `singleton` `react`, `react-dom`, `@tanstack/react-query`, `@adx-core/design-system`, `@adx-core/shared-context`, `@adx-core/event-bus` e `@adx-core/bff-client`. Os seis módulos expostos existem.

**Interpretação:** O auth está configurado como remote e oferece a aplicação e componentes de domínio a um host.

**Nota:** Os outros arquivos de configuração citados nas tabelas não declaram elemento da composição e não viraram observação de configuração: os `package.json` das aplicações (scripts e manifesto) e o `workspaces` da raiz (`package.json:5-10`, estrutura); os `index.html` (entrada); os workflows de `.github/workflows/` (build e deploy, dimensão 6); o `adx-core/Cargo.toml` (backend). As portas de `server` e `preview` dos `vite.config.ts` são de desenvolvimento, e a 3.4.5 as marcou como apoio.

### 9. adx-core/apps/file/vite.config.ts:1-30

**Observação:** `federation` declara `name: 'file_app'` e `filename: 'remoteEntry.js'`, expõe `./App`, `./FileUpload`, `./FileBrowser` e `./FileViewer` e compartilha as mesmas sete bibliotecas como `singleton`. Só `./App` (`./src/App.tsx`) existe; os três componentes expostos estão ausentes.

**Interpretação:** O file está configurado como remote. A configuração promete mais módulos do que o diretório tem, e só a aplicação inteira pode ser oferecida a um host.

### 10. adx-core/apps/module/vite.config.ts:1-48

**Observação:** `federation` declara `name: 'module_app'` e `filename: 'remoteEntry.js'`, expõe `./App`, `./ModuleMarketplace`, `./ModuleManager`, `./ModuleInstaller`, `./ModuleSettings` e `./ModuleDeveloper` e compartilha as mesmas sete bibliotecas como `singleton`. Os três últimos módulos expostos estão ausentes.

**Interpretação:** O module está configurado como remote, com parte dos módulos expostos ausente.

### 11. adx-core/apps/shell/vite.config.ts:1-69

**Observação:** `federation` declara `name: 'shell'` e os remotes `auth_app`, `tenant_app`, `file_app`, `user_app`, `workflow_app` e `module_app`, cada um em `http://localhost:300N/assets/remoteEntry.js` (N de 1 a 6). Compartilha como `singleton` `react`, `react-dom`, `react-router-dom`, `@tanstack/react-query` e `zustand`, com `requiredVersion`, e `@adx-core/shared-context`, `@adx-core/design-system`, `@adx-core/event-bus` e `@adx-core/i18n`. Não expõe módulos.

**Interpretação:** A configuração do host declara as seis unidades de domínio como remotes. Os endereços são de desenvolvimento: nenhuma configuração do snapshot liga o shell aos endereços publicados.

### 12. adx-core/apps/tenant/vite.config.ts:1-47

**Observação:** `federation` declara `name: 'tenant_app'` e `filename: 'remoteEntry.js'`, expõe `./App`, `./TenantSwitcher`, `./TenantSettings`, `./TenantMembers` e `./TenantBilling` e compartilha as mesmas sete bibliotecas como `singleton`. `./TenantSwitcher` aponta para arquivo ausente.

**Interpretação:** O tenant está configurado como remote, com um módulo exposto ausente.

### 13. adx-core/apps/user/vite.config.ts:1-30

**Observação:** `federation` declara `name: 'user_app'` e `filename: 'remoteEntry.js'`, expõe `./App`, `./UserProfile`, `./UserList` e `./UserSettings` e compartilha as mesmas sete bibliotecas como `singleton`. Só `./App` existe.

**Interpretação:** O user está configurado como remote. Como no file, só a aplicação inteira pode ser oferecida a um host.

### 14. adx-core/apps/workflow/vite.config.ts:1-30

**Observação:** `federation` declara `name: 'workflow_app'` e `filename: 'remoteEntry.js'`, expõe `./App`, `./WorkflowList`, `./WorkflowStatus` e `./WorkflowHistory` e compartilha as mesmas sete bibliotecas como `singleton`. Só `./App` existe.

**Interpretação:** O workflow está configurado como remote. Como no file, só a aplicação inteira pode ser oferecida a um host.

### 15. adx-core/apps/shell/src/App.tsx:16

**Observação:** `const AuthApp = React.lazy(() => import('auth_app/App'))`.

**Interpretação:** O shell carrega o módulo `./App` do remote auth pelo nome.

### 16. adx-core/apps/shell/src/App.tsx:17

**Observação:** `const TenantApp = React.lazy(() => import('tenant_app/App'))`.

**Interpretação:** O shell carrega o módulo `./App` do remote tenant pelo nome.

### 17. adx-core/apps/shell/src/App.tsx:18

**Observação:** `const FileApp = React.lazy(() => import('file_app/App'))`.

**Interpretação:** O shell carrega o módulo `./App` do remote file pelo nome.

### 18. adx-core/apps/shell/src/App.tsx:19

**Observação:** `const UserApp = React.lazy(() => import('user_app/App'))`.

**Interpretação:** O shell carrega o módulo `./App` do remote user pelo nome.

### 19. adx-core/apps/shell/src/App.tsx:20

**Observação:** `const WorkflowApp = React.lazy(() => import('workflow_app/App'))`.

**Interpretação:** O shell carrega o módulo `./App` do remote workflow pelo nome.

### 20. adx-core/apps/shell/src/App.tsx:21

**Observação:** `const ModuleApp = React.lazy(() => import('module_app/App'))`.

**Interpretação:** O shell carrega o módulo `./App` do remote module pelo nome.

### 21. adx-core/packages/event-bus/src/EventBus.tsx:49; adx-core/packages/event-bus/src/index.ts:2

**Observação:** `window.dispatchEvent(new CustomEvent(\`adx:${eventType}\`, …))`, após o comentário "Also emit as custom DOM event for cross-micro-frontend communication". A entrada do pacote exporta só `./providers/EventBusProvider`, e nenhuma unidade importa `EventBus.tsx`.

**Interpretação:** Um canal de eventos entre unidades está implementado e não é alcançado por nenhuma unidade.

### 22. adx-core/packages/i18n/src/hooks.ts:19; adx-core/packages/i18n/src/index.ts:26

**Observação:** `window.dispatchEvent(new CustomEvent('adx-language-changed', …))` em `changeLanguage`. A entrada do pacote só exporta a instância do i18next, nenhuma unidade importa o hook, e não há ouvinte desse evento no snapshot.

**Interpretação:** Um aviso de troca de idioma entre unidades está implementado e não é usado.

### 23. adx-core/packages/shared-context/src/tenant-store.ts:77; adx-core/packages/shared-context/src/index.ts:2-5

**Observação:** `window.dispatchEvent(new CustomEvent('tenant:switched', …))` após a troca de tenant. `tenant-store.ts` não é exportado pela entrada do pacote nem importado por nenhuma unidade.

**Interpretação:** Um aviso de troca de tenant entre unidades está implementado e não é alcançado.

### 24. adx-core/packages/shared-context/src/theme-store.ts:33; adx-core/packages/shared-context/src/index.ts:2-5

**Observação:** `window.dispatchEvent(new CustomEvent('theme:changed', …))` em `setTheme`, após o comentário "Emit theme change event for micro-frontends". `theme-store.ts` não é exportado pela entrada do pacote nem importado por nenhuma unidade.

**Interpretação:** Um aviso de troca de tema entre unidades está implementado e não é alcançado.

### 25. adx-core/packages/shared-context/src/theme-store.ts:142

**Observação:** `window.addEventListener('theme:changed', …)` registrado no carregamento do módulo, após o comentário "Listen for theme changes from other micro-frontends", no mesmo arquivo de #24.

**Interpretação:** O lado que escuta o canal de tema existe e também não é alcançado.

### 26. adx-core/packages/shared-context/src/theme-store.ts:162

**Observação:** `window.addEventListener('theme:changed', …)` dentro de `useThemeSync`. O hook não é exportado pela entrada do pacote nem usado por nenhuma unidade.

**Interpretação:** Um segundo ouvinte do canal de tema existe e não é usado.

### 27. tests/desktop/tauri-integration.test.ts:129

**Observação:** `new CustomEvent('tauri://deep-link')`, dentro de um `page.evaluate` de teste Playwright.

**Interpretação:** O teste simula um deep link do Tauri. Não é construção de composição.

### 28. tests/desktop/tauri-integration.test.ts:132

**Observação:** `window.dispatchEvent(event)` do mesmo evento simulado.

**Interpretação:** É o disparo do evento simulado no teste. Não é construção de composição.

### 29. tests/mobile/android-integration.test.ts:89

**Observação:** `element.dispatchEvent(touchEvent)`, num teste de gesto de toque.

**Interpretação:** O teste simula um gesto. Não é construção de composição.

### 30. tests/mobile/android-integration.test.ts:189

**Observação:** `window.dispatchEvent(new Event('orientationchange'))`.

**Interpretação:** O teste simula a rotação de tela. Não é construção de composição.

### 31. tests/mobile/android-integration.test.ts:240

**Observação:** `window.dispatchEvent(new Event('pagehide'))`.

**Interpretação:** O teste simula a aplicação indo para segundo plano. Não é construção de composição.

### 32. tests/mobile/android-integration.test.ts:241

**Observação:** `document.dispatchEvent(new Event('visibilitychange'))`, no mesmo cenário de #31.

**Interpretação:** É parte da mesma simulação de teste. Não é construção de composição.

### 33. tests/mobile/android-integration.test.ts:256

**Observação:** `window.dispatchEvent(new Event('pageshow'))`.

**Interpretação:** O teste simula o retorno ao primeiro plano. Não é construção de composição.

### 34. tests/mobile/android-integration.test.ts:257

**Observação:** `document.dispatchEvent(new Event('visibilitychange'))`, no mesmo cenário de #33.

**Interpretação:** É parte da mesma simulação de teste. Não é construção de composição.

### 35. tests/mobile/ios-integration.test.ts:170

**Observação:** `window.dispatchEvent(new Event('pagehide'))`.

**Interpretação:** O teste simula a aplicação indo para segundo plano. Não é construção de composição.

### 36. tests/mobile/ios-integration.test.ts:171

**Observação:** `document.dispatchEvent(new Event('visibilitychange'))`, no mesmo cenário de #35.

**Interpretação:** É parte da mesma simulação de teste. Não é construção de composição.

### 37. tests/mobile/ios-integration.test.ts:186

**Observação:** `window.dispatchEvent(new Event('pageshow'))`.

**Interpretação:** O teste simula o retorno ao primeiro plano. Não é construção de composição.

### 38. tests/mobile/ios-integration.test.ts:187

**Observação:** `document.dispatchEvent(new Event('visibilitychange'))`, no mesmo cenário de #37.

**Interpretação:** É parte da mesma simulação de teste. Não é construção de composição.

### 39. tests/mobile/ios-integration.test.ts:231

**Observação:** `window.dispatchEvent(event)` de um `DeviceMotionEvent` simulado.

**Interpretação:** O teste simula o movimento do aparelho. Não é construção de composição.

### 40. adx-core/apps/shell/src/App.tsx:46-55

**Observação:** A tabela `Routes` do shell liga `/auth/*` a `AuthApp`, `/tenant/*` a `TenantApp`, `/files/*` a `FileApp`, `/users/*` a `UserApp`, `/workflows/*` a `WorkflowApp` e `/modules/*` a `ModuleApp`, os seis componentes de #15 a #20, dentro de um `Suspense`.

**Interpretação:** O host declara sob quais caminhos cada remote é montado.

### 41. .; package.json:1-26

**Observação:** É a raiz `adx-core-monorepo`, que declara `workspaces` (`apps/*`, `packages/*`, `bff-services/*`, `tools/*`) e delega o build com `yarn workspaces run build`. Não tem entrada nem build de aplicação. Os padrões do workspace não alcançam os diretórios de `adx-core/`.

**Interpretação:** É uma raiz de coordenação, não uma unidade frontend. O workspace não cobre as aplicações do snapshot.

### 42. adx-core/apps/auth; adx-core/apps/auth/package.json:1-9; adx-core/apps/auth/index.html:10-11; adx-core/apps/auth/src/main.tsx:6-10; adx-core/apps/auth/vite.config.ts:5-48

**Observação:** É uma aplicação React com manifesto, entrada e build Vite próprios. Os módulos expostos estão presentes.

**Interpretação:** É uma unidade frontend com limite próprio.

### 43. adx-core/apps/file; adx-core/apps/file/package.json:1-9; adx-core/apps/file/vite.config.ts:5-30

**Observação:** Tem manifesto e build Vite próprios, mas não tem `index.html`, e os `exposes` de `vite.config.ts:13-15` apontam para `src/components/*` ausentes. O diretório só tem `src/App.tsx` além do manifesto e da configuração.

**Interpretação:** O limite da unidade é ambíguo. Duas leituras continuam plausíveis: um remote incompleto, que só existiria montado pelo shell, ou um diretório esboçado cujo build não se completa no snapshot.

### 44. adx-core/apps/module; adx-core/apps/module/package.json:1-9; adx-core/apps/module/index.html:10-11; adx-core/apps/module/src/main.tsx:4, 6-10; adx-core/apps/module/vite.config.ts:5-48

**Observação:** Tem manifesto, entrada e build Vite próprios, mas os `exposes` de `vite.config.ts:15-17` apontam para arquivos ausentes, e `src/main.tsx:4` importa `./index.css`, ausente.

**Interpretação:** O limite da unidade é ambíguo. A aplicação tem tudo para rodar sozinha, mas o build depende de arquivos que não estão no snapshot.

### 45. adx-core/apps/shell; adx-core/apps/shell/package.json:1-9; adx-core/apps/shell/index.html:10-11; adx-core/apps/shell/src/main.tsx:6-10; adx-core/apps/shell/vite.config.ts:6-69

**Observação:** É uma aplicação React com manifesto, entrada e build Vite próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 46. adx-core/apps/tenant; adx-core/apps/tenant/package.json:1-9; adx-core/apps/tenant/vite.config.ts:5-47

**Observação:** Tem manifesto e build Vite próprios, mas não tem `index.html`, e o expose de `vite.config.ts:13` aponta para `src/components/TenantSwitcher.tsx`, ausente.

**Interpretação:** O limite da unidade é ambíguo: um remote incompleto, que só existiria montado pelo shell, ou um diretório cujo build não se completa no snapshot.

### 47. adx-core/apps/user; adx-core/apps/user/package.json:1-9; adx-core/apps/user/vite.config.ts:5-30

**Observação:** Tem manifesto e build Vite próprios, mas não tem `index.html`, e os `exposes` de `vite.config.ts:13-15` apontam para `src/components/*` ausentes.

**Interpretação:** O limite da unidade é ambíguo, nas mesmas duas leituras de #43.

### 48. adx-core/apps/workflow; adx-core/apps/workflow/package.json:1-9; adx-core/apps/workflow/vite.config.ts:5-30

**Observação:** Tem manifesto e build Vite próprios, mas não tem `index.html`, e os `exposes` de `vite.config.ts:13-15` apontam para `src/components/*` ausentes.

**Interpretação:** O limite da unidade é ambíguo, nas mesmas duas leituras de #43.

### 49. adx-core/bff-services/auth-bff; adx-core/bff-services/auth-bff/package.json:7-9

**Observação:** É um servidor Node em Express (`tsx watch src/server.ts`, `tsc`), sem entrada de aplicação frontend.

**Interpretação:** É um serviço BFF, não uma unidade frontend.

### 50. adx-core/bff-services/file-bff; adx-core/bff-services/file-bff/package.json:8-10

**Observação:** É um servidor Node em Express (`tsx watch src/server.ts`, `tsc`), sem entrada de aplicação frontend.

**Interpretação:** É um serviço BFF, não uma unidade frontend.

### 51. adx-core/bff-services/module-bff; adx-core/bff-services/module-bff/package.json:7-9

**Observação:** É um servidor Node em Express (`tsx watch src/server.ts`, `tsc`), sem entrada de aplicação frontend.

**Interpretação:** É um serviço BFF, não uma unidade frontend.

### 52. adx-core/bff-services/tenant-bff; adx-core/bff-services/tenant-bff/package.json:7-9

**Observação:** É um servidor Node em Express (`tsx watch src/server.ts`, `tsc`), sem entrada de aplicação frontend.

**Interpretação:** É um serviço BFF, não uma unidade frontend.

### 53. adx-core/packages/bff-client; adx-core/packages/bff-client/package.json:5, 8

**Observação:** Tem `main: dist/index.js` e build `tsc`, sem entrada de aplicação.

**Interpretação:** É uma biblioteca compartilhada, não uma unidade frontend.

### 54. adx-core/packages/design-system; adx-core/packages/design-system/package.json:5, 8

**Observação:** Tem `main: dist/index.js` e build `tsc && vite build`, sem `vite.config.*` no diretório e sem entrada de aplicação.

**Interpretação:** É uma biblioteca de componentes, não uma unidade frontend.

### 55. adx-core/packages/event-bus; adx-core/packages/event-bus/package.json:5, 8

**Observação:** Tem `main: dist/index.js` e build `tsc`, sem entrada de aplicação.

**Interpretação:** É uma biblioteca compartilhada, não uma unidade frontend.

### 56. adx-core/packages/i18n; adx-core/packages/i18n/package.json:5, 8

**Observação:** Tem `main: dist/index.js` e build `tsc`, sem entrada de aplicação.

**Interpretação:** É uma biblioteca compartilhada, não uma unidade frontend.

### 57. adx-core/packages/shared-context; adx-core/packages/shared-context/package.json:5, 8

**Observação:** Tem `main: dist/index.js` e build `tsc`, sem entrada de aplicação.

**Interpretação:** É uma biblioteca compartilhada, não uma unidade frontend.

### 58. tools/kiro-github-task-sync; tools/kiro-github-task-sync/package.json:7-9; package.json:9

**Observação:** Tem só o `package.json`, com `tsc` e `tsx watch src/index.ts`, sem `src/` no diretório. É membro do workspace da raiz (`package.json:9`).

**Interpretação:** É uma ferramenta de linha de comando, não uma unidade frontend.

### 59. adx-core/apps/shell/src/App.tsx:16, 48; adx-core/apps/shell/vite.config.ts:12; adx-core/apps/auth/vite.config.ts:9-12; adx-core/apps/auth/src/App.tsx:53

**Observação:** O shell carrega `auth_app/App` e o monta em `/auth/*`. O nome e o `remoteEntry.js` correspondem à configuração do auth, que expõe `./App`, presente (`adx-core/apps/auth/src/App.tsx:53`).

**Interpretação:** É uma relação host → remote ativa. É o único par cujo destino tem limite de unidade confirmado e todos os módulos expostos presentes.

### 60. adx-core/apps/shell/src/App.tsx:17, 49; adx-core/apps/shell/vite.config.ts:13; adx-core/apps/tenant/vite.config.ts:9-12; adx-core/apps/tenant/src/App.tsx:51

**Observação:** O shell carrega `tenant_app/App` e o monta em `/tenant/*`. O nome e o `remoteEntry.js` correspondem à configuração do tenant, cujo `./App` existe (`adx-core/apps/tenant/src/App.tsx:51`).

**Interpretação:** É uma relação host → remote ativa, com destino de limite ambíguo (#46).

### 61. adx-core/apps/shell/src/App.tsx:18, 50; adx-core/apps/shell/vite.config.ts:14; adx-core/apps/file/vite.config.ts:9-12; adx-core/apps/file/src/App.tsx:43

**Observação:** O shell carrega `file_app/App` e o monta em `/files/*`. O nome e o `remoteEntry.js` correspondem à configuração do file, cujo `./App` existe (`adx-core/apps/file/src/App.tsx:43`).

**Interpretação:** É uma relação host → remote ativa, com destino de limite ambíguo (#43).

### 62. adx-core/apps/shell/src/App.tsx:19, 51; adx-core/apps/shell/vite.config.ts:15; adx-core/apps/user/vite.config.ts:9-12; adx-core/apps/user/src/App.tsx:43

**Observação:** O shell carrega `user_app/App` e o monta em `/users/*`. O nome e o `remoteEntry.js` correspondem à configuração do user, cujo `./App` existe (`adx-core/apps/user/src/App.tsx:43`).

**Interpretação:** É uma relação host → remote ativa, com destino de limite ambíguo (#47).

### 63. adx-core/apps/shell/src/App.tsx:20, 52; adx-core/apps/shell/vite.config.ts:16; adx-core/apps/workflow/vite.config.ts:9-12; adx-core/apps/workflow/src/App.tsx:43

**Observação:** O shell carrega `workflow_app/App` e o monta em `/workflows/*`. O nome e o `remoteEntry.js` correspondem à configuração do workflow, cujo `./App` existe (`adx-core/apps/workflow/src/App.tsx:43`).

**Interpretação:** É uma relação host → remote ativa, com destino de limite ambíguo (#48).

### 64. adx-core/apps/shell/src/App.tsx:21, 53; adx-core/apps/shell/vite.config.ts:17; adx-core/apps/module/vite.config.ts:9-12; adx-core/apps/module/src/App.tsx:10-12, 54

**Observação:** O shell carrega `module_app/App` e o monta em `/modules/*`. O nome e o `remoteEntry.js` correspondem à configuração do module. O `./App` existe (`adx-core/apps/module/src/App.tsx:54`), mas importa `ModuleInstaller`, `ModuleSettings` e `ModuleDeveloper`, ausentes (`adx-core/apps/module/src/App.tsx:10-12`).

**Interpretação:** É uma relação host → remote ativa. O módulo carregado não se resolve inteiro no snapshot.

### 65. adx-core/apps/auth/vite.config.ts:5-48; adx-core/apps/auth/package.json:8; .github/workflows/deploy-microfrontends.yml:105-111, 151-170, 189-193; .github/workflows/deploy-production.yml:208-236, 305-335

**Observação:** Tem configuração e `tsc && vite build` próprios, e o build gera o próprio `remoteEntry.js`. Os dois workflows constroem e publicam a aplicação à parte, em caminho próprio do S3, mas usam o caminho `apps/auth`, que não existe no snapshot. A versão registrada é o commit do repositório inteiro.

**Interpretação:** Há uma fronteira de build própria. O deploy separado não se confirma, porque os workflows não correspondem ao caminho da aplicação.

### 66. adx-core/apps/file/vite.config.ts:5-30; adx-core/apps/file/package.json:8; .github/workflows/deploy-microfrontends.yml:105-111, 129-132, 151-170; .github/workflows/deploy-production.yml:208-236, 305-335

**Observação:** Tem configuração e `tsc && vite build` próprios, com exposes para arquivos ausentes. Os workflows usam o caminho `apps/file`. A verificação do workflow exige `index.html` no `dist` (`.github/workflows/deploy-microfrontends.yml:129-132`), e a pasta não tem `index.html`.

**Interpretação:** Há uma fronteira de build própria. O deploy separado não se confirma.

### 67. adx-core/apps/module/vite.config.ts:5-48; adx-core/apps/module/src/main.tsx:4; adx-core/apps/module/package.json:8; .github/workflows/deploy-microfrontends.yml:45, 105-111, 151-170; .github/workflows/deploy-production.yml:213, 311

**Observação:** Tem configuração e `tsc && vite build` próprios, com exposes e um import para arquivos ausentes. Só o `deploy-microfrontends.yml` o inclui na matriz, com o caminho `apps/module`; a matriz do `deploy-production.yml` não o tem.

**Interpretação:** Há uma fronteira de build própria. O deploy separado não se confirma.

### 68. adx-core/apps/shell/vite.config.ts:6-69; adx-core/apps/shell/package.json:8; .github/workflows/deploy-microfrontends.yml:105-111, 151-165; .github/workflows/deploy-production.yml:208-236, 305-335

**Observação:** Tem configuração e `tsc && vite build` próprios. Um workflow o publica na raiz do ambiente, e o outro em `shell/`, ambos com o caminho `apps/shell`. Publicado, carregaria os remotes de `localhost`.

**Interpretação:** Há uma fronteira de build própria. O deploy separado não se confirma, e não há configuração que ligue o shell aos remotes publicados.

### 69. adx-core/apps/tenant/vite.config.ts:5-47; adx-core/apps/tenant/package.json:8; .github/workflows/deploy-microfrontends.yml:105-111, 129-132, 151-170; .github/workflows/deploy-production.yml:208-236, 305-335

**Observação:** Tem configuração e `tsc && vite build` próprios, com um expose para arquivo ausente. Os workflows usam o caminho `apps/tenant`, e a pasta não tem o `index.html` que a verificação do workflow exige.

**Interpretação:** Há uma fronteira de build própria. O deploy separado não se confirma.

### 70. adx-core/apps/user/vite.config.ts:5-30; adx-core/apps/user/package.json:8; .github/workflows/deploy-microfrontends.yml:105-111, 151-170; .github/workflows/deploy-production.yml:208-236, 305-335

**Observação:** Tem configuração e `tsc && vite build` próprios, com exposes para arquivos ausentes e sem `index.html`. Os workflows usam o caminho `apps/user`.

**Interpretação:** Há uma fronteira de build própria. O deploy separado não se confirma.

### 71. adx-core/apps/workflow/vite.config.ts:5-30; adx-core/apps/workflow/package.json:8; .github/workflows/deploy-microfrontends.yml:105-111, 151-170; .github/workflows/deploy-production.yml:208-236, 305-335

**Observação:** Tem configuração e `tsc && vite build` próprios, com exposes para arquivos ausentes e sem `index.html`. Os workflows usam o caminho `apps/workflow`.

**Interpretação:** Há uma fronteira de build própria. O deploy separado não se confirma.

### 72. DEV-SETUP.md:43

**Observação:** "**Frontend Micro-Apps**: Shell, Auth, Tenant, File, User, Workflow, Module apps".

**Interpretação:** Lista as sete aplicações frontend. A afirmação é corroborada.

### 73. DEV-SETUP.md:244

**Observação:** "**Frontend Microservices**: Module Federation for …".

**Interpretação:** Nomeia Module Federation como a tecnologia de composição do frontend. A afirmação é corroborada.

### 74. DEV-SETUP.md:244

**Observação:** "… for independent micro-apps".

**Interpretação:** Afirma que as aplicações são independentes. O build é separado nas sete, mas só shell, auth e module têm entrada para rodar sozinhos. A afirmação é corroborada em parte.

### 75. DEV-SETUP.md:246

**Observação:** "**BFF Pattern**: Optional optimization layer for frontend data aggregation".

**Interpretação:** Afirma uma camada de BFF para o frontend. Os BFFs existem, mas só o module tenta usar o cliente, por um hook que o pacote não exporta. A afirmação é corroborada em parte.

### 76. FINAL_TESTING_REPORT.md:124

**Observação:** "Shared context and event bus architecture".

**Interpretação:** Afirma contexto e event bus compartilhados. As sete aplicações importam os dois pacotes. A afirmação é corroborada no sentido de pacote, sem dizer como o estado e os eventos circulam.

### 77. FINAL_TESTING_REPORT.md:125

**Observação:** "Cross-platform compatibility framework".

**Interpretação:** Afirma compatibilidade multiplataforma. Nada no snapshot confirma nem desmente. A afirmação fica sem corroboração.

### 78. PROJECT_REPORT.md:77

**Observação:** "**Styling**: TailwindCSS with shared design system".

**Interpretação:** Afirma um design system compartilhado. As sete aplicações importam `@adx-core/design-system`. A afirmação é corroborada.

### 79. PROJECT_REPORT.md:153

**Observação:** "Team autonomy …".

**Interpretação:** Afirma autonomia de equipe. O snapshot não mostra quem desenvolve cada unidade. A afirmação fica sem corroboração.

### 80. PROJECT_REPORT.md:153

**Observação:** "… and independent deployments".

**Interpretação:** Afirma deploy independente. O build é separado e há um job de publicação por aplicação, mas o deploy fica indeterminado nas sete. A afirmação é corroborada em parte.

### 81. PROJECT_REPORT.md:154

**Observação:** "Technology flexibility per domain".

**Interpretação:** Afirma liberdade de tecnologia por domínio. As sete aplicações usam a mesma pilha, o que nem confirma nem desmente a possibilidade. A afirmação fica sem corroboração.

### 82. adx-core-final-sync-manager-summary.md:45

**Observação:** "**✅ Shell Application:** Module Federation host (port 3000)".

**Interpretação:** Atribui ao shell o papel de host. A afirmação é corroborada.

### 83. adx-core-final-sync-manager-summary.md:71

**Observação:** "**✅ Team Autonomy:** Vertical slice ownership (backend + frontend + BFF)".

**Interpretação:** Afirma uma fatia vertical por domínio. Para cada remote há um serviço Rust e um BFF com o mesmo domínio. A afirmação é corroborada na parte estrutural.

### 84. adx-core-final-sync-manager-summary.md:73

**Observação:** "**✅ Event Bus Communication:** Cross-micro-frontend coordination".

**Interpretação:** Afirma coordenação entre micro-frontends por event bus. O provider que as unidades montam só propaga eventos na própria árvore React, e o disparo no DOM não é alcançado. A afirmação é contradita.

### 85. adx-core-final-sync-manager-summary.md:110

**Observação:** "**✅ Scalable Architecture:** Independent scaling of all services and micro-frontends".

**Interpretação:** Afirma escala independente dos micro-frontends. Nenhum artefato trata de escala por aplicação. A afirmação fica sem corroboração.

### 86. adx-core/apps/shell/src/App.tsx:15

**Observação:** "// Dynamic imports for micro-frontends".

**Interpretação:** Anuncia a carga dinâmica dos micro-frontends nas linhas seguintes. A afirmação é corroborada.

### 87. adx-core/bff-services/auth-bff/README.md:3

**Observação:** "This service acts as a Temporal workflow client and provides optimized APIs for the Auth micro-frontend."

**Interpretação:** Liga o BFF ao remote auth. O BFF existe, e o remote não o usa. A afirmação é corroborada em parte.

### 88. adx-core/bff-services/file-bff/README.md:3

**Observação:** "This service acts as a Temporal workflow client and provides optimized APIs for file management micro-frontends."

**Interpretação:** Liga o BFF ao remote file. O BFF existe, e o remote não o usa. A afirmação é corroborada em parte.

### 89. adx-core/bff-services/module-bff/README.md:3

**Observação:** "This service acts as a Temporal workflow client and provides optimized APIs for the Module micro-frontend."

**Interpretação:** Liga o BFF ao remote module. O remote chama um cliente de BFF, mas por um hook que não existe no pacote, e a URL do BFF não é definida. A afirmação é corroborada em parte.

### 90. adx-core/bff-services/tenant-bff/README.md:17-23

**Observação:** Diagrama "Tenant Micro- Frontend (Port 3002) ◄──► Tenant BFF Service (Port 4002) ◄──► Backend Services".

**Interpretação:** Liga o BFF ao remote tenant. O BFF existe, e o remote não o usa. A afirmação é corroborada em parte.

### 91. adx-core/docs/README.md:107

**Observação:** "**Fault isolation** between applications".

**Interpretação:** Afirma isolamento de falhas entre aplicações. O shell tem um único `ErrorBoundary` em volta de tudo, e as rotas dos remotes não têm fronteira própria. A afirmação é contradita.

### 92. adx-core/docs/developer-guide/module-federation.md:26-27

**Observação:** Diagrama "Shared Dependencies │ React, React-DOM, Design System, Event Bus, Context".

**Interpretação:** Lista as dependências compartilhadas da federação. Os sete `vite.config.ts` as declaram como `singleton`. A afirmação é corroborada.

### 93. adx-core/docs/developer-guide/module-federation.md:37

**Observação:** "**Shared Context**: Global state management for authentication, tenant, and theme".

**Interpretação:** Afirma estado global entre as aplicações. Cada unidade monta o próprio provider com estado local, e os stores que sincronizariam por eventos não são alcançados. A afirmação é contradita.

### 94. adx-core/docs/developer-guide/team-autonomy.md:342-373

**Observação:** "Each team maintains their own development environment" e a árvore `team-workspace/` (`backend-service/`, `frontend-app/ # React micro-frontend`, `bff-service/`, …).

**Interpretação:** Descreve um repositório por equipe. O snapshot organiza tudo num repositório só, por camada. A afirmação é contradita.

### 95. adx-core/docs/user-guide/README.md:44

**Observação:** "**Shell Application**: Main navigation and shared components".

**Interpretação:** Atribui ao shell a navegação comum. O shell envolve as rotas dos remotes com a própria barra de navegação. A afirmação é corroborada.

### 96. adx-core/packages/i18n/package.json:4

**Observação:** "Internationalization for ADX Core micro-frontends".

**Interpretação:** Apresenta o pacote como a internacionalização dos micro-frontends. Só o shell o usa, nenhum remote o compartilha, e o aviso entre unidades não é usado. A afirmação é contradita.

### 97. adx-core/services/module-service/docs/developer-portal.md:44

**Observação:** "**Frontend Components**: React components with Module Federation".

**Interpretação:** Afirma que módulos de terceiros entram por Module Federation. O snapshot não tem artefato nem contra-artefato desse mecanismo. A afirmação fica sem corroboração.

### 98. 1705eaf 2025-08-13 (apps/auth, apps/tenant); 1920432 2025-08-16 (apps/file, apps/module, apps/user, apps/workflow); 683dec7 2025-08-28 (apps/, adx-core/apps/)

**Observação:** Até o commit anterior ao snapshot, cada aplicação ficava em `apps/<app>` e tinha `index.html`. O commit do snapshot apaga essa árvore e recria `adx-core/apps/` sem o `index.html` de file, tenant, user e workflow e sem parte dos componentes que os exposes e imports pedem, que existiam antes. Cinco nomes expostos ou importados não aparecem em nenhum commit.

**Interpretação:** As lacunas vêm sobretudo da recriação das aplicações no commit do snapshot, e não de abandono gradual. O ponto está esclarecido, e as unidades continuam ambíguas no snapshot.

### 99. 7fac338 2025-08-13 (packages/event-bus/src/EventBus.tsx); 683dec7 2025-08-28 (adx-core/packages/event-bus/src/index.ts, providers/EventBusProvider.tsx)

**Observação:** `EventBus.tsx` chega ao snapshot sem mudança desde a criação. A entrada do pacote foi reescrita e o provider foi criado no commit do snapshot. A versão anterior da entrada não está disponível.

**Interpretação:** Não se sabe se o canal de eventos de DOM chegou a ser exportado ou usado. A dúvida é só sobre o passado: no snapshot, o canal não é alcançado.

### 100. d4d1897 2025-08-16 (packages/i18n/src/hooks.ts); 683dec7 2025-08-28 (adx-core/packages/i18n/src/index.ts)

**Observação:** `hooks.ts` chega ao snapshot sem mudança. A entrada do pacote foi alterada no commit do snapshot, e a versão anterior não está disponível.

**Interpretação:** Não se sabe se o aviso de idioma chegou a ser exportado ou usado. A dúvida é só sobre o passado.

### 101. 7fac338 2025-08-13 (packages/shared-context/src/tenant-store.ts, theme-store.ts); 1920432 2025-08-16 (theme-store.ts); 683dec7 2025-08-28 (adx-core/packages/shared-context/src/index.ts, providers/)

**Observação:** Os dois stores chegam ao snapshot sem mudança desde 2025-08-16. A entrada do pacote foi reescrita e os providers foram criados no commit do snapshot. A versão anterior da entrada não está disponível.

**Interpretação:** Não se sabe se os stores chegaram a ser exportados ou usados. A dúvida é só sobre o passado.

### 102. 1920432 2025-08-16 (apps/); d4d1897 2025-08-16 (.github/workflows/deploy-microfrontends.yml, deploy-production.yml); 683dec7 2025-08-28 (adx-core/apps/)

**Observação:** Os workflows de deploy são criados quando as sete aplicações ficavam em `apps/<app>` e não mudam até o snapshot. O commit do snapshot move as aplicações para `adx-core/apps/` sem tocar nos workflows.

**Interpretação:** Os workflows pertencem ao estágio anterior. O ponto está esclarecido, e o deploy continua indeterminado.

### 103. 1705eaf 2025-08-13 (apps/<app>/src/services/<app>BFFClient.ts); 1920432 2025-08-16 (bff-services/*/README.md); 978acbf 2025-08-16 (bff-services/auth-bff/README.md); 683dec7 2025-08-28 (adx-core/packages/bff-client)

**Observação:** Os READMEs dos BFFs são do estágio em que cada aplicação tinha um cliente próprio do seu BFF. O commit do snapshot apaga os seis clientes e cria o pacote `bff-client`, que os remotes não importam.

**Interpretação:** O desencontro entre os READMEs e o snapshot vem da troca dos clientes pelo pacote. O ponto está esclarecido.

### 104. 7fac338 2025-08-13 (apps/shell/src/App.tsx, ErrorBoundary.tsx); 1920432 2025-08-16 (apps/shell/src/App.tsx); d4d1897 2025-08-16 (docs/README.md, docs/developer-guide/module-federation.md); 683dec7 2025-08-28 (adx-core/apps/shell/src/App.tsx)

**Observação:** Os guias chegam ao snapshot sem mudança. O `App.tsx` do shell é reescrito no commit do snapshot, e as versões anteriores não estão disponíveis.

**Interpretação:** Não se sabe se o shell teve um `ErrorBoundary` por rota. A dúvida é só sobre o passado: no snapshot, o isolamento não existe.

### 105. d4d1897 2025-08-16 (docs/developer-guide/team-autonomy.md)

**Observação:** O guia de autonomia chega ao snapshot sem mudança de conteúdo. Nenhum commit tem caminho com `team-workspace`, `frontend-app` ou `auth-frontend`.

**Interpretação:** A estrutura por equipe não pertence a um estágio anterior do repositório. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (adx-core/apps/auth/package.json:41) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #8 |
| 2 | 3.4.2 (adx-core/apps/file/package.json:26) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #9 |
| 3 | 3.4.2 (adx-core/apps/module/package.json:39) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #10 |
| 4 | 3.4.2 (adx-core/apps/shell/package.json:40) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #11; declara #15; declara #16; declara #17; declara #18; declara #19; declara #20 |
| 5 | 3.4.2 (adx-core/apps/tenant/package.json:36) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #12 |
| 6 | 3.4.2 (adx-core/apps/user/package.json:26) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #13 |
| 7 | 3.4.2 (adx-core/apps/workflow/package.json:26) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #14 |
| 8 | 3.4.2 (adx-core/apps/auth/package.json:41, Evidência); 3.4.3 (adx-core/apps/auth, Marcadores e Build); 3.4.4 (adx-core/apps/shell/src/App.tsx:16, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #16, #21, #25 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #42; configura #59 |
| 9 | 3.4.2 (adx-core/apps/file/package.json:26, Evidência); 3.4.3 (adx-core/apps/file, Marcadores e Build); 3.4.4 (adx-core/apps/shell/src/App.tsx:18, Observação); 3.4.5 #3 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #17, #21 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #43; configura #61 |
| 10 | 3.4.2 (adx-core/apps/module/package.json:39, Evidência); 3.4.3 (adx-core/apps/module, Marcadores e Build); 3.4.4 (adx-core/apps/shell/src/App.tsx:21, Observação); 3.4.5 #6 (Configuração); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #44; configura #64 |
| 11 | 3.4.2 (adx-core/apps/shell/package.json:40, Evidência); 3.4.3 (adx-core/apps/shell, Marcadores e Build); 3.4.4 (adx-core/apps/shell/src/App.tsx:16 a :21, Observação); 3.4.5 #1, #2, #3, #4, #5, #6 (Configuração); 3.4.6 #4 (Artefatos); 3.4.7 #11, #21 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #45; configura #59; configura #60; configura #61; configura #62; configura #63; configura #64 |
| 12 | 3.4.2 (adx-core/apps/tenant/package.json:36, Evidência); 3.4.3 (adx-core/apps/tenant, Marcadores e Build); 3.4.4 (adx-core/apps/shell/src/App.tsx:17, Observação); 3.4.5 #2 (Configuração); 3.4.6 #5 (Artefatos); 3.4.7 #19 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #46; configura #60 |
| 13 | 3.4.2 (adx-core/apps/user/package.json:26, Evidência); 3.4.3 (adx-core/apps/user, Marcadores e Build); 3.4.4 (adx-core/apps/shell/src/App.tsx:19, Observação); 3.4.5 #4 (Configuração); 3.4.6 #6 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #47; configura #62 |
| 14 | 3.4.2 (adx-core/apps/workflow/package.json:26, Evidência); 3.4.3 (adx-core/apps/workflow, Marcadores e Build); 3.4.4 (adx-core/apps/shell/src/App.tsx:20, Observação); 3.4.5 #5 (Configuração); 3.4.6 #7 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #48; configura #63 |
| 15 | 3.4.4 (adx-core/apps/shell/src/App.tsx:16) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #59 |
| 16 | 3.4.4 (adx-core/apps/shell/src/App.tsx:17) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #60 |
| 17 | 3.4.4 (adx-core/apps/shell/src/App.tsx:18) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #61 |
| 18 | 3.4.4 (adx-core/apps/shell/src/App.tsx:19) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #62 |
| 19 | 3.4.4 (adx-core/apps/shell/src/App.tsx:20) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #63 |
| 20 | 3.4.4 (adx-core/apps/shell/src/App.tsx:21) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #64 |
| 21 | 3.4.4 (adx-core/packages/event-bus/src/EventBus.tsx:49) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 22 | 3.4.4 (adx-core/packages/i18n/src/hooks.ts:19) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 23 | 3.4.4 (adx-core/packages/shared-context/src/tenant-store.ts:77) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 24 | 3.4.4 (adx-core/packages/shared-context/src/theme-store.ts:33) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 25 | 3.4.4 (adx-core/packages/shared-context/src/theme-store.ts:142) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 26 | 3.4.4 (adx-core/packages/shared-context/src/theme-store.ts:162) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 27 | 3.4.4 (tests/desktop/tauri-integration.test.ts:129) | 3 código | código-fonte | — | contexto | fraca | — |
| 28 | 3.4.4 (tests/desktop/tauri-integration.test.ts:132) | 3 código | código-fonte | — | contexto | fraca | — |
| 29 | 3.4.4 (tests/mobile/android-integration.test.ts:89) | 3 código | código-fonte | — | contexto | fraca | — |
| 30 | 3.4.4 (tests/mobile/android-integration.test.ts:189) | 3 código | código-fonte | — | contexto | fraca | — |
| 31 | 3.4.4 (tests/mobile/android-integration.test.ts:240) | 3 código | código-fonte | — | contexto | fraca | — |
| 32 | 3.4.4 (tests/mobile/android-integration.test.ts:241) | 3 código | código-fonte | — | contexto | fraca | — |
| 33 | 3.4.4 (tests/mobile/android-integration.test.ts:256) | 3 código | código-fonte | — | contexto | fraca | — |
| 34 | 3.4.4 (tests/mobile/android-integration.test.ts:257) | 3 código | código-fonte | — | contexto | fraca | — |
| 35 | 3.4.4 (tests/mobile/ios-integration.test.ts:170) | 3 código | código-fonte | — | contexto | fraca | — |
| 36 | 3.4.4 (tests/mobile/ios-integration.test.ts:171) | 3 código | código-fonte | — | contexto | fraca | — |
| 37 | 3.4.4 (tests/mobile/ios-integration.test.ts:186) | 3 código | código-fonte | — | contexto | fraca | — |
| 38 | 3.4.4 (tests/mobile/ios-integration.test.ts:187) | 3 código | código-fonte | — | contexto | fraca | — |
| 39 | 3.4.4 (tests/mobile/ios-integration.test.ts:231) | 3 código | código-fonte | — | contexto | fraca | — |
| 40 | 3.4.4 (adx-core/apps/shell/src/App.tsx:46) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #59; implementa #60; implementa #61; implementa #62; implementa #63; implementa #64 |
| 41 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 42 | 3.4.3 (adx-core/apps/auth) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 43 | 3.4.3 (adx-core/apps/file) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 44 | 3.4.3 (adx-core/apps/module) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 45 | 3.4.3 (adx-core/apps/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 46 | 3.4.3 (adx-core/apps/tenant) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 47 | 3.4.3 (adx-core/apps/user) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 48 | 3.4.3 (adx-core/apps/workflow) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 49 | 3.4.3 (adx-core/bff-services/auth-bff) | 4 estrutura | diretório | — | contexto | fraca | — |
| 50 | 3.4.3 (adx-core/bff-services/file-bff) | 4 estrutura | diretório | — | contexto | fraca | — |
| 51 | 3.4.3 (adx-core/bff-services/module-bff) | 4 estrutura | diretório | — | contexto | fraca | — |
| 52 | 3.4.3 (adx-core/bff-services/tenant-bff) | 4 estrutura | diretório | — | contexto | fraca | — |
| 53 | 3.4.3 (adx-core/packages/bff-client) | 4 estrutura | diretório | — | contexto | fraca | — |
| 54 | 3.4.3 (adx-core/packages/design-system) | 4 estrutura | diretório | — | contexto | fraca | — |
| 55 | 3.4.3 (adx-core/packages/event-bus) | 4 estrutura | diretório | — | contexto | fraca | — |
| 56 | 3.4.3 (adx-core/packages/i18n) | 4 estrutura | diretório | — | contexto | fraca | — |
| 57 | 3.4.3 (adx-core/packages/shared-context) | 4 estrutura | diretório | — | contexto | fraca | — |
| 58 | 3.4.3 (tools/kiro-github-task-sync) | 4 estrutura | diretório | — | contexto | fraca | — |
| 59 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #45; liga #42 |
| 60 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #45; liga #46 |
| 61 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #45; liga #43 |
| 62 | 3.4.5 #4 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #45; liga #47 |
| 63 | 3.4.5 #5 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #45; liga #48 |
| 64 | 3.4.5 #6 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #45; liga #44 |
| 65 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #42 |
| 66 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #43 |
| 67 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #44 |
| 68 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #45 |
| 69 | 3.4.6 #5 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #46 |
| 70 | 3.4.6 #6 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #47 |
| 71 | 3.4.6 #7 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #48 |
| 72 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #42; corrobora #45; corrobora #59; corrobora #60; corrobora #61; corrobora #62; corrobora #63; corrobora #64 |
| 73 | 3.4.7 #2 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #4; corrobora #5; corrobora #6; corrobora #7; corrobora #59; corrobora #60; corrobora #61; corrobora #62; corrobora #63; corrobora #64 |
| 74 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #65; corrobora em parte #66; corrobora em parte #67; corrobora em parte #68; corrobora em parte #69; corrobora em parte #70; corrobora em parte #71; corrobora em parte adx-core/apps/auth/index.html:10-11 |
| 75 | 3.4.7 #4 | 7 documentação | documentação | — | contexto | fraca | corrobora em parte #49; corrobora em parte #50; corrobora em parte #51; corrobora em parte #52; corrobora em parte adx-core/apps/module/src/components/ModuleMarketplace.tsx:4, 48 |
| 76 | 3.4.7 #5 | 7 documentação | documentação | — | tecnológica | fraca | corrobora adx-core/apps/shell/src/App.tsx:5-6; corrobora adx-core/apps/auth/src/App.tsx:5-6; corrobora adx-core/apps/tenant/src/App.tsx:5-6; corrobora adx-core/apps/file/src/App.tsx:5-6; corrobora adx-core/apps/user/src/App.tsx:5-6; corrobora adx-core/apps/workflow/src/App.tsx:5-6; corrobora adx-core/apps/module/src/App.tsx:5-6 |
| 77 | 3.4.7 #6 | 7 documentação | documentação | — | contexto | fraca | — |
| 78 | 3.4.7 #7 | 7 documentação | documentação | — | tecnológica | fraca | corrobora adx-core/apps/shell/src/App.tsx:4; corrobora adx-core/apps/auth/src/App.tsx:4; corrobora adx-core/apps/tenant/src/App.tsx:4; corrobora adx-core/apps/file/src/App.tsx:4, 7; corrobora adx-core/apps/user/src/App.tsx:4, 7; corrobora adx-core/apps/workflow/src/App.tsx:4, 7; corrobora adx-core/apps/module/src/App.tsx:4 |
| 79 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 80 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #65; corrobora em parte #66; corrobora em parte #67; corrobora em parte #68; corrobora em parte #69; corrobora em parte #70; corrobora em parte #71 |
| 81 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 82 | 3.4.7 #11 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #11; corrobora #59; corrobora #60; corrobora #61; corrobora #62; corrobora #63; corrobora #64 |
| 83 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora adx-core/Cargo.toml:4-8, 11; corrobora #49; corrobora #50; corrobora #51; corrobora #52; corrobora #59; corrobora #60; corrobora #61; corrobora #62; corrobora #63; corrobora #64 |
| 84 | 3.4.7 #13 | 7 documentação | documentação | events | arquitetural | fraca | contradiz #21; contradiz adx-core/packages/event-bus/src/providers/EventBusProvider.tsx:26-55; contradiz adx-core/apps/auth/src/App.tsx:31; contradiz adx-core/apps/shell/src/App.tsx:40 |
| 85 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 86 | 3.4.7 #15 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #15; corrobora #16; corrobora #17; corrobora #18; corrobora #19; corrobora #20 |
| 87 | 3.4.7 #16 | 7 documentação | documentação | — | contexto | fraca | corrobora em parte #49 |
| 88 | 3.4.7 #17 | 7 documentação | documentação | — | contexto | fraca | corrobora em parte #50 |
| 89 | 3.4.7 #18 | 7 documentação | documentação | — | contexto | fraca | corrobora em parte #51; corrobora em parte adx-core/apps/module/src/components/ModuleMarketplace.tsx:4, 48, 63, 69, 76 |
| 90 | 3.4.7 #19 | 7 documentação | documentação | — | contexto | fraca | corrobora em parte #52 |
| 91 | 3.4.7 #20 | 7 documentação | documentação | — | arquitetural | fraca | contradiz adx-core/apps/shell/src/App.tsx:35, 45-55, 65; contradiz adx-core/apps/shell/src/components/ErrorBoundary.tsx:39-74; contradiz adx-core/apps/file/src/App.tsx:22-41 |
| 92 | 3.4.7 #21 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #8; corrobora #9; corrobora #10; corrobora #11; corrobora #12; corrobora #13; corrobora #14 |
| 93 | 3.4.7 #22 | 7 documentação | documentação | — | arquitetural | fraca | contradiz adx-core/packages/shared-context/src/providers/SharedContextProvider.tsx:10-19; contradiz adx-core/packages/shared-context/src/providers/TenantProvider.tsx:33-34; contradiz adx-core/apps/shell/src/App.tsx:39; contradiz adx-core/apps/auth/src/App.tsx:30; contradiz #23; contradiz #24 |
| 94 | 3.4.7 #23 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #41; contradiz #42; contradiz #45; contradiz #49; contradiz #50; contradiz #51; contradiz #52; contradiz adx-core/Cargo.toml:2-15 |
| 95 | 3.4.7 #24 | 7 documentação | documentação | — | arquitetural | fraca | corrobora adx-core/apps/shell/src/App.tsx:43; corrobora adx-core/apps/shell/src/components/Navigation.tsx:25-30, 74; corrobora adx-core/apps/shell/src/components/UserMenu.tsx:23 |
| 96 | 3.4.7 #25 | 7 documentação | comentário | — | tecnológica | fraca | contradiz adx-core/apps/shell/src/App.tsx:8; contradiz #8; contradiz #22 |
| 97 | 3.4.7 #26 | 7 documentação | documentação | module-federation | tecnológica | fraca | — |
| 98 | 3.4.8 #1 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #43; explica #44; explica #46; explica #47; explica #48; explica #74 |
| 99 | 3.4.8 #2 | 8 histórico | histórico | events | tecnológica | fraca | explica #21; explica #84 |
| 100 | 3.4.8 #3 | 8 histórico | histórico | events | tecnológica | fraca | explica #22; explica #96 |
| 101 | 3.4.8 #4 | 8 histórico | histórico | events | tecnológica | fraca | explica #23; explica #24; explica #25; explica #26; explica #93 |
| 102 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #65; explica #66; explica #67; explica #68; explica #69; explica #70; explica #71; explica #80 |
| 103 | 3.4.8 #6 | 8 histórico | histórico | — | contexto | fraca | explica #75; explica #87; explica #88; explica #89; explica #90 |
| 104 | 3.4.8 #7 | 8 histórico | histórico | — | arquitetural | fraca | explica #91 |
| 105 | 3.4.8 #8 | 8 histórico | histórico | — | arquitetural | fraca | explica #94 |

## Resumo

Observações: 105. Dimensões (tecnologia: 7, configuração: 7, código: 26, estrutura: 18, composição: 6, build-deploy: 7, documentação: 26, histórico: 8). Força (forte: 14, moderada: 15, fraca: 71, ambígua: 5). Evidência (tecnológica: 28, arquitetural: 46, contexto: 31).
