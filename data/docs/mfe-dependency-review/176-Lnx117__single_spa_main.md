---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 176 — Lnx117/single_spa_main

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:16 | dependencies | single-spa | ^6.0.3 | single-spa | Yes | src/main.ts:3 (`import { registerApplication, start } from 'single-spa'`); src/main.ts:13-17 e src/main.ts:21-25 (`registerApplication` de `menu` e `base`); src/main.ts:29 (`start()`); index.html:20 (`<script type="module" src="/src/main.ts">`, entrada do Vite) |
| package.json:20 | devDependencies | vite-plugin-single-spa | ^1.1.0 | single-spa | Yes | vite.config.ts:3 (`import vitePluginSingleSpa from 'vite-plugin-single-spa'`); vite.config.ts:12-15 (`vitePluginSingleSpa({ type: 'root', cssStrategy: 'multiMife' })` em `plugins`); package.json:7-8 (`vite` e `vite build`, que carregam `vite.config.ts`) |

## Notas

- As duas linhas trazem as mesmas `same_package_matches` (`src/main.ts:13` e `:21`), que são chamadas de `single-spa`, não do plugin. A evidência de `vite-plugin-single-spa` só aparece fora das listas, em `vite.config.ts:3` e `:12-15` (grep).
- `index.html:12` e `:17` têm os contêineres `single-spa-application:menu` e `single-spa-application:base`; citam o nome da tecnologia, mas não importam pacote.
