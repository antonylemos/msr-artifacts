---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 273 — kod88vn/poc_next_mfa

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:18 | devDependencies | turbo | ^2.3.3 | monorepo-tool | Undetermined | turbo.json:5-26 (tasks `build`, `dev`, `lint`, `type-check`, `clean` configuradas); a única invocação de `turbo` está nos scripts de package.json:9-11 e `:13-14`, que não contam como uso; sem workflow de CI, Dockerfile ou script de automação que chame `turbo` (grep, excluindo lockfiles) |

## Notas

- O único item de `same_package_matches`, `package.json:4`, é a linha `"workspaces": [` (`package.json:4-7`), declaração do workspace npm, não configuração do Turborepo.
- As demais ocorrências de `turbo` fora de `turbo.json` são documentação ou texto de UI: README.md:57, README.md:84, apps/duda/ARCHITECTURE.md:24, apps/shell/app/page.tsx:28 e `:80`, .gitignore:28-29.
