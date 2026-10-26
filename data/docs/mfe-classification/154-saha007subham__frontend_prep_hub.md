---
schema: 1
id: 1280642191
full_name: saha007subham/frontend_prep_hub
url: https://github.com/saha007subham/frontend_prep_hub
commit: 3f598f25895946f13a91fc0acd5a4cb70d8cfd7e
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

# 154 — saha007subham/frontend_prep_hub

## Contexto

“Frontend Prep Hub”: landing page em React + Vite + Tailwind + Three.js de uma futura plataforma de estudo para engenheiros frontend (`README.md:3–7`, `24–28`). O snapshot implementa só a página inicial (`src/App.jsx:6–17`; `README.md:282–287`, Fase 1). “Micro Frontends” aparece apenas como tópico de estudo listado no README e nos dados mock da página. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:155` registra rank 154, ID 1280642191, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:155` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:32488` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:32496` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-06` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:38:09.942Z / 2026-10-08T16:00:33.998Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:07:40.889Z / 2026-10-08T16:09:41.336Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-06-01..2026-06-30`.

Metadados do hit:
- descrição “Frontend Prep Hub is a modern learning platform for frontend engineers to master JavaScript, React, Frontend System Design, DSA, Machine Coding, and interview preparation—all in one place.”, sem os termos;
- sem tópicos, linguagem JavaScript, `fork: false`, tamanho 72;
- criação em 2026-06-25T19:44:00Z, push em 2026-06-28T13:44:48Z.

O acerto vem de `README.md:99`, “- Micro Frontends”, item da lista de tópicos de “Frontend System Design”. A forma singular “micro frontend” não aparece no README nem na descrição; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA, `3f598f2` (2026-06-28), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 37 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto Vite na raiz (`package.json`, `vite.config.js`, `index.html`, `src/` com `pages/LandingPage.jsx`, seções, UI, contexto de tema e `data/mockData.js`). As pastas `routes/`, `styles/` e `utils/` da estrutura do README (`README.md:187–214`) não existem. | contrária |
| Código-fonte | `src/main.jsx:6–10` monta `App`. `src/App.jsx:6–17` tem um `BrowserRouter` com uma só rota para `LandingPage`. Os imports são internos (`./context/ThemeContext`, `./pages/LandingPage`). | contrária |
| Configuração / Build | `vite.config.js:6–11`: só `react()` e `tailwindcss()`. `package.json:6–31`: `vite`/`vite build`, sem plugin de federação ou dependência MFE. | contrária |
| Conteúdo | `README.md:82–100`: “Micro Frontends” como item da lista de tópicos de estudo. `src/data/mockData.js:114`, `215–216`: “microfrontends”, “microfrontend setups” e “Micro-Frontends” em textos de cartões da landing page. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA (exceto `package-lock.json`) por `micro.?front`, `federation`, `single-spa`, `remoteEntry`, `customElements`, `iframe` e `../../../`: só os textos acima. | ausente |

## Autoria e histórico

Clone não raso; 4 commits, nenhum merge, todos de Subham Saha. Três são de `<saha007subham@gmail.com>` e o SHA, editado pela interface web, é de `<84348407+saha007subham@users.noreply.github.com>`. A raiz `1cb1fe4` (2026-06-26, “feat: initialize Frontend Prep Hub”) adiciona todo o código. `cc10941`, `3f924b5` e o SHA `3f598f2` só alteram o README (`git log --no-renames --name-status`). Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend; nenhuma configuração de composição referencia outras unidades. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades; `App.jsx` só roteia a própria landing page. |
| Q4 | No | Nenhum mecanismo de composição configurado (`vite.config.js:6–11`; busca registrada). |
| Q5 | No | Q1–Q4 são No: SPA convencional que só cita micro-frontends como conteúdo de estudo. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths” e a “repositories mentioning micro-frontends without implementing them”.
- O termo é conteúdo, como em 023, aqui em lista de tópicos de uma plataforma de estudo. Diferentemente dos perfis sem implementação (011/064/068/073/077/101/111), há uma aplicação real, por isso `frontend_units: 1` e `single-unit`.
- `repo_type: other`: landing page de produto pessoal em fase inicial, sem caráter de exemplo de MFE, template ou biblioteca. `production` também seria defensável. `ui_technologies: [react]`, `build_tools: [vite]`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** item de lista de tópicos (“Micro Frontends”) em README de plataforma de estudo basta para a consulta terminológica de frase.
- **Protocolo (busca):** o hit singular `"micro frontend"` não tem grafia correspondente. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância com Non-MFE, Q1–Q5 No e uma unidade (src/Vite), com `draft`; o hit veio de conteúdo educacional do README, sem configuração nem implementação MFE. O parecer apontou uma divergência sobre uma seção de revisão conjunta que citaria `vue/` e uma primeira contagem de quatro alvos; verificado que esse texto não consta desta anotação nem há `vue/` na árvore do commit (a menção corresponde a outra anotação, a 080), de modo que não houve alteração. A revisora confirmou ainda que parte da estrutura listada no README (linhas 187–214: `vue/`, `routes/`, `styles/`, `utils/`) não corresponde ao snapshot.
