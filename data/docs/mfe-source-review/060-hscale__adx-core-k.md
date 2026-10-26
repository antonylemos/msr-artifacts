---
schema: 1
id: 1033705813
full_name: hscale/adx-core-k
commit: 683dec7ebc233c685f97166a135032d5668070c1
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

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | adx-core/apps/shell/src/App.tsx:16 | adx-core/apps/shell | dynamic-loading | Yes | `React.lazy(() => import('auth_app/App'))` carrega o remote `auth_app` (adx-core/apps/shell/vite.config.ts:12, `http://localhost:3001/assets/remoteEntry.js`), que é a unidade adx-core/apps/auth (`name: 'auth_app'`, `'./App': './src/App.tsx'` em adx-core/apps/auth/vite.config.ts:9,12); usado na rota `/auth/*` em adx-core/apps/shell/src/App.tsx:48, com App montado em adx-core/apps/shell/src/main.tsx:6-10 |
| src-remote-import | adx-core/apps/shell/src/App.tsx:17 | adx-core/apps/shell | dynamic-loading | Yes | `React.lazy(() => import('tenant_app/App'))` carrega o remote `tenant_app` (adx-core/apps/shell/vite.config.ts:13), que é a unidade adx-core/apps/tenant (adx-core/apps/tenant/vite.config.ts:9,12); usado na rota `/tenant/*` em adx-core/apps/shell/src/App.tsx:49 |
| src-remote-import | adx-core/apps/shell/src/App.tsx:18 | adx-core/apps/shell | dynamic-loading | Yes | `React.lazy(() => import('file_app/App'))` carrega o remote `file_app` (adx-core/apps/shell/vite.config.ts:14), que é a unidade adx-core/apps/file (adx-core/apps/file/vite.config.ts:9,12); usado na rota `/files/*` em adx-core/apps/shell/src/App.tsx:50 |
| src-remote-import | adx-core/apps/shell/src/App.tsx:19 | adx-core/apps/shell | dynamic-loading | Yes | `React.lazy(() => import('user_app/App'))` carrega o remote `user_app` (adx-core/apps/shell/vite.config.ts:15), que é a unidade adx-core/apps/user (adx-core/apps/user/vite.config.ts:9,12); usado na rota `/users/*` em adx-core/apps/shell/src/App.tsx:51 |
| src-remote-import | adx-core/apps/shell/src/App.tsx:20 | adx-core/apps/shell | dynamic-loading | Yes | `React.lazy(() => import('workflow_app/App'))` carrega o remote `workflow_app` (adx-core/apps/shell/vite.config.ts:16), que é a unidade adx-core/apps/workflow (adx-core/apps/workflow/vite.config.ts:9,12); usado na rota `/workflows/*` em adx-core/apps/shell/src/App.tsx:52 |
| src-remote-import | adx-core/apps/shell/src/App.tsx:21 | adx-core/apps/shell | dynamic-loading | Yes | `React.lazy(() => import('module_app/App'))` carrega o remote `module_app` (adx-core/apps/shell/vite.config.ts:17), que é a unidade adx-core/apps/module (adx-core/apps/module/vite.config.ts:9,12); usado na rota `/modules/*` em adx-core/apps/shell/src/App.tsx:53 |
| src-cross-unit-communication | adx-core/packages/event-bus/src/EventBus.tsx:49 | — | communication | No | `window.dispatchEvent(new CustomEvent('adx:'+eventType))` ("cross-micro-frontend communication", adx-core/packages/event-bus/src/EventBus.tsx:47-52), mas o arquivo não é alcançado por nenhuma unidade: a entrada do pacote exporta só `./providers/EventBusProvider` (adx-core/packages/event-bus/src/index.ts:2), cujo `emit` não dispara evento de DOM (adx-core/packages/event-bus/src/providers/EventBusProvider.tsx:30-55); o único arquivo que importa `./EventBus` é adx-core/packages/event-bus/src/hooks.ts:2, também não exportado pela entrada |
| src-cross-unit-communication | adx-core/packages/i18n/src/hooks.ts:19 | — | communication | No | `window.dispatchEvent(new CustomEvent('adx-language-changed'))` em `changeLanguage` (adx-core/packages/i18n/src/hooks.ts:10-22), mas a entrada do pacote só exporta a instância do i18next (adx-core/packages/i18n/src/index.ts:26) e nenhuma unidade importa esse hook: o shell usa `useTranslation` do `react-i18next` (adx-core/apps/shell/src/components/LanguageSelector.tsx:3,22); nenhum ouvinte de `adx-language-changed` no snapshot |
| src-cross-unit-communication | adx-core/packages/shared-context/src/tenant-store.ts:77 | — | communication | No | `window.dispatchEvent(new CustomEvent('tenant:switched'))` após a troca de tenant (adx-core/packages/shared-context/src/tenant-store.ts:77-83), mas `tenant-store.ts` não é exportado pela entrada do pacote (adx-core/packages/shared-context/src/index.ts:2-5) nem importado pelos providers (adx-core/packages/shared-context/src/providers/SharedContextProvider.tsx:2-4) ou por qualquer unidade |
| src-cross-unit-communication | adx-core/packages/shared-context/src/theme-store.ts:33 | — | communication | No | `window.dispatchEvent(new CustomEvent('theme:changed'))` em `setTheme` (adx-core/packages/shared-context/src/theme-store.ts:23-35), no mesmo `theme-store.ts` não exportado pela entrada (adx-core/packages/shared-context/src/index.ts:2-5) e não importado por nenhuma unidade |
| src-cross-unit-communication | adx-core/packages/shared-context/src/theme-store.ts:142 | — | communication | No | `window.addEventListener('theme:changed', ...)` registrado no carregamento do módulo (adx-core/packages/shared-context/src/theme-store.ts:131-147), no mesmo arquivo inalcançável a partir da entrada do pacote |
| src-cross-unit-communication | adx-core/packages/shared-context/src/theme-store.ts:162 | — | communication | No | `window.addEventListener('theme:changed', ...)` dentro de `useThemeSync` (adx-core/packages/shared-context/src/theme-store.ts:150-168); o hook não é exportado pela entrada do pacote nem usado por nenhuma unidade |
| src-cross-unit-communication | tests/desktop/tauri-integration.test.ts:129 | — | none | No | `new CustomEvent('tauri://deep-link')` criado dentro de um `page.evaluate` de teste Playwright para simular deep link do Tauri (tests/desktop/tauri-integration.test.ts:124-135); não é construção de composição |
| src-cross-unit-communication | tests/desktop/tauri-integration.test.ts:132 | — | none | No | `window.dispatchEvent(event)` do mesmo evento simulado no teste (tests/desktop/tauri-integration.test.ts:129-132) |
| src-cross-unit-communication | tests/mobile/android-integration.test.ts:89 | — | none | No | `element.dispatchEvent(touchEvent)` simula gesto de toque em teste (tests/mobile/android-integration.test.ts:85-89) |
| src-cross-unit-communication | tests/mobile/android-integration.test.ts:189 | — | none | No | `window.dispatchEvent(new Event('orientationchange'))` simula rotação de tela em teste (tests/mobile/android-integration.test.ts:186-189) |
| src-cross-unit-communication | tests/mobile/android-integration.test.ts:240 | — | none | No | `window.dispatchEvent(new Event('pagehide'))` simula a app ir para segundo plano em teste (tests/mobile/android-integration.test.ts:239-241) |
| src-cross-unit-communication | tests/mobile/android-integration.test.ts:241 | — | none | No | `document.dispatchEvent(new Event('visibilitychange'))` do mesmo cenário de teste (tests/mobile/android-integration.test.ts:239-241) |
| src-cross-unit-communication | tests/mobile/android-integration.test.ts:256 | — | none | No | `window.dispatchEvent(new Event('pageshow'))` simula o retorno ao primeiro plano em teste (tests/mobile/android-integration.test.ts:251-257) |
| src-cross-unit-communication | tests/mobile/android-integration.test.ts:257 | — | none | No | `document.dispatchEvent(new Event('visibilitychange'))` do mesmo cenário de teste (tests/mobile/android-integration.test.ts:251-257) |
| src-cross-unit-communication | tests/mobile/ios-integration.test.ts:170 | — | none | No | `window.dispatchEvent(new Event('pagehide'))` simula a app ir para segundo plano em teste (tests/mobile/ios-integration.test.ts:169-171) |
| src-cross-unit-communication | tests/mobile/ios-integration.test.ts:171 | — | none | No | `document.dispatchEvent(new Event('visibilitychange'))` do mesmo cenário de teste (tests/mobile/ios-integration.test.ts:169-171) |
| src-cross-unit-communication | tests/mobile/ios-integration.test.ts:186 | — | none | No | `window.dispatchEvent(new Event('pageshow'))` simula o retorno ao primeiro plano em teste (tests/mobile/ios-integration.test.ts:180-187) |
| src-cross-unit-communication | tests/mobile/ios-integration.test.ts:187 | — | none | No | `document.dispatchEvent(new Event('visibilitychange'))` do mesmo cenário de teste (tests/mobile/ios-integration.test.ts:180-187) |
| src-cross-unit-communication | tests/mobile/ios-integration.test.ts:231 | — | none | No | `window.dispatchEvent(event)` de um `DeviceMotionEvent` simulado em teste (tests/mobile/ios-integration.test.ts:225-231) |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | adx-core/apps/shell/src/App.tsx:46 | adx-core/apps/shell | host-relationship | Yes | A tabela `Routes` declara quais aplicações o shell usa e sob quais caminhos: `/auth/*` → `AuthApp`, `/tenant/*` → `TenantApp`, `/files/*` → `FileApp`, `/users/*` → `UserApp`, `/workflows/*` → `WorkflowApp`, `/modules/*` → `ModuleApp` (adx-core/apps/shell/src/App.tsx:46-55), os seis componentes carregados dos remotes em adx-core/apps/shell/src/App.tsx:16-21; o roteador é montado em adx-core/apps/shell/src/App.tsx:41 e App em adx-core/apps/shell/src/main.tsx:6-10 |

