---
schema: 1
id: 922087440
full_name: malikrajat/rm-pushnotify
url: https://github.com/malikrajat/rm-pushnotify
commit: b74e0fc121be8bde71217326f02ac46bf747ffe6
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: []
build_tools: [rollup]
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 358 — malikrajat/rm-pushnotify

## Contexto

- **Tipo de repositório:** biblioteca JavaScript publicada no npm (`rm-pushnotify`, `package.json:2–14`) para pedir permissão, registrar service worker e exibir notificações push no navegador. O snapshot contém só os artefatos de distribuição (CJS, ESM, tipos, `sw.js`), documentação e imagens. Micro-frontends aparecem apenas na biografia do autor no README (`README.md:886`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:359` registra rank 358, ID 922087440, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:359` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:11521` e `data/discovery/mfe-round-002/candidates.csv:11527`, ambos com `terminology` e `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2025-01` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-01-01..2025-01-31` | 2026-10-07T22:20:03.469Z / 2026-10-08T15:53:38.009Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2025-01` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2025-01-01..2025-01-31` | 2026-10-07T22:51:15.534Z / 2026-10-08T16:05:13.495Z |

Metadados do hit: descrição da biblioteca de notificações (sem os termos), tópicos `library`, `npm`, `npm-package`, `package`, linguagem JavaScript, licença MIT, `fork: false`, tamanho 2214, 19 estrelas, criação em 2025-01-25T09:31:05Z, push em 2026-07-12T10:21:38Z, homepage no npm.

A única ocorrência do termo no repositório é `README.md:886`, na seção “Author” (`:882`): “…specializing in micro-frontends, AI-native development, React, and Angular.” O plural hifenizado casa “micro frontends” (hífen como separador); o singular não aparece isolado, e esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é `8940c55` (2026-07-12), anterior às coletas de 7 e 8 de outubro de 2026; não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 14 entradas, 10 arquivos regulares `100644` e 4 executáveis `100755` (`.gitignore`, `README.md`, `index.d.ts`, `sw.js`); zero symlinks e zero gitlinks. Arquivos: `package.json`, `rm-pushnotify.cjs`/`.esm.js` e mapas, `index.d.ts`, `sw.js`, `README.md`, `CHANGELOG.md`, `LICENSE`, `.npmignore` e duas imagens em `assets/`. Não há código-fonte de aplicação nem `index.html`. | contrária |
| Configuração (pacote) | `package.json:5–14`: `main`, `module`, `types` e `exports` de biblioteca; `:89–94`: scripts de build com Rollup e testes (o `rollup.config` e `test/` não estão versionados); `:128–131`: publicação no npm. | contrária |
| Código-fonte | `index.d.ts:1–11`: só a classe `PushNotification` (permissão, registro e atualização de service worker, notificação); `rm-pushnotify.esm.js` (início): implementação singleton da classe; `sw.js:11–20`: tratador do evento `push` do service worker. Nenhuma UI, roteamento ou montagem. | contrária |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA por `micro.?front`: só `README.md:886`; nenhum artefato de composição (federação, single-spa, import map, lifecycles). Sem código de aplicação, não há imports entre unidades a buscar. | ausente |
| Documentação | `README.md:882–887`: biografia do autor citando micro-frontends como especialidade profissional. | fraca |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 17 commits alcançáveis (17 em todos os refs), 7 merges, de 2025-01-25 (`b3852a6`, “project init”) a 2026-07-12 (SHA `b74e0fc`, merge do PR #8, tag `v2.1.0`). Autoria: Rajat (`11173135+malikrajat@users.noreply.github.com`) em todos os commits, 7 pela interface web. Tags `v1.0.0`, `v2.0.0`, `v2.1.0` e refs remotos `v-2.0.0`/`v1.0.0` não foram considerados à parte. A conta tem várias bibliotecas `rm-*` nas rodadas (por exemplo, `malikrajat/rm-toast-notification`, `data/discovery/mfe-round-002/candidates.csv:11077`) e um repositório `malikrajat/mfa-nx-ng-react` (`:18592`), fora da amostra. `git rev-list --objects $SHA --missing=print` identifica 23 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend: biblioteca de notificações sem aplicação (`index.d.ts:1–11`; `package.json:5–14`); nenhuma configuração de composição. |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição; o termo aparece só na biografia do autor (`README.md:886`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”; o repositório é uma biblioteca utilitária de navegador, não uma aplicação composta.
- A menção é da mesma natureza que nos perfis 011/064/068/073/077/101/111 (competência do autor), aqui dentro do README de uma biblioteca.
- `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: [rollup]` (`package.json:89–92`, `104–110`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** biografia do autor com “micro-frontends” no rodapé do README de uma biblioteca casa as buscas terminológicas.
- **Protocolo (família):** o autor publica uma série de bibliotecas `rm-*` presentes nas rodadas; só esta está na amostra.
