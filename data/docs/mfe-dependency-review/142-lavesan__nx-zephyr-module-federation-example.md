---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 142 — lavesan/nx-zephyr-module-federation-example

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:13 | devDependencies | @nx/js | 20.7.2 | monorepo-tool | Yes | nx.json:8-22 (plugin `@nx/js/typescript` registrado, com opções `typecheck` e `build`; carregado em toda execução do nx, como em vercel.json:2 `npx nx build shell`); sem import ou executor `@nx/js` fora do nx.json (grep, excluindo lockfile) |
| package.json:17 | devDependencies | nx | 20.7.2 | monorepo-tool | Yes | vercel.json:2 (`buildCommand` do deploy do shell invoca `npx nx build shell`); apps/courses/vercel.json:2 e apps/profile/vercel.json:2 (`npx nx build courses`, `npx nx build profile`); apps/shell/project.json:6-20 (targets `build` e `serve` com executor `nx:run-commands`), idem em apps/courses/project.json:6-20 e apps/profile/project.json:6-20 |

## Notas

- As listas da inspeção só trazem `pnpm-workspace.yaml:1`, que não mostra uso de nenhum dos dois pacotes. A evidência (plugin em `nx.json`, executores nos `project.json`, `buildCommand` dos `vercel.json`) apareceu fora das listas.
- Os scripts de package.json:6-8 invocam `nx run-many`, mas script não conta como uso; `nx` se apoia nos `buildCommand` de deploy da Vercel, no papel dos workflows de CI dos precedentes 006 e 039.
- `@nx/js`: julgado como em 039 (plugin registrado em `nx.json`, carregado nas execuções do nx). Aqui não há executor `@nx/js:*`; o plugin `@nx/js/typescript` infere targets a partir de `tsconfig*.json` (o `configName: tsconfig.lib.json` de nx.json:17 não existe no snapshot), mas o registro do plugin é a configuração do pacote em uso.
