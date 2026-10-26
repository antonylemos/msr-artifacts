---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 190 — dmalancioiu/SOA-project

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| frontend/order-tracking/package.json:27 | devDependencies | @module-federation/enhanced | ^0.2.3 | module-federation | Yes | frontend/order-tracking/webpack.config.js:2 (`require('@module-federation/enhanced/webpack')`); frontend/order-tracking/webpack.config.js:45-59 (`new ModuleFederationPlugin({ name: 'orderTracking', filename: 'remoteEntry.js', exposes: { './OrderTracking' } … })`); frontend/order-tracking/package.json:7-8 (`webpack serve` / `webpack --mode production`, sem `--config`, que leem o `webpack.config.js` padrão); frontend/order-tracking/Dockerfile:16 (`RUN npm run build`) |
| frontend/restaurant-catalog/package.json:25 | devDependencies | @module-federation/enhanced | ^0.2.3 | module-federation | Yes | frontend/restaurant-catalog/webpack.config.js:2 (`require('@module-federation/enhanced/webpack')`); frontend/restaurant-catalog/webpack.config.js:44-58 (`new ModuleFederationPlugin({ name: 'restaurantCatalog', filename: 'remoteEntry.js', exposes: { './RestaurantCatalog' } … })`); frontend/restaurant-catalog/package.json:7-8 (`webpack serve` / `webpack --mode production`, config padrão); frontend/restaurant-catalog/Dockerfile:16 (`RUN npm run build`) |
| frontend/shell-app/package.json:28 | devDependencies | @module-federation/enhanced | ^0.2.3 | module-federation | Yes | frontend/shell-app/webpack.config.js:2 (`require('@module-federation/enhanced/webpack')`); frontend/shell-app/webpack.config.js:48-63 (`new ModuleFederationPlugin({ name: 'shellApp', remotes: { restaurantCatalog, orderTracking, userDashboard } … })`); frontend/shell-app/package.json:7-8 (`webpack serve` / `webpack --mode production`, config padrão); frontend/shell-app/Dockerfile:16 (`RUN npm run build`) |

## Notas

- Cada projeto de `frontend/` tem `package.json` próprio, sem raiz que o agregue; cada linha foi julgada só pela evidência do próprio pacote. As ocorrências de `other_package_matches` são as configurações dos outros projetos, que usam a cópia declarada no próprio `package.json`.
- `frontend/user-dashboard/` não declara `@module-federation/enhanced` (`frontend/user-dashboard/package.json:22-34`) e usa o plugin embutido do webpack 5: `frontend/user-dashboard/webpack.config.js:2-3` (`// FIX: Use the standard built-in plugin from 'webpack'`, `require('webpack').container`). As linhas desse arquivo que aparecem em `other_package_matches` não são uso deste pacote.
- Busca por `module-federation` em `*.js`, `*.ts`, `*.mjs`, `*.cjs`, `*.json` e `Dockerfile` do snapshot só retorna as três declarações e os três `require` acima.
