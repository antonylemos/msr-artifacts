---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
url: https://github.com/coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: library
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 039 — coolsamson7/novx

## Contexto

- **Abordagem de implementação:** Module Federation (webpack 5) orquestrado pelo framework `@novx/portal` (features por manifesto, outlets com carga remota)
- **Tipo de repositório:** biblioteca/framework com app de referência (monorepo Nx com libs publicadas `@novx/{core,i18n,communication,portal}` e os apps `app` e `microfrontend`)
- **Classificação:** MFE-implemented (framework com app de referência; regra confirmada pelos pesquisadores)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação | `README.md:9-14`: monorepo de pacotes, entre eles "[portal] a react microfrontend framework"; `libs/portal/README.md:1-15`: "a react portal framework supporting microfrontends… feature outlets that cover both local and federated components" | fraca |
| Estrutura | `libs/` (`core`, `i18n`, `communication`, `portal`, publicados no npm, `libs/portal/package.json:2-3,57`) e dois apps: `apps/app` (shell) e `apps/microfrontend` (remote), cada um com `project.json`, `webpack.config.js`, `src/main.tsx` | forte |
| Configuração (host) | `apps/app/webpack.config.js:78-91`: `ModuleFederationPlugin` com `name: "app"`, `remotes: { microfrontend: "microfrontend@http://localhost:3001/remoteEntry.js" }`, `shared` singletons (react, react-router-dom, `@novx/*` em `foundationShared`, `:6-11`) | forte |
| Configuração (remote) | `apps/microfrontend/webpack.config.js:53-67`: `name: 'microfrontend'`, `exposes: { './Module', './MicrofrontendFeature' }`, mesmos singletons | forte |
| Configuração (runtime) | `apps/app/src/environments/environments.ts:2-10`: `deployment: "microfrontend"` com `remotes: [{ name: 'microfrontend', url: 'http://localhost:3001' }]`; `apps/microfrontend/public/manifest.json:1-28`: módulo `microfrontend` com a feature `/microfrontend/feature` (componente `MicrofrontendFeature`); `apps/app/src/manifest.json:1-5`: manifesto do `shell` | forte |
| Código-fonte (framework) | `libs/portal/src/lib/outlet-loader/remote-component-loader.ts:28-66`: `loadRemoteEntry`/`loadRemoteModule` com `__webpack_init_sharing__` e carga de `${url}/remoteEntry.js`; `:95-140`: as feature outlets carregam o componente remoto pelo `feature.module`/`feature.component` do manifesto | forte |
| Código-fonte (app) | `apps/app/src/app/App.tsx:4,18-20`: o shell usa `DeploymentManager`/`RouterManager` do portal para montar as features (locais e remotas) | forte |
| Código-fonte | Nenhum import de código-fonte de `apps/microfrontend` em `apps/app` (sustenta a independência das unidades) | ausente |
| Build/deploy | `apps/microfrontend/project.json:11-27`: target Nx próprio (scan de metadata gera o manifesto + build webpack) | moderada |
| Estrutura (ruído) | `apps.zip`, `error.log` e `PUBLISH.TXT` versionados | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `apps/app` (shell) e `apps/microfrontend` (remote) |
| Q2 | Yes | `webpack.config.js`, entry e target Nx próprios; sem import de código-fonte entre os apps (as libs `@novx/*` entram como `shared` singleton) |
| Q3 | Yes | O shell carrega e roteia a feature remota via manifesto (`environments.ts:6-10`, `remote-component-loader.ts:95-140`) |
| Q4 | Yes | MF configurado nos dois lados e usado em runtime pelo loader do framework |
| Q5 | Yes | Q1–Q4 convergem para o app de referência |

## Motivo

- Q1–Q5 são todos Yes para o par `app` + `microfrontend`, o que satisfaz a regra de MFE-implemented.
- O checklist lista "MFE frameworks and libraries (e.g., single-spa itself…)" como Non-MFE, mas também inclui "examples… that actually compose frontend units". Aqui, além do framework, há um app de referência que compõe de fato um shell e um remote, com config, manifesto e carga em runtime.

## Notas para análise

- **RQ2:** framework de portal próprio sobre MF, com manifestos de features (`manifest.json`) gerados por scan de metadata, uma camada de abstração acima do MF.
- **RQ3:** relação shell → remote mediada por manifesto + configuração de deployment (`environments.ts`), não só pelo `remotes` do webpack.

## Ponto para revisão conjunta

- **Framework + app de referência:** se a regra "MFE frameworks and libraries" for aplicada ao repositório como um todo, o caso passa a Non-MFE. Proposta de regra: "repositório de framework conta como MFE-implemented quando contém um app de referência que compõe unidades de fato; o framework sem app de composição é Non-MFE". Isso diferenciaria este caso do repositório do single-spa, por exemplo.
- Na mineração de artefatos, o framework (`libs/portal`) é o mecanismo de composição; o app de referência é a instância.
- **Decisão dos pesquisadores:** regra aceita. Repositório de framework com app de referência que compõe unidades de fato é MFE-implemented; framework sem app de composição é Non-MFE.
