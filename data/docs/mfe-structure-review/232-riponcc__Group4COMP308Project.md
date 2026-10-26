---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 232 — riponcc/Group4COMP308Project

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| client/issue-app | client/issue-app/package.json;client/issue-app/vite.config.js | client/issue-app/package.json:1-34 (manifesto próprio) | client/issue-app/index.html:10-11 (entrada `/src/main.jsx`); client/issue-app/src/main.jsx:6-10 (monta React) | client/issue-app/vite.config.js:6-35 (configuração própria); client/issue-app/package.json:8 (`vite build`) | — | — | Yes | Aplicação React com entrada e build Vite próprios. |
| client/shell-app | client/shell-app/package.json;client/shell-app/vite.config.js | client/shell-app/package.json:1-28 (manifesto próprio) | client/shell-app/index.html:10-11 (entrada `/src/main.jsx`); client/shell-app/src/main.jsx:27-33 (monta React com ApolloProvider) | client/shell-app/vite.config.js:32-56 (configuração própria); client/shell-app/package.json:8 (`vite build`) | — | — | Yes | Aplicação React com entrada e build Vite próprios. |
| client/user-app | client/user-app/package.json;client/user-app/vite.config.js | client/user-app/package.json:1-32 (manifesto próprio) | client/user-app/index.html:10-11 (entrada `/src/main.jsx`); client/user-app/src/main.jsx:6-10 (monta React) | client/user-app/vite.config.js:7-26 (configuração própria); client/user-app/package.json:8 (`vite build`) | — | — | Yes | Aplicação React com entrada e build Vite próprios. |
| server | server/package.json | server/package.json:1-13 (manifesto sem dependências) | — (server/package.json:5 declara `main: index.js`, ausente do snapshot) | — | — | — | No | Não é frontend; só manifesto, sem entrada nem build. |
| server/microservices/analytics-ai-service | server/microservices/analytics-ai-service/package.json | server/microservices/analytics-ai-service/package.json:1-20 (pacote Node) | server/microservices/analytics-ai-service/package.json:7 (`node analytics-ai-microservice.js`); server/microservices/analytics-ai-service/analytics-ai-microservice.js:40 (`app.listen`, sem UI) | — | — | — | No | Serviço backend, não é frontend. |
| server/microservices/auth-service | server/microservices/auth-service/package.json | server/microservices/auth-service/package.json:1-20 (pacote Node) | server/microservices/auth-service/package.json:7 (`node auth-microservice.js`); server/microservices/auth-service/auth-microservice.js:244 (`app.listen`, sem UI) | — | — | — | No | Serviço backend GraphQL, não é frontend. |
| server/microservices/issue-management-service | server/microservices/issue-management-service/package.json | server/microservices/issue-management-service/package.json:1-20 (pacote Node) | server/microservices/issue-management-service/package.json:7 (`node issue-microservice.js`); server/microservices/issue-management-service/issue-microservice.js:147 (`httpServer.listen`, sem UI) | — | — | — | No | Serviço backend GraphQL, não é frontend. |

## Resumo

Aplicações frontend no snapshot: 3 (client/issue-app, client/shell-app, client/user-app).

## Notas

- Os `package.json` aparecem como `workspace-config` no `artifacts.csv`, mas nenhum declara `workspaces`, e o snapshot não tem `pnpm-workspace.yaml`, `lerna.json`, `turbo.json` nem `nx.json`. O `matches.csv` não tem ocorrências `ws-*`, `ops-*` nem `ci-*`.
- O snapshot não tem Dockerfile, workflow de CI nem configuração de hospedagem; os scripts `deploy` de `client/issue-app/package.json:11` e `client/user-app/package.json:11` só rodam `vite build` e `vite preview` localmente.
- N = 3 coincide com `frontend_units: 3` da classificação.
