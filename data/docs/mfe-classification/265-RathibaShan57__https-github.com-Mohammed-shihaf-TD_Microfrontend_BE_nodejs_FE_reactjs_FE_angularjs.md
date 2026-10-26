---
schema: 1
id: 1330950323
full_name: RathibaShan57/https-github.com-Mohammed-shihaf-TD_Microfrontend_BE_nodejs_FE_reactjs_FE_angularjs
url: https://github.com/RathibaShan57/https-github.com-Mohammed-shihaf-TD_Microfrontend_BE_nodejs_FE_reactjs_FE_angularjs
commit: d66eedea79c7877261a0de77d24a863c2695c611
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

# 265 — RathibaShan57/https-github.com-Mohammed-shihaf-TD_Microfrontend_BE_nodejs_FE_reactjs_FE_angularjs

## Contexto

No commit fixado, o repositório tem só um `README.md` de uma linha, com um título e nenhum código. O SHA é o commit inicial e também o HEAD do branch padrão. Há 66 outros branches remotos com commits posteriores, que, pelas mensagens, trazem backend e frontends; eles não fazem parte do snapshot e não foram considerados. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:266` registra rank 265, ID 1330950323, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:266` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:35174` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:35179` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-08` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T21:52:40.073Z / 2026-10-08T15:43:38.417Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:14:08.671Z / 2026-10-08T15:50:32.588Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-08-01..2026-08-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 387;
- criação em 2026-08-11T13:22:35Z, push em 2026-08-11T13:23:34Z.

O único texto do README é `README.md:1`, “# TD_Microfrontend_BE_nodejs_FE_reactjs_FE_angularjs” (52 bytes, sem quebra de linha final). A sequência “Microfrontend” aparece ali dentro de um identificador com sublinhados; o plural não aparece. Os campos buscados incluem também o nome, e a parte responsável por cada hit depende do processamento textual da busca do GitHub, que não está registrado.

O README é o do commit inicial (2026-08-11), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, arquivo regular `100644` (`README.md`, 52 bytes); zero symlinks e zero gitlinks. Não há código, configuração nem dependências. | contrária |
| Documentação | `README.md:1`: só um título; não descreve unidades nem composição. | ausente |
| Histórico fora do snapshot | Os commits posteriores existem só em branches não padrão. Pelas mensagens, `5e1f696` traz “minimal real backend+react+angular”, `c37fb83` “genuine iframe-based composition” e outros 64 são variações de versões (“version-label batch build”). A árvore de `c37fb83` tem `backend/`, `frontend-angular/` e `frontend-react/` (listagem do tree, sem leitura de blobs). Nada disso está no commit classificado. | contexto |

## Autoria e histórico

Clone não raso; 67 commits em todos os refs, nenhum merge, todos com autor “Mohammed-shihaf”, de 2026-08-11T14:40:30+05:30 (SHA `d66eede`, “Initial commit”, criado pela interface do GitHub) a 2026-08-11T18:09:00+05:30 (`afa353d`). Nenhum commit é da conta dona do repositório. `main` e `origin/HEAD` apontam para o SHA. Os 66 branches `origin/microfrontend_BE_nodejs…_FE_reactjs…_FE_angularjs…` não foram considerados. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | No SHA não há nenhuma unidade frontend; só um README de uma linha. |
| Q2 | No | Sem unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição no snapshot. |
| Q5 | No | Q1–Q4 são No: commit inicial vazio no branch padrão. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”: o termo aparece só no título do README, sem implementação.
- Equivale aos casos sem implementação no snapshot (perfis 011/064/068/073/077/101/111). O conteúdo dos outros branches fica fora, pela regra de snapshot = commit classificado.
- **Campos:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **Protocolo (snapshot):** o branch padrão parou no commit inicial, enquanto 66 branches têm implementações. Pelas mensagens, uma delas é composição por iframe com backend Node, React e Angular. O snapshot fixado não as captura.
- **Protocolo (busca):** os hits casam com o identificador do título ou com o nome; o plural não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
