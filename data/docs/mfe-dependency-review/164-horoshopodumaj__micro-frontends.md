---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 164 — horoshopodumaj/micro-frontends

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| host/package.json:25 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | host/rspack.config.ts:5, 8 e 81 (`import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack"`; `import { mfConfig } from "./module-federation.config"`; `new ModuleFederationPlugin(mfConfig)`); host/module-federation.config.ts:1-8 (`name: "host"`, `remotes: { remote: 'remote@http://localhost:3001/remoteEntry.js' }`); host/package.json:5 e 8 (`rspack build`/`rspack serve`, que leem o `rspack.config.ts` do diretório); host/src/App.tsx:3 e 19 (`import RemoteContent from 'remote/RemoteContent'`, renderizado) |
| remote/package.json:25 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | remote/rspack.config.ts:5, 8 e 81 (`import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack"`; `new ModuleFederationPlugin(mfConfig)`); remote/module-federation.config.ts:1-11 (`filename: 'remoteEntry.js'`, `remotes: { "vue_remote": ... }`, `exposes: { "./RemoteContent": "./src/RemoteContent.tsx" }`); remote/package.json:5 e 8 (`rspack build`/`rspack serve`); host/module-federation.config.ts:4 (o host consome `remote@http://localhost:3001/remoteEntry.js`) |
| vue-remote/package.json:25 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | vue-remote/rspack.config.ts:4, 7 e 82 (`import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack"`; `new ModuleFederationPlugin(mfConfig)`); vue-remote/module-federation.config.ts:1-14 (`name: "vue_remote"`, `filename: 'remoteEntry.js'`, `exposes: { "./Counter", "./vue" }`, `shared` vue singleton/eager); vue-remote/package.json:5 e 8 (`rspack build`/`rspack serve`); remote/module-federation.config.ts:5 (o remote consome `vue_remote@http://localhost:3002/remoteEntry.js`) |

## Notas

- Cada projeto declara o pacote no próprio `package.json` e o usa no próprio `rspack.config.ts`; as ocorrências em `other_package_matches` são dos outros dois projetos, que têm declaração própria.
- O grep fora das listas acha também `host/@mf-types/index.d.ts:9` (`declare module "@module-federation/enhanced/runtime"`), declaração de tipos gerada pelo plugin, não uso adicional.
