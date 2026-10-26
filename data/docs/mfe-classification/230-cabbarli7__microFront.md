---
schema: 1
id: 1069376251
full_name: cabbarli7/microFront
url: https://github.com/cabbarli7/microFront
commit: 21d96cae42566b614f746ab103e217814621c601
classification: Uncertain
checklist: { q1: yes, q2: yes, q3: yes, q4: undetermined, q5: undetermined }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 230 — cabbarli7/microFront

## Contexto

Repositório webpack 5 com Module Federation em `packages/`:
- `container` (React, host), que monta `marketing`;
- `marketing` (React, remoto), que expõe `mount`;
- `auth` e `dashboard`, que só têm `package.json` e lockfile.

Há um workflow de deploy em S3 só para o `container`. Não há README. A estrutura e os nomes são os do roteiro de curso dos rascunhos 174, 177, 197 e 216. Dois pontos do snapshot, porém, impedem afirmar que a configuração funciona como escrita:
- todas as configurações webpack fazem `require("../../package.json")`, que aponta para um `packages/package.json` inexistente;
- a configuração de produção do remoto expõe outra chave (`./MarketingApp`) que a importada pelo host (`marketing/Marketing`).

O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:231` registra rank 230, ID 1069376251, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:231` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:19529` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:19535` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `…#size:600..699` | `packages/container/config/webpack.prod.js` | 2026-10-07T22:22:58.742Z / 2026-10-08T16:05:30.505Z |
| idem | idem | `packages/container/config/webpack.dev.js` | 2026-10-07T22:23:05.816Z / 2026-10-08T16:05:36.364Z |

Os arquivos têm 653 e 647 bytes no SHA, dentro da faixa, e contêm `ModuleFederationPlugin` com `remotes`. Os metadados do hit de código vêm vazios. Não há README; a entrada é só por código.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 27 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. `container` e `marketing` têm `package.json`, `config/webpack.{common,dev,prod}.js`, `public/index.html` e `src/` (`index.js` → `bootstrap.js`). `auth` e `dashboard` só têm `package.json` e lockfile. Não há `package.json` na raiz nem em `packages/`. | contexto |
| Configuração (host) | `packages/container/config/webpack.dev.js:16–22`: `ModuleFederationPlugin` com `name: "container"` e `remotes: { marketing: "marketing@http://localhost:8081/remoteEntry.js" }`. `webpack.prod.js:14–20`: `marketing@${domain}/marketing/remoteEntry.js`, com `domain = process.env.PRODUCTION_DOMAIN` (`:6`). | forte |
| Configuração (remoto) | `packages/marketing/config/webpack.dev.js:19–26`: `name: "marketing"`, `filename: "remoteEntry.js"`, `exposes: { "./Marketing": "./src/bootstrap" }`, porta 8081 (`:10`). `webpack.prod.js:13–19`: `exposes: { "./MarketingApp": "./src/bootstrap" }`, sem `filename`. | forte |
| Código-fonte (composição) | `packages/container/src/components/MarketingApp.js:1–11`: `import { mount } from "marketing/Marketing"` e `mount(ref.current)`. `packages/container/src/App.js:4–12`: monta `MarketingApp`. `packages/marketing/src/bootstrap.js:5–16`: `mount` renderiza o app e só se monta sozinho em desenvolvimento isolado. | forte |
| Configuração (inconsistência) | As quatro configurações com federação fazem `const packageJson = require("../../package.json")` (`packages/container/config/webpack.dev.js:5`; `webpack.prod.js:3`; `packages/marketing/config/webpack.dev.js:5`; `webpack.prod.js:3`) e usam `shared: packageJson.dependencies`. A partir de `packages/<pacote>/config/`, `../../package.json` resolve para `packages/package.json`, que não existe no snapshot. Os dados do próprio pacote estão em `packages/<pacote>/package.json` (`../package.json`). Além disso, a chave exposta em produção (`./MarketingApp`) diverge da importada pelo host (`marketing/Marketing`). | ambígua |
| Build/deploy | `packages/container/package.json:4–7` e `packages/marketing/package.json:4–7`: scripts `start`/`build` próprios. `.github/workflows/comtainer.yml:1–27`: deploy só do `container` em S3 (`/container/latest`), sem invalidação nem `PRODUCTION_DOMAIN`; não há workflow para `marketing`. | moderada |
| Código-fonte (fronteiras) | Os únicos `../..` são esses `require` de configuração; não há imports de código-fonte entre pacotes. | contexto |

## Autoria e histórico

Clone não raso; 4 commits lineares, nenhum merge, todos de Elvin `<cabbarli.elvin75@gmail.com>`, entre 2025-10-03 e 2025-10-04:
- `356eb21` (“First commit”): adiciona os pacotes;
- `fb1ed07` (“Deployment configuration added”): adiciona o workflow e altera as configurações webpack dos dois pacotes;
- `9b522a6` e o SHA `21d96ca` (“YML update”/“YML update v2”): ajustam o workflow.

Nenhum blob histórico foi lido, e não se verificou se os `require` eram diferentes antes de `fb1ed07`. Não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades implementadas, a remota referenciada pela configuração de composição do host (`packages/container/config/webpack.dev.js:18–20`). |
| Q2 | Yes | Cada pacote tem entrada, configuração e scripts de build próprios, sem imports de código-fonte entre eles. |
| Q3 | Yes | O container monta o remoto (`packages/container/src/App.js:9`; `MarketingApp.js:7–9`). |
| Q4 | Undetermined | O mecanismo está configurado e consumido, mas as configurações como escritas exigem um arquivo inexistente (`require("../../package.json")`) e divergem entre desenvolvimento e produção na chave exposta. Pelo critério, “a configuration whose actual use is unclear is Undetermined”. |
| Q5 | Undetermined | Nenhuma resposta No e Q4 Undetermined. |

## Motivo

- `Uncertain` pela regra “No question is No, but at least one is Undetermined”, com `status: review`.
- **Intenção:** é o roteiro de curso de 174/177/197/216, em que host e remoto se ligam por `mount`.
- **Inconsistência:** aqui as configurações apontam para um `package.json` fora dos pacotes, que não existe. É o mesmo tipo de situação de 103 (`Uncertain`/review): consumidor e produtor presentes, mas a cadeia não se completa como escrita. Por isso não se afirma Q4 Yes sem decidir se a falha de resolução é detalhe corrigível ou ausência de mecanismo funcional.
- **Não é Non-MFE como 097:** lá a configuração não estava ligada ao build; aqui ela é chamada pelos scripts (`package.json:5–6`) e o código consome o remoto.
- **Campos:** `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 2` (`auth` e `dashboard` só têm manifesto, como em 216), `unit_organization: monorepo`, `repo_type: example`.

## Notas para análise

- **RQ1 (sinais enganosos):** busca de código casa `ModuleFederationPlugin` com `remotes` em configuração que, como versionada, não resolve sua dependência de `package.json`.
- **Protocolo (amostra):** quinto repositório da amostra com essa arquitetura de curso (174, 177, 197, 216).
- **Protocolo (busca):** elegibilidade `unknown` (001) e `pass` (002); o branch padrão é `master`.

## Decisão registrada

Mantido como `Uncertain`. Host e remoto implementam a composição por Module Federation e `mount`, mas as configurações exigem um `package.json` inexistente e divergem entre desenvolvimento e produção na chave exposta. A cadeia existe, porém o snapshot não permite confirmar que funciona como versionada.
