---
schema: 1
id: 1327089363
full_name: ASR-jadespear/ASR-jadespear.github.io
url: https://github.com/ASR-jadespear/ASR-jadespear.github.io
commit: 26048df52dca957284bc2dc51a51ae4a7938334c
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 268 — ASR-jadespear/ASR-jadespear.github.io

## Contexto

Portfólio pessoal estático, em uma única página, publicado no GitHub Pages: `index.html`, `css/style.css`, `js/script.js` e imagens. O README declara construção “without bulky frontend frameworks or UI libraries” (`README.md:9`). Os “micro-apps” citados no README são dois widgets interativos da própria página, um piano Web Audio e uma tela de mandala (`README.md:124–128`), implementados no mesmo `js/script.js` (`README.md:206`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:269` registra rank 268, ID 1327089363, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:269` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:34972` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:34978` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um único hit em cada rodada. Ele vem do endpoint `repositories`, consulta `broader-micro-apps` (`"micro apps" frontend in:name,description,readme`), subconsulta `…#created:2026-Q3`, com `path` vazio. As coletas são 2026-10-07T23:51:14.505Z (001) e 2026-10-08T16:27:24.408Z (002). A consulta efetiva acrescenta `pushed:>=2025-04-01 created:2026-07-01..2026-09-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem HTML, `fork: false`, tamanho 74.036;
- criação em 2026-08-07T19:34:02Z, push em 2026-09-03T12:12:14Z.

Grafias no README:
- “micro-apps”, com hífen, em `README.md:126` (“Two interactive creative micro-apps:”); a forma literal “micro apps” não aparece;
- “frontend” em `README.md:9` (“without bulky frontend frameworks or UI libraries”).

O hit da frase entre aspas depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é o próprio SHA (2026-09-03), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 25 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São `README.md`, `index.html`, `css/style.css`, `js/script.js`, 6 imagens em `assets/images/` e 15 capturas WebP em `assets/game screenshots/`. Não há `package.json`, build nem framework. | contrária |
| Carga de scripts | `index.html:1119`: único `<script>`, local (`js/script.js?v=4.0`). A busca no SHA por `<iframe`, `type="module"`, `import(`, `customElements`, `federation` e `single-spa` em `index.html` e `js/script.js` não retorna nada. | contrária |
| Documentação | `README.md:124–130`: os “micro-apps” são widgets da mesma página. `README.md:197–218`: estrutura de arquivos de site único. | contrária |

## Autoria e histórico

Clone não raso; 16 commits lineares, nenhum merge, de 2026-08-08 (`ef88ef5`, “Initial commit”, autor `ASR_jadespear`) a 2026-09-03 (SHA `26048df`). Os outros 15 têm autor `ASR`; 14 deles se chamam “Add portfolio website structure”. Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única página estática; os “micro-apps” são widgets do mesmo script, não unidades frontend separadas. |
| Q2 | No | Não há unidades separadas: um `index.html` e um `js/script.js`. |
| Q3 | No | Não há host, shell ou configuração raiz de composição. |
| Q4 | No | Nenhum mecanismo de composição: um script local, sem iframe, módulo remoto ou import map (`index.html:1119`). |
| Q5 | No | Q1–Q4 são No: portfólio pessoal estático. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”, em versão mínima: um site estático de página única.
- Como os perfis 011/064/068/073/077/101/111, é página pessoal sem implementação de micro-frontends. O acerto vem da consulta ampla `"micro apps" frontend`, casada com “micro-apps” e “frontend” em contextos não relacionados.
- **Campos:** `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: other`, `approaches: []`, `ui_technologies: []` (HTML/CSS/JS sem framework), `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “micro-apps” usado para widgets de página, combinado com “frontend frameworks” noutra frase, casa a consulta ampla.
- **Protocolo (busca):** a frase “micro apps” não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
