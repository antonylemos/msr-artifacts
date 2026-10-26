---
schema: 1
id: 1355778817
full_name: sathishnagarajanQAlead/floorOS-qa-automation
url: https://github.com/sathishnagarajanQAlead/floorOS-qa-automation
commit: f26e76238a0638f51b162049320e3a786ea982ba
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
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

# 377 — sathishnagarajanQAlead/floorOS-qa-automation

## Contexto

Framework de testes E2E em Playwright para um sistema chamado floorOS, organizado por módulo (CRM, Mill, Costing etc.) para que cada QA cuide de um módulo (`README.md:1–6`). O README e `src/config/modules.ts` descrevem o sistema testado como “a shell + remotes micro-frontend”: `app-shell` cuida da autenticação e do roteamento, e cada módulo é montado num caminho próprio (`README.md:10–12`; `src/config/modules.ts:4–9`). O código desse sistema fica noutro repositório. Aqui há só page objects, fixtures, specs e casos de teste. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:378` registra rank 377, ID 1355778817, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:378` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:36613` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:36621` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-09` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:43:47.840Z / 2026-10-08T16:02:30.405Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:13:00.432Z / 2026-10-08T16:10:54.650Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-09-01..2026-09-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 69;
- criação em 2026-09-03T09:35:45Z, push em 2026-09-03T10:00:55Z.

A grafia “micro-frontend” está em `README.md:10`. O plural não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é `661fa97` (2026-09-03), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 55 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há `playwright.config.ts`, `src/` (cliente de API, config, fixtures, page objects, utils), `tests/` (specs por módulo), `test-cases/` (Markdown) e documentos. Não há aplicação frontend. | contrária |
| Configuração | `src/config/modules.ts:1–30`: lista de módulos do sistema testado (`crm`, `mill`, `costing`, `planning`, `techpack`, `master-data`, `admin`, `copilot`), todos acessados pelo shell (`:7–9`). Configura testes, não composição. | contexto |
| Documentação | `README.md:10–12`: descrição da arquitetura do sistema testado, que está fora do repositório. | contexto |

## Autoria e histórico

Clone não raso; 3 commits lineares, nenhum merge, todos de Sathish Nagarajan, em 2026-09-03: `661fa97` (“Initial commit: floorOS QA automation framework”), `1285b73` e o SHA `f26e762`. Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o repositório só contém testes E2E de um sistema externo. |
| Q2 | No | Sem unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz de composição; o shell testado está fora do repositório. |
| Q4 | No | Nenhum mecanismo de composição configurado. |
| Q5 | No | Q1–Q4 são No: projeto de testes de um sistema MFE externo. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”: os testes exercitam um sistema MFE que não está no snapshot.
- **Campos:** `repo_type: other` (automação de testes), `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** repositório de QA que descreve a arquitetura do sistema testado casa as consultas terminológicas.
- **RQ3:** a organização dos testes por módulo espelha a autonomia das unidades (`src/config/modules.ts:11–14`), sem acesso ao sistema.
- **Protocolo (busca):** o hit plural não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
