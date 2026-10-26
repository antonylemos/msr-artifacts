---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 185 — Marcel-b-velop/vue-mf

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| app-1/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | app-1/vite.config.ts:2 (`import federation from "@originjs/vite-plugin-federation"`); app-1/vite.config.ts:11-27 (`federation({ name: "remote-app1", ... exposes: { "./App1": ... }, remotes: { "remote-lib": ... }, shared })` em `plugins`); app-1/package.json:8 (build executa `vite build`, que lê a configuração padrão); app-1/src/main.ts:8 (consome `remote-lib/apiClient`) |
| app-2/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | app-2/vite.config.ts:2 (`import federation from "@originjs/vite-plugin-federation"`); app-2/vite.config.ts:11-30 (`federation({ name: "remote-app2", ... exposes: { "./App2", "./Home", "./LoginForm", "./RegisterForm" }, remotes: { "remote-lib": ... }, shared })` em `plugins`); app-2/package.json:8 (build executa `vite build`, que lê a configuração padrão) |
| host/package.json:24 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | host/vite.config.ts:2 (`import federation from "@originjs/vite-plugin-federation"`); host/vite.config.ts:11-26 (`federation({ name: "host-app", remotes: { "remote-app1", "remote-app2", "remote-lib" }, shared })` em `plugins`); host/package.json:8 (build executa `vite build`, que lê a configuração padrão); host/src/main.ts:12-14 (`import("remote-app1/App1")`, `remote-app2/App2`, `remote-lib/Confirm`) |
| lib/package.json:20 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | lib/vite.config.ts:2 (`import federation from "@originjs/vite-plugin-federation"`); lib/vite.config.ts:17-32 (`federation({ name: "remote-lib", ... exposes: { "./Confirm", "./apiClient", "./types" }, shared })` em `plugins`); lib/package.json:11 (build executa `vite build`, que lê a configuração padrão) |

## Notas

- A busca pelo nome do pacote fora das listas da inspeção (grep no snapshot, sem lockfiles e `lib/playwright-report/`) só encontra os quatro `package.json` e os quatro `vite.config.ts` já listados.
- `lib/vite.config.ts:1` importa `defineConfig` de `vitest/config`, que também serve ao `vite build`; não altera o julgamento.
