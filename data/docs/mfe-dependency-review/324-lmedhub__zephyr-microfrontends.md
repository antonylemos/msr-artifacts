---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 324 — lmedhub/zephyr-microfrontends

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| frontend/package.json:59 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | No | sem import ou require de `@module-federation/enhanced` em `frontend/` (grep em `*.ts`, `*.tsx`, `*.js`, `*.json`, `*.vue`; única ocorrência é a declaração em frontend/package.json:59); os quatro builds usam o plugin embutido do Rspack: frontend/apps/host/rspack.config.ts:1 (`require("@rspack/core")`), :82 (`new rspack.container.ModuleFederationPlugin({`); o mesmo em frontend/apps/remote-header/rspack.config.ts:73, frontend/apps/remote-footer/rspack.config.ts:73 e frontend/apps/url-shortener/rspack.config.ts:74 |

## Notas

- Todos os itens de `other_package_matches` são o `ModuleFederationPlugin` de `@rspack/core` (`rspack.container.ModuleFederationPlugin`), não o do pacote `@module-federation/enhanced`. A Module Federation está configurada e em uso, mas pelo Rspack; o pacote declarado na raiz não é usado.
- Os manifestos das apps (`frontend/apps/*/package.json`) não declaram `@module-federation/enhanced`; só o `frontend/package.json` da raiz o declara.
