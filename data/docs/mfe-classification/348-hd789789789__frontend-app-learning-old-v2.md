---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
url: https://github.com/hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [iframe]
ui_technologies: [react]
build_tools: []
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 348 — hd789789789/frontend-app-learning-old-v2

## Contexto

Cópia, com histórico completo, da aplicação `@edx/frontend-app-learning` (`package.json:2`), a “Learning MFE (micro-frontend application)” da plataforma Open edX (`README.rst:9–11`). É uma SPA React (Paragon, `@edx/frontend-platform`) entre as várias MFEs que a Open edX implanta separadamente. Esta cópia:
- inclui o cabeçalho e o rodapé da plataforma como pacotes npm (`package.json:37–38`);
- oferece pontos de extensão do Frontend Plugin Framework (`README.rst:137–139`; `example.env.config.jsx:1–24`);
- incorpora a MFE de Discussions, outra aplicação da plataforma, por `<iframe>` com a URL `DISCUSSIONS_MFE_BASE_URL`.

Nenhum commit é do titular do repositório. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:349` registra rank 348, ID 1098656325, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:349` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:21192` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:21198` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-11` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:28:09.204Z / 2026-10-08T15:56:45.972Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:58:13.574Z / 2026-10-08T16:07:13.967Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.

Metadados do hit:
- descrição “Front-end for the Open edX course experience, implemented using React and Paragon.”, sem tópicos, linguagem nula, `fork: false`, tamanho 20.342;
- criação em 2025-11-18T01:17:18Z e push em 2025-11-17T16:55:09Z: o push é anterior à criação, compatível com importação do histórico.

Grafias no `README.rst`:
- “micro-frontend”: `README.rst:9` (“This is the Learning MFE (micro-frontend application)…”) e `:149` (“The learning micro-frontend also supports…”);
- “micro-frontends”: `README.rst:145` (“All micro-frontends have a shared set of required environment variables…”).

A última alteração do README é `d5a092b` (2025-03-26), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 646 entradas, 639 arquivos regulares `100644` e 7 executáveis `100755` (`.dockerignore`, `.eslintignore`, `.gitignore`, `.npmignore`, `src/index.jsx`, `src/index.scss`, `src/setupTest.js`); zero symlinks e zero gitlinks. Uma única aplicação (`src/`, `public/`, `webpack.*.config.js` sobre `@openedx/frontend-build`). | contexto |
| Composição (iframe) | `src/course-home/discussion-tab/DiscussionTab.jsx:20–23`: `<iframe src={`${getConfig().DISCUSSIONS_MFE_BASE_URL}/${courseId}/${originalPath}`}>` na aba de discussão. O mesmo padrão aparece nas barras laterais (`src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:13`, `23`; `…/new-sidebar/…/DiscussionsWidget.tsx:10`, `21`). `src/index.jsx:174` lê `DISCUSSIONS_MFE_BASE_URL`, e `.env.development:14` o define como `http://localhost:2002`. | moderada |
| Plataforma | `README.rst:131–133`: “similar to all the other Open edX MFEs”. Cabeçalho e rodapé vêm como dependências npm (`package.json:37–38`). `example.env.config.jsx:1–24`: plugin via `@openedx/frontend-plugin-framework` (`DIRECT_PLUGIN`, importado como pacote). `.env.development:8–35`: URLs do LMS e de outras aplicações da plataforma, navegadas por link. | contexto |
| Autoria da cópia | Histórico de 2019-05-02 a 2025-11-16, com 1.518 commits em todos os refs (20 merges), todos de mantenedores e bots da Open edX (por exemplo, renovate, David Joy, Michael Terry, Carla Duarte, edX Transifex Bot). O SHA (`d987aed`, “chore: update browserslist DB (#1826)”, do edX requirements bot) é um commit upstream. | contexto |

## Autoria e histórico

Clone não raso; 1.518 commits em todos os refs, 20 merges, de 2019-05-02 a 2025-11-16. Os autores mais frequentes são `renovate[bot]` (179), “Renovate Bot” (119), David Joy (106), Michael Terry (97) e Carla Duarte (75). Não há commit do titular do repositório. Só há o branch `master`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | A aplicação e uma unidade externa (Discussions MFE) referenciada pela configuração (`DISCUSSIONS_MFE_BASE_URL`, `src/index.jsx:174`; `.env.development:14`) e incorporada em tela. |
| Q2 | Yes | A Discussions MFE é implantada separadamente, numa URL própria. |
| Q3 | Yes | A aplicação mostra a unidade externa na aba e nas barras laterais (`DiscussionTab.jsx:20–23`; `DiscussionsSidebar.jsx:23`). |
| Q4 | Yes | A aplicação incorpora a Discussions MFE por iframe, em pontos concretos da interface e com URL configurada (`DiscussionTab.jsx:20–23`; `.env.development:14`). |
| Q5 | Yes | Q1–Q4 demonstram duas unidades independentes compostas na plataforma. A origem upstream é uma nota de proveniência, não uma negação da implementação observada. |

## Motivo

- Classificado como `MFE-implemented`: a Learning MFE incorpora a Discussions MFE por iframe em áreas definidas da interface.
- **Proveniência:** a aplicação pertence ao ecossistema Open edX e foi copiada integralmente; a classificação considera a implementação observada e registra essa origem.
- **Campos:**
  - `approaches: [iframe]`, `ui_technologies: [react]`, `build_tools: []` (build encapsulado em `@openedx/frontend-build`/`fedx-scripts`, como em 218);
  - `frontend_units: 2` (a aplicação e a Discussions MFE referenciada), `unit_organization: multi-repo`;
  - `repo_type: production` (aplicação de produção da Open edX).

## Notas para análise

- **RQ2:** no ecossistema Open edX, “MFE” designa SPAs implantadas separadamente e ligadas por URL. Cabeçalho e rodapé são pacotes npm, extensões entram por plugin slots e a Discussions MFE é incorporada por iframe.
- **Protocolo (amostra):** cópia integral de repositório upstream sem fork declarado (`fork: false`). O titular não tem commits.
- **Protocolo (busca):** as grafias estão literalmente no `README.rst`. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Decisão registrada

Promovido para `MFE-implemented`. A Learning MFE incorpora concretamente a Discussions MFE por iframe, com URL configurada e pontos de exibição definidos. O histórico mostra que é uma cópia upstream da Open edX sem contribuição do titular; essa proveniência é registrada, mas não invalida a composição presente no snapshot.
