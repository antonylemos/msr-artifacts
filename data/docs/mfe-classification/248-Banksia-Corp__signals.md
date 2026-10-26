---
schema: 1
id: 1342458837
full_name: Banksia-Corp/signals
url: https://github.com/Banksia-Corp/signals
commit: f96ff70ce52344bd844ad5764a8210c2bcc79602
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
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

# 248 — Banksia-Corp/signals

## Contexto

- **Tipo de repositório:** biblioteca. `@banksia/signals` é um motor de reatividade fina em TypeScript, publicado como pacote npm/JSR, com adaptadores para React, Lit, SolidJS e DOM vanilla (`README.md:1–3`; `package.json:2–5`, `:10–35`).

O repositório tem o código da biblioteca (`src/`), testes, benchmarks e um portal de documentação Rspress gerado a partir de Markdown (`rspress.config.ts:8–16`; `docs/`). “Micro-frontends” aparece só como cenário de uso que a biblioteca diz favorecer. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:249` registra rank 248, ID 1342458837, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:249` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:35848` (`terminology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:35853` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-08` | 2026-10-07T22:42:03.458Z / 2026-10-08T16:01:57.166Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-08` | 2026-10-07T23:12:12.610Z / 2026-10-08T16:10:36.351Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-08-01..2026-08-31`.

Metadados do hit (iguais nas duas rodadas): descrição “Fine-grained reactivity for modern TypeScript.”, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 511, criação em 2026-08-22T05:02:44Z, push em 2026-09-05T06:53:14Z.

