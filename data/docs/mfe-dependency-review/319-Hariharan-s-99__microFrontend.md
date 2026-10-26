---
schema: 1
id: 973277755
full_name: Hariharan-s-99/microFrontend
commit: 902273771afdb4f52006aeed0bcb3cd0e6c33cee
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 319 — Hariharan-s-99/microFrontend

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| container/package.json:29 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | container/rspack.config.ts:5 (`ModuleFederationPlugin` importado de `@module-federation/enhanced/rspack`); container/rspack.config.ts:94 (`new ModuleFederationPlugin(mfConfig)` em `plugins`); container/module-federation.config.ts:1-8 (`name: "container"`, remotes `settings` e `home`); container/package.json:5 e container/package.json:8 (`rspack build` / `rspack serve`, que leem `rspack.config.ts`) |
| home/package.json:29 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | home/rspack.config.ts:5 (`ModuleFederationPlugin` importado de `@module-federation/enhanced/rspack`); home/rspack.config.ts:94 (`new ModuleFederationPlugin(mfConfig)` em `plugins`); home/module-federation.config.ts:1-8 (`name: "home"`, `filename: "remoteEntry.js"`, expõe `./app`); home/package.json:5 e home/package.json:8 (`rspack build` / `rspack serve`) |
| settings/package.json:28 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | settings/rspack.config.ts:5 (`ModuleFederationPlugin` importado de `@module-federation/enhanced/rspack`); settings/rspack.config.ts:93 (`new ModuleFederationPlugin(mfConfig)` em `plugins`); settings/module-federation.config.ts:1-8 (`name: "settings"`, `filename: "remoteEntry.js"`, expõe `./app`); settings/package.json:5 e settings/package.json:8 (`rspack build` / `rspack serve`) |

## Notas

- Cada pacote usa a própria cópia do plugin; as ocorrências em `other_package_matches` são as configurações equivalentes dos outros dois pacotes e não foram usadas como evidência da linha.
- O grep fora das listas não achou outro uso do pacote (só `rspack.config.ts` e os `package.json`). `advancedWebpack/` não declara nem usa o pacote.
- O host consome os remotos em container/src/Home.tsx:1 (`import { mount } from "home/app"`) e container/src/Settings.tsx:1 (`import { mount } from "settings/app"`).
