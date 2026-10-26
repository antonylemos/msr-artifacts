---
schema: 1
id: 1033705813
full_name: hscale/adx-core-k
commit: 683dec7ebc233c685f97166a135032d5668070c1
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 060 — hscale/adx-core-k

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| adx-core/apps/auth/package.json:41 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | adx-core/apps/auth/vite.config.ts:3-28 (configuração padrão do Vite importa `federation` e o invoca em plugins com `name: 'auth_app'`, `filename: 'remoteEntry.js'`, exposes e shared); adx-core/apps/auth/package.json:7-9 (`vite --port 3001 --host`, `tsc && vite build`, sem configuração alternativa) |
| adx-core/apps/file/package.json:26 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | adx-core/apps/file/vite.config.ts:3-26 (importa `federation` e o invoca com `name: 'file_app'`, exposes e shared); adx-core/apps/file/package.json:7-9 (`vite --port 3003 --host`, `tsc && vite build`) |
| adx-core/apps/module/package.json:39 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | adx-core/apps/module/vite.config.ts:3-28 (importa `federation` e o invoca com `name: 'module_app'`, exposes e shared); adx-core/apps/module/package.json:7-9 (`vite --port 3006 --host`, `tsc && vite build`) |
| adx-core/apps/shell/package.json:40 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | adx-core/apps/shell/vite.config.ts:3-53 (importa `federation` e o invoca com `name: 'shell'`, remotes para os seis apps e shared); adx-core/apps/shell/package.json:7-9 (`vite --port 3000 --host`, `tsc && vite build`); adx-core/apps/shell/src/App.tsx:16-21 (`React.lazy(() => import('auth_app/App'))` e demais remotes) |
| adx-core/apps/tenant/package.json:36 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | adx-core/apps/tenant/vite.config.ts:3-27 (importa `federation` e o invoca com `name: 'tenant_app'`, exposes e shared); adx-core/apps/tenant/package.json:7-9 (`vite --port 3002 --host`, `tsc && vite build`) |
| adx-core/apps/user/package.json:26 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | adx-core/apps/user/vite.config.ts:3-26 (importa `federation` e o invoca com `name: 'user_app'`, exposes e shared); adx-core/apps/user/package.json:7-9 (`vite --port 3004 --host`, `tsc && vite build`) |
| adx-core/apps/workflow/package.json:26 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | adx-core/apps/workflow/vite.config.ts:3-26 (importa `federation` e o invoca com `name: 'workflow_app'`, exposes e shared); adx-core/apps/workflow/package.json:7-9 (`vite --port 3005 --host`, `tsc && vite build`) |

## Notas

- Os `other_package_matches` de cada linha são os `vite.config.ts` dos outros seis apps; cada um tem
  o próprio `package.json` com a mesma dependência, então a evidência de cada linha vem só do
  `vite.config.ts` do próprio app.
- Fora das listas, a busca por `vite-plugin-federation` em `.ts`, `.tsx`, `.js`, `.mjs` e `.json`
  só achou os sete `vite.config.ts` e os sete `package.json`.
- A configuração do plugin é usada pelo build de cada app, mas vários `exposes` apontam para
  arquivos que não existem no snapshot (ex.: `adx-core/apps/file/vite.config.ts:13-15`,
  `adx-core/apps/user/vite.config.ts:13-15`, `adx-core/apps/workflow/vite.config.ts:13-15`,
  `adx-core/apps/tenant/vite.config.ts:13`, `adx-core/apps/module/vite.config.ts:15-17`), e
  `file`, `tenant`, `user` e `workflow` não têm `index.html`. Isso afeta a execução do build, não
  a configuração do pacote; a classificação já registra essa lacuna.
