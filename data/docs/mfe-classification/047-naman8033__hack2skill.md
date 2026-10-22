---
schema: 1
id: 1274976133
full_name: naman8033/hack2skill
url: https://github.com/naman8033/hack2skill
commit: 11ea6f0c338364ef8398cdadaf1df97c831f6435
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 047 — naman8033/hack2skill

## Contexto

- **Tipo de repositório:** example/proof of concept (projeto de hackathon "Smart Cooking Planner", deploy na Vercel)
- **Commit avaliado:** `11ea6f0` (único commit)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json`: React + Vite; nenhuma dependência de MFE | ausente |
| Configuração | `vite.config.js:5-7`: só `@vitejs/plugin-react` | ausente |
| Código-fonte | `src/main.jsx:6`: um único `createRoot`; componentes em `src/components/` importados por `src/App.jsx`; `src/services/geminiService.js` chama a API do Gemini | contrária |
| Estrutura | Uma única app (um `package.json`, um entry, um `vercel.json`) | contrária |
| Documentação | `README.md:3`: "production-ready React **micro-app**"; nenhuma menção a micro-frontends | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`src/main.jsx:6`) |
| Q2 | No | Não há unidades a comparar |
| Q3 | No | Não há host, shell nem root config |
| Q4 | No | Nenhum mecanismo de composição |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- É uma SPA React monolítica de hackathon.
- "micro-app" (`README.md:3`) significa app pequeno, não a arquitetura. Mesmo caso do repositório 003 (bitebudget), que usa a mesma expressão.
- Corresponde a "conventional frontend monoliths".

## Notas para análise

- **RQ1 (sinais enganosos):** "micro-app" em READMEs de apps pequenos gerados com IA (Gemini) reaparece (003, 047); provavelmente capturado por termos amplos.
