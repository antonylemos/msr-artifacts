---
schema: 1
id: 1132423946
full_name: profedavidluna/arquitectura_software_moderno_decisiones
url: https://github.com/profedavidluna/arquitectura_software_moderno_decisiones
commit: 4f7fa1ce0dbd90d0a4611d6f367e676fa9e8558b
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

# 329 — profedavidluna/arquitectura_software_moderno_decisiones

## Contexto

- **Tipo de repositório:** não é projeto de software com aplicação. É material didático de um curso de arquitetura de software (`README.md:1–3`), em quatro sessões (ADRs e C4, padrões distribuídos, arquiteturas web, escalabilidade), composto só por Markdown. Micro-frontends são um dos temas da sessão 3, com trechos de código como conteúdo de aula. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:330` registra rank 329, ID 1132423946, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:330` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:23192` (`terminology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:23199` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-01` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-01-31` | 2026-10-07T22:30:48.763Z / 2026-10-08T15:57:42.306Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-01` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-01-31` | 2026-10-07T22:59:58.776Z / 2026-10-08T16:07:54.827Z |

Metadados do hit: descrição do objetivo do curso (sem os termos), sem tópicos, linguagem nula, sem licença, `fork: false`, tamanho 353, criação em 2026-01-11T23:34:49Z, push em 2026-01-18T02:30:03Z.

A única ocorrência do termo no README raiz é `README.md:103` (“- Micro-frontends”, item do programa da sessão 3), com o hífen tratado como separador: casa o plural “micro frontends”; o singular não aparece isolado, e esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração alcançável do README é do merge `9eceae0` (2026-01-12), anterior às coletas de 7 e 8 de outubro de 2026; o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 65 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São 64 arquivos Markdown e `.gitignore`; não há manifesto, código-fonte, configuração de build nem workflow. | ausente |
| Documentação (conteúdo de aula) | `sesion-03-arquitecturas-web/micro-frontends/README.md:1–44`: conceito, benefícios, desafios e técnicas (Module Federation, single-spa, Web Components), com um `ModuleFederationPlugin` de exemplo em bloco de código (`:23–36`). `sesion-03-arquitecturas-web/micro-frontends/ejemplo-dashboard.md:1–56`: diagrama Mermaid e trechos de shell e event bus de um dashboard hipotético. `sesion-03-arquitecturas-web/microfrontends/README.md:9–56`, `62–84`: configuração de host/remotes e um custom element como exemplos. | contexto |
| Tecnologia / Configuração / Código-fonte / Composição / Build/deploy | Inexistentes; `ModuleFederationPlugin`, `customElements` e afins só ocorrem dentro de Markdown (`git grep -c` em `*.md`: 1 ocorrência em `micro-frontends/README.md`, 3 em `microfrontends/README.md`). Sem código, não há imports relativos a buscar. | ausente |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 33 commits alcançáveis (33 em todos os refs), 9 merges, de 2026-01-11 (`ec39e68`, “Crear README principal del curso…”) a 2026-01-17 (SHA `4f7fa1c`, “Change folder name”). Autoria por metadados: `copilot-swe-agent[bot]` em 19 commits e o titular, “Prof. David Luna”/“David Luna” com o mesmo e-mail institucional, em 14 (9 pela interface web). Há cinco refs remotos `copilot/*` correspondentes aos PRs, não considerados à parte. A maior parte do conteúdo foi gerada por assistente de código e integrada por PRs; o histórico nunca conteve arquivos além de Markdown e `.gitignore`. Nenhum blob histórico foi lido. `git rev-list --objects $SHA --missing=print` identifica 67 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só documentos de curso (inventário). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição configurado; os trechos de Module Federation e Web Components são conteúdo de aula em Markdown (`sesion-03-arquitecturas-web/microfrontends/README.md:13–56`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”; na seção 3.2 do protocolo, a “repositories that are purely documentation without an implementation”.
- Mesmo caso do final 023 (apresentação sobre micro-frontends com código de Module Federation só como conteúdo) e da exclusão de conteúdo de 075/081/094/105.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, arrays vazios.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** trechos de `ModuleFederationPlugin`, `remotes`/`exposes` e `customElements.define` dentro de Markdown geram falso positivo em buscas por código, como em 023.
- **Protocolo:** material didático majoritariamente gerado por `copilot-swe-agent[bot]` e integrado por PRs; os links do README apontam para pastas com nomes antigos (por exemplo, `./sesion-1-decisiones-arquitectonicas/`, `README.md:7`), enquanto a árvore usa `sesion-01-…` (último commit, “Change folder name”).
