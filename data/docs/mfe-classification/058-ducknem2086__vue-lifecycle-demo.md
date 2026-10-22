---
schema: 1
id: 999942277
full_name: ducknem2086/vue-lifecycle-demo
url: https://github.com/ducknem2086/vue-lifecycle-demo
commit: daf0b5aa249ddc7421b6f8e8da6bb350dbc36611
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [single-spa]
ui_technologies: [vue]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 058 — ducknem2086/vue-lifecycle-demo

## Contexto

- **Abordagem de implementação:** single-spa (`single-spa-vue`, bundle SystemJS para import map)
- **Tipo de repositório:** example/proof of concept (projeto de estudo de Vue 3; README sobre lifecycle hooks em vietnamita)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json:26`: `single-spa-vue` ^3.0.1 | fraca |
| Código-fonte (lifecycles) | `src/main.ts:2,45-69`: `singleSpaVue({ createApp, appOptions: { render() { return h(App, …) } }, handleInstance(app) { … vuetify, PrimeVue, pinia, router } })`; `:71-73`: `export const bootstrap / mount / unmount`, os lifecycles de uma aplicação single-spa | forte |
| Configuração (build) | `vite.config.ts:11-24`: `input: 'src/main.ts'`, `preserveEntrySignatures: 'strict'`, `output.format: 'system'`, `entryFileNames: 'js/app.js'`, `base: ''` e `server.origin: 'http://localhost:1111'`, ou seja, saída SystemJS para ser carregada por um root config via import map | forte |
| Estrutura | Uma única app Vue (views de CRUD de "proposal", "config", "business") | contrária |
| Composição | Nenhum root config single-spa (`registerApplication`, import map) no repositório | ausente |
| Histórico | `31d4b39` "migrate to spa": conversão da app para aplicação single-spa | moderada |
| Documentação | `README.md`: notas sobre lifecycle hooks do Vue 3; nenhuma menção à arquitetura | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade; nenhuma configuração de composição referencia outras unidades |
| Q2 | Yes (para a unidade) | Build próprio em formato SystemJS (`vite.config.ts:11-24`) |
| Q3 | Undetermined | O root config que registra a aplicação não está no repositório |
| Q4 | Undetermined | Os lifecycles estão exportados; o lado que os registra não é observável |
| Q5 | No | Unidade preparada para composição, não uma instância de MFE no repositório |

## Motivo

- Q1 é No; aplica-se a exceção MFE-unit, no exemplo citado pelo próprio checklist: "exported single-spa lifecycles" com host não observável.
- A preparação é completa: lifecycles exportados, build SystemJS com assinaturas preservadas e origem fixa para o import map.

## Notas para análise

- **RQ1 (sinais enganosos, inverso):** o nome ("vue-lifecycle-demo") e o README (lifecycle hooks do Vue) não indicam MFE; a evidência está só em `main.ts`, `vite.config.ts` e no commit "migrate to spa". "Lifecycle" aqui tem dois sentidos: hooks do Vue e lifecycles do single-spa.
