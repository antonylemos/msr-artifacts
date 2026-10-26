---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 006 — Pandian-it/eager-workspace1

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:37 | devDependencies | @angular-architects/module-federation | ^20.0.0 | module-federation | Yes | projects/shell/webpack.config.js:1-18 (`withModuleFederationPlugin` e `shareAll` importados e invocados); projects/shell/project.json:19-40 (build com `@nx/angular:webpack-browser` referencia essa configuração) |
| package.json:46 | devDependencies | @nx/angular | 21.3.11 | monorepo-tool | Yes | projects/shell/project.json:19-40 (executor `@nx/angular:webpack-browser` no target `build`); .github/workflows/Push-Event-To-Release.yml:140-145 (pipeline executa `nx build` para os projetos afetados) |
| package.json:47 | devDependencies | @nx/workspace | 21.3.11 | monorepo-tool | No | sem import, executor ou invocação de `@nx/workspace` nos arquivos de código, configuração e workflows do snapshot (busca literal, excluindo lockfiles); apenas declaração em package.json:47 |
| package.json:59 | devDependencies | nx | 21.3.11 | monorepo-tool | Yes | .github/workflows/User-Pull-Request.yml:36-54 (job ativo invoca `npx nx show projects` e `npx nx affected --target=build`); nx.json:3-20 (defaults de build e test configurados) |

## Notas

- As ocorrências de tooling são as mesmas para os três pacotes Nx, mas não demonstram uso de `@nx/workspace`. Os comandos dos workflows invocam `nx`, e o executor de build pertence a `@nx/angular`.
- Os jobs de lint/test em .github/workflows/User-Pull-Request.yml:88-103 estão comentados; não sustentam as respostas.
- As configurações de federação pertencem aos pacotes em projects/<app>/ e usam a dependência declarada na raiz.
