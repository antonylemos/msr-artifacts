---
schema: 1
id: 1293401635
full_name: varunkumar91503773-dot/bg-changer
url: https://github.com/varunkumar91503773-dot/bg-changer
commit: 1b94513204ad1284575a557617ee96c4079e3613
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 169 — varunkumar91503773-dot/bg-changer

## Contexto

Pequena aplicação React + Vite + Tailwind que troca a cor de fundo da página por botões (`src/App.jsx:3–38`), com demo na Vercel. O `README.md` não descreve o projeto: é uma cópia da documentação do pacote `@vitejs/plugin-react` (`README.md:1–3`), e o `LICENSE` é o do Vite (“Copyright (c) 2019-present, Yuxi (Evan) You and Vite contributors”, `LICENSE:3`). Module Federation aparece só nesse README de terceiros, na explicação da opção `reactRefreshHost` (`README.md:72`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:170` registra rank 169, ID 1293401635, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:170` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:33139` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:33147` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-07` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-07-31` | 2026-10-07T23:29:25.295Z / 2026-10-08T16:19:04.667Z |

Metadados do hit:
- descrição nula, sem tópicos, linguagem CSS, `fork: false`, tamanho 34;
- criação em 2026-07-08T09:51:05Z, push em 2026-07-12T08:13:22Z;
- homepage `bg-changer-mu-six.vercel.app`.

O acerto vem de `README.md:72`, “…only necessary in a module federation context…”, única ocorrência e texto da documentação do `@vitejs/plugin-react`. A última alteração do README é `ab51b09` (2026-07-12), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 12 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto Vite na raiz (`package.json`, `vite.config.js`, `index.html`, `src/`). | contrária |
| Código-fonte | `src/main.jsx:6–10` monta `App`. `src/App.jsx:3–38`: estado de cor e botões que alteram o fundo. Os imports são internos. | contrária |
| Configuração / Build | `vite.config.js:5–10`: só `tailwindcss()` e `react()`. `package.json:5–19`: `vite`/`vite build`, dependências React, Tailwind e Vite, sem plugin de federação. | contrária |
| Documentação (terceiros) | `README.md:1–3`, `72–78`: documentação do `@vitejs/plugin-react`, que cita Module Federation para a opção `reactRefreshHost`. `LICENSE:3`: licença do Vite. Nada descreve o projeto. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA por `federation` e `micro`: só `README.md:72`. | ausente |

## Autoria e histórico

Clone não raso; 7 commits, 2 merges.
- **Autor principal:** `varunkumar91503773-dot <varunkumar91503773@gmail.com>`, pela web, fez o upload inicial em `873f179` (2026-07-08, “Add files via upload”, já com README e LICENSE).
- **Contribuição externa:** `Andro <androdotdev@gmail.com>` reorganizou os arquivos em `src/` em `aa184a9`, integrado pelo PR #1 (`5a5e714`).
- **Commits locais:** `varun <varun30362@gmail.com>` adicionou de novo os arquivos em `ab51b09` (2026-07-12), fez o merge `bb55321` e correções até o SHA `1b94513` (“fixeed again”), que só altera `src/App.jsx` (`git log --no-renames --name-status`).

Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend; nenhuma configuração de composição. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades. |
| Q4 | No | Nenhum mecanismo de composição (`vite.config.js:5–10`; busca registrada). |
| Q5 | No | Q1–Q4 são No: SPA trivial cujo README copiado de terceiros menciona Module Federation. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths” e a “repositories mentioning micro-frontends without implementing them”. Aqui a menção nem é do autor, mas de documentação de terceiros versionada por engano ou por cópia.
- Há uma aplicação real, por isso `frontend_units: 1`, `single-unit`, diferente dos perfis sem implementação. `repo_type: example`: exercício de aprendizado com demo publicada. `ui_technologies: [react]`, `build_tools: [vite]`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README copiado de pacote de terceiros (`@vitejs/plugin-react`) cuja documentação cita Module Federation basta para a consulta de tecnologia `"module federation"`.
- **Protocolo (busca):** entrada só por essa consulta. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `example`, React/Vite, uma unidade e `single-unit`; sem decisão aberta (`draft`). A menção a Module Federation no README pertence à documentação do pacote `@vitejs/plugin-react`, e não ao código nem à configuração da aplicação. O histórico (sete commits e dois merges, com três identidades de autoria) conferiu: o upload inicial é "Add files via upload", sem que se infira mais que o nome da operação.
