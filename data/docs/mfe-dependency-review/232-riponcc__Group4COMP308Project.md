---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 232 — riponcc/Group4COMP308Project

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| client/issue-app/package.json:15 | dependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | client/issue-app/vite.config.js:4 (`import federation from '@originjs/vite-plugin-federation'`); client/issue-app/vite.config.js:14-26 (configuração padrão do Vite invoca `federation` com `name: 'issueApp'`, `exposes: { './App': './src/App' }` e shared); client/issue-app/package.json:7-10 (dev, build e preview executam `vite` sem configuração alternativa) |
| client/shell-app/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | client/shell-app/vite.config.js:30 (`import federation from '@originjs/vite-plugin-federation'`); client/shell-app/vite.config.js:36-50 (configuração padrão do Vite invoca `federation` com `name: 'shellApp'`, remotes `userApp` e `issueApp` e shared); client/shell-app/package.json:7-10 (dev, build e preview executam `vite` sem configuração alternativa) |
| client/user-app/package.json:15 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | client/user-app/vite.config.js:5 (`import federation from '@originjs/vite-plugin-federation'`); client/user-app/vite.config.js:10-17 (configuração padrão do Vite invoca `federation` com `name: 'userApp'`, `exposes: { './App': './src/App' }` e shared); client/user-app/package.json:7-10 (dev, build e preview executam `vite` sem configuração alternativa) |

## Notas

- `client/shell-app/vite.config.js:1-26` é uma versão anterior da configuração, toda comentada (só com `userApp` em remotes). Os matches da inspeção em `:9`, `:11` e `:15-19` caem nesse bloco; a configuração ativa é a de `:28-56`.
