---
schema: 1
id: 1151891106
full_name: samriddhimakasare25/UX221Assignment-1
url: https://github.com/samriddhimakasare25/UX221Assignment-1
commit: 0b03b8e0947f98f15c92f2886582105595dabe14
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [wordpress]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 375 — samriddhimakasare25/UX221Assignment-1

## Contexto

Trabalho de disciplina feito a partir do template `cd-wordpress` (`README.md:1–2`; `LICENSE.txt:3`, “Copyright (c) 2024 diy-pwa”): um site WordPress do WordPress Playground (banco SQLite, temas e plugins em `wp-content/`) publicado por `wp-pwa`. O texto “consumer of microfrontends” vem do README do template (`README.md:13`); o site não carrega nenhuma unidade externa. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:376` registra rank 375, ID 1151891106, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. O banco foi lido numa cópia temporária fora do clone (`git show` para arquivo temporário, aberto com `sqlite3 -readonly` e apagado em seguida). Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:376` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:24541` (`terminology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:24547` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-02` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T19:59:46.702Z / 2026-10-08T15:41:09.211Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-02` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T22:11:00.482Z / 2026-10-08T15:49:05.274Z |

Metadados do hit: descrição nula, sem tópicos, linguagem PHP, licença MIT, `fork: false`, tamanho 25932, criação em 2026-02-07T03:25:21Z, push em 2026-02-07T04:04:31Z.

As duas grafias aparecem literalmente em `README.md:13`: “The idea of this is as a consumer of microfrontends. There is an example microfrontend for [paypal standard](https://github.com/diy-pwa/paypal-microfrontend) here.” O README vem do commit-raiz `68b68e0` (2026-02-06, criação a partir do template) e não foi alterado depois; é anterior às coletas de 7 e 8 de outubro de 2026 e não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 588 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Na raiz, os 6 arquivos do template (`README.md`, `package.json`, `LICENSE.txt`, `.github/`, `.devcontainer/`, `.gitignore`); o restante em `wp-content/`: temas `twentytwentyfive`, `twentytwentyfour`, `twentytwentythree` e `wpico`, plugins `akismet`, `hello.php` e `list-category-posts`, mu-plugins do Playground, uploads e o banco `wp-content/database/.ht.sqlite`. | contexto |
| Configuração / Build/deploy | `package.json:2–10`: só `wp-pwa: latest` e scripts `wp-pwa dev/build/preview`; `.github/workflows/main.yml:28–32`: publicação por `diy-pwa/npm-build-2-gh-pages@v1.11`. Nenhuma configuração de host, remote, import map ou carregamento de outra unidade; busca por `wp_enqueue_script` nos temas não oficiais não encontra nada. | contrária |
| Conteúdo (banco) | Na cópia temporária, `wp_options` tem `template`/`stylesheet` = `twentytwentyfive`, `active_plugins` = `list-category-posts` e `blogname` “Assignment 1”. Publicados: cinco páginas (“HomePage”, “About Page”, “CONTACT PAGE”, “First-Time Hackers”, “Event Organizers & Clubs”), cinco posts sobre hackathons e eventos estudantis, uma navegação e estilos globais. A busca de bytes no banco por `microfrontend`, `paypal`, `<script`, `customElements`, `<iframe`, `type="module"`, `github.io`, `wp:html`, `<x-` e `wp:embed` não retorna nada. | contrária |
| Código de terceiros | `wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:1–7` define `<x-year>`, template do plugin de terceiros para gerar temas filhos, não usado (banco sem `<x-`). | contexto |
| Documentação | `README.md:13–15`: intenção do template de consumir microfrontends e link para exemplo externo; nada no repositório configura esse consumo. | fraca |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 3 commits (3 em todos os refs), nenhum merge, todos de “Samriddhi Makasare” (`…+samriddhimakasare25@users.noreply.github.com`): a raiz `68b68e0` (2026-02-06, “Initial commit”, committer GitHub, os 6 arquivos do template), `a166a73` (2026-02-07, “changes”, 582 arquivos do site) e o SHA `0b03b8e` (2026-02-07, “changes”, só o banco). `git rev-list --objects $SHA --missing=print` identifica 1 objeto histórico ausente; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Um único site WordPress; nenhuma configuração de composição referencia outras unidades (`package.json:2–10`; busca no banco e nos temas). |
| Q2 | No | Não há duas unidades a avaliar. |
| Q3 | No | Não há host que carregue, monte ou roteie outra unidade; o conteúdo é de páginas e posts do próprio site. |
| Q4 | No | Nenhum mecanismo de composição; o consumo de microfrontends só aparece como texto do template (`README.md:13`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Mesmo perfil dos rascunhos 119/125/160/206/224 (`cd-wordpress`/`wp-pwa` com site próprio, Non-MFE), em que a intenção herdada do template não vira composição. Difere de 049 (`MFE-implemented`/review) e 260 (`Uncertain`/review), que carregam módulos de outra origem; aqui não há `<script type="module">`, enqueue externo nem custom element no conteúdo. Difere de 079/117/326 (template sem site, `frontend_units: 0`).
- O texto vem do template, caso de gerador como em 075/081/094/105, e o repositório é trabalho de disciplina (“Assignment 1”), como 023.
- `repo_type: example`, `ui_technologies: [wordpress]`, `build_tools: []` (a CLI `wp-pwa` encapsula o build), `frontend_units: 1`, `unit_organization: single-unit`, como em 160/119/125.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** o README do template `cd-wordpress` gera hits terminológicos em todos os sites de disciplina criados a partir dele.
