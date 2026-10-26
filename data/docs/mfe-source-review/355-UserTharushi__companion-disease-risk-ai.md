---
schema: 1
id: 1174301349
full_name: UserTharushi/companion-disease-risk-ai
commit: 373de0e6083b86b2707913da037735130c8f5503
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 355 — UserTharushi/companion-disease-risk-ai

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | apps/shell/src/App.tsx:18 | apps/shell | dynamic-loading | Yes | `lazy(() => import("mfePetProfile/App"))` carrega o `./App` exposto por apps/mfe-pet-profile (remote `mfePetProfile` em apps/shell/vite.config.ts:13; `name`/`exposes` em apps/mfe-pet-profile/vite.config.ts:9-12). Renderizado na rota `pets/*` (apps/shell/src/App.tsx:48); App montado por apps/shell/src/main.tsx:6-10. |
| src-remote-import | apps/shell/src/App.tsx:19 | apps/shell | dynamic-loading | Yes | `lazy(() => import("mfeSymptom/App"))` carrega o `./App` de apps/mfe-symptom-checker (remote em apps/shell/vite.config.ts:14; apps/mfe-symptom-checker/vite.config.ts:9-12). Renderizado na rota `symptom/*` (apps/shell/src/App.tsx:49). |
| src-remote-import | apps/shell/src/App.tsx:20 | apps/shell | dynamic-loading | Yes | `lazy(() => import("mfeRiskResults/App"))` carrega o `./App` de apps/mfe-risk-results (remote em apps/shell/vite.config.ts:15; apps/mfe-risk-results/vite.config.ts:9-12). Renderizado na rota `risk-results/*` (apps/shell/src/App.tsx:50). |
| src-remote-import | apps/shell/src/App.tsx:21 | apps/shell | dynamic-loading | Yes | `lazy(() => import("mfeVetDiscover/App"))` carrega o `./App` de apps/mfe-vet-discovery (remote em apps/shell/vite.config.ts:16; apps/mfe-vet-discovery/vite.config.ts:9-12). Renderizado na rota `vet-discovery/*` (apps/shell/src/App.tsx:51). |
| src-remote-import | apps/shell/src/App.tsx:22 | apps/shell | dynamic-loading | Yes | `lazy(() => import("mfeVaccination/App"))` carrega o `./App` de apps/mfe-vaccination (remote em apps/shell/vite.config.ts:17; apps/mfe-vaccination/vite.config.ts:9-12). Renderizado na rota `vaccination/*` (apps/shell/src/App.tsx:52). |
| src-remote-import | apps/shell/src/App.tsx:23 | apps/shell | dynamic-loading | Yes | `lazy(() => import("mfeAdmin/App"))` carrega o `./App` de apps/mfe-admin (remote em apps/shell/vite.config.ts:18; apps/mfe-admin/vite.config.ts:9-12). Renderizado na rota `admin/*` (apps/shell/src/App.tsx:53). |
| src-dynamic-script | apps/mfe-auth/dev-dist/sw.js:28 | apps/mfe-auth | none | No | Arquivo gerado pelo vite-plugin-pwa em modo dev (`devOptions`, apps/mfe-auth/vite.config.ts:49): o `singleRequire` do carregador do service worker injeta os chunks do próprio Workbox (apps/mfe-auth/dev-dist/sw.js:22-37), não o bundle de outra unidade. |
| src-cross-unit-communication | apps/mfe-auth/dev-dist/workbox-af90992f.js:777 | apps/mfe-auth | none | No | Código gerado da biblioteca Workbox: responde pelo `MessageChannel` à página que pediu cache de URLs (apps/mfe-auth/dev-dist/workbox-af90992f.js:775-778); comunicação entre service worker e página da mesma unidade, não entre unidades. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | apps/shell/src/App.tsx:42 | apps/shell | host-relationship | Yes | `Routes` declara onde PetProfileApp, SymptomApp, RiskResultsApp, VetDiscoverApp, VaccinationApp e AdminApp (os remotes carregados em apps/shell/src/App.tsx:18-23) entram na UI, sob o `ShellLayout` (apps/shell/src/App.tsx:42-55); a rota `/auth/*` vai para `AuthRedirect` (apps/shell/src/App.tsx:44), que redireciona para `http://localhost:3001` (apps/shell/src/App.tsx:12) em vez de federar mfe-auth. App montado por apps/shell/src/main.tsx:6-10. |

## Resumo

Construções com composição: 7 (dynamic-loading: 6, host-relationship: 1).

## Notas

- As duas linhas de `apps/mfe-auth/dev-dist/` são falsos positivos em código gerado do PWA (Workbox).
- O shell declara o remote `mfeAuth` (apps/shell/vite.config.ts:12) e o módulo `mfeAuth/App` (apps/shell/src/federation.d.ts:1), mas não o importa em nenhum ponto do código; mfe-auth é alcançado por redirecionamento de página (`window.location.replace`, apps/shell/src/App.tsx:12 e apps/shell/src/layouts/ShellLayout.tsx:24), não por composição no código-fonte.
- O shell lê o token em `localStorage` com a chave `companion_ai_access_token` (apps/shell/src/layouts/ShellLayout.tsx:5-8), a mesma que mfe-auth grava (apps/mfe-auth/src/lib/session.ts:1, :95-96). Não virou linha: não é um dos mecanismos listados no passo 4 (não há evento `storage`) e, com shell e mfe-auth em portas diferentes (`vite --port 3000`, apps/shell/package.json:7; `vite --port 3001`, apps/mfe-auth/package.json:7), as origens não compartilham o mesmo `localStorage`.
- Nenhum padrão `src-*` nem busca manual achou custom elements, iframes, `postMessage`, `CustomEvent` ou `BroadcastChannel` no código de `apps/*/src`; os `import()` de apps/mfe-auth/src (ex.: apps/mfe-auth/src/lib/auth-api.ts:100) são de arquivos locais.
