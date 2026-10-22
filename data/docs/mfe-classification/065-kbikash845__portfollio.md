---
schema: 1
id: 1313329601
full_name: kbikash845/portfollio
url: https://github.com/kbikash845/portfollio
commit: 70277f58ca5109a4aa36eebfde371010803f84ce
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

# 065 — kbikash845/portfollio

## Contexto

- **Tipo de repositório:** production-oriented (site de portfólio pessoal, deploy na Vercel)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json`: React 19, Vite, Tailwind, Framer Motion; nenhuma dependência de MFE | ausente |
| Configuração | `vite.config.js:8-20`: plugin local para variáveis de analytics, `react()` e `tailwindcss()`; sem federação | ausente |
| Código-fonte | `src/main.jsx:6`: um único `createRoot`; seções (`src/sections/{Hero,About,Experience,Projects,Writing,Contact}.jsx`) importadas por `App.jsx` | contrária |
| Documentação (conteúdo) | `README.md:23`, `ABOUT.md:23`, `src/sections/Projects.jsx:14-26` e `src/sections/Experience.jsx:12,24`: "Large-Scale Micro-Frontend Operations Platform" e "Micro-frontends" como projeto e experiência profissional do autor (em outra empresa, fora do repositório) | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`src/main.jsx:6`) |
| Q2 | No | Não há unidades a comparar |
| Q3 | No | Não há host, shell nem root config |
| Q4 | No | Nenhum mecanismo de composição |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- É um site de portfólio React monolítico; "micro-frontend" aparece como conteúdo do currículo do autor.
- Corresponde a "conventional frontend monoliths" e a "repositories mentioning micro-frontends without implementing them". Mesmo padrão do repositório 032 (termo também dentro de arquivos `.jsx`, como texto).
