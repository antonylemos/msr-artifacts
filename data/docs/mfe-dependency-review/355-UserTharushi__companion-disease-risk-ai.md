---
schema: 1
id: 1174301349
full_name: UserTharushi/companion-disease-risk-ai
commit: 373de0e6083b86b2707913da037735130c8f5503
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 355 — UserTharushi/companion-disease-risk-ai

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| apps/mfe-admin/package.json:26 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/mfe-admin/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/mfe-admin/vite.config.ts:8-20 (configuração padrão do Vite invoca `federation({ ... })` em plugins com exposes e shared); apps/mfe-admin/package.json:8 (build executa `tsc && vite build` sem configuração alternativa); apps/shell/src/App.tsx:23 (shell consome `import("mfeAdmin/App")`, rota `admin/*` em :53) |
| apps/mfe-auth/package.json:43 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/mfe-auth/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/mfe-auth/vite.config.ts:9-18 (configuração padrão do Vite invoca `federation({ ... })` em plugins com exposes e shared); apps/mfe-auth/package.json:8 (build executa `tsc && vite build` sem configuração alternativa); apps/mfe-auth/Dockerfile:15 (`npm run dev`, que roda `vite --port 3001` com essa configuração); docker-compose.yml:24-27 (serviço `mfe-auth` construído por esse Dockerfile) |
| apps/mfe-pet-profile/package.json:27 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/mfe-pet-profile/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/mfe-pet-profile/vite.config.ts:8-18 (configuração padrão do Vite invoca `federation({ ... })` em plugins com exposes e shared); apps/mfe-pet-profile/package.json:8 (build executa `tsc && vite build` sem configuração alternativa); apps/shell/src/App.tsx:18 (shell consome `import("mfePetProfile/App")`, rota `pets/*` em :48) |
| apps/mfe-risk-results/package.json:25 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/mfe-risk-results/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/mfe-risk-results/vite.config.ts:8-17 (configuração padrão do Vite invoca `federation({ ... })` em plugins com exposes e shared); apps/mfe-risk-results/package.json:8 (build executa `tsc && vite build` sem configuração alternativa); apps/shell/src/App.tsx:20 (shell consome `import("mfeRiskResults/App")`, rota `risk-results/*` em :50) |
| apps/mfe-symptom-checker/package.json:27 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/mfe-symptom-checker/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/mfe-symptom-checker/vite.config.ts:8-17 (configuração padrão do Vite invoca `federation({ ... })` em plugins com exposes e shared); apps/mfe-symptom-checker/package.json:8 (build executa `tsc && vite build` sem configuração alternativa); apps/shell/src/App.tsx:19 (shell consome `import("mfeSymptom/App")`, rota `symptom/*` em :49) |
| apps/mfe-vaccination/package.json:25 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/mfe-vaccination/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/mfe-vaccination/vite.config.ts:8-17 (configuração padrão do Vite invoca `federation({ ... })` em plugins com exposes e shared); apps/mfe-vaccination/package.json:8 (build executa `tsc && vite build` sem configuração alternativa); apps/shell/src/App.tsx:22 (shell consome `import("mfeVaccination/App")`, rota `vaccination/*` em :52) |
| apps/mfe-vet-discovery/package.json:25 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/mfe-vet-discovery/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/mfe-vet-discovery/vite.config.ts:8-18 (configuração padrão do Vite invoca `federation({ ... })` em plugins com exposes e shared); apps/mfe-vet-discovery/package.json:8 (build executa `tsc && vite build` sem configuração alternativa); apps/shell/src/App.tsx:21 (shell consome `import("mfeVetDiscover/App")`, rota `vet-discovery/*` em :51) |
| apps/shell/package.json:26 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/shell/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/shell/vite.config.ts:9-21 (configuração padrão do Vite invoca `federation({ ... })` em plugins com remotes e shared); apps/shell/package.json:8 (build executa `tsc && vite build` sem configuração alternativa); apps/shell/src/App.tsx:18-23 (`lazy(() => import("mfePetProfile/App"))` e os outros cinco remotes); apps/shell/Dockerfile:15 (`npm run dev`); docker-compose.yml:11-14 (serviço `shell`) |
| package.json:20 | devDependencies | turbo | ^2.0.0 | monorepo-tool | Undetermined | turbo.json:5-28 (tasks `build`, `dev`, `lint`, `type-check`, `test`, `clean` configuradas); a única invocação de `turbo` em arquivo de build está nos scripts de package.json:12-17, que não contam como uso; apps/shell/Dockerfile:6-7 e apps/mfe-auth/Dockerfile:6-7 rodam `npm install` só no diretório do app, e os Dockerfiles rodam `npm run dev` do app (:15); sem workflow de CI ou script de automação que chame `turbo` (grep, excluindo lockfile; CLAUDE.md:27-28 é documentação) |

## Notas

- Nenhum dos oito apps tem `vite.config.*` alternativo nem `--config` nos scripts; o `vite.config.ts` de cada diretório é a configuração padrão lida por `vite`/`vite build`.
- `apps/mfe-auth` expõe módulos (`apps/mfe-auth/vite.config.ts:12-16`), mas o shell não o federa: `apps/shell/src/App.tsx:8-15` e `:44` redirecionam `/auth/*` para `http://localhost:3001`. O plugin está em uso no build e no dev server do app (`Dockerfile`, `docker-compose.yml`), por isso `Yes`; a ausência de consumo é assunto da composição, não desta etapa.
- Só `shell` e `mfe-auth` sobem no `docker-compose.yml` (`:11-34`); os outros seis remotes têm só os scripts `dev`/`build`/`preview` dos próprios `package.json`.
- `turbo`: `CLAUDE.md:27-28` e `docs/VERIFICATION.md:32` mencionam `turbo run`, mas são documentação. `same_package_matches` aponta para `package.json:5`, que é a lista `workspaces` do npm, não configuração do Turborepo.
