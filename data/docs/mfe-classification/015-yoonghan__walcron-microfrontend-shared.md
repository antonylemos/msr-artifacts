---
schema: 1
id: 650844107
full_name: yoonghan/walcron-microfrontend-shared
url: https://github.com/yoonghan/walcron-microfrontend-shared
commit: 0035a85fd9ee3295126b8786391ac90f56d93377
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 015 — yoonghan/walcron-microfrontend-shared

## Contexto

- **Tipo de repositório:** production-oriented (biblioteca de componentes publicada no GitHub Packages, versão 12.1.2, CI e SonarCloud)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | Nenhuma dependência de Module Federation, single-spa ou Web Components; nenhuma ocorrência de `federation`, `remoteEntry`, `customElements` ou `single-spa` fora de `dist/` | ausente |
| Configuração (build) | `vite.config.ts:15-29`: `build.lib` com entry `src/index.ts`, `name: "Micro Frontend Shared"`, `react`/`react-dom` como `external`; ou seja, build de biblioteca npm, não de app | ambígua |
| Configuração (pacote) | `package.json:2` `@yoonghan/walcron-microfrontend-shared`; `:11-12` `publishConfig` para `npm.pkg.github.com`; `:22` versão 12.1.2; `:24-27` `main`/`module`/`exports` | contrária |
| Código-fonte | `src/components/` com `Accordion`, `Announcement`, `Menu`, `MiniMenu` e `ScrollableCard`, mais `helpers`, `hooks` e `util`, exportados por `src/index.ts` | contrária |
| Estrutura | `pages/`, `renderer/` e `server/` formam um site de demonstração (Vike, só em `development`, `vite.config.ts:13`); `.storybook/` documenta os componentes | contrária |
| Build/deploy | `.github/workflows/*.yml` com testes, compliance e publicação do pacote; `dist/` versionado | contrária |
| Documentação | `README.md:1-3` "A shared library used within the eco-system of Walcron. All components can be reused…"; `:46-52` instruções de `npm version` e `npm publish` | fraca |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Não há unidades frontend de aplicação; o repositório é uma biblioteca de componentes React (`vite.config.ts:16-20`) |
| Q2 | No | Não há unidades a avaliar |
| Q3 | No | Não há host, shell nem root config |
| Q4 | No | Nenhum mecanismo de composição; a lib é consumida por import de pacote npm |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- É uma biblioteca de componentes compartilhada, publicada como pacote npm para ser usada pelos MFEs de um ecossistema ("Walcron") que está em outros repositórios.
- A exceção MFE-unit não se aplica: a lib não é uma unidade preparada para ser composta em runtime por um host (sem `exposes`, lifecycles nem custom element), e sim uma dependência de build.
- Corresponde aos casos Non-MFE "repositories mentioning micro-frontends without implementing them" (o termo está só no nome) e, por analogia, "component libraries". O nome "microfrontend" indica o contexto de uso, não a arquitetura deste repositório.

## Notas para análise

- **RQ1 (sinais enganosos):** o termo "microfrontend" aparece no nome do repositório e do pacote, o que provavelmente o trouxe pela busca explícita. É um artefato de apoio a um ecossistema de MFEs, mas não uma implementação.
- **Protocolo (ecossistema multi-repositório):** nenhum outro repositório do ecossistema Walcron está na amostra. O ecossistema poderia ser investigado se o estudo considerasse implementações multi-repositório.
