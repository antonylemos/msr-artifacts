---
schema: 1
id: 997746951
full_name: nurazizUGM-Intero5/OpenMRS-Module-Patient
url: https://github.com/nurazizUGM-Intero5/OpenMRS-Module-Patient
commit: c490ce752bac4d0772f28778fe81434dd6c57a00
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [single-spa]
ui_technologies: [react, angular]
build_tools: [webpack]
frontend_units: 18
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 356 — nurazizUGM-Intero5/OpenMRS-Module-Patient

## Contexto

Cópia do monorepo `openmrs/openmrs-esm-patient-chart`, o “frontend module for the OpenMRS SPA” que “contains various microfrontends that constitute widgets in a patient dashboard” (`README.md:5–7`). O `package.json` raiz mantém o nome `@openmrs/esm-patient-chart` (`package.json:2`), com workspaces `packages/*` (`:5–7`).

Os pacotes `packages/esm-*-app` são módulos ESM do OpenMRS 3. Cada um exporta componentes envolvidos por `getSyncLifecycle`/`getAsyncLifecycle` de `@openmrs/esm-framework` e os declara em `routes.json` como extensões em slots ou páginas. O app shell que carrega esses módulos não está no repositório. O histórico é o do projeto original, mais um único commit do titular. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:357` registra rank 356, ID 997746951, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:357` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:14840` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:14846` (`pass`), ambos com `terminology;technology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos cinco hits em cada rodada:

| Consulta (`q`) | Endpoint | Subconsulta | `path` |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | repositories | `…#created:2025-06` | vazio |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | repositories | `…#created:2025-06` | vazio |
| `technology-single-spa-package-code`: `"single-spa" filename:package.json` | code | `…#size:1000..1149` | `packages/esm-patient-common-lib/package.json` |
| idem | code | `…#size:2000..2249` | `packages/esm-patient-chart-app/package.json` |
| idem | code | `…#size:3000..3999` | `packages/esm-form-entry-app/package.json` |

Os hits de repositório foram coletados em 2026-10-07T18:37:52.559Z / 2026-10-08T15:38:14.867Z (singular) e 2026-10-07T22:07:57.374Z / 2026-10-08T15:47:25.710Z (plural). As consultas de repositório acrescentam `pushed:>=2025-04-01 created:2025-06-01..2025-06-30`.

Metadados do hit (iguais nas duas rodadas):
- descrição nula;
- linguagem TypeScript, licença `other`, `fork: false`;
- tamanho 23120;
- criação em 2025-06-07T05:05:37Z e push em 2025-06-07T05:09:12Z.

Correspondências no SHA:
- **“microfrontends”:** `README.md:7`, também `:23` e `:48`;
- **“microfrontend”:** `README.md:40` (“To start a dev server for a specific microfrontend”);
- **código:** os três arquivos têm tamanhos dentro das faixas (1.121, 2.046 e 3.227 bytes) e declaram `single-spa`:
  - `packages/esm-patient-common-lib/package.json:39`, em `peerDependencies`;
  - `packages/esm-patient-chart-app/package.json:53–54`, `single-spa` e `single-spa-react` em `peerDependencies`;
  - `packages/esm-form-entry-app/package.json:69` em `peerDependencies` e `single-spa-angular` em `:59`.

A última alteração do README é `940f7982` (2025-04-30, projeto original). O SHA é de 2025-06-07. Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1.649 entradas, sendo 1.646 arquivos regulares `100644` e 3 executáveis `100755`; zero symlinks e zero gitlinks. `packages/` tem 19 pacotes: 18 `esm-*-app`, cada um com `src/index.ts` e `src/routes.json`, e a biblioteca `esm-patient-common-lib`. O README ainda cita `esm-patient-biometrics-app` (`README.md:11`), que não existe no SHA. | forte |
| Configuração / Build (unidades) | Cada app tem bundle próprio (`"browser": "dist/openmrs-esm-patient-chart-app.js"`, `packages/esm-patient-chart-app/package.json:6`) e build webpack próprio (`:11`, `:13`). `esm-form-entry-app` é Angular, com `ng build`/`ng serve` (`packages/esm-form-entry-app/package.json:11`, `:13`), `single-spa-angular` (`:59`) e `systemjs-webpack-interop` (`:61`). | forte |
| Código-fonte (contrato com o shell) | `packages/esm-patient-allergies-app/src/index.ts:1–9`, `:25`, `:44–66`: `startupApp` e componentes exportados via `getSyncLifecycle`/`getAsyncLifecycle`. `src/routes.json:7–25` do mesmo pacote: extensões ligadas a slots (`patient-details-header-slot`, `patient-chart-allergies-dashboard-slot`). `packages/esm-patient-chart-app/src/index.ts:42` (`root`) e `src/routes.json:222–228`: página com `routeRegex` `^patient\/.+\/chart`. | moderada |
| Composição (host) | Busca no SHA por `app-shell`, `importmap`/`import-map` e `index.html`: nenhum arquivo. O carregamento é delegado ao tooling externo `openmrs` (`package.json:9`, `openmrs develop`; `README.md:46`) e a import map overrides (`README.md:56`). O shell, o import map e a resolução dos slots não são observáveis no repositório. | ambígua |
| Código-fonte (fronteiras) | Busca ativa por imports relativos com três ou mais `../` em `packages/` e por imports de outros pacotes `esm-*-app` via `@openmrs/…`. Os apps só compartilham `@openmrs/esm-patient-common-lib` (dependência `workspace:*`, `packages/esm-patient-chart-app/package.json:58`; por exemplo `packages/esm-patient-allergies-app/src/index.ts:10`). Única travessia entre unidades: um teste da lib, `packages/esm-patient-common-lib/src/orders/useOrderableConceptSets.test.ts:3`, que importa `../../../esm-patient-tests-app/src/config-schema`. Os demais `../../../` ficam dentro do próprio pacote ou apontam para `__mocks__` da raiz. | contexto |
| Contribuição do titular | O SHA altera só `packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx` (blob `0889dfd` → `d4563cb`). O blob anterior está ausente no clone parcial, então o diff não foi lido. No arquivo do SHA, `:65–88`: `fetch` à REST do OpenMRS e a `http://127.0.0.1:8000/api/lab-orders`. É integração com backend, sem efeito na composição. | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 2.380 commits alcançáveis a partir do SHA (2.380 em todos os refs), com 14 merges. As identidades mais frequentes são do projeto original (`kigen.work@gmail.com` 580, `chelashawdonald@yahoo.com` 232, `sharmava05@gmail.com` 129, `florian.rappl@smapiot.com` 97 e o bot `github-actions` 96, entre outras). A raiz é `1bebbfd1` (2019-10-08, Fatma Ali, “Initial commit”) e o pai do SHA é `b381eabc` (2025-05-30, projeto original).

