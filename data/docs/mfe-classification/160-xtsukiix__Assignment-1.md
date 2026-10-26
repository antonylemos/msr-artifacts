---
schema: 1
id: 1167202255
full_name: xtsukiix/Assignment-1
url: https://github.com/xtsukiix/Assignment-1
commit: 2fd7fd33005534dbb6eec01eed00a624b900a516
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

# 160 — xtsukiix/Assignment-1

## Contexto

Site WordPress (Playground + SQLite) sobre coleção de cartas Pokémon, versionado em `wp-content/` e exportado como site estático para o GitHub Pages pela CLI `wp-pwa`. A infraestrutura vem do template `cd-wordpress` da organização `diy-pwa` (`README.md:1–11`; `package.json:2–10`; `.github/workflows/main.yml:28–32`; `LICENSE.txt:3`). O README herdado do template declara a intenção de ser “a consumer of microfrontends” e aponta um exemplo externo de PayPal (`README.md:13–15`). O site, porém, não carrega nenhum microfrontend. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:161` registra rank 160, ID 1167202255, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Para inspecionar o banco, o blob `wp-content/database/.ht.sqlite` foi copiado para um diretório temporário fora de `data/`, consultado com `sqlite3 -readonly` e apagado. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:161` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:25479` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:25486` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-02` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:59:46.702Z / 2026-10-08T15:41:09.211Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:11:00.482Z / 2026-10-08T15:49:05.274Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-02-01..2026-02-28`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem PHP, `fork: false`, tamanho 27.482;
- criação em 2026-02-26T03:31:16Z, push em 2026-02-27T09:03:52Z.

Sem descrição, o acerto vem de `README.md:13`, que traz as duas grafias: “The idea of this is as a consumer of microfrontends. There is an example microfrontend for [paypal standard](…)”.

O README vem do commit-raiz `8344199` (2026-02-25T22:31:18-05:00) e não foi alterado depois. É anterior às coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 765 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Na raiz há `README.md`, `package.json`, `LICENSE.txt`, `.github/`, `.devcontainer/`. O restante está em `wp-content/`: temas oficiais (`twentytwentyfive`, `twentytwentyfour`, `twentytwentythree`, `twentytwentyone`), o tema `wpico`, `akismet`, mu-plugins do Playground (`0-playground.php`, `sqlite-database-integration`, `one-click-child-theme`), traduções, uploads e o banco `wp-content/database/.ht.sqlite`. | contexto |
| Configuração / Build/deploy | `package.json:2–10`: só `wp-pwa: latest` e scripts `wp-pwa dev/build/preview`. `.github/workflows/main.yml:28–32`: `diy-pwa/npm-build-2-gh-pages@v1.11`. Não há configuração de host, remote, import map ou carregamento de outra unidade. | contrária |
| Conteúdo (banco) | Na cópia temporária do banco, `wp_options` tem `template`/`stylesheet` = `twentytwentyone` e `active_plugins` vazio. As páginas e posts publicados são “Home”, “About the Popup Kit” e cinco posts sobre cartas Pokémon, só com blocos de parágrafo e título nos trechos lidos. A busca de bytes no banco por `microfrontend`, `paypal`, `<script`, `customElements`, `<iframe`, `type="module"`, `github.io`, `wp:html` e `<x-` não retorna nada. | contrária |
| Documentação | `README.md:13–15`: intenção de consumir microfrontends e link para um exemplo externo, texto do template (`LICENSE.txt:3`, “Copyright (c) 2024 diy-pwa”). Nada no repositório configura esse consumo. | fraca |
| Código de terceiros | `wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:1–7` define `<x-year>`, mas é template do plugin de terceiros para gerar temas filhos, não usado pelo tema ativo (banco sem `<x-`). Os demais `micro.?front` só estão no README. | contexto |

## Autoria e histórico

Clone não raso; 3 commits em todos os refs, nenhum merge, todos de `xtsukiix`.
- **Raiz:** `8344199` (2026-02-25, “Initial commit”, committer GitHub) adiciona os 6 arquivos do template (`.devcontainer`, workflow, `.gitignore`, `LICENSE.txt`, `README.md`, `package.json`), compatível com geração a partir do template `cd-wordpress`.
- **SHA:** `2fd7fd3` (2026-02-27, “pokemon”) adiciona todo o `wp-content/`, exportado do WordPress Playground.
- **gh-pages:** `16ab0d7` (“deploy: 2fd7fd3…”) é a saída estática publicada e não foi considerada.

Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Um único site WordPress; nenhuma configuração ou conteúdo referencia unidade externa (busca no banco registrada). O exemplo PayPal só aparece como link no README. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | O site não carrega, monta nem roteia outra unidade. |
| Q4 | No | Nenhum mecanismo de composição configurado ou usado (`package.json:2–10`; banco sem scripts ou elementos externos). |
| Q5 | No | Q1–Q4 são No: site WordPress de exercício cujo README de template só declara a intenção. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- É o mesmo perfil dos rascunhos 119 e 125 (`cd-wordpress`/`wp-pwa`, Non-MFE), em que a intenção herdada do template não vira composição. Difere de 049 (`MFE-implemented`/review), cujo banco continha `<script type="module">` e um custom element servidos por outra origem. Aqui o banco não tem nenhum desses elementos.
- O texto vem do template, um caso de gerador como em 075/081/094/105, e o repositório é trabalho de disciplina (“Assignment”), como 023.
- `repo_type: example`, `ui_technologies: [wordpress]`, `build_tools: []` (a CLI `wp-pwa` encapsula o build), `frontend_units: 1`, `unit_organization: single-unit`, como em 119/125.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README de template que declara “consumer of microfrontends” replicado em vários repositórios de alunos. Só o conteúdo do banco distingue os que de fato embutem um microfrontend (049) dos que não embutem.
- **Protocolo (busca):** as duas grafias buscadas estão literalmente em `README.md:13`. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE e Q1–Q5 No; sem decisão aberta; `rev-list --objects --missing=print` no SHA não reporta objeto ausente. Os dados do banco SQLite (binário, sem linhas de texto) devem ser citados por localização lógica, por exemplo `wp-content/database/.ht.sqlite::wp_options[option_name=stylesheet].option_value` (`twentytwentyone`) e `...::wp_posts[ID=...].post_content`, sem inventar linha física; a busca negativa de bytes no banco (`microfrontend`, `paypal`, `<script`, `customElements`, `<iframe`, `type="module"`, `github.io`, `wp:html`, `<x-`) não retorna nada. O PHP/JS instalado (WordPress, temas e plugins de terceiros, `package.json` e workflow) é infraestrutura de CMS: a ausência é de código ou configuração própria de MFE e de unidade frontend adicional, não de código em geral. O conteúdo publicado são duas páginas ("Home", "About the Popup Kit") e cinco posts. O ramo `origin/gh-pages` (`16ab0d7`) é referência de publicação e não foi usado. A revisora citou um intervalo `.gitignore:1–6` e a frase "Não há código, manifesto ou configuração", que não constam desta anotação (o `.gitignore` tem cinco linhas); não houve alteração por esse motivo.
