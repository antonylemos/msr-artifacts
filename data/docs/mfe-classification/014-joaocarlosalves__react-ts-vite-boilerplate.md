---
schema: 1
id: 1023904818
full_name: joaocarlosalves/react-ts-vite-boilerplate
url: https://github.com/joaocarlosalves/react-ts-vite-boilerplate
commit: 8b86f8496f6404e2ab6b4e89d5da81ce316e3028
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
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

# 014 — joaocarlosalves/react-ts-vite-boilerplate

## Contexto

- **Tipo de repositório:** template (boilerplate React + TypeScript + Vite, "STILL IN PROGRESS", `README.md:3-5`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json:14-22`: React 19, React Router, Jest, Babel, testing-library; nenhuma dependência de MFE | ausente |
| Configuração | `vite.config.ts:9-17`: só `@vitejs/plugin-react` e cobertura de testes; sem federação, `build.lib` ou entries múltiplas | ausente |
| Código-fonte | `src/main.tsx:3-16`: um único `createRoot` com `BrowserRouter`; páginas e layout (`src/pages/`, `src/layout/`) importados estaticamente | contrária |
| Código-fonte | Nenhuma ocorrência de `federation`, `single-spa`, `customElements` ou `remoteEntry` | ausente |
| Estrutura | Uma única app (um `package.json`, um `index.html`, um entry) | contrária |
| Documentação | `README.md:24`: "micro frontend" aparece só na bio do autor, entre as competências profissionais | fraca |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`src/main.tsx:15`) |
| Q2 | No | Não há unidades a comparar |
| Q3 | No | Não há host, shell nem root config |
| Q4 | No | Nenhum mecanismo de composição |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- É um boilerplate de SPA React; nada nele prepara uma unidade para composição, então a exceção MFE-unit não se aplica.
- Corresponde a "conventional frontend monoliths" e a "repositories mentioning micro-frontends without implementing them": o termo aparece só na bio do autor (`README.md:24`).

## Notas para análise

- **RQ1 (sinais enganosos):** como no repositório 011, o termo vem da autodescrição profissional no README, não do projeto.
