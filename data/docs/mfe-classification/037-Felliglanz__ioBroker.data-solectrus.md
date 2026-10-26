---
schema: 1
id: 1140089034
full_name: Felliglanz/ioBroker.data-solectrus
url: https://github.com/Felliglanz/ioBroker.data-solectrus
commit: 7243eb07fc240c44da323ce9a4bb60c8cf8e0710
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
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

# 037 — Felliglanz/ioBroker.data-solectrus

## Contexto

- **Tipo de repositório:** production-oriented (adapter ioBroker publicado no npm, `package.json:2`, 101 commits)
- **Classificação:** Non-MFE (via Q5, regra de plugins de plataforma; confirmada pelos pesquisadores)

ioBroker é uma plataforma de automação residencial. Um adapter (backend Node.js, `main.js`, `lib/`) pode fornecer componentes customizados para a UI de administração da plataforma (`ioBroker.admin`). A partir das versões recentes, o Admin carrega esses componentes como **remotes de Module Federation** declarados no `admin/jsonConfig.json`.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Backend do adapter (`main.js`, `lib/services/*`) + `src-admin/` (uma app React/Vite com o componente de configuração) + `admin/custom/` (saída compilada versionada) | contrária |
| Configuração (remote) | `src-admin/vite.config.ts:11-24`: `federation({ manifest: true, name: 'DataSolectrusItems', filename: 'customComponents.js', exposes: { './Components': './src/Components.tsx' }, remotes: {}, shared: { react, react-dom singletons } })`; `:13` "Must stay in sync with… `admin/jsonConfig.json`"; `:4-8` comentário: compartilha react/react-dom para reutilizar as instâncias do Admin | moderada |
| Configuração (registro na plataforma) | `admin/jsonConfig.json:16-18`: campo `"type": "custom"`, `"url": "custom/customComponents.js"`, `"name": "DataSolectrusItems/Components/DataSolectrusItemsEditor"`. A plataforma lê isso para carregar o remote | moderada |
| Build/deploy (artefatos) | `admin/custom/customComponents.js`, `admin/custom/mf-manifest.json` e `admin/custom/assets/*__loadShare__*`, `hostInit-*`, `virtualExposes-*`: saída MF versionada | fraca |
| Código-fonte | `src-admin/src/DataSolectrusItemsEditor.tsx` (editor de itens) exposto via `src-admin/src/Components.tsx` | moderada |
| Composição | O host (ioBroker Admin) é a plataforma, externa ao repositório | contexto |
| Tecnologia | `src-admin/package.json:13`: `@module-federation/vite`; `package.json:27`: `@iobroker/adapter-core` | fraca |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (o componente custom do Admin); `remotes: {}` |
| Q2 | Yes (para a unidade) | Build próprio (`src-admin/vite.config.ts`), saída em `admin/custom/` |
| Q3 | Undetermined | O host (ioBroker Admin) não está no repositório |
| Q4 | Undetermined | Remote configurado e registrado no `jsonConfig.json`; o consumidor é a plataforma |
| Q5 | **No** (override) | MF como mecanismo de plugin de plataforma (mesma justificativa dos repos 010 e 035) |

## Motivo

- Pela letra do checklist, seria **MFE-unit**: um remote MF explicitamente preparado para um host externo.
- Mas o host é a UI de administração de uma plataforma (ioBroker Admin), e o MF é o mecanismo oficial de extensão dessa UI: o adapter fornece um widget de formulário para a tela de configuração da plataforma, não uma parte de uma aplicação decomposta pelo autor.
- Consistente com o repositório 010 (Qodly, classificado Non-MFE pelos pesquisadores) e com o 035 (MEXT).

## Notas para análise

- **Regra de plugins de plataforma — quarto caso** (010 Qodly, 022 FireCMS Cloud, 035 MEXT, 037 ioBroker Admin). Proposta de regra: "unidades cujo único host é uma plataforma de terceiros que usa MF/Web Components/iframe como mecanismo de extensão (plugins, blocks, custom components) são Non-MFE; registrar a plataforma".
- **Checklist (diferença em relação a 010):** aqui a config de federação é autoral (`src-admin/vite.config.ts`), não só artefato compilado de terceiros.
- **Checklist (decisão dos pesquisadores):** manter Non-MFE. A regra de plugins de plataforma vale independentemente de a config de federação ser autoral ou só artefato compilado.
- **RQ1:** saída de build MF versionada (`admin/custom/`) gera vários sinais de tecnologia (`mf-manifest.json`, `remoteEntry`) em buscas automáticas.
