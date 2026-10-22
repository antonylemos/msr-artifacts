---
schema: 1
id: 1398629157
full_name: Bouabidi/automotive-market-dashboard
url: https://github.com/Bouabidi/automotive-market-dashboard
commit: ca78a1c1214febd9ad105afec72e55a2210cb633
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [angular]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 034 — Bouabidi/automotive-market-dashboard

## Contexto

- **Tipo de repositório:** example/proof of concept (projeto de portfólio/estudo com documentação de entrevista: `INTERVIEW-ARCHITECTURE.md`, `INTERVIEW-MICRO-FRONTENDS.md`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `apps/frontend/` (uma app Angular 22) e `apps/backend/` (NestJS + Prisma); uma única unidade frontend | contrária |
| Tecnologia | `apps/frontend/package.json`: nenhuma dependência de federação (Native Federation, MF ou single-spa) | ausente |
| Configuração | `apps/frontend/angular.json:21`: builder `@angular/build:application` (esbuild); um único projeto | ausente |
| Código-fonte | `apps/frontend/src/app/app.routes.ts:7-33`: `loadComponent`/`loadChildren` com `import()` local (lazy loading de features internas, incluindo um componente chamado `AppShell`); nenhuma ocorrência de `federation`, `loadRemote` ou `remoteEntry` em `apps/frontend/src` | contrária |
| Documentação (decisão) | `docs/adr/ADR-003-micro-frontends.md:1,3-5,11-13`: "Defer Runtime Micro Frontends Until Independent Deployment Is Justified", status **Accepted**, "Keep the current application as a modular monolith"; `docs/architecture/WHY-NOT-MICRO-FRONTENDS-YET.md:1-9`: "one Angular application… share one Angular build"; `MICRO-FRONTEND-ARCHITECTURE.md:3-7`: "small, validated Angular 22 modular monolith… does not yet have… [what would] justify runtime federation" | contrária |
| Documentação (futuro) | `MICRO-FRONTEND-ARCHITECTURE.md:24-46`: diagrama da fronteira de federação futura e plano de migração strangler (Shell + remotes Products/Dashboard/Analytics, Native Federation depois de validar a compatibilidade) (plano) | fraca |
| Build/deploy | `apps/frontend/Dockerfile`, `docker-compose.yml` e `.github/workflows/ci.yml`: um único build e imagem do frontend | contrária |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`apps/frontend`) |
| Q2 | No | As features (Products, Dashboard) compartilham build e deploy e são carregadas por `import()` local (`app.routes.ts:7-33`) |
| Q3 | No | O `AppShell` é um componente de layout interno, não um host de unidades independentes |
| Q4 | No | Nenhum mecanismo de composição; a documentação declara explicitamente que a federação não foi adotada (`ADR-003`) |
| Q5 | No | Q1–Q4 convergem, e a própria documentação confirma |

## Motivo

- É um monolito modular Angular com lazy loading; as fronteiras de MFE estão só documentadas como alvo futuro.
- A documentação registra formalmente a decisão de **não** adotar micro-frontends agora (ADR-003, "Accepted"; "WHY-NOT-MICRO-FRONTENDS-YET.md").
- Corresponde a "repositories mentioning micro-frontends without implementing them" e a "conventional frontend monoliths".

## Notas para análise

- **RQ1 (sinais enganosos):** vários documentos com "MICRO-FRONTEND" no nome (`MICRO-FRONTEND-ARCHITECTURE.md`, `INTERVIEW-MICRO-FRONTENDS.md`, `ADR-003-micro-frontends.md`) e um componente `AppShell`, mas a decisão documentada é contrária. Caso parecido com o repositório 012, porém com ADR explícito.
- **RQ1 (evidência negativa):** um ADR "Accepted" que rejeita MFE é evidência forte de ausência, não só ausência de evidência.
