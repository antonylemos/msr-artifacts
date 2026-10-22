---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 9441822a7a5f9766a0b955feeac5b7c0421a03c2dd7e07da4b4d476e26caebb0
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 009 — pmathulan/frontend-coding-exercises

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| microfrontend-workspace/package.json:14 | dependencies | @angular-architects/module-federation | ^19.0.3 | module-federation | Yes | microfrontend-workspace/projects/shell/webpack.config.js:1-16 (`withModuleFederationPlugin` e `shareAll` importados e invocados); microfrontend-workspace/angular.json:18 e microfrontend-workspace/angular.json:41-42 (builder `ngx-build-plus:browser` e configuração do shell); microfrontend-workspace/angular.json:60 (configuração de produção); microfrontend-workspace/projects/shell/webpack.prod.config.js:1 (reusa `webpack.config`) |

## Notas

- A rota mfe2 em microfrontend-workspace/projects/shell/src/app/app.routes.ts:14-21 está comentada. A rota mfe1 em :5-12 usa loadRemoteModule; o julgamento já é sustentado pela configuração de build ativa.
- projects/shell/ e projects/mfe1/ não possuem package.json próprio no snapshot; pertencem ao pacote microfrontend-workspace/.
