---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 257 — ral-facilities/scigateway

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:50 | dependencies | single-spa | 6.0.3 | single-spa | Yes | src/state/actions/loadMicroFrontends.tsx:2 e 31-49 (`import * as singleSpa from 'single-spa'`; `singleSpa.registerApplication(name, () => loadReactApp(name), (location) => ...)`); src/state/actions/scigateway.actions.tsx:8, 69, 363 e 391/401/408 (importa `single-spa` e `./loadMicroFrontends`; `loadMicroFrontends.init(settings.plugins)`; `singleSpa.start()`); src/App.tsx:9-11 e 50 (importa `configureSite` e chama `dispatch(configureSite())`); src/main.tsx:3 e 9 (importa `./App` e renderiza); index.html:32 (`<script type="module" src="/src/main.tsx">`, entrada do Vite) |

## Notas

- `server/e2e-plugin/main.js:9`, em `same_package_matches`, é um bundle compilado do plugin de demonstração (outro repositório, segundo `server/README.md`), com código de single-spa embutido; não é uso deste pacote pelo host e não foi usado como evidência.
- Fora das listas, o grep por `single-spa` também acha `src/state/middleware/scigateway.middleware.tsx:6` e 153-156 (`getAppStatus`, `triggerAppChange`) e `src/routing/routing.component.tsx:6` e 165 (`unloadApplication`), além de mocks em testes (`src/setupTests.ts:32`).
