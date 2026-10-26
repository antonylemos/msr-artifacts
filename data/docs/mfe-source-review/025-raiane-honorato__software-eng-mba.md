---
schema: 1
id: 1247892038
full_name: raiane-honorato/software-eng-mba
commit: c569ccc6582475495a637d44ceed33c62c0f6e86
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 025 — raiane-honorato/software-eng-mba

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | apps/repack-poc/host/App.tsx:26 | apps/repack-poc/host | dynamic-loading | Yes | `React.lazy(() => import('remote/HelloScreen'))` carrega em runtime o módulo exposto pela unidade apps/repack-poc/remote (`exposes: { './HelloScreen' }` em apps/repack-poc/remote/rspack.config.mjs:40); remote declarado como `remote@http://localhost:9001/${platform}/mf-manifest.json` em apps/repack-poc/host/rspack.config.mjs:45; cadeia ativa apps/repack-poc/host/rspack.config.mjs:21 (`entry: './index.js'`) → apps/repack-poc/host/index.js:9 → apps/repack-poc/host/App.tsx:21. |
| src-remote-import | apps/repack/packages/host/src/screens/CheckInTab.tsx:12 | apps/repack/packages/host | dynamic-loading | Yes | `import('checkin/CheckInStack')` dentro de `React.lazy` (apps/repack/packages/host/src/screens/CheckInTab.tsx:11-13) carrega em runtime o módulo exposto pela unidade apps/repack/packages/check-in (`exposes: { './CheckInStack' }` em apps/repack/packages/check-in/rspack.config.mjs:46); remote `checkin@http://localhost:9001/${platform}/mf-manifest.json` em apps/repack/packages/host/rspack.config.mjs:50; cadeia ativa apps/repack/packages/host/rspack.config.mjs:22 → apps/repack/packages/host/index.js:9 → apps/repack/packages/host/App.tsx:20 → apps/repack/packages/host/src/navigation/RootNavigator.tsx:53. |
| src-remote-import | apps/repack/packages/host/src/screens/DashboardTab.tsx:9 | apps/repack/packages/host | dynamic-loading | Yes | `import('dashboard/DashboardStack')` dentro de `React.lazy` (apps/repack/packages/host/src/screens/DashboardTab.tsx:8-10) carrega em runtime o módulo exposto pela unidade apps/repack/packages/dashboard (`exposes: { './DashboardStack' }` em apps/repack/packages/dashboard/rspack.config.mjs:44); remote `dashboard@http://localhost:9002/${platform}/mf-manifest.json` em apps/repack/packages/host/rspack.config.mjs:51; mesma cadeia do CheckInTab, aba em apps/repack/packages/host/src/navigation/RootNavigator.tsx:52. |
| src-html-external-script | UX/confirma_o_de_check_in/code.html:15 | — | none | No | `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">` carrega o CDN do Tailwind numa maquete de UI, não o bundle de outra unidade; UX/ não é diretório de aplicação na revisão estrutural. |
| src-html-external-script | UX/dashboard_check_in_ativo_4/code.html:7 | — | none | No | Mesmo `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">` do CDN do Tailwind numa maquete de UI. |
| src-html-external-script | UX/dashboard_p_s_treino_2/code.html:7 | — | none | No | Mesmo `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">` do CDN do Tailwind numa maquete de UI. |
| src-html-external-script | UX/dashboard_p_s_treino_menu_unificado/code.html:7 | — | none | No | Mesmo `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">` do CDN do Tailwind numa maquete de UI. |
| src-html-external-script | UX/finaliza_o_de_treino/code.html:7 | — | none | No | Mesmo `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">` do CDN do Tailwind numa maquete de UI. |
| src-html-external-script | UX/listagem_de_academias/code.html:7 | — | none | No | Mesmo `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">` do CDN do Tailwind numa maquete de UI. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | apps/repack-poc/host/App.tsx:35 | apps/repack-poc/host | runtime-composition | Yes | Monta `<HelloScreen />`, componente da unidade apps/repack-poc/remote, dentro de `ErrorBoundary` + `Suspense` (apps/repack-poc/host/App.tsx:33-37); o componente vem do import em apps/repack-poc/host/App.tsx:26. |
| manual | apps/repack/packages/host/src/screens/CheckInTab.tsx:21 | apps/repack/packages/host | runtime-composition | Yes | Monta `<CheckInStack />`, componente da unidade apps/repack/packages/check-in, dentro de `ErrorBoundary` + `React.Suspense` (apps/repack/packages/host/src/screens/CheckInTab.tsx:19-23); o componente vem do import em apps/repack/packages/host/src/screens/CheckInTab.tsx:12. |
| manual | apps/repack/packages/host/src/screens/DashboardTab.tsx:16 | apps/repack/packages/host | runtime-composition | Yes | Monta `<DashboardStack />`, componente da unidade apps/repack/packages/dashboard, dentro de `ErrorBoundary` + `React.Suspense` (apps/repack/packages/host/src/screens/DashboardTab.tsx:14-18); o componente vem do import em apps/repack/packages/host/src/screens/DashboardTab.tsx:9. |
| manual | apps/repack/packages/host/src/navigation/RootNavigator.tsx:52 | apps/repack/packages/host | host-relationship | Yes | O `Tab.Navigator` declara onde cada mini-app entra na UI do host: aba `Home` → `DashboardTab` e aba `FindGyms` → `CheckInTab` (apps/repack/packages/host/src/navigation/RootNavigator.tsx:52-53), os dois wrappers que carregam os remotes `dashboard` e `checkin`; navegador montado em apps/repack/packages/host/App.tsx:19-21. |
| manual | apps/repack/packages/store/src/checkInStore.ts:33 | — | communication | Yes | `useCheckInStore` (Zustand) é o canal de estado compartilhado entre as unidades: declarado singleton do Module Federation para host e mini-apps em apps/repack/packages/shared-deps/sharedDeps.mjs:53 e 76, fornecido eager pelo host (apps/repack/packages/host/rspack.config.mjs:54) e consumido eager:false pelos mini-apps (apps/repack/packages/check-in/rspack.config.mjs:48, apps/repack/packages/dashboard/rspack.config.mjs:46); escrito pelo check-in na chamada de `startCheckIn` em apps/repack/packages/check-in/src/screens/CheckInConfirmationScreen.tsx:52 (ação obtida da store em apps/repack/packages/check-in/src/screens/CheckInConfirmationScreen.tsx:36, definida com `set({...})` em apps/repack/packages/store/src/checkInStore.ts:41-48) e lido pelo dashboard em apps/repack/packages/dashboard/src/navigation/DashboardStack.tsx:12-13, que escolhe a tela pelo estado do check-in (apps/repack/packages/dashboard/src/navigation/DashboardStack.tsx:15-16). |

