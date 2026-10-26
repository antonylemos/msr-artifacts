---
schema: 1
id: 1256232082
full_name: tarikulwebx/Sanctum-Multi-Actor-API
url: https://github.com/tarikulwebx/Sanctum-Multi-Actor-API
commit: 7f41b77806f478bd4fc773e5fb0d4fcd987140d0
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 144 — tarikulwebx/Sanctum-Multi-Actor-API

## Contexto

Aplicação de referência Laravel 13 **somente API**, que demonstra autenticação Sanctum por bearer token para vários modelos de usuário (clientes e administradores) consumidos por SPAs externas (`README.md:1–3`; `composer.json:3–16`). O repositório não contém frontend. O acerto da busca `"single-spa"` vem da expressão “a single SPA backend” (`README.md:3`), não da biblioteca single-spa. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:145` registra rank 144, ID 1256232082, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:145` registra a estratégia `technology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:31085` e `data/discovery/mfe-round-002/candidates.csv:31093`, ambos com `technology` e elegibilidade `unknown`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2026-Q2` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-06-30` | 2026-10-07T23:35:29.231Z / 2026-10-08T16:21:38.477Z |

Metadados do hit:
- descrição “Reference Laravel API: multi-actor Sanctum auth for SPAs (bearer tokens + abilities).”;
- tópicos `api`, `authentication`, `laravel`, `laravel-sanctum`, `php`, `rest-api`, `sanctum` e `spa`;
- linguagem PHP, `fork: false`, criação em 2026-06-01T15:26:32Z, push em 2026-06-01T15:29:52Z.

A descrição tem “for SPAs”, mas não a sequência “single SPA”. Por eliminação, o acerto vem de `README.md:3`, “…in a single SPA backend using **Sanctum personal access tokens**…”. A grafia é “single SPA”, com espaço; a busca de frase do GitHub trata o hífen de `"single-spa"` como separador. Nenhum arquivo do SHA contém `single-spa` ou `singlespa`.

A última alteração do README é o próprio SHA, `7f41b77` (2026-06-01T21:29:45+06:00), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 74 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. A estrutura é Laravel (`app/`, `bootstrap/`, `config/`, `database/`, `routes/`, `public/index.php`, `tests/`, `composer.json`/`composer.lock`) mais uma coleção Postman em `docs/`. Não há `package.json`, configuração de bundler, `resources/` com views ou qualquer arquivo JS/TS/Vue/JSX. | contrária |
| Documentação (escopo) | `README.md:3`: “Laravel 13 API-only reference application”. `AGENTS.md:25`: “This is an API-only Laravel application. There is no Vite, npm, Blade UI, or frontend asset pipeline.” `README.md:33–36` e `README.md:425–431` tratam das SPAs de usuário e admin como clientes externos. `README.md:403` traz um snippet `fetch` ilustrativo para o cliente. | contrária |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `vite`, `webpack` e `package.json`. Os únicos acertos são `AGENTS.md:25` (negando Vite/npm), `README.md:403` (`VITE_API_URL` em snippet de cliente) e uma restrição de pacote Symfony em `composer.lock:3712`. Nenhum mecanismo de composição. | ausente |
| Código-fonte | `routes/api.php`, `routes/api/*.php` e `app/Http/Controllers/V1/*` são rotas e controllers HTTP do backend, sem camada de UI. | contexto |

## Autoria e histórico

Clone não raso; 9 commits, nenhum merge, todos de Md. Tarikul Islam `<tarikulwebx@gmail.com>` em 2026-06-01. A raiz `e45eb39` (“Laravel base”) é seguida de “API only setup” (`8a1547e`), autenticação, reset de senha, coleção Postman e README (`ac177fc`, `7f41b77`). O histórico registra um scaffold Laravel com `resources/css/app.css`, `resources/js/app.js` e `resources/views/welcome.blade.php` na raiz (`e45eb39`), removido em "API only setup" (`8a1547e`); não há sinal de composição MFE. Nenhum blob histórico foi lido. A travessia por `app/` e `routes/` com `git log --name-status` falha com `GIT_NO_LAZY_FETCH=1` ao pedir objetos promisor indisponíveis no clone parcial (sem rede), o que limita a afirmação de completude do histórico por esses caminhos, mas não a leitura do commit atual.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no repositório (inventário; `AGENTS.md:25`). As SPAs do README são clientes externos não referenciados por configuração de composição. |
| Q2 | No | Sem unidades frontend, não há entradas ou builds a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz de frontend. |
| Q4 | No | Nenhum mecanismo de composição configurado (busca registrada). |
| Q5 | No | Q1–Q4 são No: backend API-only captado pela expressão “single SPA backend”. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. O repositório não tem implementação frontend; o acerto é lexical.
- Mesmo falso positivo lexical da consulta `"single-spa"` observado em 131 (“Single SPA”). Aqui nem há SPA no repositório, só a API que a atende.
- `frontend_units: 0` e `unit_organization: none`, como nos perfis sem frontend (011/064/068/073/077/101/111), embora este seja um projeto de software real (backend).
- `repo_type: example`: “reference application” (`README.md:3`) com pacote `experiments/sanctum-multi-actor-api` (`composer.json:3`). `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** segundo caso em que `"single-spa"` casa a expressão “single SPA”. Junto com 131, indica que a consulta de tecnologia captura texto comum sobre SPAs.
- **Protocolo (elegibilidade):** elegibilidade `unknown` nas duas rodadas, sem que a razão tenha sido examinada aqui. Filtros de linguagem (PHP) ou de ausência de frontend eliminariam o candidato.
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE e Q1–Q5 No (API Laravel/Sanctum, sem `package.json` nem fontes de UI no snapshot); sem decisão aberta. Correção adotada: o histórico não está livre de frontend, pois a raiz traz um scaffold convencional removido em `8a1547e` (verificado). Ressalva de reprodutibilidade: com lazy fetch desativado, a travessia de `app/` e `routes/` encontra objetos promisor ausentes.
