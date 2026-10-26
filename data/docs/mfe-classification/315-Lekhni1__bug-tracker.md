---
schema: 1
id: 1231840825
full_name: Lekhni1/bug-tracker
url: https://github.com/Lekhni1/bug-tracker
commit: d3e0f8b3473ffc0980e891b5aa72509eabdbae3f
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

# 315 — Lekhni1/bug-tracker

## Contexto

Rastreador de bugs (“BuggedOut”) com um frontend React/TypeScript/Vite e um backend Java (Spark) com Firestore (`README.md:1–5`, `38–45`). O README afirma uma arquitetura micro-frontend e a integração de React e Vue (`README.md:57`, `64`), mas o snapshot tem um único projeto frontend React e nenhum código Vue. Há também um script de terceiro versionado (`git-filter-repo`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:316` registra rank 315, ID 1231840825, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:316` registra a estratégia `terminology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:29700` (`terminology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:29706` (`terminology`, `unknown`, regra `recent-human-commit` com `author_indeterminate`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-05` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T22:36:54.296Z / 2026-10-08T15:59:53.854Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-05` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T23:05:29.173Z / 2026-10-08T16:09:18.306Z |

Metadados do hit: descrição nula, sem tópicos, linguagem Python, sem licença, `fork: false`, tamanho 4828, criação em 2026-05-07T10:40:52Z, push em 2026-05-07T10:43:04Z.

A única ocorrência do termo é `README.md:64`: “Designed a modular micro-frontend architecture for scalable bug tracking features.”, no singular e hifenizado (a busca de frase trata o hífen como separador). O plural “micro frontends” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A linguagem `Python` dos metadados é compatível com o arquivo `git-filter-repo` (`git-filter-repo:1`, `#!/usr/bin/env python3`), apesar de `.gitattributes:6` marcar `*.py` como não detectável (o arquivo não tem extensão).

O README foi introduzido no único commit, o próprio SHA (2026-05-07), anterior às coletas de 7 e 8 de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 43 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um backend Maven (`backend/pom.xml`, `backend/src/main/java/com/example/bugtracker/BugTracker.java`, `backend/Dockerfile`), um único projeto frontend em `frontend/bug-tracker-frontend/`, um `frontend/package-lock.json` vazio (`:1–6`, `"packages": {}`), `.circleci/config.yml`, `vercel.json` e `git-filter-repo`. | contrária |
| Configuração (frontend) | `frontend/bug-tracker-frontend/package.json:5–9`: `vite`/`vite build`; `:10–15`: React 19, axios, react-toastify; nenhuma dependência Vue nem de composição. `frontend/bug-tracker-frontend/vite.config.ts:4–9`: só `react()` e porta 3000. | contrária |
| Código-fonte (UI) | `frontend/bug-tracker-frontend/index.html:8–9`: um `#root` e `/src/index.tsx`; `src/index.tsx:7–14`: um `createRoot`; `src/App.tsx:1–8`: renderiza apenas `BugTrackerHome`. | contrária |
| Código-fonte (fronteiras) | Busca por `../` em `*.ts`, `*.tsx`, `*.js`: `src/BugTrackerHome.tsx:18`, `src/components/BugTable.tsx:2` e `src/services/bugService.tsx:2`, todas para `bugTypes` dentro do mesmo projeto (a de `BugTrackerHome.tsx:18` aponta para `types/` fora de `src/`, caminho inexistente no inventário, que só tem `src/types/bugTypes.ts`). Não há segunda unidade a atravessar. | contexto |
| Documentação | `README.md:57`: “Successfully integrated React and Vue in a shared frontend”; `README.md:64`: “modular micro-frontend architecture”. Busca por `vue` em todo o SHA, exceto lockfiles e `git-filter-repo`, só encontra `README.md:57`; os lockfiles não têm `node_modules/vue`. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA (exceto lockfiles e `git-filter-repo`) por `micro.?front`, `federation`, `single.?spa`, `import.?map`, `iframe`, `customElements` e `qiankun`: só `README.md:64`. | ausente |
| Build/deploy | `.circleci/config.yml:7–20`, `22–34`: um job de build do frontend e um do backend; `vercel.json:1–9`: um único build com `rewrite` de `/bugs` para o backend hospedado. | contrária |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 1 commit (1 em todos os refs), nenhum merge: o próprio SHA `d3e0f8b` (2026-05-07T16:10:04+05:30, “bug tracker project”), autor e committer `lekhni kumbhare` com e-mail de host local (`…@lekhnis-MacBook-Air.local`), adicionando os 43 arquivos. O README lista dois outros contribuidores (`README.md:11–13`), que não aparecem nos metadados; os metadados mostram só um commit de importação em bloco e não permitem afirmar a origem do código nem separar autoria (a presença de `git-filter-repo` é registrada sem inferir reescrita de histórico). A rodada 002 registra `author_indeterminate` na regra de commit humano. `git rev-list --objects $SHA --missing=print` não identifica objetos ausentes.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`frontend/bug-tracker-frontend/`); a unidade Vue citada no README não existe no snapshot; nenhuma configuração de composição (busca registrada). |
| Q2 | No | Não há duas unidades a avaliar. |
| Q3 | No | Não há host, shell nem root config; a UI renderiza só `BugTrackerHome` (`src/App.tsx:4–6`). |
| Q4 | No | Nenhum mecanismo de composição configurado; as afirmações de `README.md:57`, `64` não têm artefato correspondente. |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths” e a “repositories mentioning micro-frontends without implementing them”: o README declara uma arquitetura micro-frontend e integração com Vue que o código não materializa.
- Não é `MFE-unit`: a app não exporta contrato para host externo.
- Não há cadeia parcial (097/103/104), code sharing (089/100) ou unidade de terceiros composta (102/074/080). O `git-filter-repo` é ferramenta de terceiro sem relação com a UI.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: example` (MVP de projeto, `README.md:60`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README com afirmações arquiteturais sem correspondência no código (“micro-frontend architecture”, “React and Vue in a shared frontend”, `README.md:57`, `64`); só a inspeção dos manifestos e da entrada desfaz o sinal.
- **Protocolo (metadados):** linguagem `Python` atribuída pelo GitHub a um script de terceiro (`git-filter-repo`), não ao projeto; elegibilidade `unknown` nas duas rodadas, com motivo `author_indeterminate` em 002.
