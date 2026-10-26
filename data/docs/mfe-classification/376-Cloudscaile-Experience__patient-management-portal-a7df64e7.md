---
schema: 1
id: 1314943076
full_name: Cloudscaile-Experience/patient-management-portal-a7df64e7
url: https://github.com/Cloudscaile-Experience/patient-management-portal-a7df64e7
commit: b2bcbb43dec149d4e6b3d18792eace5207db1e4d
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 376 — Cloudscaile-Experience/patient-management-portal-a7df64e7

## Contexto

“Patient Management Portal”: extensão para uma plataforma (tenant `cloudscaile`) composta de duas partes:
- uma API Fastify (`js/`);
- um micro-frontend React (`web/`) que expõe `./PatientManagement` e `./PatientDetail` por Module Federation para um host (`README.md:1–8`, `:43`; `manifest.json:1–30`).

O host não está no repositório. O remote depende da ponte `@cloudscaile-eng/web-ext-utils` para axios, store Redux, tema, i18n e toasts.

A árvore do SHA é idêntica à do candidato 161 (`Cloudscaile-Experience/patient-management-portal-b32c1776`, anotação `MFE-unit`/review). Os dois commits têm o mesmo tree `332910855d40e61b46aa315c62db04aff7583c28`, e a comparação das 141 entradas de `git ls-tree -r` não mostra diferença de caminho nem de blob. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:377` registra rank 376, ID 1314943076, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:377` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:34357` (`unknown`, `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:34363` (`pass`, `qualifying_commit`), ambos com `terminology;technology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-07` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:38:35.473Z / 2026-10-08T16:00:43.513Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:08:31.860Z / 2026-10-08T16:09:50.872Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:28:59.650Z / 2026-10-08T16:18:56.800Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-07-01..2026-07-31`. As coletas coincidem, ao milissegundo, com as do 161 nas mesmas subconsultas.

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem TypeScript, sem licença, `fork: false`, tamanho 239, criação em 2026-07-28T12:16:59Z, push em 2026-07-28T12:17:02Z.

Grafias no README:
- **“micro-frontend”:** `README.md:3` (“React micro-frontend”), `:8`, `:35`, `:43`, `:52`; “Micro-frontend” em `:77`. A frase “micro frontend” casaria se a busca tratar o hífen como separador, o que não está registrado.
- **“Module Federation”:** `README.md:8` (“Module Federation component consumed by the host”).
- **“micro frontends”:** o plural não aparece; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O README vem do único commit, que é o SHA (2026-07-28T12:16:59Z), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 141 entradas, 138 arquivos regulares `100644` e 3 executáveis `100755` (`js/entrypoint.sh`, `js/scripts/migrate.sh`, `js/scripts/seed-if-new-db.sh`); zero symlinks e zero gitlinks. Há `js/` (API Fastify + Drizzle/PostgreSQL), `web/` (único projeto frontend), `manifest.json` e `lefthook.yml` na raiz, e `.claude/` com skills e `CLAUDE.md` em ambos os pacotes. | contexto |
| Configuração (federação) | `web/webpack/webpack.common.cjs:45–65`: `ModuleFederationPlugin({ name: 'remote', filename: 'remoteEntry.js', exposes: { './PatientManagement', './PatientDetail' }, shared: react, react-dom, react-router, i18next, react-i18next singleton })`, sem `remotes`. `web/webpack/webpack.prod.cjs:11–16`: `publicPath: 'auto'`. `web/src/index.tsx:1`: bootstrap assíncrono. | forte |
| Configuração (registro) | `manifest.json:2–24`: `tenant`, `extensionName`, `web.scope: "remote"`, `remoteFileName: "remoteEntry.js"` e módulos `./PatientManagement` e `./PatientDetail` com tamanhos de grade. É a declaração do remote para o host da plataforma. | moderada |
| Código-fonte (contrato com o host) | `web/src/utils/extension.ts:1–78`: `getExtension(tenant, name)`, `getExtAxios`, `getReduxStore`, `injectReducers`, `getTheme`, `registerTranslation`, `toast`, `getEventBus` e `getUser`, de `@cloudscaile-eng/web-ext-utils` (`web/package.json:17`). `web/src/containers/PatientManagementContainer.tsx:9–26` e `web/src/containers/PatientDetailContainer.tsx:16–22`, `:67–88`: registram traduções no host e recebem props de rota. `web/README.md:3`, `:118–126` e `web/.claude/skills/micro-frontend-integration/SKILL.md:7`: “never standalone in production”; o host controla rotas, store e tema. | moderada |
| Código-fonte (fronteiras) | `web/` usa o alias `@` → `web/src` (`web/webpack/webpack.common.cjs:13–15`). Busca ativa por imports `../` em `web` e `js` e por imports de `js/` a partir de `web`: nenhuma ocorrência. | contexto |
| Build/deploy | `web/package.json:4–12`: `webpack` com configurações dev e prod; `bootstrap.tsx:1–14` e `App.tsx:14–20` só para execução local. Não há host, shell nem configuração de `remotes`. | contexto |

