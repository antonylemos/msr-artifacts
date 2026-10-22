---
schema: 1
id: 720247595
full_name: threatcode/dump-data
url: https://github.com/threatcode/dump-data
commit: 0dd27890107d57d13df72f775d8a66dc7cb83d20
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [angularjs]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 055 — threatcode/dump-data

## Contexto

- **Tipo de repositório:** production-oriented (frontend legado do RingID em AngularJS 1.8, modernizado com Vite e pnpm workspaces; 58 commits)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Monorepo pnpm com uma única app (`apps/main-app/`, AngularJS) e pacotes de apoio (`packages/{common,resources,scripts,styles,templates}`) (`README.md:21-37`); `newsportal/` e `webapp/` são subpastas da mesma app | contrária |
| Configuração | `vite.config.js:50-63`: um único input (`main: '/index.html'`); aliases para `apps/main-app/app` e `packages/` (`:88-93`); plugins de template cache e imagemin; sem federação | ausente |
| Código-fonte | Módulos AngularJS (`app.module.js`, `chat.module.js` etc.) num só bundle | contrária |
| Documentação (plano) | `ARCHITECTURE.md:242-247` "Micro-Frontend Approach — During migration, consider: … iframes, … module federation"; `MIGRATION-PLAN.md:46,55,99,124-140,196` recomenda migração incremental para React com micro-frontends (Module Federation ou single-spa); `README.md:210-215` roadmap "[ ] Set up micro-frontends"; `TODO.md:279,288`; `MIGRATION.md:111` (plano futuro) | fraca |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`vite.config.js:56-58`) |
| Q2 | No | Os pacotes de `packages/` são importados por alias no mesmo build |
| Q3 | No | Não há host, shell nem root config compondo unidades |
| Q4 | No | Nenhum mecanismo de composição; MFE só no plano de migração |
| Q5 | No | Q1–Q4 convergem; a própria documentação trata MFE como próximo passo ("[ ] Set up micro-frontends") |

## Motivo

- É um monolito AngularJS em processo de modernização de build; micro-frontends aparecem só como estratégia recomendada para uma migração futura.
- Corresponde a "repositories mentioning micro-frontends without implementing them" e a "conventional frontend monoliths". Mesmo padrão dos repositórios 012 e 034.

## Notas para análise

- **RQ1 (sinais enganosos):** documentos de plano de migração (`MIGRATION-PLAN.md`) com "Module Federation"/"Single-SPA" em repositórios ainda monolíticos; o roadmap não marcado (`[ ]`) é evidência direta de ausência.
