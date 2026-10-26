---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 142 — lavesan/nx-zephyr-module-federation-example

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | apps/shell/src/App.tsx:6 | apps/shell | dynamic-loading | Yes | `lazy(() => import("courses/App"))` carrega em runtime o módulo `./App` da unidade apps/courses (exposto em apps/courses/module-federation.config.ts:7-9), resolvido pelo remote `courses@${COURSES_URL}/remoteEntry.js` em apps/shell/module-federation.config.ts:21. Ativo: apps/shell/src/index.tsx:1 → apps/shell/src/bootstrap.tsx:3,10 → `Courses` renderizado em apps/shell/src/App.tsx:20. |
| src-remote-import | apps/shell/src/App.tsx:7 | apps/shell | dynamic-loading | Yes | `lazy(() => import("profile/App"))` carrega em runtime o módulo `./App` da unidade apps/profile (exposto em apps/profile/module-federation.config.ts:7-9), resolvido pelo remote `profile@${PROFILE_URL}/remoteEntry.js` em apps/shell/module-federation.config.ts:22. Ativo pela mesma cadeia; `Profile` renderizado em apps/shell/src/App.tsx:21. |
| src-async-bootstrap | apps/courses/src/index.tsx:1 | apps/courses | dynamic-loading | No | `import('./bootstrap')` carrega o próprio bootstrap (apps/courses/src/bootstrap.tsx:5-13); interno à unidade. |
| src-async-bootstrap | apps/shell/src/index.tsx:1 | apps/shell | dynamic-loading | No | `import("./bootstrap")` carrega o próprio bootstrap (apps/shell/src/bootstrap.tsx:5-13); interno à unidade. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | apps/shell/src/App.tsx:18 | apps/shell | host-relationship | Yes | `Routes` declara os caminhos em que o shell usa as outras unidades: `/courses*` → `Courses` e `/profile*` → `Profile`, com redirecionamento de `/` para `/courses` (apps/shell/src/App.tsx:18-22), dentro de `BrowserRouter` e `Suspense` (apps/shell/src/App.tsx:13-17); App montado em apps/shell/src/bootstrap.tsx:10. Os links de navegação estão em apps/shell/src/components/Header.tsx:16-43. |
| manual | apps/shell/src/App.tsx:20 | apps/shell | runtime-composition | Yes | O element da rota renderiza `<Courses />`, componente da unidade apps/courses resolvido pelo import remoto de apps/shell/src/App.tsx:6. |
| manual | apps/shell/src/App.tsx:21 | apps/shell | runtime-composition | Yes | O element da rota renderiza `<Profile />`, componente da unidade apps/profile resolvido pelo import remoto de apps/shell/src/App.tsx:7. |

## Resumo

Construções com composição: 5 (dynamic-loading: 2, host-relationship: 1, runtime-composition: 2).

## Notas

- apps/profile/src/index.tsx:1 importa `./bootstrap` de forma estática (`import "./bootstrap"`), por isso não aparece como `src-async-bootstrap`; não é construção de composição.
- Não há mecanismo de comunicação entre unidades (sem `CustomEvent`, `postMessage`, `BroadcastChannel` ou barramento compartilhado) nos arquivos de código das três unidades.
- As URLs dos remotes vêm de `VITE_COURSES_URL`/`VITE_PROFILE_URL` ou dos padrões em apps/shell/module-federation.config.ts:7-15; ambos os alvos estão no snapshot (apps/courses, apps/profile).
