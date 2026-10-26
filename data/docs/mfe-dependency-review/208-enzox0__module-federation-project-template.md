---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 208 — enzox0/module-federation-project-template

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| apps/admin-mf/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/admin-mf/vite.config.js:3-6 e apps/admin-mf/vite.config.ts:3-7 (`import federation from '@originjs/vite-plugin-federation'`; `plugins: [react(), federation(mfConfig)]`); apps/admin-mf/module-federation.config.ts:2-5 (`name: 'adminMf'`, `exposes: { './App': './src/exposes.tsx' }`); apps/admin-mf/package.json:8 (`tsc && vite build`, que carrega a config do Vite do diretório) |
| apps/auth-mf/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/auth-mf/vite.config.js:3-6 e apps/auth-mf/vite.config.ts:3-7 (`import federation from '@originjs/vite-plugin-federation'`; `plugins: [react(), federation(mfConfig)]`); apps/auth-mf/module-federation.config.ts:2-5 (`name: 'authMf'`, `exposes: { './App': './src/exposes.tsx' }`); apps/auth-mf/package.json:8 (`tsc && vite build`) |
| apps/dashboard-mf/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/dashboard-mf/vite.config.js:3-6 e apps/dashboard-mf/vite.config.ts:3-7 (`import federation from '@originjs/vite-plugin-federation'`; `plugins: [react(), federation(mfConfig)]`); apps/dashboard-mf/module-federation.config.ts:2-5 (`name: 'dashboardMf'`, `exposes: { './App': './src/exposes.tsx' }`); apps/dashboard-mf/package.json:8 (`tsc && vite build`) |
| apps/messaging-mf/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/messaging-mf/vite.config.js:3-6 e apps/messaging-mf/vite.config.ts:3-7 (`import federation from '@originjs/vite-plugin-federation'`; `plugins: [react(), federation(mfConfig)]`); apps/messaging-mf/module-federation.config.ts:2-5 (`name: 'messagingMf'`, `exposes: { './App': './src/exposes.tsx' }`); apps/messaging-mf/package.json:8 (`tsc && vite build`) |
| apps/shell/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/shell/vite.config.js:3-6 e apps/shell/vite.config.ts:3-7 (`import federation from '@originjs/vite-plugin-federation'`; `plugins: [react(), federation(mfConfig)]`); apps/shell/module-federation.config.ts:2-9 (`name: 'shell'`, `remotes` `authMf`, `dashboardMf`, `adminMf`, `messagingMf`); apps/shell/package.json:8 (`tsc && vite build`) |
| package.json:30 | devDependencies | turbo | ^2.0.0 | monorepo-tool | Yes | turbo.json:4-19 (tasks `build`, `dev`, `lint`, `clean` configuradas); .github/workflows/ci.yml:3-7 e `:25-26` (job ativo em push/PR para `main` roda `pnpm build` na raiz); package.json:12 (`build`: `turbo run build`); apps/shell/Dockerfile:7 (`RUN pnpm build`, igual nos outros quatro apps) |

## Notas

- Cada app versiona `vite.config.ts` e o `vite.config.js` compilado; os dois importam e invocam o plugin da mesma forma, então a resposta não depende de qual o Vite resolve. A divergência de portas em `apps/shell/module-federation.config.js` (registrada na classificação) não afeta esta etapa.
- `other_package_matches` de cada linha são as mesmas configurações dos outros quatro apps; cada linha foi julgada pela configuração do próprio app. Fora das listas, o grep do pacote só achou os `vite.config.*` (excluindo lockfile).
- `turbo`: o único comando `turbo` está no script `build` da raiz, que sozinho não conta como uso; a resposta `Yes` se apoia no job de CI ativo que executa esse script, e o `turbo.json` configura a task `build`. Os Dockerfiles dos apps (`apps/*/Dockerfile:7`) também rodam `pnpm build`.
