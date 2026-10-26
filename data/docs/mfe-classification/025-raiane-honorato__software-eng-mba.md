---
schema: 1
id: 1247892038
full_name: raiane-honorato/software-eng-mba
url: https://github.com/raiane-honorato/software-eng-mba
commit: c569ccc6582475495a637d44ceed33c62c0f6e86
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react-native]
build_tools: [rspack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 025 — raiane-honorato/software-eng-mba

## Contexto

- **Abordagem de implementação:** Module Federation 2 para React Native (Re.Pack + Rspack, `ModuleFederationPluginV2`)
- **Tipo de repositório:** example/proof of concept (TCC de MBA, "Abordagens de Micro Frontend em React Native", `README.md:1-3`)
- **Classificação:** MFE-implemented (sujeito a decisão de escopo: app **mobile** React Native, não web)
- **Checklist:** aplicado a `apps/repack/`.

O repositório implementa o mesmo app (MyGym) três vezes para comparar regimes de modularização (`README.md:27-33`):

| Versão | Regime | Diretório |
|---|---|---|
| Monolito | baseline | `apps/monolith/` |
| Turborepo | build-time (packages `@mygym/*` fundidos num bundle único) | `apps/turborepo/` |
| Re.Pack | runtime (host + mini-apps carregados pela rede via MF) | `apps/repack/` |

Há também `apps/repack-poc/` (host + remote mínimos, `HelloScreen`). A avaliação abaixo se concentra em `apps/repack/`.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `apps/repack/packages/`: apps `host`, `check-in` e `dashboard` (cada uma com `package.json`, `index.js`, `rspack.config.mjs`, `App.tsx`) e libs `store`, `ui`, `theme`, `navigation`, `utils`, `data`, `shared-deps` | forte |
| Configuração (host) | `apps/repack/packages/host/rspack.config.mjs:45-51`: `ModuleFederationPluginV2` com `name: 'host'` e `remotes` `checkin@http://localhost:9001/${platform}/mf-manifest.json` e `dashboard@http://localhost:9002/${platform}/mf-manifest.json` | forte |
| Configuração (remotes) | `check-in/rspack.config.mjs:39-46`: `name: 'checkin'`, `exposes: { './CheckInStack' }`; `dashboard/rspack.config.mjs:39-44`: `name: 'dashboard'`, `exposes: { './DashboardStack' }`; singletons compartilhados via `shared-deps/sharedDeps.mjs` | forte |
| Código-fonte (composição) | `host/src/screens/CheckInTab.tsx:11-13`: `React.lazy(() => import('checkin/CheckInStack'))`; `:17-24`: envolve em `ErrorBoundary` + `Suspense`; `DashboardTab.tsx` análogo; `host/src/navigation/RootNavigator.tsx:52-53`: as abas `Home` e `FindGyms` montam os remotes | forte |
| Código-fonte (independência) | `check-in` e `dashboard` não se importam; comunicam-se só pela store compartilhada `@mygym/store` (Zustand) (`README.md:22`); o `host` não depende dos pacotes dos mini-apps em `package.json` | forte |
| Build/deploy | Cada mini-app tem bundler e dev server próprios (portas 9001/9002); `apps/repack/mprocs.yaml` orquestra os processos; deploy OTA citado como motivação, sem pipeline no repositório | moderada |
| Documentação | `README.md:1-33`; `apps/repack/ARCHITECTURE.md` e `README.md` de cada versão descrevem host, mini-apps, `exposes`/`remotes` e carga em runtime | moderada |
| Estrutura (versão Turborepo) | `apps/turborepo/`: módulos como packages integrados em build-time num bundle único | ambígua |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `host`, `check-in` e `dashboard` |
| Q2 | Yes | Entry, `rspack.config.mjs` e dev server próprios por mini-app; sem import de código-fonte entre `check-in` e `dashboard` |
| Q3 | Yes | O host monta os remotes nas abas (`RootNavigator.tsx:52-53`) |
| Q4 | Yes | MF configurado (`remotes`/`exposes`) e usado via `import('checkin/CheckInStack')` em runtime (`CheckInTab.tsx:11-13`) |
| Q5 | Yes | Q1–Q4 convergem |

## Motivo

- Q1–Q5 são Yes para a versão Re.Pack, o que satisfaz a regra de MFE-implemented.
- Corresponde a "monorepos containing a host and its remotes" e a "examples… and proofs of concept that actually compose frontend units".

## Notas para análise

- **RQ2:** abordagem MF em React Native (Re.Pack/Rspack, `mf-manifest.json` por plataforma); se o escopo incluir mobile, é uma categoria própria.
- **RQ3:** comparação controlada no mesmo repositório (monolito × build-time × runtime) com o mesmo código de domínio, um caso raro e útil para relacionar artefatos e regime de integração.

## Ponto para revisão conjunta

- **Escopo (mobile vs web):** o protocolo define MFE como decomposição do frontend de uma aplicação **web** (seção 1). Aqui as unidades são mini-apps React Native carregados num app nativo. Se o estudo se restringir a web, o repositório passa a Non-MFE (fora do escopo). Sugiro registrar a decisão como regra explícita no checklist ("frontend units are web frontends" ou "mobile MFEs are included").
- **Versão Turborepo:** composição em build-time; não afeta a classificação (a versão Re.Pack já satisfaz), mas é exemplo direto da decisão em aberto sobre build-time composition.
