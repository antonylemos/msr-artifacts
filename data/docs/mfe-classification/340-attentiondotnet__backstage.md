---
schema: 1
id: 1245053416
full_name: attentiondotnet/backstage
url: https://github.com/attentiondotnet/backstage
commit: 813608335f8c6f35a9b95d90782a9cd9ef1a5109
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

# 340 — attentiondotnet/backstage

## Contexto

Cópia integral do repositório do framework Backstage (CNCF): `README.md:1–19`, com badges e links de `backstage/backstage`; descrição idêntica à do projeto. Não há commit do titular, e o SHA é um merge do projeto original. Module Federation aparece em bibliotecas do próprio framework para carregar plugins dinamicamente (`packages/frontend-dynamic-feature-loader`, `packages/module-federation-common`, `packages/backend-dynamic-feature-service`, `packages/cli-module-build`), as mesmas que casaram a busca de código no rascunho 247 (outra cópia do Backstage). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:341` registra rank 340, ID 1245053416, status `cloned`, branch `master` (a padrão) e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:341` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:30432` (`technology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:30439` (`technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada, todos do endpoint `code` e da consulta `technology-module-federation-package-code` (`"@module-federation" filename:package.json`):

| Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|
| `…#size:1800..1999` | `packages/frontend-dynamic-feature-loader/package.json` | 2026-10-07T19:47:00.785Z / 2026-10-08T15:42:30.174Z |
| `…#size:1800..1999` | `packages/module-federation-common/package.json` | 2026-10-07T19:47:05.277Z / 2026-10-08T15:42:35.449Z |
| `…#size:3000..3999` | `packages/backend-dynamic-feature-service/package.json` | 2026-10-07T20:33:04.318Z / 2026-10-08T15:43:53.217Z |
| `…#size:3000..3999` | `packages/cli-module-build/package.json` | 2026-10-07T20:33:04.318Z / 2026-10-08T15:43:48.071Z |

As consultas efetivas acrescentam a faixa `size:`. Os metadados do hit de código registram só a descrição do Backstage e `fork: false`.

Correspondências no SHA:
- `packages/frontend-dynamic-feature-loader/package.json` (1.874 bytes): `@backstage/frontend-dynamic-feature-loader`, papel `web-library` (`:2–6`), dependências `@module-federation/enhanced`, `runtime` e `sdk` (`:38–40`);
- `packages/module-federation-common/package.json` (1.823 bytes): “Helper library for module federation” (`:2–6`), `@module-federation/runtime` (`:42`);
- `packages/backend-dynamic-feature-service/package.json` (3.037 bytes): papel `node-library`, `@module-federation/sdk` (`:2–6`, `:71`);
- `packages/cli-module-build/package.json` (3.525 bytes): papel `cli-module`, `@module-federation/enhanced` (`:2–6`, `:50`).

Os quatro arquivos foram alterados pela última vez em 2026-05-19 (`b97fcb0a93`), antes das coletas. O acerto não depende do README.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 11.580 entradas, sendo 11.518 arquivos regulares `100644`, 60 executáveis `100755` e 2 symlinks `120000` (`.claude/CLAUDE.md` → `../AGENTS.md`; `.cursor/rules/backstage-project.mdc` → `../../AGENTS.md`); zero gitlinks. Monorepo do framework: `plugins/` (5.504), `packages/` (3.838), `docs/`, `microsite/`, `docs-ui/` e outros. | contexto |
| Documentação | `README.md:1–19`: “Backstage is an open source framework for building developer portals”, com badges do repositório `backstage/backstage`. | contrária |
| Código-fonte (MF do framework) | `packages/frontend-dynamic-feature-loader/README.md:1–12`: “Backstage frontend feature loader to load new frontend system plugins exposed as module federation remotes”, em conjunto com o servidor de remotes do `backend-dynamic-feature-service`, e marcado como alfa. Busca por `frontend-dynamic-feature-loader` em `packages/app`, `packages/app-legacy` e `packages/backend`: nenhuma ocorrência; os apps de exemplo não ativam o carregamento dinâmico. | fraca |
| Estrutura (apps) | `packages/app/package.json:2`, `:5`: `example-app`, papel `frontend`; 45 dependências `workspace:` (por exemplo, `@backstage/plugin-api-docs` e `@backstage/plugin-app`, `:50–53`). Os plugins entram por dependência de workspace no build do app de exemplo. `packages/app-legacy` e outros `app-*` são variantes e bibliotecas do framework. | contrária |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 73.934 commits (73.934 em todos os refs), 21.500 merges, de 2.370 identidades. As mais frequentes são `poldsberg@gmail.com`, `freben@gmail.com` e o bot `renovate`. A raiz é `1a19a01c4b` (2020-01-25, Stefan Ålund), e o SHA é um merge de 2026-05-20 de Fredrik Adelöw no projeto original (“Merge pull request #34321 from backstage/freben/enter-prerelease-mode”). Nenhum commit é do titular `attentiondotnet`; o repositório é uma cópia do Backstage com `fork: false`, cujo mecanismo não se afirma. `git rev-list --objects $SHA --missing=print` lista 255.745 objetos ausentes. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | O repositório é o framework; as configurações de federação estão em bibliotecas do framework (`packages/*-dynamic-feature-*`, `packages/module-federation-common`), sem unidades autorais referenciadas por configuração de composição. Os apps de exemplo não ativam o carregador dinâmico (busca registrada). |
| Q2 | No | Não há unidades de uma aplicação composta a avaliar. |
| Q3 | No | Nenhum host do repositório carrega remotes; o app de exemplo recebe os plugins por dependências de workspace (`packages/app/package.json:50–53`). |
| Q4 | No | O mecanismo de carregamento dinâmico existe como biblioteca do framework, não configurado e ativo entre unidades do repositório. |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)”: as bibliotecas de carregamento dinâmico por Module Federation são parte do framework Backstage.
- Mesmo enquadramento do rascunho 247 (outra cópia do Backstage, com os mesmos quatro hits de código). Aqui nem há contribuição do titular.
- A redistribuição de código de terceiros (074/080/102/122) e a regra de plataforma (037) não alteram a classe.
- `frontend_units: 1` (`packages/app`, o app de exemplo), `unit_organization: single-unit`, `ui_technologies: [react]` e `build_tools: []` seguem 247. `repo_type: other` (cópia de framework).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** as bibliotecas de plugins dinâmicos do Backstage (`@backstage/frontend-dynamic-feature-loader` e afins) casam buscas por `@module-federation` em `package.json`. Toda cópia do monorepo do Backstage entra na amostra pela estratégia de tecnologia.
- **Protocolo (famílias/duplicatas):** segunda cópia do Backstage na amostra (247 e 340). Uma deduplicação por histórico ou commit-raiz compartilhado (`1a19a01c4b`) evitaria a revisão repetida.
- **Protocolo:** a elegibilidade muda de `unknown` (001) para `pass` (002).
