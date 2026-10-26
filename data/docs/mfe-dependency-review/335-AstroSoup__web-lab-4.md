---
schema: 1
id: 1105927418
full_name: AstroSoup/web-lab-4
commit: 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 335 — AstroSoup/web-lab-4

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| frontend/vite/host/package.json:17 | devDependencies | @module-federation/vite | latest | module-federation | Yes | frontend/vite/host/vite.config.js:3 (`import { federation } from "@module-federation/vite"`); frontend/vite/host/vite.config.js:11-38 (`federation({ name: 'host', exposes, remotes, shared })` em `plugins`); frontend/vite/host/package.json:8 (`vite build`, que usa o `vite.config.js` do diretório); frontend/vite/host/src/pages/MainPage.vue:6-7 (imports federados `remote_inputs/InputsContainer` e `remote_results/ResultsContainer`, página da rota `/app` em frontend/vite/host/src/main.js:14) |
| frontend/vite/remote-inputs/package.json:16 | devDependencies | @module-federation/vite | latest | module-federation | Yes | frontend/vite/remote-inputs/vite.config.js:3 (`import { federation } from "@module-federation/vite"`); frontend/vite/remote-inputs/vite.config.js:11-31 (`federation({ name: 'remote_inputs', exposes: { "./InputsContainer" }, remotes: { host } })` em `plugins`); frontend/vite/remote-inputs/package.json:8 (`vite build`); frontend/vite/host/vite.config.js:23-27 (o host consome `remote_inputs`) |
| frontend/vite/remote-results/package.json:16 | devDependencies | @module-federation/vite | latest | module-federation | Yes | frontend/vite/remote-results/vite.config.js:3 (`import { federation } from "@module-federation/vite"`); frontend/vite/remote-results/vite.config.js:11-31 (`federation({ name: 'remote_results', exposes: { "./ResultsContainer" }, remotes: { host } })` em `plugins`); frontend/vite/remote-results/package.json:8 (`vite build`); frontend/vite/host/vite.config.js:28-32 (o host consome `remote_results`) |

## Notas

- Cada pacote tem o plugin no próprio `vite.config.js`; as ocorrências de `other_package_matches` são as configurações dos outros dois pacotes, que usam o pacote declarado neles mesmos.
- Fora das listas, a busca pelo nome do pacote (grep em `*.js`, `*.ts`, `*.mjs`, `*.cjs`, `*.json`, `*.vue`, sem lockfiles) só encontra os três `import` em `vite.config.js:3` e as três declarações nos `package.json`.
