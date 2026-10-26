---
schema: 1
id: 871388763
full_name: single-spa/action-deploy-to-import-map-deployer
url: https://github.com/single-spa/action-deploy-to-import-map-deployer
commit: deda2213966b3eb5e6e229432c1b9267ad5e82b0
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

# 249 — single-spa/action-deploy-to-import-map-deployer

## Contexto

GitHub Action “for deploying microfrontends or import maps to import-map-deployer” (`README.md:1–3`). A action chama, por HTTP `PATCH`, um servidor `import-map-deployer` para atualizar a entrada de um serviço ou o import map inteiro de um ambiente (`src/index.js:30–110`). O README avisa que ela não envia arquivos para CDN (`README.md:3`). É ferramenta de deploy para sistemas que usam import maps, como os do ecossistema single-spa. Não há aplicação frontend. O nome do repositório e o da organização não são usados como evidência.

`data/samples/mfe-sample-001/clones.csv:250` registra rank 249, ID 871388763, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:250` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:10357` e `data/discovery/mfe-round-002/candidates.csv:10363`, ambos com `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2024-10` | 2026-10-07T18:25:39.366Z / 2026-10-08T15:37:07.510Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2024-10` | 2026-10-07T22:06:41.303Z / 2026-10-08T15:46:44.873Z |
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `…#created:2024-Q4` | 2026-10-07T23:33:22.655Z / 2026-10-08T16:20:53.721Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01` e `created:2024-10-01..2024-10-31` (terminologia) ou `created:2024-10-01..2024-12-31` (single-spa).

Metadados do hit:
- descrição “Github action for deploying to import-map-deployer”;
- sem tópicos, linguagem JavaScript, `fork: false`, tamanho 394;
- criação em 2024-10-11T21:31:42Z, push em 2025-06-19T20:25:33Z.

Grafias no README:
- “microfrontends”: `README.md:3` (“for deploying microfrontends or import maps”);
- “single-spa”: `README.md:3` (URL `github.com/single-spa/import-map-deployer`) e `README.md:7`, `15`, `31` (`uses: single-spa/action-deploy-to-import-map-deployer@v1`).

O singular “microfrontend” não aparece literalmente no README nem na descrição. Aparece em `action.yml:2`, `11` e `14`, fora dos campos buscados, e o hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `9206073` (2024-10-15), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 14 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São `action.yml`, `src/index.js`, o bundle `dist/index.js` gerado pelo `ncc` (`package.json:8`), configs (`.husky`, prettier, pnpm) e documentos. Não há HTML nem componentes de UI. | contrária |
| Código-fonte | `src/index.js:1–110`: lê entradas da action, calcula integridade SHA-384 opcional e faz `PATCH` em `/services` ou `/import-map.json` do `import-map-deployer`. É código Node de CI. | contrária |
| Configuração | `action.yml:1–36`: action `node20` com entradas `host`, `service-name`, `service-url`, `import-map-path` e credenciais. Não configura composição de unidades frontend; atualiza o registro de URLs mantido por outro serviço. | contrária |
| Documentação | `README.md:9–38`: exemplos de uso em workflows de terceiros, como `react-microfrontends/api` (`:11`). | contexto |

## Autoria e histórico

Clone não raso; 29 commits lineares, nenhum merge, de Joel Denning (27) e Jolyn Denning (2), de 2024-10-11 (`3c282ed`, “Initial commit”) a 2025-06-19 (SHA `deda221`, “Update FUNDING.yml (#1)”). O branch `origin/jolyndenning-patch-1` não foi considerado. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o repositório é uma GitHub Action em Node. |
| Q2 | No | Sem unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz neste repositório. |
| Q4 | No | Nenhum mecanismo de composição configurado entre unidades deste repositório; a action atualiza import maps de outros sistemas (`src/index.js:55–63`, `87–95`). |
| Q5 | No | Q1–Q4 são No: ferramenta de deploy para ecossistemas de micro-frontends com import maps. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)”: é ferramenta de apoio ao deploy de micro-frontends, sem implementá-los.
- Mesmo enquadramento do rascunho 204 (ferramentas de desenvolvimento para single-spa): `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** ferramenta de CI do ecossistema de import maps casa as consultas terminológicas e a de single-spa.
- **Protocolo (busca):** o hit singular `microfrontend` não tem grafia literal nos campos buscados. Elegibilidade `pass` nas duas rodadas.
