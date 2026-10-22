---
schema: 1
id: 1100036219
full_name: arunkumarsubburaj/mfe_slide_dev
url: https://github.com/arunkumarsubburaj/mfe_slide_dev
commit: 87d5335de0e0428f1637280a61c7dc9ee3eab54f
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
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

# 023 — arunkumarsubburaj/mfe_slide_dev

## Contexto

- **Tipo de repositório:** não é projeto de software com aplicação (apresentação Slidev sobre micro-frontends)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | O repositório tem 5 arquivos versionados: `.gitignore`, `README.md`, `package.json`, `slides.md` e o lockfile | ausente |
| Tecnologia | `package.json:2-4` "microfrontend-presentation", "Microfrontend Architecture Presentation with Slidev"; `:10-14`: `@slidev/cli`, temas Slidev e Vue (dependências do Slidev) | contexto |
| Documentação | `README.md:1-3` "A professional presentation about Microfrontend Architecture built with Slidev"; `slides.md` (1.567 linhas) com seções "What are Microfrontends?" (`:125`), "Live Demo" (`:220`), "Integration Patterns" (`:313`) e trechos de código de Module Federation como conteúdo dos slides | contexto |
| Configuração / Código-fonte / Composição / Build/deploy | Inexistentes; o código de MF existe só como texto de slide | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend de aplicação; só o deck Slidev (`slides.md`) |
| Q2 | No | Não há unidades |
| Q3 | No | Não há host, shell nem root config |
| Q4 | No | Nenhum mecanismo de composição; trechos de MF são conteúdo de slide |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- É uma apresentação sobre a arquitetura de micro-frontends, não uma implementação. A "Live Demo" citada nos slides (`slides.md:220-226`) não está no repositório.
- Corresponde a "repositories mentioning micro-frontends without implementing them". Na filtragem automática do protocolo (seção 3.2), cabe em "repositories that are purely documentation without an implementation".

## Notas para análise

- **RQ1 (sinais enganosos):** trechos de configuração de Module Federation dentro de Markdown (`slides.md`) geram falso positivo em buscas por código como `ModuleFederationPlugin`.
