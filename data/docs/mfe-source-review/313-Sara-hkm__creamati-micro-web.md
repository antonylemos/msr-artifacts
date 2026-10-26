---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 313 — Sara-hkm/creamati-micro-web

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-iframe | frontend/container/src/App.tsx:239 | frontend/container | embedding | Yes | `<iframe>` do container cujo `src` escolhe, pela aba ativa, a URL publicada de um dos quatro micro-frontends: `.../golden-sample-react-micro-web/user-management/`, `/data-grid/`, `/analytics/` e `/settings/` (frontend/container/src/App.tsx:240-245); os segmentos coincidem com os `destination_dir` de publicação das unidades `frontend/user-management-app`, `frontend/data-grid-app`, `frontend/analytics-app` e `frontend/settings-app` (.github/workflows/deploy-all.yml:86-89 e 116). O frame só é renderizado fora da aba `home` (frontend/container/src/App.tsx:138 e 218), e as abas vêm de `menuItems` (frontend/container/src/App.tsx:12-18), acionadas por `openMicroFrontend` (:8-10, :93, :158). Ativo: `App` é renderizado pela entrada `frontend/container/src/index.tsx:4` e `:10-14`. |

## Construções fora da mineração

Nenhuma construção adicional.

## Resumo

Construções com composição: 1 (embedding: 1).

## Notas

- As URLs do `iframe` apontam para `olivium-dev.github.io/golden-sample-react-micro-web/` (frontend/container/src/App.tsx:241-244), não para o GitHub Pages deste repositório (`Sara-hkm`), onde os workflows do snapshot publicariam; os caminhos coincidem com os destinos de publicação das quatro unidades, por isso a composição é `Yes` com alvo nessas unidades, servidas de uma origem externa.
- Os quatro micro-frontends não têm construção de composição: `App.tsx` só renderiza conteúdo estático (ex.: frontend/analytics-app/src/App.tsx:4-34); não há `postMessage` nem outra comunicação entre o container e os frames.
- O único `import()` nas unidades é o `import('web-vitals')` padrão do CRA em `src/reportWebVitals.ts:5` de cada app, interno à unidade; não vira linha.
- `.cursor/templates/` (ex.: `RemoteComponent.template.tsx`, `webpack.config.template.js`) são modelos para geração de código, fora de qualquer unidade da revisão estrutural e não usados por nenhum build; não foram registrados.
