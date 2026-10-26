---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 348 — hd789789789/frontend-app-learning-old-v2

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:48 | dependencies | @openedx/frontend-plugin-framework | ^1.7.0 | other-mfe-framework | Yes | src/plugin-slots/HeaderSlot/index.jsx:2 (`import { PluginSlot } from '@openedx/frontend-plugin-framework'`); src/plugin-slots/HeaderSlot/index.jsx:9-10 (`<PluginSlot id="org.openedx.frontend.layout.header_learning.v1"`); src/generic/PageNotFound.jsx:8 e src/generic/PageNotFound.jsx:20 (importa e renderiza `<HeaderSlot />`); src/index.jsx:54 (rota `path="*"` com `<PageNotFound />`, no ponto de entrada da aplicação) |

## Notas

- `same_package_matches` e `other_package_matches` estão vazios; toda a evidência veio da busca pelo nome do pacote fora das listas da inspeção.
- Em `src/plugin-slots/`, 28 arquivos `index.*` de slots importam `PluginSlot` do pacote (por exemplo, `FooterSlot`, `SequenceContainerSlot`, `CourseBreadcrumbsSlot`); o `HeaderSlot` também é usado em `src/tab-page/TabPage.jsx:9` e `src/generic/CourseAccessErrorPage.jsx:7`. Basta uma cadeia até uma rota para o `Yes`.
- `example.env.config.jsx:2` importa `DIRECT_PLUGIN` e `PLUGIN_OPERATIONS`, mas é um exemplo não referenciado por nenhum build no snapshot; não foi usado como evidência. Os `README.md` de `src/plugin-slots/` e `README.rst:137` só documentam o pacote. `src/setupTest.js:31-32` é mock de teste.
