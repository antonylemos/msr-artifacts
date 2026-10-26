---
schema: 1
id: 1285686414
full_name: SerenityInAllThings/Backstage_test
url: https://github.com/SerenityInAllThings/Backstage_test
commit: 3daa194eb7e5e1629bd4c1b063d45a06d64ef12a
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
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

# 247 — SerenityInAllThings/Backstage_test

## Contexto

Cópia completa do repositório do framework Backstage (“an open source framework for building developer portals”, `README.md:1–22`), com o histórico upstream (74.430 commits em `HEAD`, desde 2020) e um commit do titular no branch padrão `test`. O commit `3daa194` (“Adding api keys plugin”) acrescenta dois plugins, `plugins/api-keys` e `plugins/api-keys-backend`. O frontend é integrado ao app de exemplo do Backstage (`packages/app`) como dependência de workspace e import direto.

O Module Federation aparece só nas bibliotecas do próprio framework para carregamento dinâmico de plugins (`packages/frontend-dynamic-feature-loader`, `packages/module-federation-common`, `packages/cli-module-build`, `packages/backend-dynamic-feature-service`), que são a origem dos acertos. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:248` registra rank 247, ID 1285686414, status `cloned`, branch `test` e o commit do front matter, que é o HEAD do clone e de `origin/test`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:248` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:32720` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:32728` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada, todos do endpoint `code` e da consulta `technology-module-federation-package-code`: `"@module-federation" filename:package.json`.

| Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|
| `…#size:1800..1999` | `packages/frontend-dynamic-feature-loader/package.json` | 2026-10-07T19:47:05.277Z / 2026-10-08T15:42:35.449Z |
| `…#size:1800..1999` | `packages/module-federation-common/package.json` | 2026-10-07T19:47:05.277Z / 2026-10-08T15:42:35.449Z |
| `…#size:3000..3999` | `packages/cli-module-build/package.json` | 2026-10-07T20:33:04.318Z / 2026-10-08T15:43:48.071Z |
| `…#size:3000..3999` | `packages/backend-dynamic-feature-service/package.json` | 2026-10-07T20:33:07.125Z / 2026-10-08T15:43:53.217Z |

Por exemplo:
- `packages/frontend-dynamic-feature-loader/package.json` (1.881 bytes) declara `@backstage/frontend-dynamic-feature-loader`, com papel `web-library` (`:2–6`) e dependências `@module-federation/enhanced`, `runtime` e `sdk` (`:38–40`);
- `packages/module-federation-common/package.json` (1.823 bytes) se descreve como “Helper library for module federation” (`:4`).

Os metadados do hit de código vêm vazios. A entrada é só por código; o README é o do Backstage e não foi usado na busca.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 11.877 entradas, sendo 11.815 arquivos regulares `100644`, 60 executáveis `100755` e 2 symlinks `120000`; zero gitlinks. Os symlinks são `.claude/CLAUDE.md` → `../AGENTS.md` e `.cursor/rules/backstage-project.mdc` → `../../AGENTS.md`, e ficam quebrados no SHA, que removeu `AGENTS.md`. É o monorepo do Backstage (`packages/`, `plugins/`, `microsite/`, `docs/`, `beps/` e outros). | contexto |
| Tecnologia (acertos) | Os quatro `package.json` casados são bibliotecas e ferramentas do framework para plugins dinâmicos com Module Federation (por exemplo `packages/frontend-dynamic-feature-loader/package.json:2–6`, `38–40`). São mecanismos oferecidos pelo framework a terceiros, não uma composição configurada por este repositório. | contrária |
| Contribuição do titular | `3daa194` (37 arquivos): cria `plugins/api-keys` e `plugins/api-keys-backend`, altera `app-config.yaml`, `packages/backend` e `packages/app`, e remove `AGENTS.md`. `packages/app/package.json:82`: `"@internal/plugin-api-keys": "workspace:^"`. `packages/app/src/modules/appModuleNav.tsx:35`, `127`: import direto de `ApiKeysNavGate`. O plugin entra no app por dependência de pacote, sem federação. | contrária |
| App | `packages/app/package.json:1–12`: `example-app`, papel `frontend`, o app de exemplo do framework. A busca por `frontend-dynamic-feature-loader` em `packages/app` não acha uso. | contexto |

## Autoria e histórico

Clone não raso. `HEAD` tem 74.430 commits, 21.630 merges e cerca de 2.386 autores distintos; a raiz é `1a19a01c4b` (2020-01-25, Stefan Ålund, “Create README.md”), do projeto upstream. Os únicos commits do titular são de Peterson V `<petersonvgama@gmail.com>`:
- `3daa194` (2026-07-01, o SHA, “Adding api keys plugin”), em `test`;
- `cc006f5` (2026-07-01, “Testing”), em `origin/test2`, não considerado.

Ao tentar ler o diff de `packages/app/package.json` no SHA, faltou um objeto histórico do clone parcial (`387abe8`), que não foi buscado; a descrição da contribuição se baseia na lista de arquivos alterados e no estado do SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | O repositório é o framework com um app de exemplo; os plugins, inclusive o do titular, entram como pacotes de workspace (`packages/app/package.json:82`), e nenhuma configuração deste repositório referencia unidades compostas em runtime. |
| Q2 | No | Os plugins não têm build ou deploy independentes no uso feito aqui; são compilados dentro do app. |
| Q3 | No | O app monta componentes importados estaticamente (`appModuleNav.tsx:35`, `127`); não há host carregando unidades separadas. |
| Q4 | No | O Module Federation existe só como biblioteca do framework (carregamento dinâmico de plugins), não usado pelo app nem pela contribuição do titular. Pelo critério, dependência declarada sozinha é No. |
| Q5 | No | Q1–Q4 são No: cópia de um framework de portal com um plugin estático de teste. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)”: o repositório é o próprio framework, cujos pacotes de plugins dinâmicos casam a busca de código.
- A contribuição do titular é um plugin integrado em build time como dependência de workspace. A decisão aberta sobre composição em build time não se aplica, porque o plugin não é publicado nem implantado como unidade independente; é código do mesmo build do app.
- `frontend_units: 1` (o `example-app`), `unit_organization: single-unit`, `ui_technologies: [react]`, `build_tools: []` (build encapsulado pela CLI do Backstage), `repo_type: other` (cópia de framework para teste).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** cópias de frameworks com suporte a Module Federation (Backstage) casam a busca de código por `@module-federation` em `package.json`.
- **Protocolo (amostra):** repositório não marcado como fork, mas com o histórico upstream completo; o snapshot é o branch padrão `test`, e o branch `test2` não foi considerado.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).
