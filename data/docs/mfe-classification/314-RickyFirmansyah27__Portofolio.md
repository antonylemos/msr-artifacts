---
schema: 1
id: 543529019
full_name: RickyFirmansyah27/Portofolio
url: https://github.com/RickyFirmansyah27/Portofolio
commit: 9857e49192f6f0a74f3af660076f4fdb490aea9a
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

# 314 — RickyFirmansyah27/Portofolio

## Contexto

- **Tipo de repositório:** não é projeto de software. É um README de apresentação pessoal (descrição “About Me”) com currículo em PDF e ícones SVG.

“Microfrontend Architecture” aparece como tecnologia usada num emprego anterior (`README.md:33–35`). Diferentemente dos perfis `owner/owner`, o repositório tem nome próprio, mas o conteúdo é do mesmo tipo. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:315` registra rank 314, ID 543529019, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:315` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:4860` e `data/discovery/mfe-round-002/candidates.csv:4864`, ambos com `terminology` e `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2022-09` | 2026-10-07T18:21:38.287Z / 2026-10-08T15:36:15.666Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2022-09` | 2026-10-07T22:05:46.292Z / 2026-10-08T15:45:52.727Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2022-09-01..2022-09-30`.

Metadados do hit (iguais nas duas rodadas): descrição “About Me”, sem tópicos, linguagem nula, `fork: false`, tamanho 283, criação em 2022-09-30T09:40:06Z, push em 2025-05-06T15:56:05Z.

A descrição não contém os termos; o acerto vem do README. A única grafia correspondente é “Microfrontend” (`README.md:34`, “…Microservice Architecture, Microfrontend”, continuando em `:35` com “Architecture.”), que casa literalmente `microfrontend`. A forma plural `microfrontends` não aparece; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O SHA (2025-05-06T22:56:05+07:00, isto é, 15:56:05Z) é a última alteração do README, coincide com o `pushed_at` e antecede as coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 17 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São `README.md`, `RickyFirmansyah.pdf` e 15 ícones SVG em `img/`. Não há código, manifesto nem build. | ausente |
| Documentação | `README.md:8–10`: apresentação; `README.md:24–35`: experiência profissional, com “Microfrontend Architecture” entre as tecnologias usadas na PT. Dans Multi Pro (`:33–35`); `README.md:43–88`: badges de habilidades; `README.md:100–118`: projetos publicados em outros endereços. | fraca |
| Tecnologia / Configuração / Código-fonte / Composição / Build/deploy | Inexistentes; nenhuma configuração de federação, single-spa, import map, iframe ou Web Components. Imports relativos entre unidades não se aplicam (não há código). | ausente |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 18 commits (18 em todos os refs), nenhum merge, todos de `Ricky Firmansyah <110955695+RickyFirmansyah27@users.noreply.github.com>` com committer `GitHub` (edições e uploads pela interface web), de 2022-09-30 (`a4b324a`, “Initial commit”) ao SHA (2025-05-06, “Update README.md”). Pelo `git log --no-renames --name-status`, os commits adicionam o README, o PDF e os ícones, e 15 deles modificam `README.md`. `git rev-list --objects $SHA --missing=print` lista 15 objetos ausentes, nenhum na árvore do SHA (versões anteriores do README); não foi possível datar a introdução do termo.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend: só README, PDF e ícones (inventário). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição; “Microfrontend Architecture” é tecnologia citada em experiência profissional (`README.md:33–35`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Mesmo padrão dos perfis 011/064/068/073/077/101/111 (README de apresentação com micro-frontends como competência ou experiência), aqui num repositório com nome próprio em vez de `owner/owner`.
- `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, arrays de tecnologia vazios.
- Não há decisão aberta.

## Notas para análise

- **Protocolo (busca/filtro):** o padrão de perfil aparece também fora de `owner == name` (descrição “About Me”). Um filtro automático apenas pelo nome não pegaria este caso.
- **Protocolo (busca):** o hit plural `microfrontends` não tem grafia literal no README. A elegibilidade é `pass` nas duas rodadas.
