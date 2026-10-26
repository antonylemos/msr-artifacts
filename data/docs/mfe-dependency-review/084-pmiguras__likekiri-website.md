---
schema: 1
id: 1329274714
full_name: pmiguras/likekiri-website
commit: 4b8c5fd5053751aba70fcd4859a38fd33062c8d3
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 084 — pmiguras/likekiri-website

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| apps/admin-shell/package.json:14 | dependencies | @module-federation/runtime | 2.8.2 | module-federation | Yes | apps/admin-shell/src/federation.ts:1 (`import { init, loadRemote, registerRemotes } from '@module-federation/runtime'`); apps/admin-shell/src/federation.ts:34-46 (`init`/`registerRemotes` com `remoteEntry` da rota e `loadRemote`); apps/admin-shell/src/views/ModulePage.tsx:4 e 25 (importa e chama `loadRemoteComponent`); apps/admin-shell/src/App.tsx:226 (renderiza `ModulePage`); apps/admin-shell/src/main.tsx:3-9 e apps/admin-shell/index.html:13 (entrada da SPA) |
| apps/web-shell/package.json:13 | dependencies | @module-federation/runtime | 2.8.2 | module-federation | Yes | apps/web-shell/src/islands.ts:1 (`import { init, loadRemote } from '@module-federation/runtime'`); apps/web-shell/src/islands.ts:54-56 e 90-107 (`loadRemote` e `init` com os remotes das ilhas); apps/web-shell/vite.config.ts:21-23 (`islands.ts` é a entrada do build cliente, `islands.js`); apps/web-shell/src/entry-server.tsx:181 (`bootstrapModules: ['/assets/islands.js']`) |
| modules/chat/package.json:19 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/chat/vite.config.ts:3 e 8-16 (`federation({ name: 'chat', filename: 'remoteEntry.js', exposes, shared })` em `plugins`); modules/chat/package.json:8 (`vite build` usa a configuração padrão) |
| modules/clientes/package.json:18 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/clientes/vite.config.ts:3 e 22-36 (`federation({ name: 'clientes', ... exposes ... })` no build cliente; o build SSR de 11-17 não usa o plugin); modules/clientes/package.json:8 (`vite build && vite build --ssr ...`) |
| modules/cuentas/package.json:18 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/cuentas/vite.config.ts:3 e 8-20 (`federation({ name: 'cuentas', ... })` em `plugins`); modules/cuentas/package.json:8 (`vite build`) |
| modules/ejemplo-admin/package.json:18 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/ejemplo-admin/vite.config.ts:3 e 10-21 (`federation({ name: 'ejemplo-admin', ... })` em `plugins`); modules/ejemplo-admin/package.json:8 (`vite build`) |
| modules/ejemplo-web/package.json:18 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/ejemplo-web/vite.config.ts:3 e 11-21 (`federation({ name: 'ejemplo-web', ... })` em `plugins`); modules/ejemplo-web/package.json:8 (`vite build`) |
| modules/hello/package.json:17 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/hello/vite.config.ts:3 e 10-21 (`federation({ name: 'hello', ... })` em `plugins`); modules/hello/package.json:8 (`vite build`) |
| modules/media/package.json:19 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/media/vite.config.ts:3 e 8-18 (`federation({ name: 'media', ... })` em `plugins`); modules/media/package.json:8 (`vite build`) |
| modules/ops/package.json:10 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/ops/vite.config.ts:3 e 8-13 (`federation({ name: 'ops', ... })` em `plugins`); modules/ops/package.json:7 (`"build": "vite build"`) |
| modules/registry/package.json:18 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/registry/vite.config.ts:3 e 8-18 (`federation({ name: 'registry', ... })` em `plugins`); modules/registry/package.json:8 (`vite build`) |
| modules/sitio/package.json:18 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/sitio/vite.config.ts:3 e 8-18 (`federation({ name: 'sitio', ... })` em `plugins`); modules/sitio/package.json:8 (`vite build`) |

## Notas

- O uso do runtime no web-shell (`apps/web-shell/src/islands.ts:1`) não está nas listas da inspeção; apareceu só na busca por `@module-federation` no snapshot. As listas citam `apps/admin-shell/src/federation.ts` como `other_package_matches` da linha do web-shell, mas esse arquivo é de outro pacote e não sustenta a linha.
- O `islands.js` do web-shell não é carregado por HTML estático: é o bootstrap do SSR, renderizado pelo core a partir de `dist/server/entry-server.js` (`apps/core/src/shell/shell.service.ts:57` e 86).