## Autoria e histórico

Clone não raso com um único commit (1 em todos os refs), o SHA `b2bcbb4` (2026-07-28T12:16:59Z, “Initial commit”). Autor e committer são `Cloudscaile-Experience <dev@cloudscaile.com>`. Criação e push nos metadados ocorrem no mesmo segundo do commit, ou 3 s depois.

O commit do 161 (`b8a9112`, 2026-07-17) é de outra data, mas tem a mesma árvore. Dois repositórios da mesma organização com conteúdo idêntico e sufixos hexadecimais no nome são compatíveis com criação automatizada por ferramenta da plataforma. Isso não está demonstrado pelos metadados.

`git rev-list --objects $SHA --missing=print` não lista objetos ausentes.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`web/`). A configuração de composição só tem `exposes` (`web/webpack/webpack.common.cjs:48–51`) e não referencia unidades externas. A API `js/` não é unidade frontend. |
| Q2 | Yes | Para a unidade: entry e build próprios que geram `remoteEntry.js` (`web/webpack/webpack.common.cjs:10`, `:46–47`; `web/package.json:6`). |
| Q3 | Undetermined | O host da plataforma não está no repositório; só aparece pelo contrato da ponte (`web/src/utils/extension.ts`) e pelo `manifest.json`. |
| Q4 | Undetermined | O lado remoto está configurado; o consumidor não é observável. |
| Q5 | No | Há uma unidade preparada para composição, não uma instância de MFE no repositório. |

## Motivo

- Proposta `MFE-unit` com `status: review`, idêntica à do 161, já que o conteúdo do SHA é o mesmo.
- A exceção do checklist se aplica literalmente: “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable”.
- Fica em aberto a mesma questão de plataforma do 161:
  - o 037 classificou como `Non-MFE` uma unidade cujo único host é o mecanismo de extensão de uma plataforma de terceiros;
  - aqui o tenant e a organização titular coincidem (`manifest.json:3–4`; conta `Cloudscaile-Experience`).
- Não se usa o paralelo com gerador (075) ou exercício (094) para classificar: a origem automatizada não está demonstrada.
- Campos iguais aos do 161: `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: example` (`production` também seria defensável).

## Notas para análise

- **Protocolo (famílias/duplicatas):** 161 e 376 têm árvores idênticas (mesmo tree `3329108…`) e entram pelas mesmas três consultas na mesma subconsulta mensal. Uma deduplicação por tree do HEAD ou por hash de conteúdo evitaria contar duas vezes a mesma unidade nas RQs.
- **RQ2:** remote Module Federation de plataforma de extensões multi-tenant, com manifesto declarativo (módulos e tamanhos de grade) e SDK de ponte que entrega serviços do host.
- **Protocolo (busca):** o hit plural não tem grafia correspondente. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Ponto para revisão conjunta

1. **Mesma decisão do 161.** Um remote Module Federation preparado para o host de uma plataforma de extensões, com manifesto e SDK próprios dela e mantido pela organização da plataforma, conta como `MFE-unit` ou segue o precedente 037 (`Non-MFE`)? A classe deste candidato deve acompanhar a decisão tomada para o 161.
2. **Duplicata exata.** Decidir se o 376 permanece como observação independente na amostra ou é tratado como duplicata do 161 para fins de contagem. Isso não altera a classificação individual.
