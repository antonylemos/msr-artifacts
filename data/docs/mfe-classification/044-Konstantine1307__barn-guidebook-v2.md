---
schema: 1
id: 1269992629
full_name: Konstantine1307/barn-guidebook-v2
url: https://github.com/Konstantine1307/barn-guidebook-v2
commit: e2c640db04352845a395e287b9f9fd62d0a70a59
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
approaches: []
ui_technologies: []
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 044 — Konstantine1307/barn-guidebook-v2

## Contexto

- **Tipo de repositório:** template (guia de hospedagem em PWA; "This is the template… Each property gets its own copy", `README.md:7-8`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação | `README.md:3-5` "Single Page Application (SPA) — Vanilla HTML + CSS + TypeScript… Web Components, CSS custom properties, History API routing"; `ARCHITECTURE.md:5` idem; nenhuma menção a micro-frontends | contexto |
| Configuração | `vite.config.ts:17-30`: um único input (`src/index.html`), `VitePWA`; sem federação, `build.lib` ou entries múltiplas | ausente |
| Código-fonte (Web Components) | `src/components/guide-navbar.ts:138`, `guide-drawer.ts:174`, `guide-modal.ts:77`: `customElements.define(...)` para componentes de UI internos (navbar, drawer, modal), compilados no mesmo bundle | contrária |
| Código-fonte (roteamento) | `src/scripts/router.ts` + `src/components/sections/*.ts`: seções da SPA renderizadas pelo roteador interno (History API) | contrária |
| Estrutura | Uma única app (um `package.json`, um entry) | contrária |
| Build/deploy | `public/_headers`, `_redirects`, `_routes.json`: deploy único no Cloudflare Pages | contrária |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`vite.config.ts:24-26`) |
| Q2 | No | Os Web Components compartilham o mesmo build e bundle |
| Q3 | No | Não há host, shell nem root config compondo unidades; o roteador é interno |
| Q4 | No | Nenhum mecanismo de composição entre unidades; `customElements.define` é usado para componentes de UI internos |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- É uma SPA monolítica em TypeScript puro que usa Web Components nativos como modelo de componentes, não como fronteira entre unidades independentes.
- Corresponde a "conventional frontend monoliths". Por analogia, também a "component libraries using Web Components": os custom elements são componentes internos da própria app.
- Provavelmente entrou pela busca de implementação ("Web Components").

## Notas para análise

- **RQ1 (sinais enganosos):** `customElements.define` é evidência só de tecnologia; aqui serve como modelo de componentes de uma SPA. Contraste com o repositório 043, onde cada custom element é uma unidade servida separadamente e composta em runtime.
