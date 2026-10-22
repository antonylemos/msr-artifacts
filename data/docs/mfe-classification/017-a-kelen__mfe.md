---
schema: 1
id: 1007785611
full_name: a-kelen/mfe
url: https://github.com/a-kelen/mfe
commit: 80e4481f9b927142d2c57f4c2787da93ad01b54e
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react, vue]
build_tools: [webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 017 — a-kelen/mfe

## Contexto

- **Abordagem de implementação:** Module Federation (webpack 5) com contrato `mount(el, options)`; híbrido React + Vue
- **Tipo de repositório:** example/proof of concept (estrutura de curso: `container`, `marketing`, `auth`, `dashboard`; sem README)
- **Commit avaliado:** `80e4481` (branch padrão `master`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Monorepo com quatro apps em `packages/`: `container`, `marketing`, `auth` (React 17) e `dashboard` (Vue 3.2, `packages/dashboard/package.json:13`), cada uma com `package.json`, `config/webpack.{common,dev,prod}.js`, `public/index.html`, `src/index.js` e `src/bootstrap.js` | forte |
| Configuração (host) | `packages/container/config/webpack.dev.js:18-25`: `remotes` para `marketing` (8081), `auth` (8082) e `dashboard` (8084); `packages/container/config/webpack.prod.js:15-23`: os mesmos remotes em `${PRODUCTION_DOMAIN}/<app>/latest/remoteEntry.js`; `shared: packageJson.dependencies` | forte |
| Configuração (remotes) | `packages/{auth,dashboard,marketing}/config/webpack.prod.js:14-17`: `name`, `filename: 'remoteEntry.js'` e `exposes` (`./AuthApp`, `./DashboardApp`, `./MarketingApp` → `./src/bootstrap`); `publicPath` `/<app>/latest/` (`:10`) | forte |
| Código-fonte (composição) | `packages/container/src/App.js:7-9` faz `lazy` dos wrappers; `:41-48` monta `AuthApp` em `/auth`, `DashboardApp` em `/dashboard` (com guarda de login, `:45`) e `MarketingApp` em `/` | forte |
| Código-fonte (integração) | `packages/container/src/components/AuthApp.js:4` importa `mount` de `auth/AuthApp`; `:11-21` passa `initialPath`, `onNavigate` e `onSignIn` e sincroniza o histórico via `onParentNavigate`; `DashboardApp.js:2,8` monta o remote Vue | forte |
| Código-fonte (remote Vue) | `packages/dashboard/src/bootstrap.js:1-16`: `createApp(Dashboard).mount(el)`, exportado como `mount` | forte |
| Build/deploy | `.github/workflows/{container,marketing,auth,dashboard}.yml`: um workflow por app, disparado por `paths` (`marketing.yml:7-8`), com `aws s3 sync dist s3://…/<app>/latest` (`:26`) e invalidação do CloudFront para `remoteEntry.js` (`:32`) | forte |
| Documentação | Sem README | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `container`, `marketing`, `auth` e `dashboard` em `packages/` |
| Q2 | Yes | Webpack, entry e workflow de deploy próprios por app (`.github/workflows/*.yml`, S3 por prefixo); sem import de código-fonte entre apps |
| Q3 | Yes | O container roteia e monta os três remotes (`App.js:41-48`) |
| Q4 | Yes | `remotes`/`exposes` configurados em dev e prod e usados via `mount` (`AuthApp.js:4,11`, `DashboardApp.js:2,8`) |
| Q5 | Yes | Q1–Q4 convergem; nenhuma divergência a justificar |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Corresponde a "monorepos containing a host and its remotes" e a "hybrid implementations" (remote Vue dentro de um container React).
- A cadeia de evidência está completa: config `remotes`/`exposes` → wrappers com `mount` → roteamento no container → deploy independente por app em S3/CloudFront.

## Notas para análise

- **RQ2:** caso híbrido de frameworks (React + Vue) sob Module Federation; o contrato `mount(el)` desacopla o framework do remote.
- **RQ3:** integração de roteamento bidirecional (`onNavigate` ↔ `onParentNavigate`) e callback de autenticação (`onSignIn`) entre host e remote.
- **Protocolo (família):** mesma estrutura do repositório 007 (`react-js/`), típica de um curso conhecido de micro-frontends; aqui completa, com deploy.
