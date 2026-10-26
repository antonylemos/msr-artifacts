---
schema: 1
id: 1186686612
full_name: Nitinkumar0000072/Assignment-2
url: https://github.com/Nitinkumar0000072/Assignment-2
commit: 577efe1edf0423ed6c75c82939115147c9e7c2c3
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

# 224 — Nitinkumar0000072/Assignment-2

## Contexto

Site WordPress (Playground + SQLite) de trabalho de disciplina, versionado em `wp-content/` e exportado como site estático para o GitHub Pages pela CLI `wp-pwa`. A infraestrutura vem do template `cd-wordpress` da organização `diy-pwa` (`README.md:1–15`; `package.json:2–10`; `.github/workflows/main.yml:28–32`; `LICENSE.txt:3`). O README herdado do template declara a intenção de ser “a consumer of microfrontends” e aponta um exemplo externo de PayPal (`README.md:13–15`). O site não carrega nenhum microfrontend. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:225` registra rank 224, ID 1186686612, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Para inspecionar o banco, o blob `wp-content/database/.ht.sqlite` foi copiado para um diretório temporário fora de `data/`, consultado com `sqlite3 -readonly` e apagado. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:225` registra a estratégia `terminology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:26801` e `data/discovery/mfe-round-002/candidates.csv:26808`, ambos com `unknown`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-03` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T20:15:07.163Z / 2026-10-08T15:41:30.708Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:11:29.411Z / 2026-10-08T15:49:16.695Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-03-01..2026-03-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem PHP, `fork: false`, tamanho 24.875;
- criação em 2026-03-19T22:16:06Z, push em 2026-03-24T00:43:24Z.

Sem descrição, o acerto vem de `README.md:13`, que traz as duas grafias: “The idea of this is as a consumer of microfrontends. There is an example microfrontend for [paypal standard](…)”.

A última alteração do README é o próprio SHA, `577efe1` (2026-03-19), que só acrescenta `# Assignment-2` (`README.md:16`). Isso é anterior às coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1.175 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Na raiz há 6 arquivos do template (`README.md`, `package.json`, `LICENSE.txt`, `.gitignore`, `.github/workflows/main.yml`, `.devcontainer/devcontainer.json`). Os outros 1.169 estão em `wp-content/`: temas `twentytwentyfive`, `twentytwentyfour`, `twentytwentythree` e `wpico`; plugins `akismet`, `ecommerce-product-catalog` e `tiny-gtag-js-analytics`; mu-plugins do Playground; uploads; e o banco `wp-content/database/.ht.sqlite`. | contexto |
| Configuração / Build/deploy | `package.json:2–10`: só `wp-pwa: latest` e scripts `wp-pwa dev/build/preview`. `.github/workflows/main.yml:28–32`: `diy-pwa/npm-build-2-gh-pages@v1.11`. Não há configuração de host, remote, import map ou carregamento de outra unidade. | contrária |
| Conteúdo (banco) | Na cópia temporária do banco, `wp_options` tem `template`/`stylesheet` = `twentytwentyfour`, `active_plugins` = `a:0:{}`, `blogname` “assignment 3” e `siteurl` `http://localhost:8000`. Publicados: as páginas “Sample Page”, “About / Experience” e “Why Drivers Choose Velaré”, o post “Hello world!”, uma navegação e um template “Blog Home”. A busca de bytes no banco por `microfrontend`, `paypal`, `<script`, `customElements`, `type="module"`, `github.io`, `wp:html` e `<x-` não retorna nada. `<iframe` aparece 2 vezes, na página “Why Drivers Choose Velaré” (ID 19) e na sua revisão: um embed de vídeo do YouTube. | contrária |
| Documentação | `README.md:13–15`: intenção de consumir microfrontends e link para um exemplo externo, texto do template (`LICENSE.txt:3`, “Copyright (c) 2024 diy-pwa”). Nada no repositório configura esse consumo. | fraca |
| Busca | `git grep -i` no SHA (exceto o banco) por `micro.?front`: só `README.md:13`. | ausente |

## Autoria e histórico

Clone não raso; 3 commits em todos os refs, nenhum merge.
- **Raiz:** `9c37724` (2026-03-19, “Initial commit”, Arsh Khandpur `<arshkhandpur@gmail.com>`) já adiciona os 1.175 arquivos (template e `wp-content/`).
- **SHA:** `577efe1` (2026-03-19, “first commit”, mesmo autor) só altera o README.
- **gh-pages:** `3256488` (“deploy: 577efe1…”, do titular `Nitinkumar0000072`, noreply) é a saída estática publicada e não foi considerada.

O autor dos commits de conteúdo é diferente do titular da conta. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Um único site WordPress; nenhuma configuração ou conteúdo referencia unidade frontend externa (busca no banco registrada). O exemplo PayPal só aparece como link no README. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | O site não carrega, monta nem roteia outra unidade. O único iframe é um vídeo do YouTube embutido no conteúdo de uma página. |
| Q4 | No | Nenhum mecanismo de composição configurado ou usado (`package.json:2–10`; banco sem scripts ou elementos externos). |
| Q5 | No | Q1–Q4 são No: site WordPress de exercício cujo README de template só declara a intenção. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- É o mesmo perfil dos rascunhos 160 e 206 e de 119/125 (`cd-wordpress`/`wp-pwa`, Non-MFE). Difere de 049 (`MFE-implemented`/review), cujo banco continha `<script type="module">` e um custom element servidos por outra origem.
- O embed do YouTube é conteúdo de terceiros, não unidade frontend do estudo, por isso não depende da decisão aberta sobre composição por iframe. O texto do README vem do template, um caso de gerador como 075/081/094/105.
- `repo_type: example`, `ui_technologies: [wordpress]`, `build_tools: []` (a CLI `wp-pwa` encapsula o build), `frontend_units: 1`, `unit_organization: single-unit`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** mais um README do template `cd-wordpress` com “consumer of microfrontends” em repositório de aluno.
- **Protocolo (busca):** as duas grafias buscadas estão literalmente em `README.md:13`. Elegibilidade `unknown` nas duas rodadas; o repositório entrou na amostra com `unknown`.
