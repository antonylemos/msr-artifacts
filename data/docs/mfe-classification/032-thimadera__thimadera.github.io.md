---
schema: 1
id: 1373391675
full_name: thimadera/thimadera.github.io
url: https://github.com/thimadera/thimadera.github.io
commit: 52c2f80cd40faefcadcd54f94a1518325bb1d5a4
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 032 — thimadera/thimadera.github.io

## Contexto

- **Tipo de repositório:** production-oriented (site pessoal/portfólio no GitHub Pages, `.github/workflows/deploy.yml`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json`: React + Vite + Tailwind; nenhuma dependência de MFE | ausente |
| Configuração | `vite.config.ts:1-20`: React, Tailwind e um plugin local de SEO (`seoHtml`); sem federação | ausente |
| Código-fonte | `src/main.tsx:8`: um único `createRoot`; seções do portfólio (`src/components/{Hero,About,Experience,Projects,…}.tsx`) importadas por `src/App.tsx` | contrária |
| Estrutura | Uma única app (um `package.json`, um entry); `posts/*.html` são páginas estáticas de blog | contrária |
| Documentação (conteúdo) | `README.md:21` "Microfrontends (single-spa)" como competência; `linkedin-about.md:1,9`; `src/data/experience.ts:39-40,53-54` e `src/i18n/translations.ts:100,201` descrevem a experiência profissional do autor num portal de "20+ Angular microfrontends" com single-spa | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`src/main.tsx:8`) |
| Q2 | No | Não há unidades a comparar |
| Q3 | No | Não há host, shell nem root config |
| Q4 | No | Nenhum mecanismo de composição |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- É um site de portfólio React monolítico.
- "microfrontends"/"single-spa" aparecem como dados de currículo do autor (experiência em outro projeto, privado), não como arquitetura deste repositório.
- Corresponde a "conventional frontend monoliths" e a "repositories mentioning micro-frontends without implementing them".

## Notas para análise

- **RQ1 (sinais enganosos):** mesmo padrão dos repositórios 011, 014 e 019, aqui com o termo também no código-fonte (`src/data/experience.ts`, `src/i18n/translations.ts`) como conteúdo textual, o que engana buscas por código.
