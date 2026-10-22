---
schema: 1
id: 1307506894
full_name: microfrontend-lab/chart-app
url: https://github.com/microfrontend-lab/chart-app
commit: 3cc620f7aa2c2faf4db22ccf8e9c975ef55f05c1
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rspack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 001 — microfrontend-lab/chart-app

## Contexto

Remote Module Federation de uma POC de micro-frontends (`README.md:4`, "micro frontend POC"). O host (portal) está em outro repositório, `microfrontend-lab/mf-registry` (`CLAUDE.md:8-11`).

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json`: `@module-federation/enhanced` em `devDependencies` | fraca |
| Configuração | `rspack.config.ts:64-73`: `ModuleFederationPlugin` com `name: 'chartApp'`, `filename: 'remoteEntry.js'`, `exposes: { './ChartWidget' }`, `shared` singleton (react, react-dom, react-router); sem `remotes` | moderada |
| Configuração | `rspack.config.ts:17`: `publicPath: 'auto'`, com comentário explicando que o remote é carregado na página do portal | moderada |
| Código-fonte (exposição) | `src/index.tsx:1`: `import('./bootstrap')` (padrão de entry assíncrono de remote MF); `src/types/widget.ts:5`: `WidgetProps` (`basename`, `user`, `theme`) como contrato com o host | moderada |
| Código-fonte (consumo) | Busca por `remotes`, `loadRemote`, `registerApplication` e import map em `src/`, `public/` e na config: nenhuma ocorrência | ausente |
| Estrutura | Uma única unidade: um `package.json`, um entry point, um build | contrária |
| Composição | Nenhum host no repositório; o host está em `microfrontend-lab/mf-registry` (`CLAUDE.md:8-11`) | ausente |
| Build/deploy | `.github/workflows/deploy.yml:43-53`: `gsutil rsync` para `gs://mf-chart-app`, `remoteEntry.js` com `no-cache`; `infra/*.tf` cria o bucket (deploy independente) | moderada |
| Documentação | `README.md:3-4`: "a remote in the `microfrontend-lab` micro frontend POC"; `README.md:51-58`: rota `/apps/chart` no portal e entrada de registry com a URL do `remoteEntry.js` | moderada |
| Histórico | `3cc620f` "Fix publicPath: hardcoded prefix broke embedded chunk loading in production", uso real como remote | moderada |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma só unidade frontend; a config de composição só tem `exposes` (`rspack.config.ts:67`) e não referencia unidades externas. O portal aparece só na documentação. |
| Q2 | Yes | Para a unidade: entry, build e deploy próprios (`deploy.yml`, bucket dedicado) |
| Q3 | Undetermined | O host que monta a unidade não está no repositório (`CLAUDE.md:11` aponta para outro repo) |
| Q4 | Undetermined | O lado remote está configurado (`exposes`), mas o lado consumidor não é observável |
| Q5 | No | A evidência mostra uma unidade preparada para composição, não uma instância de MFE no repositório |

## Motivo

- Q1 é No. Pela regra geral isso daria Non-MFE, mas o checklist abre a exceção MFE-unit: "a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable".
- O repositório cumpre os dois requisitos dessa exceção:
  - **Preparado para composição:** `exposes`, `remoteEntry.js`, `shared` singleton, bootstrap assíncrono, `publicPath: 'auto'` e o contrato `WidgetProps`.
  - **Host não observável:** o portal está em `microfrontend-lab/mf-registry`, fora do repositório.
- Corresponde ao caso "repositories containing only a remote unit, without the composing host".