## Resumo

Construções com composição: 8 (dynamic-loading: 3, runtime-composition: 3, host-relationship: 1, communication: 1).

## Notas

- O repositório tem quatro conjuntos de aplicações (README.md:27-33): a comparação monolito × Turborepo × Re.Pack e a PoC `apps/repack-poc/`. Só as versões Re.Pack (`apps/repack/packages/` e `apps/repack-poc/`) compõem unidades em runtime; a versão Turborepo integra as features em build-time, por import de pacote do workspace (apps/turborepo/apps/mygym/src/navigation/RootNavigator.tsx:1-2), e os pacotes `@mygym/feature-*` são `No` na revisão estrutural, por isso não geram linha.
- As seis ocorrências `src-html-external-script` são todas do mesmo CDN do Tailwind em maquetes de UI de `UX/`, um falso positivo recorrente do padrão neste repositório; `UX/kinetic_velocity` só tem `DESIGN.md`, sem HTML.
- As unidades alvo dos carregamentos estão no snapshot, mas as URLs dos remotes são `localhost:9001`/`localhost:9002` resolvidas por `mf-manifest.json` por plataforma, geradas no build; não há manifesto versionado no snapshot.
- Pelo passo 4 ficaram fora da tabela: os `ErrorBoundary` em volta de cada remote (apps/repack/packages/host/src/ErrorBoundary.tsx), o `export` dos stacks expostos (a exposição está nos `rspack.config.mjs`) e os demais pontos de uso de `useCheckInStore` nas telas de check-in e dashboard, já cobertos pela linha do mecanismo.
- As unidades são apps React Native, não web; a decisão de escopo mobile × web está em aberto na classificação (docs/mfe-classification/025-raiane-honorato__software-eng-mba.md) e não muda as construções registradas aqui.
