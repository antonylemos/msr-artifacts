---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 059 — Efraim0601/union-portal

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:28 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | sem import ou invocação de `@softarc/native-federation-node` nos arquivos de código e build do snapshot (busca literal, excluindo lockfiles); apenas declaração em package.json:28; projects/shell/src/main.ts:1-5 (usa outro pacote, `@angular-architects/native-federation`) |
| package.json:39 | devDependencies | @angular-architects/native-federation | 21.2.5 | native-federation | Yes | angular.json:51-64 (target build invoca o builder `@angular-architects/native-federation:build`); angular.json:76-80 (entrada do shell); projects/shell/src/main.ts:1-5 (importa e invoca `initFederation` antes do bootstrap); projects/shell/src/app/app.routes.ts:2-18 (importa e invoca `loadRemoteModule`); projects/shell/src/app/app.config.ts:7-10 (registra as rotas) |

## Notas

- As listas de matches são idênticas para os dois pacotes, mas seus imports e builders usam @angular-architects/native-federation. Isso não demonstra uso direto de @softarc/native-federation-node.
- Os diretórios projects/shell/, projects/promote/ e projects/diaspora/ não possuem package.json próprio; pertencem ao pacote da raiz.
- Em 2026-10-21 a configuração piloto mfe-dependencies-001 foi revisada para separar `native-federation` de `module-federation` (o histórico de hashes e saídas anteriores estava no documento do projeto original `docs/mfe-config-revisions.md`, que não está incluído neste pacote). Só a coluna Tecnologia das duas linhas mudou; as respostas e as evidências são as mesmas.
