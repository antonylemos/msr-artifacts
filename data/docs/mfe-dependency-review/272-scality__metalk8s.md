---
schema: 1
id: 124905930
full_name: scality/metalk8s
commit: f19004e899c78360d3a43d5f60047b140f29c909
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 272 — scality/metalk8s

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| shell-ui/package.json:52 | dependencies | @scality/module-federation | 1.6.1 | module-federation | Yes | shell-ui/src/FederatedApp.tsx:6 (`import { FederatedComponent, FederatedComponentProps, SolutionUI } from '@scality/module-federation'`); shell-ui/src/FederatedApp.tsx:85-92 (`<FederatedComponent url=… module={module} scope={scope}>` monta cada remote); shell-ui/src/index.tsx:2 (entrada importa `./FederatedApp`; `entry: './src/index.tsx'` em shell-ui/rspack.config.ts:46, build `rspack build -c rspack.config.ts` em shell-ui/package.json:9); shell-ui/rspack.config.ts:156-159 (`'@scality/module-federation': { singleton: true, eager: true }` no `shared`) |
| shell-ui/package.json:20 | devDependencies | @module-federation/enhanced | ^0.21.6 | module-federation | Yes | shell-ui/rspack.config.ts:6 (`import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack'`); shell-ui/rspack.config.ts:130-144 (`new ModuleFederationPlugin({ name: 'shell', … exposes: { './App', … } })`); shell-ui/package.json:9 (build `rspack build -c rspack.config.ts`); shell-ui/src/FederatedApp.tsx:12 (`import { loadShare } from '@module-federation/enhanced/runtime'`), usado em `InternalApp` (shell-ui/src/FederatedApp.tsx:145-152) |
| ui/package.json:11 | dependencies | @scality/module-federation | 1.6.1 | module-federation | Yes | ui/rspack.config.ts:6 (`import { MicroAppRuntimeConfigurationPlugin } from '@scality/module-federation'`); ui/rspack.config.ts:171-206 (`new MicroAppRuntimeConfigurationPlugin({ kind: 'MicroAppRuntimeConfiguration', … })` em `plugins`); ui/package.json:39 (build `rspack build -c rspack.config.ts`); ui/src/FederableApp.tsx:20 e ui/src/FederableApp.tsx:120-122 (`ShellHooksProvider` do pacote envolve o módulo exposto `./FederableApp`, ui/rspack.config.ts:122); ui/rspack.config.ts:135-137 (`shared` singleton) |
| ui/package.json:75 | devDependencies | @module-federation/enhanced | ^0.21.6 | module-federation | Yes | ui/rspack.config.ts:5 (`import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack'`); ui/rspack.config.ts:118-127 (`new ModuleFederationPlugin({ name: 'metalk8s', filename: \`static/js/remoteEntry.${version}.js\`, exposes: { './FederableApp', … } })`); ui/package.json:39 (build `rspack build -c rspack.config.ts`) |

## Notas

- Dois pacotes (`shell-ui/`, `ui/`), cada um com seu `rspack.config.ts`; as listas de cada linha trazem em `other_package_matches` as ocorrências do outro pacote, que não foram usadas como evidência da linha.
- `ui/rspack.config.ts:6` (import de `MicroAppRuntimeConfigurationPlugin` de `@scality/module-federation`) não está nas listas da inspeção (que trazem `:5`); apareceu só no grep.
- `shell-ui/src/FederatedApp.tsx:19-23` está em `same_package_matches`, mas são imports locais de `./initFederation/…`, não do pacote; os usos do pacote nesse arquivo estão em `:6` e `:12`.
- `ui/@mf-types/**` são tipos gerados do shell, versionados; não foram usados como evidência.
- `ui/src/index.ts` (entry `metalk8s_ui` em ui/rspack.config.ts:32-34) tem 0 bytes no snapshot; o código da UI entra pelos `exposes` do plugin, não pela entry. Não altera as respostas.
- `ui/rspack.config.ts:128-132`: `remotes: { shell }` só fora de produção.
