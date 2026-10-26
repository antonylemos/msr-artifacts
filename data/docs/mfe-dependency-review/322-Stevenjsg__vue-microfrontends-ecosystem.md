---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| apps/cms/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | apps/cms/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/cms/vite.config.ts:16-23 (`federation({ name: "cms_app", filename: "remoteEntry.js", exposes: { "./Cms": "./src/App.vue" }, shared: ["vue"] })`); arquivo de configuração padrão do Vite, carregado pelos scripts `vite build`/`vite preview` de apps/cms/package.json:8-10; a URL do remoto está em apps/shell/vite.config.ts:23 |
| apps/dashboard/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | apps/dashboard/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/dashboard/vite.config.ts:18-25 (`federation({ name: "dashboard_app", filename: "remoteEntry.js", exposes: { "./Widget": "./src/components/WidgetDinero.vue" }, shared: ["vue"] })`); arquivo de configuração padrão do Vite (apps/dashboard/package.json:7-10); o módulo exposto é consumido pelo shell em apps/shell/src/App.vue:5-7 (`import('dashboard/Widget')`) |
| apps/kanban/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | apps/kanban/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/kanban/vite.config.ts:16-23 (`federation({ name: "kanban_app", filename: "remoteEntry.js", exposes: { "./Kanban": "./src/App.vue" }, shared: ["vue"] })`); arquivo de configuração padrão do Vite, carregado pelos scripts de apps/kanban/package.json:7-10; a URL do remoto está em apps/shell/vite.config.ts:24 |
| apps/shell/package.json:16 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | apps/shell/vite.config.ts:4 (`import federation from "@originjs/vite-plugin-federation"`); apps/shell/vite.config.ts:19-27 (`federation({ name: "shell", remotes: { dashboard: …5001…, cms: …5002…, kanban: …5003… }, shared: ["vue"] })`); arquivo de configuração padrão do Vite (apps/shell/package.json:7-9); apps/shell/src/App.vue:5-7 (`defineAsyncComponent(() => import('dashboard/Widget'))`), componente raiz montado por apps/shell/src/main.ts:3-5 |
| package.json:18 | devDependencies | turbo | ^2.6.1 | monorepo-tool | Undetermined | turbo.json:3-13 (tasks `dev`, `build`, `lint` configuradas); a única invocação de `turbo` está nos scripts de package.json:7-9, que não contam como uso; sem workflow de CI, Dockerfile ou script de automação que chame `turbo` (grep, excluindo lockfile); pnpm-workspace.yaml:1-3 (item da inspeção) só define o workspace pnpm |

## Notas

- Em `cms` e `kanban`, o plugin está configurado e em uso no build de cada remoto; o shell declara os dois em `remotes`, mas não importa nenhum módulo deles (registrado na classificação). Isso não muda a resposta da linha, que é sobre o pacote configurado no remoto.
- O item `pnpm-workspace.yaml:1` da linha de `turbo` é configuração do pnpm, não do Turborepo; a evidência de configuração do `turbo` é o `turbo.json`, que não está na lista da inspeção.
