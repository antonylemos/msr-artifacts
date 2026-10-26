---
schema: 1
id: 1234974208
full_name: Gl1tch42/mfe-doctor
url: https://github.com/Gl1tch42/mfe-doctor
commit: 5b0521062060bb4349558aa3c1159f449283dcdd
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 323 — Gl1tch42/mfe-doctor

## Contexto

- **Tipo de repositório:** ferramenta/biblioteca. `mfe-doctor` é um linter CLI publicado no npm que analisa configurações de Module Federation para detectar erros antes do deploy (`README.md:1–7`; `package.json:2–11`).

O repositório contém o analisador (parser com Babel, regras, reporters), documentação das regras e testes com fixtures de `webpack.config.js` que usam `ModuleFederationPlugin`. As fixtures são entradas de teste, não unidades de uma aplicação. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:324` registra rank 323, ID 1234974208, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:324` registra as estratégias `terminology;technology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:29864` e `data/discovery/mfe-round-002/candidates.csv:29870`, ambos com `terminology;technology` e `unknown`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T22:36:54.296Z / 2026-10-08T15:59:53.854Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T23:05:48.505Z / 2026-10-08T16:09:21.512Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T23:26:24.296Z / 2026-10-08T16:18:08.915Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`.

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem TypeScript, licença MIT, `fork: false`, tamanho 61, criação em 2026-05-10T21:57:50Z, push em 2026-07-25T20:50:49Z.

Correspondências no README do SHA:
- **“micro frontend”:** `README.md:20` (“enterprise-scale micro frontend architectures”);
- **“micro frontends”:** `README.md:11` (“Micro Frontends with Module Federation frequently fail in production…”);
- **“module federation”:** `README.md:7` (“Detect Module Federation misconfigurations…”), também `:11`, `:27`, `:32`.

O README foi alterado pela última vez no SHA (2026-07-25T21:50:36+01:00, isto é, 20:50:36Z), igual ao `pushed_at` e anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 85 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. `src/` (CLI, core, regras, reporters), `docs/` (regras e arquitetura), `examples/custom-rule.js`, `tests/` (testes e fixtures) e configuração de build (`tsup.config.ts`). Não há aplicação frontend. | contrária |
| Configuração | `package.json:2–11`: pacote npm `mfe-doctor`, “Detect Module Federation misconfigurations”, keywords `module-federation`, `micro-frontend`, `linter`; `:22–30`: exports CJS/ESM de biblioteca. | contrária |
| Código-fonte (analisador) | `src/core/extractor.ts:1–20`: usa `@babel/traverse` para localizar `ModuleFederationPlugin` em configs de webpack; `src/rules/*.ts`: regras como `version-mismatch`, `singleton-inconsistent` e `expose-invalid-path`. A ferramenta inspeciona configurações alheias; não configura federação para si. | contrária |
| Código-fonte (fixtures) | `tests/fixtures/multi-plugin/webpack.config.js:1–22` e demais `tests/fixtures/*/webpack*.config.js`: configs mínimas de `ModuleFederationPlugin` (por exemplo, `exposes: { './A': './src/A.js' }`) usadas como entrada dos testes, sem aplicações, entries HTML ou builds próprios. | contexto |
| Documentação | `README.md:7–32`: motivação e regras da ferramenta; `README.md:247`, `:298`: exemplos de uso em CI e em projetos Angular. | fraca |
| Código-fonte (fronteiras) | Não há unidades frontend; os imports de `src/` são internos à ferramenta. | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 10 commits (10 em todos os refs), nenhum merge, todos de `Jean Carvalho <jean.carvalho@timwetech.com>` como autor e committer, de 2026-05-10 (`6a20f72`, “first commit”) a 2026-07-25 (o SHA, “update read”). `git rev-list --objects $SHA --missing=print` lista 46 objetos ausentes, nenhum na árvore do SHA. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend: o repositório é um linter CLI (`package.json:2–30`; `src/core/extractor.ts:1–20`). As configs de `ModuleFederationPlugin` são fixtures de teste (`tests/fixtures/multi-plugin/webpack.config.js:1–22`). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição conectando unidades; a ferramenta só analisa configurações. |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”.
- Corresponde a “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)”: ferramenta de apoio a arquiteturas com Module Federation.
- Mesmo enquadramento de 204 (devtools de single-spa) e 304 (biblioteca de mensageria para micro-frontends), ambos rascunhos.
- `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, arrays de tecnologia vazios (a ferramenta é Node/TypeScript, sem UI).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** fixtures de teste com `ModuleFederationPlugin` (`tests/fixtures/`) gerariam falso positivo em buscas de código por configuração de federação; o README e o `package.json` são inteiramente sobre Module Federation.
- **Protocolo (busca):** os três hits têm grafia literal no README. A elegibilidade permanece `unknown` nas duas rodadas.
