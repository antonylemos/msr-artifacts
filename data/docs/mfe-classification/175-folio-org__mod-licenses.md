---
schema: 1
id: 144581300
full_name: folio-org/mod-licenses
url: https://github.com/folio-org/mod-licenses
commit: 4c5d99de25a98d305ac07d651433bbc38ffcef85
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
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

# 175 — folio-org/mod-licenses

## Contexto

“FOLIO service module - licenses” (`README.md:1–10`): serviço backend em Grails/Groovy da plataforma de bibliotecas FOLIO, com API REST documentada em OpenAPI. O repositório não contém frontend. A expressão “module-federation” no README (`README.md:103`) se refere à federação de instâncias do módulo backend (tabela `federation_lock`, `app_instance`, `README.md:87–92`), não a Module Federation de frontend. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:176` registra rank 175, ID 144581300, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:176` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:317` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:317` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:<2019-01-01` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:<2019-01-01` | 2026-10-07T23:13:59.494Z / 2026-10-08T16:11:19.454Z |

Metadados do hit:
- descrição “FOLIO service module - licenses”, sem a frase;
- sem tópicos, linguagem Groovy, `fork: false`, tamanho 3.688;
- criação em 2018-08-13T13:08:50Z, push em 2026-09-24T08:35:19Z.

O acerto vem de `README.md:103`, “Since the introduction of module-federation for this module…”, com grafia hifenizada e única ocorrência da frase; a busca de frase trata o hífen como separador. A última alteração do README é `a000cda` (2026-07-22), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 293 entradas, 273 arquivos regulares `100644` e 20 executáveis `100755`; zero symlinks e zero gitlinks. Há serviço Grails em `service/` (`grails-app/`, `src/`, `build.gradle`, wrappers Gradle e Grails), documentação OpenAPI em `docs/API/` (134 arquivos), `ramls/`, `scripts/`, `tools/`, `Dockerfile` e Jenkinsfiles. Não há nenhum arquivo `.js`, `.jsx`, `.ts`, `.tsx`, `.vue`, `.html` ou `.gsp`. | contrária |
| Documentação (sentido de “federation”) | `README.md:76–92`: locks do Liquibase e `mod_licenses__system.federation_lock`, “to facilitate multiple instances accessing the same data”. `README.md:94–106`: problemas de pool de conexões e “federated locks” após a introdução de “module-federation”. É coordenação entre instâncias do backend. | contrária |
| Configuração | O único `package.json` é `docs/API/config/package.json:1–13`, que serve para pré-visualizar e empacotar a documentação OpenAPI com `@redocly/cli`. Não é aplicação frontend. | contexto |
| Busca | `git grep -i` no SHA por `ModuleFederation`, `remoteEntry` e `single-spa`: nenhum resultado. | ausente |

## Autoria e histórico

Clone não raso; 744 commits alcançáveis a partir do SHA, 165 merges, 29 autores distintos. Os principais são Ian Ibbotson (227, autor da raiz `9b802ba`, 2018-08-13), Steve Osguthorpe (163) e EthanFreestone (97). O SHA é `4c5d99d` (2026-08-21, “ci: Gradle workflows -- ERM-4143”). Há 31 branches remotos, que não foram considerados. O `git log -S "module-federation"` no README não completou por blob ausente no clone parcial (`07bce3a5…`), que não foi buscado; o clone ficou inalterado.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no repositório (inventário sem arquivos de UI). |
| Q2 | No | Sem unidades frontend, não há entradas ou builds a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz de frontend. |
| Q4 | No | Nenhum mecanismo de composição frontend; “module-federation” designa federação de instâncias do backend (`README.md:87–106`). |
| Q5 | No | Q1–Q4 são No: serviço backend captado por homonímia. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. O acerto é lexical: “module-federation” com outro sentido técnico.
- É o mesmo tipo de falso positivo do rascunho 144 (backend sem frontend captado por expressão homônima, ali “single SPA”). `frontend_units: 0` e `unit_organization: none`, como nos perfis sem frontend (011/064/068/073/077/101/111), embora seja software de produção.
- `repo_type: production`: módulo de serviço da plataforma FOLIO, com releases e CI. `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “module federation” também nomeia federação de instâncias de backend (locks distribuídos no FOLIO). A consulta de tecnologia `"module federation"` capta esse uso sem relação com frontend.
- **Protocolo (busca):** entrada só por essa consulta, na partição `created:<2019-01-01`. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `production`, zero unidades e `none`; sem decisão aberta (`draft`). A ocorrência de "module-federation" (`README.md:103`, também a linha 87) explica que a introdução da federação para o módulo duplicou o pool de conexões do schema de sistema, ou seja, coordenação de instâncias e conexões de banco do serviço FOLIO, e não composição de frontends. O repositório não tem arquivos `.js`, `.jsx`, `.ts`, `.tsx`, `.vue`, `.html` ou `.gsp`; `docs/API/config/package.json:1–13` configura `@redocly/cli` para especificações OpenAPI e os `../../` encontrados são `$ref` de OpenAPI. O clone é parcial quanto a blobs: a busca histórica `git log -S'module-federation' -- README.md` falha por objeto promisor ausente, o que limita só a data de introdução da expressão. O README (último commit `a000cda`, julho de 2026) é anterior às buscas. A atribuição do hit ao README é por eliminação (nome `mod-licenses`, descrição `FOLIO service module - licenses`, sem tópicos). Comparáveis finais: 030 (falso positivo por nome) e 064 (menção sem unidades).
