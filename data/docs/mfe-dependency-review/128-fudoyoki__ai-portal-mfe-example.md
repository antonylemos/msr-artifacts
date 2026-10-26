---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 128 — fudoyoki/ai-portal-mfe-example

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| apps/mfe-dashboard/package.json:21 | devDependencies | @originjs/vite-plugin-federation | ^1.3.6 | module-federation | Yes | apps/mfe-dashboard/vite.config.ts:3 (`import federation from '@originjs/vite-plugin-federation'`); apps/mfe-dashboard/vite.config.ts:9-40 (configuração padrão do Vite invoca `federation` em plugins com `name: 'mfeDashboard'`, `filename: 'remoteEntry.js'`, `exposes` `./DashboardApp` e `shared`); apps/mfe-dashboard/package.json:6-9 (`dev`, `build` e `preview` executam `vite` sem configuração alternativa) |
| apps/shell/package.json:22 | devDependencies | @originjs/vite-plugin-federation | ^1.3.6 | module-federation | Yes | apps/shell/vite.config.ts:3 (`import federation from '@originjs/vite-plugin-federation'`); apps/shell/vite.config.ts:26-60 (configuração padrão do Vite invoca `federation` em plugins com `name: 'shell'`, `remotes` `mfeDashboard` e `shared`); apps/shell/package.json:6-9 (`dev`, `build` e `preview` executam `vite` sem configuração alternativa); apps/shell/src/App.tsx:7 (`React.lazy(() => import('mfeDashboard/DashboardApp'))`) |
| package.json:18 | devDependencies | turbo | ^2.3.0 | monorepo-tool | Undetermined | turbo.json:3-25 (tasks `build`, `dev`, `lint`, `test`, `test:coverage`, `clean` configuradas); a única invocação de `turbo` está nos scripts de package.json:10-15, que não contam como uso; apps/shell/Dockerfile:8 e apps/mfe-dashboard/Dockerfile:8 só copiam `turbo.json`, e o build roda `npm run build --workspace=...` (apps/shell/Dockerfile:18-20; apps/mfe-dashboard/Dockerfile:18-20); docker-compose.dev.yml:11 usa `npm run dev --workspace=@ai-portal/shell`; sem workflow de CI no snapshot (grep, excluindo lockfile) |

## Notas

- Cada app tem o próprio `vite.config.ts` usando o plugin; as ocorrências em `other_package_matches` são do outro app e não foram usadas como evidência da linha.
- `turbo`: há configuração (`turbo.json`), mas nenhum arquivo de build ou automação invoca o pacote fora dos scripts do `package.json`; os Dockerfiles copiam o `turbo.json` sem chamá-lo. Por isso `Undetermined`, e não `Yes`.
