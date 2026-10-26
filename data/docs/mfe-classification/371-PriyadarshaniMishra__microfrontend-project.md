---
schema: 1
id: 1118681120
full_name: PriyadarshaniMishra/microfrontend-project
url: https://github.com/PriyadarshaniMishra/microfrontend-project
commit: 7a4338bf7e5edc18986fe18ce77654abde80743a
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 371 — PriyadarshaniMishra/microfrontend-project

## Contexto

Projeto Create React App recém-criado. O `App.js` ainda é o do template (`src/App.js:1–25`), e há um componente `Login` (`src/Pages/login.js`) que não é importado por `App.js` nem por `index.js`. O README é o padrão do CRA (`README.md:1–3`). A sequência “microfrontend” só aparece no nome do pacote (`package.json:2`, `"react-microfrontend-project"`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:372` registra rank 371, ID 1118681120, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:372` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:22321` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:22327` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um único hit em cada rodada. Ele vem do endpoint `repositories`, consulta `terminology-microfrontend-repositories` (`microfrontend in:name,description,readme`), subconsulta `…#created:2025-12`, com `path` vazio. As coletas são 2026-10-07T19:26:02.279Z (001) e 2026-10-08T15:40:23.911Z (002). A consulta efetiva acrescenta `pushed:>=2025-04-01 created:2025-12-01..2025-12-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 310;
- criação em 2025-12-18T05:57:00Z, push em 2025-12-18T07:11:13Z.

O README (padrão do CRA) não contém a grafia, e a descrição é nula. A sequência só aparece em `package.json:2` e `package-lock.json`, fora dos campos buscados, e no nome do repositório. A origem do hit no processamento da busca do GitHub não está registrada. A última alteração do README é `deb46fd` (2025-12-18), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 19 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. É a estrutura padrão do CRA (`public/`, `src/`, `package.json`) mais `src/Pages/login.js`. | contrária |
| Código | `src/App.js:1–25`: página padrão do CRA. `package.json:12–19`: `react-scripts`, sem federação. `src/Pages/login.js`: componente de formulário não usado. | contrária |
| Busca | `git grep -i micro.?front` no SHA: só `package.json:2` e `package-lock.json:2`, `8`. | ausente |

## Autoria e histórico

Clone não raso; 2 commits lineares de “Priyanka”, em 2025-12-18: `deb46fd` (“Initialize project using Create React App”) e o SHA `7a4338b` (“Initial React project setup”). Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação CRA no estado inicial. |
| Q2 | No | Sem duas unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição. |
| Q5 | No | Q1–Q4 são No: projeto CRA inicial. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”, num estágio inicial.
- Como no rascunho 212 (acerto só pelo nome), o termo aparece só no nome do pacote, sem implementação.
- **Campos:** `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, `ui_technologies: [react]`, `build_tools: []` (CRA não ejetado, como em 087), `repo_type: example`.
- Não há decisão aberta.

## Notas para análise

- **Protocolo (busca):** nenhuma grafia nos campos buscados além do nome do repositório. A elegibilidade muda de `unknown` (001) para `pass` (002).
