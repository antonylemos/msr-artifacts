---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 087 — SABHGG/odin-replica

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:13 | dependencies | single-spa | ^6.0.3 | single-spa | Yes | src/index.js:3 (`import { registerApplication, start, triggerAppChange } from 'single-spa'`); src/index.js:56-60 e 63-100 (`registerApplication('odin-react', ...)` e `registerApplication('leadocs-angular', ...)` com carga do bundle remoto); src/index.js:103 (`start()`); package.json:19-20 (`react-scripts start`/`build`, cuja entrada é `src/index.js`) |
| package.json:14 | dependencies | single-spa-react | ^6.0.2 | single-spa | Yes | src/root.app.js:3 e 6-14 (`import singleSpaReact from 'single-spa-react'`; `singleSpaReact({ React, ReactDOM, rootComponent: App, ... })`); src/index.js:4 e 58 (importa `./root.app` e o passa como lifecycles de `odin-react`) |

## Notas

- As listas da inspeção dão as mesmas quatro ocorrências às duas linhas; `src/index.js` sustenta só `single-spa`, e `src/root.app.js` sustenta só `single-spa-react`. A evidência de cada linha foi tirada do import do próprio pacote (grep por `single-spa` nos `.js`/`.json` do snapshot).
- `src/index.js` é a entrada pela convenção do CRA (`react-scripts`), sem configuração de build no snapshot.
