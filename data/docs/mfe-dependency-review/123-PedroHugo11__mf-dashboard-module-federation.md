---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 123 — PedroHugo11/mf-dashboard-module-federation

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| mfe-counter/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | mfe-counter/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); mfe-counter/vite.config.ts:12-21 (configuração padrão do Vite invoca `federation` em plugins com `name: "counter"`, `filename: "remoteEntry.js"`, `exposes` e `shared`); mfe-counter/package.json:6-10 (`dev`, `build` e `preview` executam `vite` sem configuração alternativa) |
| mfe-weather/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | mfe-weather/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); mfe-weather/vite.config.ts:12-21 (configuração padrão do Vite invoca `federation` em plugins com `name: "weather"`, `filename: "remoteEntry.js"`, `exposes` e `shared`); mfe-weather/package.json:6-10 (`dev`, `build` e `preview` executam `vite` sem configuração alternativa) |
| shell/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | shell/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); shell/vite.config.ts:12-20 (configuração padrão do Vite invoca `federation` em plugins com `remotes` weather/counter e `shared`); shell/package.json:6-10 (`dev`, `build` e `preview` executam `vite` sem configuração alternativa); shell/src/App.tsx:3-4 (`import("weather/Widget")` e `import("counter/Widget")`) |

## Notas

- Cada pacote tem o próprio `vite.config.ts` usando o plugin; as ocorrências em `other_package_matches` são dos outros dois pacotes e não foram usadas como evidência da linha.
- O `grep` por `vite-plugin-federation` fora de lockfiles só encontrou os três manifestos e os três `vite.config.ts:3`.
