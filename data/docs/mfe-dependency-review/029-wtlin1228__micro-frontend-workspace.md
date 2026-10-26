---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 029 — wtlin1228/micro-frontend-workspace

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| packages/app-mf-1/package.json:17 | devDependencies | @module-federation/rsbuild-plugin | ^0.18.3 | module-federation | Yes | packages/app-mf-1/rsbuild.config.ts:1-11 (configuração padrão do build Rsbuild importa e invoca `pluginModuleFederation`); packages/app-mf-1/module-federation.config.ts:1-13 (`createModuleFederationConfig` configura exposes e shared); packages/app-mf-1/package.json:5-8 (build Rsbuild) |
| packages/app-mf-2/package.json:17 | devDependencies | @module-federation/rsbuild-plugin | ^0.18.3 | module-federation | Yes | packages/app-mf-2/rsbuild.config.ts:1-11 (configuração padrão do build Rsbuild importa e invoca `pluginModuleFederation`); packages/app-mf-2/module-federation.config.ts:1-13 (`createModuleFederationConfig` configura exposes e shared); packages/app-mf-2/package.json:5-8 (build Rsbuild) |
| packages/host/package.json:11 | dependencies | @module-federation/enhanced | ^0.18.3 | module-federation | Yes | packages/host/src/app-loaders/module-federation.ts:1-4 e packages/host/src/app-loaders/module-federation.ts:27-43 (importa e invoca `registerRemotes` e `loadRemote` de `@module-federation/enhanced/runtime`); packages/host/src/routes/apps.$baseRoute.tsx:7-24 (rota importa o manager e chama `getRemote`); packages/host/src/routes/apps.$baseRoute.tsx:39-55 (renderiza o componente remoto) |
| packages/host/package.json:13 | dependencies | qiankun | ^2.10.16 | qiankun | Yes | packages/host/src/app-loaders/qiankun.ts:2-26 (importa e invoca `registerMicroApps` e `start`); packages/host/src/app-loaders/index.ts:2 (reexporta `registerQiankunApps`); packages/host/src/App.tsx:3-11 (componente principal chama o registro em `useEffect`) |
| packages/host/package.json:19 | devDependencies | @module-federation/rsbuild-plugin | ^0.18.3 | module-federation | Yes | packages/host/rsbuild.config.ts:1-8 (configuração padrão do build Rsbuild importa e invoca `pluginModuleFederation`); packages/host/module-federation.config.ts:1-16 (`createModuleFederationConfig` configura o host); packages/host/package.json:5-8 (build Rsbuild) |

## Notas

- O objeto remotes do host está vazio; os registros efetivos são feitos pela API de runtime com APP_CONFIGS (packages/host/src/configs/apps.ts:9-34). Cada resposta usa a importação do pacote correspondente, sem transferir evidência entre o plugin e o runtime.