O titular aparece em um único commit, o SHA: `c490ce7` (2025-06-07T12:08:39+07:00, `Nur Aziz <sukabaru09@gmail.com>`, “Integrasi Katalog API”). O repositório redistribui o projeto do OpenMRS com `fork: false`; o mecanismo da cópia não é afirmado. `git rev-list --objects $SHA --missing=print` lista 15.269 objetos ausentes, nenhum na árvore do SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | 18 apps ESM com entry (`src/index.ts`), registro (`src/routes.json`) e bundle próprios (`packages/esm-patient-chart-app/package.json:6`, `:13`); a lib comum não é contada. |
| Q2 | Yes | Builds próprios por pacote (webpack; Angular CLI em `esm-form-entry-app`). Não há import de código-fonte entre apps; o compartilhamento é pela lib `esm-patient-common-lib`. A única travessia está num teste da lib (`useOrderableConceptSets.test.ts:3`), não no código de produção. |
| Q3 | Yes | Os módulos declaram extensões e páginas em `routes.json` e exportam lifecycles para o app shell OpenMRS, que é o mecanismo de composição adotado pela plataforma. |
| Q4 | Yes | `getSyncLifecycle`/`getAsyncLifecycle`, `routes.json` e as dependências single-spa configuram o contrato de carga pelo shell e import map (`esm-patient-allergies-app/src/index.ts:44–66`; `routes.json:7–25`). |
| Q5 | Yes | Q1–Q4 demonstram módulos independentes e contratos de composição consistentes. A cópia upstream e o shell externo são ressalvas de proveniência e escopo, não ausência da arquitetura. |

## Motivo

- Classificado como `MFE-implemented`: os módulos têm bundles próprios, lifecycles e registros de extensões/páginas consistentes com a composição single-spa do OpenMRS.
- O host e o import map ficam fora deste repositório, mas os contratos de carga dos módulos estão observáveis e coerentes.
- Não é `MFE-unit`: são 18 unidades preparadas, não uma.
- `frontend_units: 18` (apps `esm-*-app`, sem a lib comum), `unit_organization: monorepo`, `approaches: [single-spa]` (lifecycles single-spa via `@openmrs/esm-framework`), `ui_technologies: [react, angular]`, `build_tools: [webpack]`.
- `repo_type: production`: o código é do produto OpenMRS; a cópia do titular é uma adaptação com integração de API local.

## Notas para análise

- **RQ2:** OpenMRS 3 usa single-spa com extensões/slots declarados em `routes.json` e lifecycles gerados pelo framework, com import maps no shell. É uma variante de composição por plataforma, distinta de MF remotes ou `registerApplication` direto no repositório.
- **RQ1 (sinais enganosos):** o README herdado diz “microfrontends” e lista um pacote inexistente no SHA (`README.md:11`).
- **Protocolo (famílias/duplicatas):** cópia integral do `openmrs-esm-patient-chart` com um commit do titular. Uma deduplicação por commit-raiz (`1bebbfd1`) agruparia cópias do mesmo projeto.
- **Protocolo:** a elegibilidade muda de `unknown` (001) para `pass` (002).

## Decisão registrada

Promovido para `MFE-implemented`. Os 18 módulos possuem bundles próprios, lifecycles single-spa e registros de extensões/páginas para o shell OpenMRS. O shell e o import map externos, assim como a origem upstream da cópia, são ressalvas de proveniência; os contratos de composição observáveis são suficientes para a classificação.
