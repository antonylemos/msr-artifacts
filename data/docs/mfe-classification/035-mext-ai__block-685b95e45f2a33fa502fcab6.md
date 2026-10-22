---
schema: 1
id: 1008171264
full_name: mext-ai/block-685b95e45f2a33fa502fcab6
url: https://github.com/mext-ai/block-685b95e45f2a33fa502fcab6
commit: fc7007e56d9c86920985c63135d6cf4c7baa16ed
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
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

# 035 — mext-ai/block-685b95e45f2a33fa502fcab6

## Contexto

- **Tipo de repositório:** template (bloco gerado pela plataforma MEXT a partir de `mext-ai/default-block`)
- **Classificação:** Non-MFE (via Q5, regra de plugins de plataforma; confirmada pelos pesquisadores na avaliação do 037)

O repositório é um "block" da plataforma MEXT: um componente gerado/editado pela plataforma (commits "🎉 Initial commit - Forked from mext-ai/default-block", "🎪 Update 10 files from editor") e compilado como remote de Module Federation para ser carregado pelo host da plataforma. O nome do repositório é um id gerado (`block-<hash>`).

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação | `README.md:1-3` "Webpack Block Template… standardized template for creating Module Federation blocks in the MEXT system"; `:35-50` uso no host (`React.lazy(() => import('blockName/Block'))`); `:54-57` "The backend will automatically use this template and inject your files" | fraca |
| Configuração | `webpack.config.js:34-42`: `ModuleFederationPlugin` com `name: 'threescene'`, `filename: 'remoteEntry.js'`, `exposes: { './Block': './src/App' }`, `shared: {}` (sem compartilhamento, "full isolation"); `:49-57` `library: { type: 'var', name: 'threescene' }`, `publicPath: 'auto'` | moderada |
| Código-fonte | `src/App.tsx`: `mount(container, initialProps)` retorna a API `{ updateProps, unmount, getProps }`, com props injetadas pelo host; `src/block.tsx`: o conteúdo do bloco (cena 3D com `three`/`@react-three/fiber`, `peerjs`, `package.json:7-14`); `src/index.tsx:1-6` monta isoladamente para desenvolvimento | moderada |
| Estrutura | Uma única unidade (um `package.json`, um entry) | contrária |
| Composição | O host (plataforma MEXT) não está no repositório | contexto |
| Histórico | `8d2a1d6` fork do `default-block`; `10f41ad` "Update 10 files from editor" (edição pela plataforma); 4 commits (gerado pela plataforma) | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade; a config de composição só tem `exposes` (`webpack.config.js:37-39`) |
| Q2 | Yes (para a unidade) | Build próprio que gera `remoteEntry.js` |
| Q3 | Undetermined | O host da plataforma MEXT não está no repositório |
| Q4 | Undetermined | O lado remote está configurado; o consumidor não é observável |
| Q5 | **No** (override) | Ver justificativa |

## Justificativa do Q5

- Pela letra do checklist, o caso seria **MFE-unit**: a unidade está explicitamente preparada para um host externo (`exposes`, API `mount`).
- Mas o MF aqui é o **mecanismo de plugin de uma plataforma** (MEXT): o repositório é um template da plataforma preenchido pelo seu editor, e o host é o produto MEXT, não uma aplicação do autor. É o mesmo caso do repositório **010** (custom components do Qodly), classificado como Non-MFE pelos pesquisadores.
- O bloco é um widget/mini-app isolado que a plataforma embute, não uma parte de uma aplicação decomposta em unidades.

## Motivo

- Q5 é No por override, consistente com a decisão do repositório 010, então o repositório é Non-MFE.
- Se a regra de "plugins de plataforma" (sugerida no 010) não for adotada, a classificação passa a **MFE-unit**.

## Notas para análise

- **Checklist (regra recorrente: 010, 022, 035):** MF usado como mecanismo de extensão de plataformas (Qodly, FireCMS Cloud, MEXT). Pelas regras do checklist ("a justification that recurs across repositories is promoted to an explicit rule"), este é o terceiro caso, e a regra deveria ser formalizada.
- **Protocolo (duplicatas):** o nome gerado (`block-<hash>`) sugere que a plataforma cria um repositório por bloco; na amostra, este é o único da organização `mext-ai`.
