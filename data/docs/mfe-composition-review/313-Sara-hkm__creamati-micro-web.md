---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 313 — Sara-hkm/creamati-micro-web

## Leitura do repositório

“Golden sample” de micro-frontends com React e integração por iframe (README.md:1-3, 18-21). Há cinco aplicações Create React App em `frontend/`: o `frontend/container` e quatro micro-frontends (`frontend/user-management-app`, `frontend/data-grid-app`, `frontend/analytics-app` e `frontend/settings-app`). Não há biblioteca de composição nem configuração de build própria; o único mecanismo é um `<iframe>` no container.

O container tem cabeçalho, menu lateral e área principal. O menu lista `home`, `users`, `data`, `analytics` e `settings` (frontend/container/src/App.tsx:12-18), e um clique troca a aba ativa por `openMicroFrontend` (frontend/container/src/App.tsx:8-10, 93, 158). Fora da aba `home`, a área principal mostra um único `<iframe>` cujo `src` é escolhido pela aba: as URLs `https://olivium-dev.github.io/golden-sample-react-micro-web/` seguidas de `user-management/`, `data-grid/`, `analytics/` ou `settings/` (frontend/container/src/App.tsx:138, 218, 239-245). Uma mesma linha de código sustenta, portanto, quatro relações, uma por micro-frontend.

Os segmentos das URLs coincidem com os subdiretórios em que os workflows publicam o build de cada micro-frontend no GitHub Pages (`destination_dir`, .github/workflows/deploy-all.yml:86-89 e 116; .github/workflows/deploy-<app>.yml:42-43). Essa correspondência de nome resolve cada destino numa unidade, como já fez a revisão de código-fonte. A particularidade é a origem das URLs: elas apontam para o GitHub Pages da conta `olivium-dev`, e não para o desta conta (`Sara-hkm`), onde os workflows do snapshot publicariam; o container embute builds dessas unidades servidos por outra origem. Nenhum `frontend/*/package.json` declara `homepage`, de modo que a ligação entre URL e unidade vem só do `destination_dir` dos workflows. Os destinos foram resolvidos por esse nome, como na revisão de código-fonte (Notas, primeiro item); se a origem externa pesasse mais que o caminho, os quatro destinos seriam escritos pela URL, com No snapshot `No`.

Os micro-frontends são páginas estáticas de demonstração (ex.: frontend/analytics-app/src/App.tsx:4-12) sem código de composição. Não há `postMessage`, `CustomEvent`, `BroadcastChannel` nem `addEventListener` em `frontend/*/src`, de modo que não há relação `communication`. Module Federation só aparece no README como melhoria futura e nos modelos de `.cursor/templates/`, fora de qualquer unidade (ver a revisão de código-fonte); não virou relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | frontend/container | frontend/analytics-app | page → embedded-frontend | origem → destino | iframe | Yes | Yes | .github/workflows/deploy-all.yml:88 (matriz: `analytics-app` → `destination: 'analytics'`); .github/workflows/deploy-all.yml:115-116 (`publish_dir` e `destination_dir` da matriz); .github/workflows/deploy-analytics.yml:42-43 (`publish_dir: frontend/analytics-app/build`, `destination_dir: analytics`) | frontend/container/src/App.tsx:239 |
| 2 | frontend/container | frontend/data-grid-app | page → embedded-frontend | origem → destino | iframe | Yes | Yes | .github/workflows/deploy-all.yml:87 (matriz: `data-grid-app` → `destination: 'data-grid'`); .github/workflows/deploy-all.yml:115-116 (`publish_dir` e `destination_dir` da matriz); .github/workflows/deploy-data-grid.yml:42-43 (`publish_dir: frontend/data-grid-app/build`, `destination_dir: data-grid`) | frontend/container/src/App.tsx:239 |
| 3 | frontend/container | frontend/settings-app | page → embedded-frontend | origem → destino | iframe | Yes | Yes | .github/workflows/deploy-all.yml:89 (matriz: `settings-app` → `destination: 'settings'`); .github/workflows/deploy-all.yml:115-116 (`publish_dir` e `destination_dir` da matriz); .github/workflows/deploy-settings.yml:42-43 (`publish_dir: frontend/settings-app/build`, `destination_dir: settings`) | frontend/container/src/App.tsx:239 |
| 4 | frontend/container | frontend/user-management-app | page → embedded-frontend | origem → destino | iframe | Yes | Yes | .github/workflows/deploy-all.yml:86 (matriz: `user-management-app` → `destination: 'user-management'`); .github/workflows/deploy-all.yml:115-116 (`publish_dir` e `destination_dir` da matriz); .github/workflows/deploy-user-management.yml:42-43 (`publish_dir: frontend/user-management-app/build`, `destination_dir: user-management`) | frontend/container/src/App.tsx:239 |

## Observações

**1. frontend/container → frontend/analytics-app.** Na aba `analytics`, o `<iframe>` do container recebe `https://olivium-dev.github.io/golden-sample-react-micro-web/analytics/` (frontend/container/src/App.tsx:239, 243). O segmento `analytics` é o `destination_dir` com que o build de `frontend/analytics-app` é publicado (.github/workflows/deploy-all.yml:88, 115-116; .github/workflows/deploy-analytics.yml:42-43), o que resolve o destino na unidade (No snapshot `Yes`). A URL aponta para o GitHub Pages da conta `olivium-dev`, e não para o desta conta; a correspondência é de caminho, não de origem. Ativa `Yes`: a linha da revisão de código-fonte é `Yes`, e o `App` é renderizado pela entrada do container (frontend/container/src/index.tsx:4, 10-14).

**2. frontend/container → frontend/data-grid-app.** Mesmo `<iframe>`, na aba `data`, com `.../golden-sample-react-micro-web/data-grid/` (frontend/container/src/App.tsx:239, 242). O segmento `data-grid` é o `destination_dir` de `frontend/data-grid-app` (.github/workflows/deploy-all.yml:87, 115-116; .github/workflows/deploy-data-grid.yml:42-43). O id da aba (`data`, frontend/container/src/App.tsx:15) difere do segmento da URL; o que liga à unidade é o segmento. Valores de No snapshot e Ativa como na relação 1.

**3. frontend/container → frontend/settings-app.** Mesmo `<iframe>`, na aba `settings`, com `.../golden-sample-react-micro-web/settings/` (frontend/container/src/App.tsx:239, 244). O segmento `settings` é o `destination_dir` de `frontend/settings-app` (.github/workflows/deploy-all.yml:89, 115-116; .github/workflows/deploy-settings.yml:42-43). Valores de No snapshot e Ativa como na relação 1.

**4. frontend/container → frontend/user-management-app.** Mesmo `<iframe>`, na aba `users`, com `.../golden-sample-react-micro-web/user-management/` (frontend/container/src/App.tsx:239, 241). O segmento `user-management` é o `destination_dir` de `frontend/user-management-app` (.github/workflows/deploy-all.yml:86, 115-116; .github/workflows/deploy-user-management.yml:42-43); o id da aba é `users` (frontend/container/src/App.tsx:14). Valores de No snapshot e Ativa como na relação 1.

## Resumo

Relações: 4 (page → embedded-frontend: 4). Ativas: 4. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

