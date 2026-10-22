---
schema: 1
id: 1274987236
full_name: Aprameya-C-V/bitebudget
url: https://github.com/Aprameya-C-V/bitebudget
commit: e20162fcd808b03f78fb397e6b660841cce4d0c3
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 003 — Aprameya-C-V/bitebudget

## Contexto

App full-stack com deploy em Vercel/Render: uma SPA React servida por um servidor Express que também faz proxy da API do Gemini.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json`: React 19, Vite, Tailwind, Express, `@google/genai`, `motion`; nenhuma dependência de Module Federation, single-spa ou Web Components | ausente |
| Código-fonte | Busca por `micro-front`, `federation`, `single-spa`, `customElements`, `remoteEntry`, `import(` e `lazy(`: nenhuma ocorrência | ausente |
| Estrutura | Um único `package.json` na raiz e um único entry point (`src/main.tsx:6`, `createRoot(...).render`) | contrária |
| Código-fonte (composição interna) | `src/App.tsx:3-7`: os cinco componentes (`ScheduleInput`, `FridgeScanner`, `MealPlanViewer`, `SubstitutionsPanel`, `CookTodo`) são importados estaticamente de `./components`, como num monolito | contrária |
| Estrutura (backend) | `server.ts:239-247`: Express serve a SPA (Vite middleware em dev, `express.static` em prod) e faz proxy da API do Gemini; `api/index.ts` é o adaptador serverless da Vercel. Não é unidade frontend. | contexto |
| Build/deploy | `package.json:8`: um único build (`vite build` + `esbuild server.ts`); `vercel.json`: rewrites só para `/api` e fallback SPA para `/index.html` | contrária |
| Documentação | `README.md:3`: "full-stack AI micro-app"; sem descrição de arquitetura de micro-frontends | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`src/main.tsx:6`); nenhuma configuração de composição referenciando unidades externas |
| Q2 | No | Não há unidades a comparar; os componentes compartilham entry, build e deploy e são importados diretamente (`src/App.tsx:3-7`) |
| Q3 | No | Não há host, shell nem root config carregando unidades |
| Q4 | No | Nenhum mecanismo de composição configurado nem declarado |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- Todas as respostas são No, então o repositório é Non-MFE. A exceção MFE-unit não se aplica: a única unidade não está preparada para ser composta por um host externo (sem `exposes`, lifecycles exportados ou contrato de montagem).
- Corresponde ao caso "conventional frontend monoliths": uma SPA com componentes internos compostos por import estático.
- "micro-app" (`README.md:3`) significa app pequeno, não a arquitetura. Mesmo que fosse uma alegação de MFE, documentação não basta sem corroboração em código.

## Notas para análise

- **RQ1:** sinal enganoso; o termo "micro-app" é um provável motivo de o repositório ter entrado no pool de candidatos por termos amplos.
