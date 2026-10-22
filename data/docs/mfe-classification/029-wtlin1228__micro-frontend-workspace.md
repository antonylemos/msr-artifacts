---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
url: https://github.com/wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation, qiankun]
ui_technologies: [react]
build_tools: [rsbuild]
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 029 — wtlin1228/micro-frontend-workspace

## Contexto

- **Abordagem de implementação:** híbrida, com Module Federation 2 (`@module-federation/rsbuild-plugin` + runtime `registerRemotes`/`loadRemote`) e qiankun (lifecycles `bootstrap`/`mount`/`unmount`, baseado em single-spa) no mesmo host
- **Tipo de repositório:** example/proof of concept (workspace de experimentação; README só com portas e comandos)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Monorepo pnpm com `packages/host`, `packages/app-mf-1`, `packages/app-mf-2`, `packages/app-qiankun-1`, `packages/app-qiankun-2` (cada um com `package.json`, `rsbuild.config.ts`, `src/index.tsx` e porta própria, `README.md:5-11`) e a lib de contrato `packages/lib-app-interface` (`@mfw/app-interface`) | forte |
| Configuração (host) | `packages/host/module-federation.config.ts:3-16`: `name: 'host'`, `remotes` vazio (com comentário: carga pela runtime API), `shared` singleton de react/react-dom | moderada |
| Configuração (registro) | `packages/host/src/configs/apps.ts:9-34`: `APP_CONFIGS` com quatro apps, tipo de arquitetura (`'Module Federation'` ou `'Qiankun'`) e `entry` (`mf-manifest.json` em 4001/4002; `index.html` em 3001/3002) | forte |
| Configuração (remotes MF) | `packages/app-mf-1/module-federation.config.ts:3-13`: `name: 'mf1'`, `exposes: { '.': './src/exposed.tsx' }`, `shared` singleton; `app-mf-2` análogo | forte |
| Código-fonte (carga MF) | `packages/host/src/app-loaders/module-federation.ts:27-43`: `registerRemotes([{ name, entry }])` + `loadRemote(name)` → `getRootComponent({ basepath: '/apps/<id>' })`; `packages/host/src/routes/apps.$baseRoute.tsx:12-25,39-56`: o loader de rota resolve o remote e renderiza em `Suspense` | forte |
| Código-fonte (carga qiankun) | `packages/host/src/app-loaders/qiankun.ts:7-26`: `registerMicroApps` com `entry`, `container: '#qiankun-container'`, `activeRule: '/apps/<id>'` e `props.basepath`, depois `start()`; `packages/host/src/App.tsx:3,8` chama `registerQiankunApps()`; `packages/host/src/routes/apps.tsx:12` renderiza o container | forte |
| Código-fonte (remotes) | `packages/app-mf-1/src/exposed.tsx:1` exporta `getRootComponent`; `packages/app-qiankun-1/src/lifecycles.tsx:14-30` exporta `bootstrap`/`mount` (e `unmount`) recebendo `HostProps` | forte |
| Código-fonte (contrato) | `HostProps` de `@mfw/app-interface` usado pelo host (`module-federation.ts:6`, `qiankun.ts:1`) e pelos remotes (`lifecycles.tsx:1`) (contrato compartilhado) | moderada |
| Build/deploy | Scripts separados `build:libs`, `build:apps`, `build:host` e `preview:*` (`README.md:15-23`); sem CI/CD | moderada |
| Documentação | `README.md`: só a tabela de portas e o quick start (arquitetural) | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `host` + `app-mf-1`, `app-mf-2`, `app-qiankun-1`, `app-qiankun-2` |
| Q2 | Yes | Entry, `rsbuild.config.ts` e porta próprios por app; só compartilham a lib de tipos `@mfw/app-interface`, sem import de código-fonte entre apps |
| Q3 | Yes | O host roteia `/apps/<id>` para cada app (`apps.$baseRoute.tsx`, `qiankun.ts:12-17`) |
| Q4 | Yes | MF runtime (`registerRemotes`/`loadRemote`) e qiankun (`registerMicroApps`/`start`) configurados e em uso, guiados por `APP_CONFIGS` |
| Q5 | Yes | Q1–Q4 convergem; nenhuma divergência a justificar |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Corresponde a "monorepos containing a host and its remotes" e a "hybrid implementations": um único host orquestra dois mecanismos de composição diferentes, escolhidos por app via configuração.

## Notas para análise

- **RQ2:** caso híbrido explícito (Module Federation + qiankun/single-spa no mesmo host), com o tipo de arquitetura declarado por app em `APP_CONFIGS`.
- **RQ3:** o `remotes` estático vazio no `module-federation.config.ts` + `registerRemotes` em runtime mostra que a relação host → remote pode não aparecer na config de build; está no código e num registro de apps (que, segundo o comentário em `apps.ts:8`, viria de uma API em produção).
- **RQ1:** a lib `@mfw/app-interface` define o contrato (`HostProps`) entre host e apps, um artefato de fronteira explícito.
