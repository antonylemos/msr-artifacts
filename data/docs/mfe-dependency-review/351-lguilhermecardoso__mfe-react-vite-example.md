---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 351 — lguilhermecardoso/mfe-react-vite-example

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| mf-dashboard/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | mf-dashboard/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); mf-dashboard/vite.config.ts:10-17 (configuração padrão do Vite invoca `federation` com `name: "mf_dashboard"`, `exposes` `./Dashboard` e `shared`); mf-dashboard/package.json:8 (build executa `vite build` sem configuração alternativa); build-all.sh:12 (`npm run build` da unidade) |
| mf-dashboard/package.json:31 | devDependencies | vite-plugin-federation | ^0.0.1 | module-federation | No | sem import ou invocação de `"vite-plugin-federation"` sem escopo em `*.ts`, `*.tsx`, `*.js`, `*.json`, `*.sh` e `*.yml` (grep); mf-dashboard/vite.config.ts:3 importa `@originjs/vite-plugin-federation`, outro pacote |
| mf-login/package.json:20 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | mf-login/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); mf-login/vite.config.ts:10-17 (configuração padrão do Vite invoca `federation` com `name: "mf_login"`, `exposes` `./Login` e `shared`); mf-login/package.json:8 (build executa `vite build` sem configuração alternativa); build-all.sh:9 (`npm run build` da unidade) |
| mf-login/package.json:31 | devDependencies | vite-plugin-federation | ^0.0.1 | module-federation | No | sem import ou invocação de `"vite-plugin-federation"` sem escopo em `*.ts`, `*.tsx`, `*.js`, `*.json`, `*.sh` e `*.yml` (grep); mf-login/vite.config.ts:3 importa `@originjs/vite-plugin-federation`, outro pacote |
| mf-navbar/package.json:20 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | mf-navbar/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); mf-navbar/vite.config.ts:10-17 (configuração padrão do Vite invoca `federation` com `name: "mf_navbar"`, `exposes` `./Navbar` e `shared`); mf-navbar/package.json:8 (build executa `vite build` sem configuração alternativa); build-all.sh:15 (`npm run build` da unidade) |
| mf-navbar/package.json:31 | devDependencies | vite-plugin-federation | ^0.0.1 | module-federation | No | sem import ou invocação de `"vite-plugin-federation"` sem escopo em `*.ts`, `*.tsx`, `*.js`, `*.json`, `*.sh` e `*.yml` (grep); mf-navbar/vite.config.ts:3 importa `@originjs/vite-plugin-federation`, outro pacote |
| mf-personagem-detalhe/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | mf-personagem-detalhe/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); mf-personagem-detalhe/vite.config.ts:10-17 (configuração padrão do Vite invoca `federation` com `name: "mf_personagem_detalhe"`, `exposes` `./PersonagemDetalhe` e `shared`); mf-personagem-detalhe/package.json:8 (build executa `vite build` sem configuração alternativa); build-all.sh:18 (`npm run build` da unidade) |
| mf-personagem-detalhe/package.json:31 | devDependencies | vite-plugin-federation | ^0.0.1 | module-federation | No | sem import ou invocação de `"vite-plugin-federation"` sem escopo em `*.ts`, `*.tsx`, `*.js`, `*.json`, `*.sh` e `*.yml` (grep); mf-personagem-detalhe/vite.config.ts:3 importa `@originjs/vite-plugin-federation`, outro pacote |
| root-app/package.json:21 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | root-app/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); root-app/vite.config.ts:11-24 (`remotes` `mf_login`, `mf_dashboard`, `mf_personagem_detalhe`, `mf_navbar`); root-app/vite.config.ts:31-35 (`federation({ name: "root_app", remotes, shared })` em plugins da configuração padrão do Vite); root-app/package.json:8 (build executa `vite build` sem configuração alternativa); build-all.sh:21 (`npm run build` da unidade) |
| root-app/package.json:33 | devDependencies | vite-plugin-federation | ^0.0.1 | module-federation | No | sem import ou invocação de `"vite-plugin-federation"` sem escopo em `*.ts`, `*.tsx`, `*.js`, `*.json`, `*.sh` e `*.yml` (grep); root-app/vite.config.ts:3 importa `@originjs/vite-plugin-federation`, outro pacote |

## Notas

- As listas `same_package_matches` das linhas de `vite-plugin-federation` são as mesmas das de `@originjs/vite-plugin-federation`: o padrão da inspeção casa as chamadas `federation(...)` sem distinguir qual dos dois pacotes é importado. O único import nos cinco `vite.config.ts` (linha 3) é do pacote com escopo.
- Os cinco `vite.config.ts` são a configuração padrão do Vite em cada unidade; `build-all.sh:8-21` roda `npm run build` em cada uma, e `.github/workflows/deploy.yml:19-20` executa `build-all.sh`.
