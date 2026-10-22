---
schema: 1
id: 553059494
full_name: DmytroVoitovych/Portfolio
url: https://github.com/DmytroVoitovych/Portfolio
commit: bf44595806e646f5ef38793a66cbc67e0c214759
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 019 — DmytroVoitovych/Portfolio

## Contexto

- **Tipo de repositório:** production-oriented application (site de portfólio pessoal com deploy na Vercel, `package.json:5`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json:51`: React 18 (Create React App ejetado: `config/webpack.config.js`, `scripts/build.js`); nenhuma dependência de MFE | ausente |
| Configuração | `config/webpack.config.js` é o webpack padrão do CRA ejetado; nenhum `ModuleFederationPlugin`, `remotes` ou `exposes` | ausente |
| Código-fonte | `src/index.js:10`: um único `ReactDOM.createRoot(...).render`; componentes (`header`, `hero`, `Projects`, `Form`, `footer`) importados estaticamente por `src/components/App.jsx` | contrária |
| Código-fonte | Nenhuma ocorrência de `federation`, `single-spa`, `customElements`, `remoteEntry` ou `iframe` | ausente |
| Estrutura | Uma única app (um `package.json`, um entry) | contrária |
| Build/deploy | `.github/workflows/deploy.yml` e `main.yml` com um único build/deploy | contrária |
| Documentação | `README.md:196`: "Experimenting with: WebAssembly and micro-frontends", só na apresentação pessoal do autor | fraca |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`src/index.js:10`) |
| Q2 | No | Não há unidades a comparar |
| Q3 | No | Não há host, shell nem root config |
| Q4 | No | Nenhum mecanismo de composição |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- É um site de portfólio React monolítico; nada nele prepara uma unidade para composição.
- Corresponde a "conventional frontend monoliths" e a "repositories mentioning micro-frontends without implementing them": o termo aparece só na autodescrição do autor (`README.md:196`).

## Notas para análise

- **RQ1 (sinais enganosos):** mesmo padrão dos repositórios 011 e 014: o termo vem do perfil profissional no README.
