---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
url: https://github.com/lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [native-federation]
ui_technologies: [angular]
build_tools: [esbuild]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Contexto

Prova de conceito Angular 21 + Nx de “native module federation” com mensageria entre micro-frontends mediada pelo host (`README.md:3`). O workspace fica em `nx-mf-df/` (`README.md:5`). Ele tem:
- um shell `main-host` (porta 4200);
- três remotes `mf_remote_a`/`b`/`c` (4201–4203), carregados por rota;
- duas libs compartilhadas: contratos Zod e UI/adaptadores de mensageria (`README.md:11–19`).

A comunicação usa o pacote npm `@lkovari/microfrontend-platform-communication`, do mesmo titular, com um barramento exposto pelo host em `window.__MFE_BRIDGE__` (`README.md:17`, `:19`, `:25`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:363` registra rank 362, ID 1197367428, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:363` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:27570` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:27577` (`pass`), ambos com `terminology;technology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-03` | 2026-10-07T20:32:52.350Z / 2026-10-08T15:41:53.292Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-03` | 2026-10-07T22:12:03.269Z / 2026-10-08T15:49:28.339Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-03` | 2026-10-07T23:24:38.994Z / 2026-10-08T16:17:35.128Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-03-01..2026-03-31`.

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem TypeScript, licença MIT, `fork: false`, tamanho 2162, criação em 2026-03-31T14:24:56Z, push em 2026-06-07T09:38:13Z.

**Grafias:**
- **“module federation”:** `README.md:3` (“**native module federation**”);
- **“microfrontend”:** `README.md:3` (“cross-microfrontend”, em que o hífen separa os termos na busca), também `:17` e `:287`, no nome do pacote `@lkovari/microfrontend-platform-communication`;
- **“microfrontends”:** o plural não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `147d615` (2026-05-24). O SHA (2026-06-07T11:38:12+02:00, isto é, 09:38:12Z) coincide com o `pushed_at`. Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 228 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. `nx-mf-df/apps/` tem `main-host`, `mf_remote_a`, `mf_remote_b` e `mf_remote_c`, cada um com `federation.config.js`, `project.json`, `src/main.ts`, `src/bootstrap.ts` e `index.html`, além de quatro projetos e2e. `nx-mf-df/libs/` tem `common-ui-lib` e `contracts-platform-messaging`. Na raiz: README, changelogs e documentos de comunicação. | forte |
| Configuração (host) | `nx-mf-df/apps/main-host/federation.config.js:3–9`: `withNativeFederation({ name: 'main-host', shared: shareAll(singleton, strictVersion) })`. `nx-mf-df/apps/main-host/public/federation.manifest.json:1–5`: `mf_remote_a`/`b`/`c` → `http://localhost:4201`–`4203/remoteEntry.json`. `nx-mf-df/apps/main-host/src/main.ts:3–5`: `initFederation('federation.manifest.json')` antes do bootstrap. | forte |
| Configuração (remotes) | `nx-mf-df/apps/mf_remote_a/federation.config.js:4`, `:8–10`: `name: 'mf_remote_a'`, `exposes: { './Component': './apps/mf_remote_a/src/app/app.ts' }`; idem em `mf_remote_b` e `mf_remote_c` (`federation.config.js:4`, `:8–10`). `nx-mf-df/apps/mf_remote_a/src/main.ts:3–5` e `src/bootstrap.ts:1–5`: `initFederation()` e bootstrap próprio. | forte |
| Código-fonte (composição) | `nx-mf-df/apps/main-host/src/app/app.routes.ts:2`, `:11–25`: rotas `mf_remote_a`/`b`/`c` com `loadRemoteModule('<remote>', './Component').then((m) => m.App)`. `nx-mf-df/apps/mf_remote_a/src/app/app.ts:14–31`: o componente raiz `App` exportado e exposto. | forte |
| Configuração (correspondência da cadeia) | Os nomes do manifesto coincidem com os `name` dos remotes, e `./Component` coincide com `exposes`. As portas 4201–4203 coincidem com os dev-servers (`nx-mf-df/apps/mf_remote_a/project.json:53`, `:108`). Para o GitHub Pages, `nx-mf-df/scripts/gh-build.mjs:49–64` compila host e remotes com `baseHref` próprio e reescreve o manifesto do host com as URLs publicadas. | forte |
| Build/deploy | `nx-mf-df/apps/main-host/project.json:10`, `:58–65`: `@angular-architects/native-federation:build` sobre `@angular/build:application`, `outputPath: dist/apps/main-host`, entry `apps/main-host/src/main.ts`; `nx-mf-df/apps/mf_remote_a/project.json:10`, `:58–65`: idem com `dist/apps/mf_remote_a`. Deploy por workflow (`.github/workflows/deploy-github-pages.yml:41`, `:45–47`). | moderada |
| Código-fonte (fronteiras) | Busca ativa de imports relativos com `../../` em `apps` e `libs`: só os `eslint.config.mjs` para a config da raiz. Busca por caminhos ou aliases de outros apps: nenhuma ocorrência. Os apps usam as libs por path mapping (`nx-mf-df/tsconfig.base.json:17–22`; por exemplo `nx-mf-df/apps/mf_remote_a/src/app/app.ts:4–10` e `nx-mf-df/apps/main-host/src/app/app.config.ts:9–22`). | contexto |
| Comunicação entre unidades | `nx-mf-df/apps/main-host/src/app/app.config.ts:31–47`: `provideBus` e `provideHostBridge({ remotes: [MF_REMOTE_A_ID, MF_REMOTE_B_ID, MF_REMOTE_C_ID] })`. Os remotes se ligam ao barramento do host via `window.__MFE_BRIDGE__` (`README.md:19`, `:25`). | moderada |
| Conteúdo dos remotes | `nx-mf-df/apps/mf_remote_a/src/app/app.html:1–5`: toast, banner de mensageria, componente de boas-vindas e painel de histórico. `nx-mf-df/apps/mf_remote_a/src/app/nx-welcome.ts:1–15` (968 linhas) é o componente inicial do Nx (“This is a starter component and can be deleted”) adaptado. O domínio é demonstrativo. | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 19 commits alcançáveis a partir do SHA (25 em todos os refs, incluindo `origin/gh-pages`), sem merges. Todos têm o e-mail `laszlo.kovary@gmail.com`: autor `László Kővári`, e `LK` no commit inicial criado pelo GitHub.

Os registros vão de 2026-03-31 (`d722c85`, “Initial commit”) ao SHA (2026-06-07, “update platform comm library, add tests.”). As mensagens descrevem a construção passo a passo:
- `a04c0bb`: “steps 1 - 12 create apps install angulararchitests native federation plugin, set host and remotes”;
- `e642058`: “steps 12 - 18 ui-common-lib, routing, manifest”;
- a adoção do pacote de comunicação próprio, em `81a1110`.

`git rev-list --objects $SHA --missing=print` lista 156 objetos ausentes, nenhum na árvore do SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Quatro unidades: `main-host` e os três remotes referenciados no manifesto de federação (`nx-mf-df/apps/main-host/public/federation.manifest.json:1–5`). As libs e os projetos e2e não são contados. |
| Q2 | Yes | Cada unidade tem `federation.config.js`, entry, `project.json`, build e dev-server próprios (`nx-mf-df/apps/main-host/project.json:10–65`; `nx-mf-df/apps/mf_remote_a/project.json:10–108`). Não há import de código-fonte entre apps; o compartilhamento é por libs com alias (busca registrada). |
| Q3 | Yes | O shell roteia e carrega os três remotes (`nx-mf-df/apps/main-host/src/app/app.routes.ts:11–25`). |
| Q4 | Yes | Native Federation configurada nos dois lados e usada por `initFederation` + `loadRemoteModule`, com nomes, módulo exposto e portas correspondentes. O manifesto de produção é gerado pelo script de deploy (`gh-build.mjs:57–64`). |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- `MFE-implemented`: Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”.
- Mesmo padrão do final 059 e do rascunho 343: Native Federation com manifesto, `initFederation` e `loadRemoteModule` por rota, e libs por path mapping.
- Cadeia completa como em 076/084/096/106/109.
- Não é code sharing (089/100): cada remote expõe seu componente raiz, montado como página de uma rota do shell.
- O conteúdo dos remotes é demonstrativo (componente inicial do Nx e painéis de mensageria). Isso não altera os critérios literais, que tratam da composição; difere de 023/075/081/094/105, em que a composição não está montada.
- `frontend_units: 4`, `unit_organization: monorepo`, `approaches: [native-federation]`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (builder `@angular/build:application`, como em 059 e 343). `repo_type: example` (“proof-of-concept”, `README.md:3`).
- Não há decisão aberta.

## Notas para análise

- **RQ3:** comunicação entre micro-frontends por barramento em processo do host, exposto em `window.__MFE_BRIDGE__`, com contratos Zod versionados, registro de tópicos e request/response (`README.md:23–103`). O README explica que um único barramento é necessário porque `createBus()` isolados em bundles diferentes não se veem (`README.md:25`).
- **RQ3:** o README diz que, no shell integrado, o handler “remoto” da Demo Query roda no processo do host, inscrito com os IDs dos remotes (`README.md:142`). Parte da comunicação demonstrada não atravessa a fronteira real dos remotes.
- **RQ1:** o README fixa o pacote de comunicação em `^0.2.1` (`README.md:287`), mas `nx-mf-df/package.json:89` declara `^0.3.2`.
- **Protocolo (busca):** o hit plural não tem grafia literal, e o singular depende de “cross-microfrontend” e do nome do pacote. A elegibilidade muda de `unknown` (001) para `pass` (002).
