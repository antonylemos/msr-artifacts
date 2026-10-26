---
schema: 1
id: 1149061587
full_name: Christian-Encalada/examen-microfrontend
commit: 9456a399b086d78c65d167e0d08db5d2b8d31bb8
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 228 — Christian-Encalada/examen-microfrontend

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| alert-dashboard/package.json:27 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | alert-dashboard/rspack.config.ts:5 (`import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack"`); alert-dashboard/rspack.config.ts:81 (`new ModuleFederationPlugin(mfConfig)`); alert-dashboard/module-federation.config.ts:1-8 (`name: "AlertDashboard"`, `filename: "remoteEntry.js"`, `exposes: { "./AlertDashboard": ... }`, importado em alert-dashboard/rspack.config.ts:8); alert-dashboard/package.json:5 (`"build": "cross-env NODE_ENV=production rspack build"`, que usa o `rspack.config.ts` do diretório) |
| alert-sender/package.json:27 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | alert-sender/rspack.config.ts:5 (`import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack"`); alert-sender/rspack.config.ts:81 (`new ModuleFederationPlugin(mfConfig)`); alert-sender/module-federation.config.ts:1-8 (`name: "AlertSender"`, `filename: "remoteEntry.js"`, `exposes: { "./AlertSender": ... }`, importado em alert-sender/rspack.config.ts:8); alert-sender/package.json:5 (`"build": "cross-env NODE_ENV=production rspack build"`, que usa o `rspack.config.ts` do diretório) |
| package.json:27 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | rspack.config.ts:5 (`import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack"`); rspack.config.ts:81 (`new ModuleFederationPlugin(mfConfig)`); module-federation.config.ts:1-9 (`name: "appclases"`, `remotes: { AlertSender: ..., AlertDashboard: ... }`, importado em rspack.config.ts:8); package.json:5 (`"build": "cross-env NODE_ENV=production rspack build"`, que usa o `rspack.config.ts` da raiz) |

## Notas

- Cada `package.json` é julgado pelas ocorrências do próprio pacote (`same_package_matches`); as de `other_package_matches` são as mesmas configurações nos outros dois projetos, que têm `package.json` próprio e declaram o pacote cada um.
- Os `module-federation.config.ts` não importam o pacote; entram na evidência porque são o objeto passado ao `ModuleFederationPlugin` importado do pacote.
- A busca fora das listas (grep de `module-federation` em `*.ts`, `*.tsx`, `*.js`, `*.json`, sem lockfiles) só achou, além dos configs, `@mf-types/index.d.ts:3`, `:11` e `:19` (`declare module "@module-federation/runtime"` e afins), tipos gerados pela federação, não uso do pacote.