## Resumo

Construções com composição: 7 (dynamic-loading: 6, host-relationship: 1).

## Notas

- Falso positivo recorrente de `src-cross-unit-communication`: 13 das 25 ocorrências estão em testes Playwright de desktop e mobile (`tests/desktop/`, `tests/mobile/`), que simulam eventos de plataforma (`pagehide`, `visibilitychange`, `orientationchange`, toque, `DeviceMotionEvent`), não comunicação entre unidades.
- Os três pacotes compartilhados contêm, cada um, o esqueleto de um canal entre unidades (`adx:<evento>` em adx-core/packages/event-bus/src/EventBus.tsx:49, `adx-language-changed` em adx-core/packages/i18n/src/hooks.ts:19, `theme:changed` e `tenant:switched` em adx-core/packages/shared-context/src/theme-store.ts:33 e tenant-store.ts:77), mas em todos os casos o arquivo que dispara ou escuta o evento não é exportado pela entrada do pacote (adx-core/packages/event-bus/src/index.ts:2, adx-core/packages/i18n/src/index.ts:26, adx-core/packages/shared-context/src/index.ts:2-5) nem importado por nenhuma unidade. Há duas implementações paralelas do event bus no mesmo pacote, e a que as unidades recebem (adx-core/packages/event-bus/src/providers/EventBusProvider.tsx:26-96) só propaga eventos dentro da própria árvore React.
- O `emit` efetivamente usado por uma unidade (adx-core/apps/module/src/components/ModuleMarketplace.tsx:49,74,79,85,87,93) vem do `EventBusProvider` que a própria unidade monta em adx-core/apps/module/src/App.tsx:32, portanto é interno à unidade; por isso não virou linha manual de `communication`.
- `@adx-core/event-bus`, `@adx-core/shared-context`, `@adx-core/design-system` e `@adx-core/i18n` são declarados `singleton` nos `shared` do shell (adx-core/apps/shell/vite.config.ts:40-52); nos remotes, os `shared` declaram `singleton` para `@adx-core/event-bus`, `@adx-core/shared-context` e `@adx-core/design-system` (ex.: adx-core/apps/auth/vite.config.ts:23-25), e `@adx-core/i18n` não consta nos `shared` de nenhum remote. Isso é a configuração de um canal compartilhado; a conclusão acima é sobre o código, não sobre essa configuração.
- As buscas do passo 4 não encontraram nenhum outro carregamento, custom element, iframe ou injeção de script nas unidades: o único `import()`/`React.lazy` do snapshot é o do shell, e os `index.html` das unidades carregam apenas o próprio `/src/main.tsx` (adx-core/apps/shell/index.html:11, adx-core/apps/auth/index.html:11, adx-core/apps/module/index.html:11).
- Coerente com a ressalva de completude da classificação: os seis remotes expõem `./App` → `./src/App.tsx`, presente em todos; os módulos expostos ausentes (`FileUpload`, `UserProfile`, `WorkflowList`, `TenantSwitcher`, etc.) não são carregados por nenhuma construção de código-fonte, só declarados nos `exposes`.
