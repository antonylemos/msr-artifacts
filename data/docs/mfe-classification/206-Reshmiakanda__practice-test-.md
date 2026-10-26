---
schema: 1
id: 1153999055
full_name: Reshmiakanda/practice-test-
url: https://github.com/Reshmiakanda/practice-test-
commit: fdfbe602fb6f8f9be30b348e463040653ac9c4c3
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

# 206 — Reshmiakanda/practice-test-

## Contexto

Site WordPress (Playground + SQLite) de prática, “practice test” (`blogname` no banco), com páginas “My Birthday”, “ways people celebrate” e “contact”. Está versionado em `wp-content/` e é exportado como site estático para o GitHub Pages pela CLI `wp-pwa`. A infraestrutura vem do template `cd-wordpress` da organização `diy-pwa` (`README.md:1–11`; `package.json:2–10`; `.github/workflows/main.yml:28–32`; `LICENSE.txt:3`). O README herdado do template declara a intenção de ser “a consumer of microfrontends” e aponta um exemplo externo de PayPal (`README.md:13–15`). O site não carrega nenhum microfrontend. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:207` registra rank 206, ID 1153999055, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Para inspecionar o banco, o blob `wp-content/database/.ht.sqlite` foi copiado para um diretório temporário fora de `data/`, consultado com `sqlite3 -readonly` e apagado. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:207` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:24669` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:24675` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-02` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:47:08.329Z / 2026-10-08T15:41:04.057Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:10:51.084Z / 2026-10-08T15:49:02.020Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-02-01..2026-02-28`.

Metadados do hit:
- descrição “reshmi101”, sem tópicos, linguagem PHP, `fork: false`, tamanho 22.981;
- criação em 2026-02-09T22:50:20Z, push em 2026-02-09T23:02:45Z.

A descrição não contém os termos. O acerto vem de `README.md:13`, que traz as duas grafias: “The idea of this is as a consumer of microfrontends. There is an example microfrontend for [paypal standard](…)”.

O README vem do commit-raiz `80c01fc` (2026-02-09) e não foi alterado depois. É anterior às coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 575 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Na raiz há 6 arquivos (`README.md`, `package.json`, `LICENSE.txt`, `.gitignore`, `.github/workflows/main.yml`, `.devcontainer/devcontainer.json`). Os outros 569 estão em `wp-content/`: temas `twentytwentyfive`, `twentytwentyfour`, `twentytwentythree` e `wpico`, `akismet`, mu-plugins do Playground (`sqlite-database-integration`, `one-click-child-theme`), traduções `en_CA`, uploads, `debug.log` e o banco `wp-content/database/.ht.sqlite`. | contexto |
| Configuração / Build/deploy | `package.json:2–10`: só `wp-pwa: latest` e scripts `wp-pwa dev/build/preview`. `.github/workflows/main.yml:28–32`: `diy-pwa/npm-build-2-gh-pages@v1.11`. Não há configuração de host, remote, import map ou carregamento de outra unidade. | contrária |
| Conteúdo (banco) | Na cópia temporária do banco, `wp_options` tem `template`/`stylesheet` = `twentytwentyfive`, `active_plugins` = `a:0:{}` e `siteurl` `http://localhost:8000`. Publicados: páginas “My Birthday” (ID 6), “ways people celebrate” (10) e “contact” (12), o post “ways people celebrate” (14) e uma navegação. A busca de bytes no banco por `microfrontend`, `paypal`, `<script`, `customElements`, `type="module"`, `github.io`, `wp:html` e `<x-` não retorna nada. `<iframe` aparece 2 vezes, na página “contact” e na sua revisão: um embed do Google Maps (`https://www.google.com/maps/embed?…`). | contrária |
| Documentação | `README.md:13–15`: intenção de consumir microfrontends e link para um exemplo externo, texto do template (`LICENSE.txt:3`, “Copyright (c) 2024 diy-pwa”). Nada no repositório configura esse consumo. | fraca |
| Busca | `git grep -i` no SHA (exceto o banco) por `micro.?front`: só `README.md:13`. `customElements` só aparece nos templates do mu-plugin de terceiros `one-click-child-theme`, não usados pelo tema ativo (banco sem `<x-`). | ausente |

## Autoria e histórico

Clone não raso; 3 commits em todos os refs, nenhum merge, todos de Reshmiakanda.
- **Raiz:** `80c01fc` (2026-02-09T17:50:22-05:00, “Initial commit”, autor `akandareshmi@gmail.com`, committer GitHub) adiciona os 6 arquivos do template, compatível com geração a partir de `cd-wordpress`.
- **SHA:** `fdfbe60` (2026-02-09T23:02:04Z, “save everything”) adiciona todo o `wp-content/`, exportado do WordPress Playground; `wp-content/debug.log:1` registra o caminho `/workspaces/practice-test-/.wordpress/`, de um Codespace.
- **gh-pages:** `c3e8a2e` (“deploy: fdfbe60…”, noreply) é a saída estática publicada e não foi considerada.

Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Um único site WordPress; nenhuma configuração ou conteúdo referencia unidade frontend externa (busca no banco registrada). O exemplo PayPal só aparece como link no README. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | O site não carrega, monta nem roteia outra unidade. O único iframe é um mapa do Google embutido num conteúdo de página. |
| Q4 | No | Nenhum mecanismo de composição configurado ou usado (`package.json:2–10`; banco sem scripts ou elementos externos). |
| Q5 | No | Q1–Q4 são No: site WordPress de prática cujo README de template só declara a intenção. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- É o mesmo perfil do rascunho 160 e de 119/125 (`cd-wordpress`/`wp-pwa`, Non-MFE), em que a intenção herdada do template não vira composição. Difere de 049 (`MFE-implemented`/review), cujo banco continha `<script type="module">` e um custom element servidos por outra origem.
- O embed do Google Maps não é unidade frontend do estudo, só conteúdo incorporado de um serviço de terceiros. Por isso não depende da decisão aberta sobre composição por iframe.
- O texto vem do template, um caso de gerador como em 075/081/094/105.
- `repo_type: example`, `ui_technologies: [wordpress]`, `build_tools: []` (a CLI `wp-pwa` encapsula o build), `frontend_units: 1`, `unit_organization: single-unit`, como em 160/119/125.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** mais um README do template `cd-wordpress` com “consumer of microfrontends” em repositório de aluno.
- **Protocolo (busca):** as duas grafias buscadas estão literalmente em `README.md:13`. A elegibilidade muda de `unknown` (001) para `pass` (002).
