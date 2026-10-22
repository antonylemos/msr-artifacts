---
schema: 1
id: 291806694
full_name: offline-pixel/offline-pixel.github.io
url: https://github.com/offline-pixel/offline-pixel.github.io
commit: f4ff3e7ace000b90d07114904545fe4dcf14ab1c
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 027 — offline-pixel/offline-pixel.github.io

## Contexto

- **Tipo de repositório:** production-oriented (site institucional/marketing de uma consultoria, publicado no GitHub Pages)
- **Commit avaliado:** `f4ff3e7a` (branch padrão `master`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | 1.738 arquivos versionados: páginas HTML estáticas (`*.html`, `blogs/*/index.html`, `aiml/`, `hire/`, `locations/` etc.), scripts soltos (`scripts/*.js`, `inject-*.js`) e bundles já compilados (`assets/*.js`, `index-*.js`); nenhum `package.json`, `vite.config` ou `webpack.config` | ausente |
| Tecnologia / Configuração | Nenhuma dependência nem config de MFE; nenhuma ocorrência de `federation`, `remoteEntry` ou `customElements.define` nos bundles (`index-BixGxctp.js`, `index-D9eggxik.js`) | ausente |
| Build/deploy | `.github/pages.yml` (9 linhas, só cache de `node_modules`); `_config.yml`/`.nojekyll` para GitHub Pages | contrária |
| Documentação | `readme.md:50` "Full-scale migrations from legacy frameworks to lightning-fast, modern microfrontends."; `readme.md:89` "microfrontends" como serviço oferecido; `blogs/microfrontends-vs-monolith-frontend/index.html` (artigo); os bundles contêm "microfrontend(s)" só como texto de conteúdo | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend identificável com entry e build próprios; o repositório é a saída publicada de um site |
| Q2 | No | Não há unidades a comparar |
| Q3 | No | Não há host, shell nem root config |
| Q4 | No | Nenhum mecanismo de composição |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- É o site de marketing de uma consultoria (páginas estáticas, blog, landing pages de contratação) publicado no GitHub Pages, com artefatos compilados e sem fonte das partes dinâmicas.
- "microfrontends" aparece como serviço oferecido (`readme.md:50,89`) e como tema de um post de blog.
- Corresponde a "repositories mentioning micro-frontends without implementing them". Na filtragem automática do protocolo (seção 3.2), também caberia em "no accessible source or configuration artifacts" para as partes JS.

## Notas para análise

- **RQ1 (sinais enganosos):** sites de conteúdo/SEO com artigos sobre micro-frontends aparecem pela busca de termos explícitos; o termo está em HTML e em bundles compilados, não em código autoral.
