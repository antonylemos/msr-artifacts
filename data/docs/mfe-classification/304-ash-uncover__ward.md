---
schema: 1
id: 574926330
full_name: ash-uncover/ward
url: https://github.com/ash-uncover/ward
commit: 82efa7b534d4d76539f6e2c83be3b97e5d38eca4
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 304 — ash-uncover/ward

## Contexto

- **Tipo de repositório:** biblioteca. `@sol.ac/ward`, publicada no npm, é “a small JavaScript library providing tools to ease microfrontend development regardless of the chosen frameworks” (`README.md:6`; `package.json:2–5`).

Oferece um barramento de mensagens entre frames (`postMessage`) e um mecanismo de descoberta de plugins descritos por JSON Schema (`README.md:9–11`). O repositório contém só a biblioteca, os schemas e os testes; não há aplicação que use a biblioteca para compor unidades. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:305` registra rank 304, ID 574926330, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:305` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:5248` e `data/discovery/mfe-round-002/candidates.csv:5253`, ambos com `terminology` e `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2022-12` | 2026-10-07T18:21:43.960Z / 2026-10-08T15:36:21.495Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2022-12` | 2026-10-07T22:05:52.765Z / 2026-10-08T15:45:58.325Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2022-12-01..2022-12-31`.

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 2416, criação em 2022-12-06T11:32:09Z, push em 2025-04-05T20:30:37Z.

Sem descrição, o acerto vem do README:
- **“microfrontend”:** `README.md:6` (“tools to ease microfrontend development”);
- **“microfrontends”:** a forma plural não aparece no README; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A descrição do `package.json` (“Ward micro frontends frameworks”, `package.json:5`) não é campo indexado pela consulta.

A última alteração do README é `fd2b3ac` (2025-04-05T22:29:27+02:00), e o SHA é de 2025-04-05T22:30:13+02:00. Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 108 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Biblioteca em `src/` (mensageria e plugins), schemas JSON em `docs/schemas/`, gerador de schemas em `bin/`, testes em `test/` e workflows de PR e publicação npm. Não há `index.html`, aplicação nem exemplo de uso composto. | contrária |
| Configuração / Build | `package.json:2–19`: pacote `@sol.ac/ward` com `main`/`types` em `dist` e `files` `bundles`/`dist`; `:20–27`: build `tsc` e bundle webpack. `webpack.config.build.cjs:10–19`: um único entry `src/index.ts` para `bundles/ward.bundle.js`, a distribuição da biblioteca. `.github/workflows/publish-npm.yml`: publicação no npm. | contrária |
| Código-fonte (biblioteca) | `src/index.ts:1–40`: classe `WardClass` com `PluginManager` e `MessageDispatcher`. `src/message/MessageDispatcher.ts:44`, `:115` e `src/message/services/FrameService.ts:81`: comunicação entre janelas por `postMessage`. `src/plugin/loader/model/PluginDataModel.ts:195` e `src/plugin/loader/schema/PluginProvideElementSchema.ts:12`: plugins podem fornecer elementos do tipo `iframe`, `webcomponent` ou `component`. São primitivas para quem compõe micro-frontends, não uma composição. | contexto |
| Composição | Nenhuma aplicação host ou unidade no repositório usa a biblioteca para carregar e montar outras unidades; os testes (`test/integration/Ward.integration.spec.ts`, `test/unit/...`) exercitam a própria API. | ausente |
| Código-fonte (fronteiras) | Não há unidades frontend; não há imports `../../` em `src`. | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 155 commits (155 em todos os refs), 25 merges, todos com e-mail do mesmo titular:
- 93 de `ash-uncover <ash.uncover@gmail.com>`, 25 deles com committer `GitHub`;
- 61 de `Antoine MAILLARD <ash.uncover@gmail.com>`;
- 1 de `Antoine MAILLARD <antoine.maillard@sap.com>`.

Os registros vão de 2022-12-06 (`634992e`, “Initial commit”) a 2025-04-05 (o SHA, “Update .gitignore”). `git rev-list --objects $SHA --missing=print` lista 899 objetos ausentes, nenhum na árvore do SHA. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend: o repositório é uma biblioteca npm (`package.json:2–19`; `webpack.config.build.cjs:10–19`) e nenhuma configuração de composição referencia unidades. |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | A biblioteca fornece mensageria entre frames e um carregador de plugins (`src/message/MessageDispatcher.ts:44`; `src/plugin/loader/PluginLoader.ts`), mas nada no repositório a usa para conectar unidades. |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”.
- Corresponde a “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)”: biblioteca de apoio à construção de micro-frontends.
- Mesmo enquadramento de 204 (devtools de single-spa) e 148 (SDK), ambos rascunhos, e por analogia de 028 (ferramenta que cita MF como cenário).
- `repo_type: library`, `frontend_units: 0`, `unit_organization: none`. `ui_technologies: []`: biblioteca TypeScript sem framework de UI. `build_tools: []`: o webpack só empacota a biblioteca, não unidades.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** a biblioteca prevê plugins que fornecem elementos dos tipos `iframe`, `webcomponent` ou `component` (`PluginDataModel.ts:195`) e um barramento por `postMessage` entre frames, uma abordagem de composição por iframe e Web Components não exercida no repositório.
- **Protocolo (famílias):** consumidores da biblioteca, se existirem em outros repositórios do titular, não estão nas rodadas com o mesmo dono (só `ash-uncover/ward` aparece em `data/discovery/mfe-round-002/candidates.csv:5253`).
- **Protocolo (busca):** o hit plural `microfrontends` não tem grafia literal no README. A elegibilidade é `pass` nas duas rodadas.
