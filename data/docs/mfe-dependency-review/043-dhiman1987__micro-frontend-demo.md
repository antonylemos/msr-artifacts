---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 043 — dhiman1987/micro-frontend-demo

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| app3/package.json:13 | dependencies | @lit/react | ^1.0.7 | web-components | No | sem import ou invocação de `@lit/react` nos arquivos de código e build do snapshot (busca literal, excluindo lockfiles); apenas declaração em app3/package.json:13; app3/src/MyCounterLitElement.jsx:20-23 (chama `createComponent` sem importar a função ou o pacote) |
| app3/package.json:15 | dependencies | lit | ^3.3.0 | web-components | Undetermined | app3/src/MyCounterLitElement.jsx:1-8 (importa `lit` e `lit/decorators.js`, estende `LitElement`); app3/src/MyCounterLitElement.jsx:16-23 (usa `html`, mas chama `createComponent` sem import); app3/vite.config.js:9-15 e app3/src/main.jsx:1 (build e entrada usam `MyCounterElement`, sem referência à variante Lit) |

## Notas

- As ocorrências same_package_matches e other_package_matches mostram custom elements nativos; não demonstram uso dos pacotes Lit.
- A variante MyCounterLitElement.jsx não é importada nem referenciada por build ou HTML no snapshot (busca por nome do arquivo e tag my-counter-lit-app). Há código Lit, mas seu uso efetivo não pode ser confirmado; por isso lit recebeu Undetermined.
- A chamada sem import a createComponent não demonstra invocação de @lit/react; não há import desse pacote em nenhum arquivo de código ou build.
