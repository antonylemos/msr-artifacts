---
schema: 1
id: 1125343429
full_name: PureMunky/widget-template
url: https://github.com/PureMunky/widget-template
commit: b24dfbc3126dee7a923534246e06abca53eaa802
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 051 — PureMunky/widget-template

## Contexto

- **Abordagem de implementação:** Module Federation (`@originjs/vite-plugin-federation`)
- **Tipo de repositório:** template ("Production-ready template for creating widgets that can be dynamically loaded into the micro-frontend dashboard", `README.md:1-3`)
- **Commit avaliado:** `b24dfbc` (único commit)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação | `README.md:3`: widgets "dynamically loaded into the micro-frontend dashboard via Module Federation"; `README.md:107-109` e `CUSTOMIZATION_GUIDE.md:215-246`: registrar o widget no `public/widgets.json` do dashboard; `README.md:39,209`: manter a versão do React igual à do dashboard | fraca |
| Configuração | `vite.config.js:9-25`: `federation({ name: 'exampleWidget', filename: 'remoteEntry.js', exposes: { './Widget': './src/Widget.jsx' }, shared: { react, react-dom singletons ^19 } })`; `:34` `base: '/widget-template/'` para o GitHub Pages | moderada |
| Código-fonte | `src/Widget.jsx:5-17`: "This component is exposed via Module Federation and loaded by the dashboard"; repassa `props` do host ao `BasicWidget`; `src/widgets/StatefulWidget.jsx` como exemplo alternativo | moderada |
| Estrutura | Uma única unidade (um `package.json`, um entry) | contrária |
| Composição | O dashboard host (com `widgets.json`) está em outro repositório do autor ("Check the main dashboard repository", `README.md:288`), fora da amostra | ausente |
| Build/deploy | `.github/workflows/deploy.yml:11-44`: deploy próprio no GitHub Pages | moderada |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade; a config de composição só tem `exposes` (`vite.config.js:12-14`) |
| Q2 | Yes (para a unidade) | Build e deploy próprios (`deploy.yml`) |
| Q3 | Undetermined | O dashboard host não está no repositório |
| Q4 | Undetermined | Lado remote configurado; o host (que lê `widgets.json`) não é observável |
| Q5 | No | Unidade preparada para composição, não uma instância de MFE no repositório |

## Motivo

- Q1 é No; aplica-se a exceção MFE-unit: unidade explicitamente preparada (`exposes`, contrato de props, `shared` alinhado com o host) para um host externo não observável.
- A regra de plugins de plataforma (010, 022, 035, 037) não se aplica: o host é um dashboard de micro-frontends do próprio autor (aplicação, não plataforma de terceiros com mecanismo de extensão).

## Ponto para revisão conjunta

- O limite entre "plugin de plataforma" e "remote de um host do mesmo ecossistema" fica fino aqui: o template serve para que outras pessoas criem widgets para o dashboard do autor. Tratei como MFE-unit porque o dashboard é uma aplicação composta (não um produto/plataforma), e o registro em `widgets.json` é a configuração de composição do host.
