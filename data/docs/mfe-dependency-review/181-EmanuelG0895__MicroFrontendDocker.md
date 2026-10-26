---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 181 — EmanuelG0895/MicroFrontendDocker

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| MF-CharacterDetail/package.json:29 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | MF-CharacterDetail/rspack.config.ts:5 (`ModuleFederationPlugin` importado de `@module-federation/enhanced/rspack`); MF-CharacterDetail/rspack.config.ts:86 (`new ModuleFederationPlugin(mfConfig)`); MF-CharacterDetail/module-federation.config.ts:1-10 (`exposes` `./CharacterInfo` e `./View`); MF-CharacterDetail/package.json:5 e :8 (`rspack build` / `rspack serve`, que usam rspack.config.ts) |
| MF-Characters/package.json:29 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | MF-Characters/rspack.config.ts:5 (`ModuleFederationPlugin` importado de `@module-federation/enhanced/rspack`); MF-Characters/rspack.config.ts:81 (`new ModuleFederationPlugin(mfConfig)`); MF-Characters/module-federation.config.ts:1-8 (`exposes` `./Vista`); MF-Characters/package.json:5 e :8 (`rspack build` / `rspack serve`) |
| MF-Shell/package.json:29 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | MF-Shell/rspack.config.ts:5 (`ModuleFederationPlugin` importado de `@module-federation/enhanced/rspack`); MF-Shell/rspack.config.ts:98 (`new ModuleFederationPlugin(mfConfig)`); MF-Shell/module-federation.config.ts:3-6 (`remotes` `MF_CharacterDetail` e `MF_Characters`); MF-Shell/package.json:5 e :8 (`rspack build` / `rspack serve`); MF-Shell/src/App.tsx:6-7 (`import("MF_CharacterDetail/View")`) |

## Notas

- Os três projetos têm `package.json` próprio e não há workspace; cada linha foi julgada pelo `rspack.config.ts` do próprio pacote. As ocorrências de `other_package_matches` são a mesma configuração vista a partir dos outros pacotes.
- `MF-Characters/webpack.config.js:2` e `MF-CharacterDetail/webpack.config.js:2` estão em `same_package_matches`, mas importam `ModuleFederationPlugin` de `require('webpack').container`, não deste pacote; além disso, nenhum script do `package.json` usa webpack (`package.json:5-9`, só `rspack`). Não foram usados como evidência.
- `MF-Shell/@mf-types/index.d.ts:11` declara o módulo `@module-federation/enhanced/runtime` em tipos gerados; é declaração de tipos, não uso.
