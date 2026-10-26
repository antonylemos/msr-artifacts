---
schema: 1
id: 1042592063
full_name: Jyotisaini1234/moduleFederation
commit: 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 172 — Jyotisaini1234/moduleFederation

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| mfe1/package.json:15 | dependencies | @module-federation/node | ^2.7.14 | module-federation | No | sem import, plugin ou invocação de `@module-federation/node` nos arquivos de código e de build do snapshot (grep por `module-federation` em todos os arquivos, excluindo lockfiles); apenas declaração em mfe1/package.json:15. As ocorrências da inspeção são do plugin embutido no webpack: mfe1/webpack.config.ts:5, 11-12 e 74 (`import webpackPkg from 'webpack'`; `const { ModuleFederationPlugin } = container`; `new ModuleFederationPlugin({...})`) |

## Notas

- `same_package_matches` (mfe1/webpack.config.ts:12, 74, 76, 79, 81, 85) e `other_package_matches` (mfe2/webpack.config.ts:7, 37, 40, 41) apontam para o `ModuleFederationPlugin` de `webpack.container` (mfe1/webpack.config.ts:11-12; mfe2/webpack.config.ts:6-7), não para `@module-federation/node`. Module Federation está configurado, mas por outro pacote; isso já está na classificação.
- O servidor SSR de `mfe1/src/server/server.ts` também não importa `@module-federation/node`.
