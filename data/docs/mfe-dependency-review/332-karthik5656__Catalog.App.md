---
schema: 1
id: 1350705751
full_name: karthik5656/Catalog.App
commit: 1982e0f3dae5a8508d354f9db91a089ba96d4bd6
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 332 — karthik5656/Catalog.App

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| src/frontend/apps/ui-catalog-consumer/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | src/frontend/apps/ui-catalog-consumer/vite.config.ts:5 (`import federation from "@originjs/vite-plugin-federation"`); src/frontend/apps/ui-catalog-consumer/vite.config.ts:16-23 (`federation({ name: "consumerApp", filename: "remoteEntry.js", exposes: { "./App": "./src/App" }, shared })`); src/frontend/apps/ui-catalog-consumer/package.json:8 (build executa `vite build`, que lê a configuração padrão `vite.config.ts`) |
| src/frontend/apps/ui-catalog-merchant/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | src/frontend/apps/ui-catalog-merchant/vite.config.ts:5 (`import federation from "@originjs/vite-plugin-federation"`); src/frontend/apps/ui-catalog-merchant/vite.config.ts:16-23 (`federation({ name: "consumerApp", filename: "remoteEntry.js", exposes: { "./App": "./src/App" }, shared })`); src/frontend/apps/ui-catalog-merchant/package.json:8 (build executa `vite build`, que lê a configuração padrão `vite.config.ts`) |
| src/frontend/apps/ui-catalog/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | src/frontend/apps/ui-catalog/vite.config.ts:5 (`import federation from '@originjs/vite-plugin-federation'`); src/frontend/apps/ui-catalog/vite.config.ts:85-89 (`federation({ name: 'app', remotes: federationRemotes, shared })`, com `federationRemotes` montado de `remotes.json` em `:10-17`); src/frontend/apps/ui-catalog/package.json:8 (build executa `tsc -noemit && vite build`, que lê a configuração padrão `vite.config.ts`) |

## Notas

- O `grep` por `@originjs/vite-plugin-federation` fora dos lockfiles só encontra os três `package.json:13` e os três `vite.config.ts:5`; não há uso em código de aplicação.
- Os dois remotos se declaram `name: "consumerApp"` (`ui-catalog-merchant/vite.config.ts:17` e `ui-catalog-consumer/vite.config.ts:17`), como a classificação já registra. Isso não muda o julgamento: em cada um o plugin está importado, invocado e usado pelo build.
