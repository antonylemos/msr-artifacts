---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 343 — Jonadersonmoura/descompara

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:58 | dependencies | @angular-architects/native-federation | ^22.0.6 | native-federation | Yes | shell/project.json:9-24 (target `build` com executor `@angular-architects/native-federation:build`, sobre o target `esbuild` em `:63-91`, `browser: shell/src/main.ts`), idem em admin/project.json:9-24, intranet/project.json:9-24 e marAberto/project.json:9-24; shell/federation.config.mjs:1-4 (`withNativeFederation({ name: 'shell', ... })`), admin/federation.config.mjs:1-10 (`exposes: { './Routes': ... }`), idem em intranet/ e marAberto/; shell/src/main.ts:1-5 (`initFederation('/federation.manifest.json')` antes de `import('./bootstrap')`); shell/src/app/app.routes.ts:2-18 (`loadRemoteModule('marAberto' / 'intranet' / 'admin', './Routes')`) |
| package.json:65 | dependencies | @nx/angular | ^23.1.0 | monorepo-tool | Yes | shell/project.json:117-132 (target `serve-original` com executor `@nx/angular:dev-server`, chamado pelo `serve` em `:25-28`, `target: shell:serve-original:development`), idem em admin/project.json:128, intranet/project.json:128 e marAberto/project.json:128; shell-e2e/playwright.config.mts:33-34 (`webServer.command: 'npx nx run shell:serve'`) |
| package.json:18 | devDependencies | @module-federation/enhanced | ^2.1.0 | module-federation | No | sem import de `@module-federation/enhanced` nos arquivos de código e de build do snapshot (grep, excluindo lockfile); os itens das listas da inspeção (`federation.config.mjs`, `src/main.ts`, shell/src/app/app.routes.ts) importam `@angular-architects/native-federation`; package-lock.json:8006-8012 (só peer opcional de `@nx/module-federation`, que também não é usado) |
| package.json:19 | devDependencies | @nx/devkit | 23.1.0 | monorepo-tool | Yes | shell-e2e/playwright.config.mts:3 e `:37` (`import { workspaceRoot } from '@nx/devkit'`, usado em `webServer.cwd`), idem em admin-e2e/, intranet-e2e/ e marAberto-e2e/ `playwright.config.mts:3`; nx.json:29-34 (plugin `@nx/playwright/plugin` infere o target `e2e` dessas configs; shell-e2e/project.json:8 com `targets` vazio); .github/workflows/ci.yml:37 (`npx nx run-many -t lint test build typecheck e2e`) |
| package.json:20 | devDependencies | @nx/eslint | 23.1.0 | monorepo-tool | Yes | nx.json:35-40 (plugin `@nx/eslint/plugin`, `targetName: lint`); shell/project.json:42-44 (target `lint` com executor `@nx/eslint:lint`), idem em admin/, intranet/, marAberto/ e libs/shared/{data-access,guards,theme,ui}/project.json:9-11; .github/workflows/ci.yml:37 (`run-many -t lint ...`) |
| package.json:21 | devDependencies | @nx/eslint-plugin | 23.1.0 | monorepo-tool | Yes | eslint.config.mjs:1 (`import nx from '@nx/eslint-plugin'`); shell/eslint.config.mjs:1, idem em admin/, intranet/, marAberto/, libs/shared/{data-access,guards,theme,ui}/eslint.config.mjs:1; essas configs são lidas pelo target `lint` (shell/project.json:42-44; nx.json:35-40), executado em .github/workflows/ci.yml:37 |
| package.json:22 | devDependencies | @nx/js | 23.1.0 | monorepo-tool | Yes | nx.json:15-28 (plugin `@nx/js/typescript` registrado, com opções `typecheck` e `build`; carregado em toda execução do nx, como em .github/workflows/ci.yml:37 `run-many -t ... typecheck`); sem import ou executor `@nx/js` fora do nx.json (grep, excluindo lockfile) |
| package.json:23 | devDependencies | @nx/module-federation | 23.1.0 | monorepo-tool | No | sem import, executor ou plugin `@nx/module-federation` nos arquivos de código e configuração do snapshot (grep, excluindo lockfile); a federação usa `@angular-architects/native-federation` (shell/federation.config.mjs:1); apenas declaração em package.json:23 |
| package.json:24 | devDependencies | @nx/playwright | 23.1.0 | monorepo-tool | Yes | nx.json:29-34 (plugin `@nx/playwright/plugin`, `targetName: e2e`); shell-e2e/playwright.config.mts:2 e `:25` (`nxE2EPreset` importado e invocado), idem em admin-e2e/, intranet-e2e/ e marAberto-e2e/ `playwright.config.mts:2`; .github/workflows/ci.yml:37 (`run-many -t ... e2e`) |
| package.json:25 | devDependencies | @nx/vitest | 23.1.0 | monorepo-tool | Yes | shell/project.json:45-53 (target `test` com executor `@nx/vitest:test`), idem em admin/project.json:46, intranet/project.json:46 e marAberto/project.json:46; nx.json:60-63 (`targetDefaults` de `@nx/vitest:test`); .github/workflows/ci.yml:37 (`run-many -t lint test ...`) |
| package.json:26 | devDependencies | @nx/web | 23.1.0 | monorepo-tool | Yes | shell/project.json:54-62 (target `serve-static` com executor `@nx/web:file-server` e `buildTarget: shell:build`), idem em admin/project.json:56, intranet/project.json:56 e marAberto/project.json:56 |
| package.json:27 | devDependencies | @nx/webpack | 23.1.0 | monorepo-tool | No | sem import, executor ou plugin `@nx/webpack` nos arquivos de código e configuração do snapshot (grep, excluindo lockfile); os builds usam `@angular-architects/native-federation:build` sobre `@angular/build:application` (shell/project.json:10 e `:64`); apenas declaração em package.json:27 |
| package.json:31 | devDependencies | @softarc/native-federation-orchestrator | ^4.2.2 | native-federation | Undetermined | sem import direto do pacote nos arquivos de código e de build (grep, excluindo lockfile); package-lock.json:375 (`@angular-architects/native-federation` 22.0.6, usado em shell/src/main.ts:1-3 e nos `project.json`, depende de `@softarc/native-federation-orchestrator` ^4.5.2); o snapshot não mostra se o `initFederation` usado passa por esse pacote |
| package.json:44 | devDependencies | nx | 23.1.0 | monorepo-tool | Yes | .github/workflows/ci.yml:25 e `:36-37` (job ativo executa `npx nx start-ci-run`, `npx nx format:check` e `npx nx run-many -t lint test build typecheck e2e`); shell-e2e/playwright.config.mts:33-34 (`webServer.command: 'npx nx run shell:serve'`); nx.json:14-93 (`plugins`, `targetDefaults` e `generators` configurados) |

## Notas

- As listas da inspeção para `@module-federation/enhanced` apontam para as mesmas configs de Native Federation (`federation.config.mjs`, `src/main.ts`, `app.routes.ts`); nenhuma importa esse pacote. Diferente dos precedentes 039 e 109, não há wrapper de Module Federation invocado: `@nx/module-federation` também não é usado.
- `@softarc/native-federation-orchestrator`: a única ligação é a do lockfile (dependência de `@angular-architects/native-federation`); declarado na raiz com versão diferente (`^4.2.2`) da exigida pelo wrapper (`^4.5.2`). Na dúvida entre `Yes` e `No`, ficou `Undetermined`.
- `@nx/angular` entra só pelo dev-server (`serve-original`); o build de produção usa `@angular/build:application` (shell/project.json:63-64). O nx.json:67-77 tem `targetDefaults` para `@nx/angular:webpack-browser`, executor que nenhum `project.json` usa.
- Os diretórios `.agents/`, `.claude/`, `.codex/`, `.cursor/`, `.gemini/`, `.opencode/` e `.github/skills/` trazem skills de assistentes de código; não foram contados como uso.
