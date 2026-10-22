---
schema: 1
id: 1080660279
full_name: pgarr/microfrontend-template
url: https://github.com/pgarr/microfrontend-template
commit: 8869e1289ab5b8e758cb6a465425997296b6ca32
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: template
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

# 046 — pgarr/microfrontend-template

## Contexto

- **Abordagem de implementação:** Module Federation (webpack 5) com contrato `mount(el, options)`; híbrido React + Vue
- **Tipo de repositório:** template (nome "microfrontend-template"; mesma estrutura de curso dos repositórios 007 e 017; sem README)
- **Commit avaliado:** `8869e12` (branch padrão `master`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Quatro apps na raiz: `container`, `marketing`, `auth` (React) e `dashboard` (Vue, `dashboard/src/bootstrap.js:1,6` `createApp`), cada uma com `package.json`, `config/webpack.{common,dev,prod}.js`, `public/index.html`, `src/index.js` e `src/bootstrap.js` | forte |
| Configuração (host) | `container/config/webpack.dev.js:19-23`: `remotes` para `marketing` (8081), `auth` (8082) e `dashboard` (8083); `container/config/webpack.prod.js:16-20`: os mesmos em `${domain}/<app>/latest/remoteEntry.js` | forte |
| Configuração (remotes) | `{auth,dashboard,marketing}/config/webpack.prod.js:14-17`: `name`, `filename: 'remoteEntry.js'`, `exposes` (`./AuthApp`, `./DashboardApp`, `./MarketingApp` → `./src/bootstrap`) | forte |
| Código-fonte (composição) | `container/src/App.js:8-10` `lazy` dos wrappers; `:29-37` rotas `/auth/*`, `/dashboard` e `/*` montam cada remote | forte |
| Código-fonte (integração) | `container/src/components/AuthApp.js:1,13` e `MarketingApp.js:1,13`: `import { mount } from '<remote>/<App>'` + `mount(ref.current, { … })` com `onParentNavigate`; `DashboardApp.js:1,8` monta o remote Vue | forte |
| Build/deploy | `.github/workflows/{container,marketing,auth,dashboard}.yml`: um workflow por app, disparado por `paths` (`auth.yml:6`), com `aws s3 sync dist s3://…/<app>/latest` (`:23`) e invalidação do CloudFront para `remoteEntry.js` (`:28`) | forte |
| Documentação | Sem README | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `container`, `marketing`, `auth` e `dashboard` |
| Q2 | Yes | Webpack, entry e workflow de deploy próprios por app (S3 por prefixo); sem import de código-fonte entre apps |
| Q3 | Yes | O container roteia e monta os três remotes (`App.js:29-37`) |
| Q4 | Yes | `remotes`/`exposes` em dev e prod, usados via `mount` (`AuthApp.js:1,13`) |
| Q5 | Yes | Q1–Q4 convergem; nenhuma divergência a justificar |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Corresponde a "monorepos containing a host and its remotes", "hybrid implementations" (remote Vue em container React) e "examples, templates… that actually compose frontend units".

## Notas para análise

- **Protocolo (família):** mesma arquitetura dos repositórios 007 (incompleto) e 017 (completo): `container` + `marketing`/`auth`/`dashboard`, `mount(el)` + `onParentNavigate`, deploy em S3/CloudFront por prefixo `<app>/latest`. Três ocorrências até aqui; vale registrar como família de repositórios derivados do mesmo material didático na análise (RQ1/RQ2), para não superestimar a frequência de certos artefatos.
- **Protocolo (família, diferença em relação ao 017):** usa `react-router-dom` v6 (`Routes`, `Navigate`) no container, em vez de `Switch`/`Redirect`.
