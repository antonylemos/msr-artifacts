---
schema: 1
id: 1208101025
full_name: tkosev123/Module-Federation
url: https://github.com/tkosev123/Module-Federation
commit: 75672a7639bdeff1d555f96a209f3f014fa692a3
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react-native]
build_tools: [rspack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 057 — tkosev123/Module-Federation

## Contexto

- **Abordagem de implementação:** Module Federation para React Native (Re.Pack + Rspack, `ModuleFederationPluginV2`)
- **Tipo de repositório:** example/proof of concept (app React Native "deposit" recém-criado pelo CLI, com um `Counter` exposto)
- **Classificação:** MFE-unit (sujeito à decisão de escopo mobile, como o repositório 025)
- **Commit avaliado:** `75672a76` (único commit)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Um único app React Native (`package.json:2` `"name": "deposit"`, `index.js`, `App.tsx`, `android/`, `ios/`); `node_modules/` versionado (dos 34.490 arquivos, quase todos são dependências) | contrária |
| Tecnologia | `package.json:13-17,27`: `@module-federation/{enhanced,runtime,sdk,…}` 0.10.0 e `@callstack/repack` ^5.1.0-rc.0 | fraca |
| Configuração | `rspack.config.mjs:39-47`: `Repack.plugins.ModuleFederationPluginV2({ name: 'Deposit', filename: 'Deposit.container.js.bundle', exposes: { './Counter': './Counter' }, shared: … })`; sem `remotes` | moderada |
| Código-fonte | `Counter.tsx:4`: componente exposto (contador); `App.tsx:8-20`: tela padrão do template (`NewAppScreen`), sem uso de remotes | moderada |
| Build/deploy (artefatos) | `build/generated/{android,ios}/@mf-types/Counter.d.ts`, `@mf-types.zip`: tipos gerados pelo MF para consumidores | moderada |
| Composição | Nenhum host no repositório | ausente |
| Documentação | `README.md`: boilerplate do React Native CLI | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade; a config de composição só tem `exposes` (`rspack.config.mjs:44-46`) |
| Q2 | Yes (para a unidade) | Bundle de container próprio (`Deposit.container.js.bundle`) |
| Q3 | Undetermined | O host não está no repositório |
| Q4 | Undetermined | Lado remote configurado (e tipos gerados para o consumidor); o consumidor não é observável |
| Q5 | No | Unidade preparada para composição, não uma instância de MFE no repositório |

## Motivo

- Q1 é No; aplica-se a exceção MFE-unit: remote Re.Pack com `exposes` e tipos gerados para um host externo não observável.
- Mesmo padrão do 001/050, mas em **React Native**.

## Ponto para revisão conjunta

- **Escopo mobile:** como no repositório 025, as unidades são de um app nativo, não web. Se o estudo se restringir a web, o caso passa a Non-MFE (fora do escopo). Esta é a segunda ocorrência; vale fixar a regra no checklist.