A descrição não contém os termos; o acerto vem do README. As grafias correspondentes são “micro-frontends” em `README.md:58` (“hard to reuse across micro-frontends”) e `README.md:520` (“helpers for native DOM scripting and micro-frontends”). A busca de frase trata o hífen como separador, o que casa literalmente “micro frontends”. A forma singular “micro frontend” não aparece literalmente no README; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README alcançável é `a830d58` (2026-09-03T19:40:48+10:00). O SHA (merge de 2026-09-05T16:52:31+10:00, isto é, 06:52:31Z) coincide com o `pushed_at` registrado. Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 75 entradas, 74 arquivos regulares `100644` e 1 executável `100755` (`scripts/release-publish.sh`); zero symlinks e zero gitlinks. Um único `package.json` na raiz; `src/` (núcleo em `src/core/*` e adaptadores `src/react.ts`, `src/lit.ts`, `src/solid.ts`, `src/vanilla.ts`, `src/devtools.ts`), `tests/`, `benchmarks/`, `docs/` (Markdown, JSON de navegação e `logo.svg`) e workflows de CI, release e docs. | contrária |
| Configuração (biblioteca) | `package.json:10–35`: `exports` por subpath (`.`, `./react`, `./lit`, `./solid`, `./vanilla`, `./devtools`) para `dist/`; `:45`: `build: rslib build`; `:74–89`: React, Lit e SolidJS como peer dependencies opcionais. `rslib.config.ts:3–11`: build de biblioteca ESM sem bundle e com `.d.ts`. | contrária |
| Código-fonte | `src/index.ts:1–22`: “Framework-agnostic, fine-grained Proxy-based reactive state framework” com subpaths de adaptadores; `src/vanilla.ts:1–6`: helpers de bind de DOM sobre `effect`. Nenhuma aplicação, entry HTML ou montagem de UI no código da biblioteca. | contrária |
| Configuração / Build/deploy (portal) | `rspress.config.ts:8–16`: site Rspress com `root: docs`; `package.json:49–51`: `docs:dev`, `docs:build`, `docs:preview`; `.github/workflows/deploy-docs.yml:42–59`: build do pacote, build do portal e publicação de `doc_build` no GitHub Pages. É o único alvo de aplicação, um site de documentação gerado a partir de Markdown. | contexto |
| Documentação (menções MFE) | `README.md:58`, `:520`; `docs/framework-adapters/index.md:48`, `:56`; `docs/framework-adapters/vanilla.md:3`; `docs/getting-started/philosophy.md:113`, `:134`: micro-frontends citados como cenário de uso, porque o mesmo modelo de domínio pode alimentar UIs em frameworks diferentes. Nenhuma dessas passagens descreve unidades do repositório. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto `pnpm-lock.yaml`, por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie` e `registerApplication`: só as menções documentais acima. Nenhum mecanismo de composição configurado. | ausente |
| Código-fonte (fronteiras) | Busca ativa `git grep -E '\.\./'` em `src`, `tests` e `benchmarks`: só imports de testes e benchmarks para `../src/*` (por exemplo, `tests/signals-adapters.test.ts:2–5`; `benchmarks/reactivity.bench.ts:10`), dentro do mesmo pacote. Não há unidades para cruzar. | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 84 commits alcançáveis a partir do SHA (85 em todos os refs), 37 deles merges de PR. Autores:
- 75 com o e-mail `luizinho3@gmail.com`: 41 como “Luis Middleton” e 34 como “Luis”, estes com committer `GitHub` (merges pela interface web);
- 9 de `github-actions[bot]` (versionamento por Changesets).

A raiz é `e1a5e9e` (2026-08-22T15:24:54+10:00, “feat: initial repository baseline for @banksia/signals”). O SHA `f96ff70` é o merge do PR #60 (`changeset-release/main`). `AGENTS.md:1–3` e os nomes dos branches remotos (por exemplo, `implement_issue_15_plan`, `pull_issue_42_plan`) indicam uso de assistentes de código; os metadados não separam autoria intelectual. Os 29 branches remotos além de `main` não foram considerados.

`git rev-list --objects $SHA --missing=print` lista 206 objetos ausentes, todos de histórico. Nenhum blob histórico foi lido, e os arquivos do SHA citados estão presentes. O `git log -- README.md` por caminho funcionou sem buscar blobs.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Não há duas unidades frontend. O repositório é uma biblioteca (`package.json:10–35`; `rslib.config.ts:3–11`) com um único site de documentação (`rspress.config.ts:8–16`), e nenhuma configuração de composição referencia unidades externas (busca registrada). |
| Q2 | No | Não há unidades de uma mesma aplicação a avaliar. |
| Q3 | No | Não há host, shell nem root config que carregue unidades. |
| Q4 | No | Nenhum mecanismo de composição configurado; micro-frontends só aparecem como cenário de uso na documentação (`README.md:58`, `:520`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”.
- Corresponde a “repositories mentioning micro-frontends without implementing them”. Também se aproxima, por analogia, de “MFE frameworks and libraries”: é uma biblioteca de estado que se apresenta como útil em arquiteturas de micro-frontends, mas não é framework de composição nem compõe unidades.
- Comparável a 028 (biblioteca/ferramenta que cita MF como cenário suportado) e às bibliotecas 015/148/165. Não se trata de conteúdo didático ou gerador (023/075/081/094/105): é uma biblioteca real com código, testes e releases.
- `frontend_units: 1` e `single-unit` contam o portal de documentação Rspress, alvo de aplicação publicado em GitHub Pages, seguindo a contagem do site VitePress em 080. A biblioteca e seus adaptadores não são unidades frontend. Com contagem 0, como em 015/148/165, a classe não mudaria.
- `ui_technologies: []` porque React, Lit e SolidJS são peer dependencies dos adaptadores, não tecnologias com que se constroem unidades do repositório; o portal é Markdown. `build_tools: []`: Rslib é empacotador de biblioteca e Rspress encapsula o bundler do site (como Astro em 146).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** bibliotecas de estado e reatividade “framework-agnostic” citam micro-frontends como argumento de portabilidade (`README.md:58`; `docs/getting-started/philosophy.md:134`) e entram pelas buscas terminológicas.
- **Protocolo (busca):** o hit singular “micro frontend” não tem grafia literal no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
