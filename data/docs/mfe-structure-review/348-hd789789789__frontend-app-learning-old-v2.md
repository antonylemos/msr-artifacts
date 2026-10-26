---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 348 — hd789789789/frontend-app-learning-old-v2

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json;webpack.dev.config.js;webpack.prod.config.js | package.json | src/index.jsx:41 (convenção `src/index.*` de `createConfig` do `@openedx/frontend-build`, sem `entry` declarado no snapshot; `createRoot(document.getElementById('root'))`); public/index.html:17 (template com `<div id="root">`) | webpack.prod.config.js:2-5 (`createConfig('webpack-prod')` do `@openedx/frontend-build`); webpack.dev.config.js:2-4 (`createConfig('webpack-dev')`); package.json:13 (`fedx-scripts webpack`) | — | .github/workflows/validate.yml:17 (`make validate.ci`, que roda `npm run build` em Makefile:60) | Yes | Única aplicação do snapshot (a Learning MFE, React), com entrada e build próprios |
| public | public/index.html | — | — | — | — | — | No | Parte da unidade `.`: `public/index.html` é o template HTML do build da raiz, e webpack.prod.config.js:8-15 copia `public/static` para `dist/static` |

## Resumo

Aplicações frontend no snapshot: 1 (.).

## Notas

- A classificação registra `frontend_units: 2`: esta aplicação e a Discussions MFE, que fica fora do snapshot e só entra por `<iframe>` com a URL `DISCUSSIONS_MFE_BASE_URL`.
- O `entry` e o uso de `public/index.html` vêm da configuração padrão do `@openedx/frontend-build` (pacote externo, fora do snapshot); o snapshot só mostra a chamada `createConfig` e os arquivos nas posições convencionais.
- O único `ws-*` do `matches.csv` é `ws-path-alias` em tsconfig.json:6 (`paths` com `@src/*`), alias de importação, não declaração de workspace.
- O workflow `validate.yml` roda testes, lint e build em CI, sem publicar artefato de implantação; os demais workflows (`ci-workflow-file`) são de gestão de issues, commitlint e lockfile. `catalog-info.yaml` é metadado de catálogo, não deploy.
