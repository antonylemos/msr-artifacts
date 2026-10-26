---
schema: 1
id: 1060508445
full_name: ShubhamSahaniNitkkr/yt300-byshubhamsunny
url: https://github.com/ShubhamSahaniNitkkr/yt300-byshubhamsunny
commit: 7d901fc5b71b1aad992d3ebed78c4e7efb9eaa68
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 157 — ShubhamSahaniNitkkr/yt300-byshubhamsunny

## Contexto

Repositório de um canal de tutoriais de JavaScript. O README (537 linhas) é um roteiro de “300 projects”, quase todos “Coming Soon” (`README.md:1–25`). O snapshot contém:
- o único projeto pronto, `Google__Sign-In__Signup/`, um scaffold Vite + React;
- 28 arquivos `module_*.js` de duas linhas cada, que só exportam uma função que devolve uma constante.

Micro-frontends e Module Federation aparecem só como itens futuros do roteiro (`README.md:451`, `456`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:158` registra rank 157, ID 1060508445, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:158` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:19013` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:19019` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-09` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:26:15.828Z / 2026-10-08T15:56:00.250Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:57:04.160Z / 2026-10-08T16:06:48.173Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:20:19.129Z / 2026-10-08T16:15:54.936Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-09-01..2025-09-30`.

Metadados do hit:
- descrição “YT300-ByShubhamSunny: 300+ Javascript solutions made super simple! …”, sem os termos;
- sem tópicos, linguagem JavaScript, `fork: false`, tamanho 49;
- criação em 2025-09-20T03:43:31Z, push em 2026-06-21T09:44:11Z;
- homepage em GitHub Pages pessoal.

Grafias no README:
- “Micro-frontend”: `README.md:451` (“347. 🧩 Micro-frontend architecture *(Coming Soon)*”);
- “Module federation” e “micro-frontends”: `README.md:456` (“352. 🏗️ Module federation for micro-frontends *(Coming Soon)*”).

A busca de frase trata o hífen como separador. A última alteração do README é `94beea3` (2025-10-05), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 43 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Na raiz há `.gitignore`, `README.md` e 28 `module_*.js`; em `Google__Sign-In__Signup/` há 13 arquivos de um projeto Vite (`package.json`, `vite.config.js`, `index.html`, `src/`). | contexto |
| Código-fonte (projeto) | `Google__Sign-In__Signup/src/main.jsx:6–10` monta `App`. `src/App.jsx` começa com o template padrão do Vite (logos, contador). `Google__Sign-In__Signup/vite.config.js:5–7`: só `react()`. `Google__Sign-In__Signup/package.json:6–25`: Vite, `react`/`react-dom`, sem dependência MFE. | contrária |
| Código-fonte (arquivos `module_*`) | Exemplos `module_1096_64.js:1–2` (“// Improve fault tolerance” / `export function update64() { return 64; }`) e `module_32580_649.js:1–2`. Os arquivos não são importados por nada e não pertencem a projeto algum. | contexto |
| Documentação | `README.md:16–25` e seguintes: roteiro de 300 projetos com links de vídeo; os itens 347 e 352 (`README.md:451`, `456`) estão marcados “Coming Soon”. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA (exceto lockfiles e README) por `federation`, `single-spa`, `remoteEntry`, `customElements`, `iframe` e `../../`: nenhum resultado. | ausente |

## Autoria e histórico

Clone não raso; 34 commits, nenhum merge, todos do titular `<shubhamsahaninitkkr@gmail.com>`, sob os nomes “ShubhamSahaniNitkkr” (30) e “Shubham Sunny” (4, via GitHub).
- **Início:** a raiz é `ab4e756` (2025-09-20, “Project.md Addition”); `7272026` adiciona o projeto Google Sign-In, e os 4 commits seguintes até `94beea3` (2025-10-05) alteram o README.
- **Commits automáticos:** acima de `94beea3` na topologia há 28 commits com mensagens padronizadas (“Improve fault tolerance - <data>”, “Add feature - <data>”, “Optimize database queries - <data>”), cada um acrescentando um `module_*.js` (por exemplo, o SHA só adiciona `module_18790_1819.js`).
- **Datas incoerentes:** esses commits têm datas de autor e committer de 2025-06-13 a 2026-06-10. Várias são anteriores à criação do repositório (2025-09-20) e ao commit pai `94beea3`. As datas não refletem a ordem real.

Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects --missing=print` reporta cinco objetos promisor ausentes no histórico alcançável; os blobs do snapshot foram lidos localmente, sem rede, e o conteúdo ausente não é inferido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend (`Google__Sign-In__Signup/`); os `module_*.js` não são unidades. Nenhuma configuração de composição. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades. |
| Q4 | No | Nenhum mecanismo de composição (busca registrada). |
| Q5 | No | Q1–Q4 são No: roteiro de tutoriais que só menciona micro-frontends e Module Federation como itens futuros. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Os termos são conteúdo planejado, como em 023. Há um projeto frontend real (scaffold do tutorial de login), por isso `frontend_units: 1` e `single-unit`, e não 0 como nos perfis sem implementação.
- `repo_type: other`: coleção de tutoriais com um projeto inicial, sem caráter de exemplo de MFE, template ou produto. `ui_technologies: [react]` e `build_tools: [vite]`, do único projeto.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README em forma de roteiro de conteúdo com itens “Micro-frontend architecture” e “Module federation for micro-frontends” ainda não produzidos. Ele casa consultas terminológicas e de tecnologia.
- **Protocolo (busca/elegibilidade):** commits automáticos de arquivos triviais mantêm o `pushed_at` recente e satisfazem `pushed:>=2025-04-01`. A elegibilidade muda de `unknown` (001) para `pass` (002). As datas de commit desses arquivos não são confiáveis para análise histórica.
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE e Q1–Q5 No; sem decisão aberta. Correção adotada: a frase "não houve objeto ausente" foi ajustada (cinco objetos promisor ausentes, verificado). Proveniência: os dados de hits não identificam isoladamente o campo causador, e a forma hifenizada do README pode ser normalizada pela busca.
